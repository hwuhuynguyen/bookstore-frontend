import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Group,
  Text,
  Image,
  Button,
  Stack,
  Radio,
  Divider,
  Container,
  ActionIcon,
  Paper,
  Title,
  Badge,
  Grid,
  Skeleton,
  Modal,
  TextInput,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import useAuthStore from "../../stores/AuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddToCartRequest, CartResponse } from "../../models/Cart";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import ApplicationConstants from "../../constants/ApplicationConstants";
import NumberUtils from "../../utils/NumberUtils";
import { AddressRequest, AddressResponse } from "../../models/Address";
import { UserResponse } from "../../models/User";
import { OrderRequest } from "../../models/Order";
import { VnPayResponse } from "../../models/Payment";

export default function ClientShoppingCart() {
  const queryClient = useQueryClient();
  const {
    user,
    currentTotalCartItems,
    updateCurrentTotalCartItems,
    updateUser,
  } = useAuthStore();
  const { cartResponse, isLoadingCartResponse, isErrorCartResponse } =
    useGetCartApi();

  const isLoading = isLoadingCartResponse;
  const isError = isErrorCartResponse;

  const cart = cartResponse as CartResponse;

  const [paymentMethod, setPaymentMethod] = useState("1");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [addressModalOpened, setAddressModalOpened] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse>();

  const [creatingNewAddress, setCreatingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<string>("");

  useEffect(() => {
    if (user?.addresses && user?.addresses.length > 0) {
      const defaultAddress = user?.addresses.find((a) => a.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
  }, [user?.addresses]);

  const createAddressMutation = useMutation<
    UserResponse,
    ErrorMessage,
    AddressRequest
  >({
    mutationFn: (newAddressData: AddressRequest) =>
      FetchUtils.postWithToken(
        `${ResourceURL.CLIENT_USER_ADDRESS}`,
        newAddressData
      ),
    onSuccess: (data) => {
      setCreatingNewAddress(false);
      setNewAddress("");
      const sortedAddresses = [...data.addresses].sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      updateUser({ ...data, addresses: sortedAddresses });
    },
    onError: (error) => {
      console.error("Error creating address:", error);
    },
  });

  // Calculate totals
  const subtotal =
    cart?.cartItems.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    ) || 0;

  const updateQuantityMutation = useMutation({
    mutationFn: ({ bookId, quantity }: AddToCartRequest) =>
      FetchUtils.putWithToken(`${ResourceURL.CLIENT_CART}/items`, {
        bookId,
        quantity,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["client-api", "carts", "getCart"],
      }),
  });

  const removeItemMutation = useMutation({
    mutationFn: (bookId: string) =>
      FetchUtils.deleteWithToken(`${ResourceURL.CLIENT_CART}/items`, {
        bookId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["client-api", "carts", "getCart"],
      }),
  });

  const setDefaultAddressMutation = useMutation<
    UserResponse,
    ErrorMessage,
    string
  >({
    mutationFn: (addressId: string) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_USER_ADDRESS}/${addressId}/default`,
        {}
      ),
    onSuccess: (data: UserResponse, variables: string) => {
      const sortedAddresses = [...data.addresses].sort((a, b) => {
        // Assuming 'createdAt' is either a Date object or string that can be parsed into a date
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      // Update the user data with the sorted addresses
      updateUser({ ...data, addresses: sortedAddresses });

      // After the mutation succeeds, update the selectedAddress state
      const updatedAddress = user?.addresses.find(
        (address) => address.id === variables
      );
      if (updatedAddress) {
        setSelectedAddress(updatedAddress);
      }
      queryClient.invalidateQueries({ queryKey: ["client-api", "addresses"] });
    },
  });

  const checkoutMutation = useMutation<
    VnPayResponse,
    ErrorMessage,
    OrderRequest
  >({
    mutationFn: ({ addressId, paymentTypeId }: OrderRequest) =>
      FetchUtils.postWithToken(`${ResourceURL.CLIENT_CHECKOUT}`, {
        addressId,
        paymentTypeId,
      }),
    onSuccess: (data: VnPayResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "carts", "getCart"],
      });
      updateCurrentTotalCartItems(0)
      window.location.href = data.paymentUrl;
    },
  });

  // Handle checkout
  const handleCheckout = () => {
    checkoutMutation.mutate({
      addressId: selectedAddress?.id || "",
      paymentTypeId: parseInt(paymentMethod),
    });
  };

  // Handle quantity change
  const handleQuantityChange = (bookId: string, quantity: number) => {
    updateQuantityMutation.mutate({ bookId, quantity });
  };

  // Handle remove item
  const handleRemoveItem = (bookId: string) => {
    removeItemMutation.mutate(bookId);
    updateCurrentTotalCartItems(currentTotalCartItems - 1);
  };

  const handleCreateNewAddress = () => {
    if (newAddress.trim() === "") {
      return;
    }

    const newAddressData: AddressRequest = {
      address: newAddress,
      isDefault: false,
    };
    createAddressMutation.mutate(newAddressData);
  };

  let cartContentFragment;

  if (isLoading) {
    cartContentFragment = (
      <Table.Tbody>
        {Array(5)
          .fill(0)
          .map((_, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {Array(5)
                .fill(0)
                .map((_, colIndex) => (
                  <Table.Td key={colIndex}>
                    <Skeleton height={50} radius="md" />
                  </Table.Td>
                ))}
            </Table.Tr>
          ))}
      </Table.Tbody>
    );
  }

  if (isError) {
    cartContentFragment = (
      <Table.Tbody>
        <Table.Tr>
          <Table.Td colSpan={5}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
              }}
            >
              <IconAlertTriangle size={125} strokeWidth={1} />
              <Text size="xl" fw={500}>
                Error occurred when fetching data
              </Text>
            </Box>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    );
  }

  if (cartResponse) {
    cartContentFragment = (
      <Table.Tbody>
        {[...(cart?.cartItems ?? [])]
          .sort((a, b) => a.book.title.localeCompare(b.book.title))
          .map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Group gap="md" align="center" wrap="nowrap">
                  <Image
                    src={
                      item.book.imageUrl ||
                      ApplicationConstants.DEFAULT_THUMBNAIL_URL
                    }
                    h={80}
                    w={80}
                    radius="md"
                    fit="contain"
                    style={{ flexShrink: 0 }}
                  />
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Text fw={500}>{item.book.title}</Text>
                  </Box>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text>{NumberUtils.formatCurrency(item.book.price)}</Text>
              </Table.Td>
              <Table.Td>
                <Group>
                  <Box style={{ width: "120px" }}>
                    <Group gap={5} align="center">
                      <ActionIcon
                        variant="subtle"
                        onClick={() =>
                          handleQuantityChange(
                            item.book.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </ActionIcon>
                      <Box
                        style={{
                          width: "40px",
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                          padding: "4px",
                        }}
                      >
                        {item.quantity}
                      </Box>
                      <ActionIcon
                        variant="subtle"
                        onClick={() =>
                          handleQuantityChange(
                            item.book.id,
                            Math.min(item.book.inventory, item.quantity + 1)
                          )
                        }
                        disabled={item.quantity >= item.book.inventory}
                      >
                        +
                      </ActionIcon>
                    </Group>
                    <Text
                      size="xs"
                      c="dimmed"
                      mt={5}
                      style={{ textAlign: "center" }}
                    >
                      In stock: {item.book.inventory}
                    </Text>
                  </Box>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text fw={500} c="blue">
                  {NumberUtils.formatCurrency(item.book.price * item.quantity)}
                </Text>
              </Table.Td>
              <Table.Td>
                <Button
                  color="red"
                  fullWidth
                  mt="sm"
                  radius="md"
                  variant="subtle"
                  onClick={() => handleRemoveItem(item.book.id)}
                >
                  <IconTrash size={16} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    );
  }

  return (
    <Container size="xl" px="md">
      <Group align="center" mb="md">
        <IconShoppingCart size={24} />
        <Title order={2}>Your cart</Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Table horizontalSpacing="md" verticalSpacing="md" withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Unit price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {cartContentFragment}
          </Table>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box style={{ flex: 1 }}>
            <Paper p="md" withBorder>
              <Stack>
                <Box>
                  <Text fw={500} mb="xs">
                    Your delivery info
                  </Text>
                  <Box pl="md">
                    <Group align="center">
                      <Text fw={500}>
                        {user?.firstName + " " + user?.lastName}
                      </Text>
                      <Badge color="teal">✓</Badge>
                    </Group>
                    <Text size="sm">{user?.phoneNumber}</Text>
                    <Text size="sm">{selectedAddress?.address || "N/A"}</Text>
                    <Button
                      variant="subtle"
                      color="blue"
                      mt="xs"
                      onClick={() => setAddressModalOpened(true)}
                    >
                      Change
                    </Button>
                  </Box>
                </Box>

                <Divider />
                <Box>
                  <Text fw={500} mb="xs">
                    Shipping method
                  </Text>
                  <Radio.Group
                    value={deliveryMethod}
                    onChange={setDeliveryMethod}
                  >
                    <Stack gap="xs">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Radio value="standard" />
                        <Text size="sm" style={{ marginLeft: "8px" }}>
                          Standard shipping (2-3 days)
                        </Text>
                      </div>
                    </Stack>
                  </Radio.Group>
                </Box>

                <Divider />

                <Box>
                  <Text fw={500} mb="xs">
                    Payment method
                  </Text>
                  <Radio.Group
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  >
                    <Stack gap="xs">
                      <Radio value="1" label={"Cash on delivery"} />
                      <Radio value="2" label={"Online"} />
                    </Stack>
                  </Radio.Group>
                </Box>

                <Divider />

                <Box>
                  <Group>
                    <Group>
                      <Text fw={500}>Total</Text>
                    </Group>
                    <Text fw={700} size="lg" c="blue">
                      {NumberUtils.formatCurrency(subtotal)}
                    </Text>
                  </Group>
                </Box>

                <Button
                  color="blue"
                  fullWidth
                  radius="md"
                  leftSection={<IconShoppingCart size={20} />}
                  onClick={handleCheckout}
                >
                  Order
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
      <Modal
        opened={addressModalOpened}
        onClose={() => setAddressModalOpened(false)}
        title="Select your address"
        size="lg"
      >
        <Stack gap="sm">
          {user?.addresses.map((address) => (
            <Paper
              key={address.id}
              withBorder
              p="md"
              radius="md"
              shadow="sm"
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedAddress?.id === address.id ? "#e8f4ff" : "white",
              }}
              onClick={() => {
                setSelectedAddress(address);
                setAddressModalOpened(false);
              }}
            >
              <Group justify="space-between" align="center">
                <Box>
                  <Text fw={500}>{address.address}</Text>
                  {address.isDefault && (
                    <Badge color="green" size="sm" mt="xs">
                      Default
                    </Badge>
                  )}
                </Box>

                {!address.isDefault && (
                  <Button
                    variant="light"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal close
                      setDefaultAddressMutation.mutate(address.id);
                    }}
                  >
                    Set as default
                  </Button>
                )}
              </Group>
            </Paper>
          ))}

          {creatingNewAddress ? (
            <Box>
              <TextInput
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                label="Enter new address"
                placeholder="123 Main St, City, Country"
                required
              />
              <Button
                variant="filled"
                color="blue"
                fullWidth
                mt="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateNewAddress();
                }}
                loading={createAddressMutation.status == "pending"}
              >
                Create address
              </Button>
            </Box>
          ) : (
            <Button
              variant="outline"
              color="blue"
              onClick={() => setCreatingNewAddress(true)}
              fullWidth
            >
              + Add new address
            </Button>
          )}
        </Stack>
      </Modal>
    </Container>
  );
}

function useGetCartApi() {
  const {
    data: cartResponse,
    isLoading: isLoadingCartResponse,
    isError: isErrorCartResponse,
  } = useQuery<CartResponse, ErrorMessage>({
    queryKey: ["client-api", "carts", "getCart"],
    queryFn: () => FetchUtils.getWithToken(ResourceURL.CLIENT_CART),
    refetchOnWindowFocus: false,
  });

  return { cartResponse, isLoadingCartResponse, isErrorCartResponse };
}
