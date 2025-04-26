// ShoppingCart.tsx
import { useState } from "react";
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
} from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";

// Define product type
interface Product {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

// Define initial products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Dell XPS 13 9315",
    size: "S",
    color: "Đỏ",
    price: 5500000,
    quantity: 2,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    stock: 10,
  },
  {
    id: 2,
    name: "Dell XPS 13 9315",
    size: "M",
    color: "Đỏ",
    price: 12500000,
    quantity: 1,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    stock: 5,
  },
  {
    id: 3,
    name: "Loa Harman Kardon Onyx Studio 7",
    size: "L",
    color: "Đỏ",
    price: 11000000,
    quantity: 2,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    stock: 8,
  },
  {
    id: 4,
    name: "Bàn phím không dây Logitech MX Keys",
    size: "L",
    color: "Đỏ",
    price: 8000000,
    quantity: 2,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    stock: 15,
  },
  {
    id: 5,
    name: "Chuột Logitech MX Anywhere 2S",
    size: "L",
    color: "Đỏ",
    price: 19250000,
    quantity: 2,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    stock: 20,
  },
];

export default function ClientShoppingCart() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  // Calculate totals
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  // Handle quantity change
  const handleQuantityChange = (id: number, value: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: value } : product
      )
    );
  };

  // Handle remove item
  const handleRemoveItem = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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
            <Table.Tbody>
              {products.map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>
                    <Group gap="md" align="center" wrap="nowrap">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        h={80}
                        w={80}
                        radius="md"
                        fit="contain"
                        style={{ flexShrink: 0 }}
                      />
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Text fw={500}>{product.name}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text>{formatCurrency(product.price)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group>
                      <Box style={{ width: "120px" }}>
                        <Group gap={5} align="center">
                          <ActionIcon
                            variant="subtle"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                Math.max(1, product.quantity - 1)
                              )
                            }
                            disabled={product.quantity <= 1}
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
                            {product.quantity}
                          </Box>
                          <ActionIcon
                            variant="subtle"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                Math.min(product.stock, product.quantity + 1)
                              )
                            }
                            disabled={product.quantity >= product.stock}
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
                          In stock: {product.stock}
                        </Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500} c="blue">
                      {formatCurrency(product.price * product.quantity)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      color="red"
                      fullWidth
                      mt="sm"
                      radius="md"
                      variant="subtle"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
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
                      <Text fw={500}>Danila Treat</Text>
                      <Badge color="teal">✓</Badge>
                    </Group>
                    <Text size="sm">0919944735</Text>
                    <Text size="sm">
                      3918 Bashford Junction, Phường Da Kao, Quận 1, Thành phố
                      Hồ Chí Minh
                    </Text>
                    <Button variant="subtle" color="blue" mt="xs">
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
                      <Radio value="cash" label={"Cash on delivery"} />
                      <Radio value="paypal" label={"PayPal"} />
                    </Stack>
                  </Radio.Group>
                </Box>

                <Divider />

                <Box>
                  {/* <Group mb="xs">
									<Text>Tạm tính</Text>
									<Text>{formatCurrency(subtotal)}</Text>
                  </Group>
                  <Group mb="xs">
									<Text>Thuế (10%)</Text>
									<Text>{formatCurrency(tax)}</Text>
                  </Group> */}
                  <Group>
                    <Group>
                      <Text fw={500}>Total</Text>
                    </Group>
                    <Text fw={700} size="lg" c="blue">
                      {formatCurrency(total)}
                    </Text>
                  </Group>
                </Box>

                <Button
                  color="blue"
                  fullWidth
                  radius="md"
                  leftSection={<IconShoppingCart size={20} />}
                >
                  Order
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
