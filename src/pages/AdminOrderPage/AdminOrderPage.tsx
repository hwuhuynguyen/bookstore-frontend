import {
  Title,
  Table,
  Group,
  ActionIcon,
  TextInput,
  Card,
  Stack,
  Pagination,
  Text,
  Skeleton,
  useMantineTheme,
  Tooltip,
  Modal,
  Button,
} from "@mantine/core";
import { useState } from "react";
import {
  IconAlertTriangle,
  IconEdit,
  IconEye,
  IconSearch,
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { OrderResponse, UpdateOrderStatusRequest } from "../../models/Order";
import ResourceURL from "../../constants/ResourceURL";
import NumberUtils from "../../utils/NumberUtils";
import DateUtils from "../../utils/DateUtils";
import NotifyUtils from "../../utils/NotifyUtils";
import StatusUtils from "../../utils/StatusUtils";

const AdminOrderPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  // const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [updateStatusModal, setUpdateStatusModal] = useState(false); // Modal for status update
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null
  ); // Selected order for update
  const [newStatus, setNewStatus] = useState<string>(""); // Selected status for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const requestParams = {
    size: 10,
    page: activePage - 1,
    sort: "createdAt,desc",
  };

  const {
    data: orderResponses,
    isLoading: isLoadingOrderResponses,
    isError: isErrorOrderResponses,
  } = useQuery<ListResponse<OrderResponse>, ErrorMessage>({
    queryKey: ["client-api", "orders", "getOrders", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<OrderResponse>>(
        ResourceURL.ADMIN_GET_ALL_ORDERS,
        requestParams,
        true
      ),
    refetchOnWindowFocus: false,
  });

  //   // Mutation to update order status
  const updateOrderStatus = useMutation<
    OrderResponse,
    ErrorMessage,
    UpdateOrderStatusRequest
  >({
    mutationFn: (request: UpdateOrderStatusRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_ORDER}/${request.orderStatus}/status`,
        { orderStatus: newStatus },
        true
      ),

    onSuccess: () => {
      setUpdateStatusModal(false);
      queryClient.invalidateQueries({
        queryKey: ["client-api", "orders", "getOrders", requestParams],
      });
      NotifyUtils.simpleSuccess("This order's status is updated successfully.");
    },
  });

  const handleStatusUpdate = (orderId: string) => {
    if (newStatus) {
      updateOrderStatus.mutate({ orderStatus: orderId });
    }
  };

  const orders = orderResponses as ListResponse<OrderResponse>;

  let ordersContentFragment;

  if (isLoadingOrderResponses) {
    ordersContentFragment = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorOrderResponses) {
    ordersContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Error occurred while fetching data
        </Text>
      </Stack>
    );
  }

  if (orders) {
    ordersContentFragment = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No.</Table.Th>
              <Table.Th>Order date</Table.Th>
              <Table.Th>Customer name</Table.Th>
              <Table.Th>Phone number</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Order status</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>
                Payment status
              </Table.Th>
              <Table.Th>Payment type</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders?.data.map((order, index) => (
              <Table.Tr key={order.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(order.createdAt)}
                </Table.Td>
                <Table.Td>
                  {order.siteUser?.firstName + " " + order.siteUser?.lastName}
                </Table.Td>
                <Table.Td>{order.siteUser?.phoneNumber}</Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {StatusUtils.orderStatusBadgeFragment(order.orderStatus)}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {StatusUtils.orderPaymentStatusBadgeFragment(
                    order.payment.paymentStatus
                  )}
                </Table.Td>
                <Table.Td>{order.payment.paymentType}</Table.Td>
                <Table.Td>
                  {NumberUtils.formatCurrency(order.totalAmount)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
                    <Tooltip label="View details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedOrder(order);
                          setModalMode("view");
                          setUpdateStatusModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    {order.orderStatus === "PROCESSING" && (
                      <Tooltip label="Update order status">
                        <ActionIcon
                          variant="subtle"
                          radius={"md"}
                          onClick={() => {
                            setSelectedOrder(order);
                            setModalMode("edit");
                            setUpdateStatusModal(true);
                          }}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt={"lg"}>
          <Pagination
            value={activePage}
            total={orders?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{orders?.totalPages}
            </Text>
          </Text>
        </Group>
      </>
    );
  }
  return (
    <>
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={2}>Order Management</Title>
          </Group>
          <Group grow>
            <TextInput
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<IconSearch size={16} />}
              radius="md"
            />
            {/* <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
              data={statuses.map((status) => ({
                value: status,
                label: status,
              }))}
              clearable
            /> */}
          </Group>
        </Stack>
      </Card>

      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {ordersContentFragment}
      </Card>

      {/* Modal to update order status */}
      <Modal
        opened={updateStatusModal}
        onClose={() => setUpdateStatusModal(false)}
        title={<Title order={3}>ORDER INFORMATION</Title>}
        size="lg"
        radius={"md"}
      >
        {selectedOrder ? (
          <Stack>
            {/* Customer Info */}
            <Table
              variant="vertical"
              layout="fixed"
              withTableBorder
              captionSide="top"
            >
              <Table.Caption>
                <Title order={4} c={"dark"}>
                  Customer Information
                </Title>
              </Table.Caption>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>Customer name</Table.Th>
                  <Table.Td>
                    {selectedOrder.siteUser.firstName +
                      " " +
                      selectedOrder.siteUser.lastName}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Phone number</Table.Th>
                  <Table.Td>{selectedOrder.siteUser.phoneNumber}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Shipping address</Table.Th>
                  <Table.Td>{selectedOrder.shippingAddress.address}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Payment method</Table.Th>
                  <Table.Td>{selectedOrder.payment.paymentType}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Payment status</Table.Th>
                  <Table.Td>{selectedOrder.payment.paymentStatus}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            {/* Order Details */}
            <Table
              variant="vertical"
              layout="fixed"
              withTableBorder
              captionSide="top"
            >
              <Table.Caption>
                <Title order={4} c={"dark"}>
                  Order Details
                </Title>
              </Table.Caption>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>Order ID</Table.Th>
                  <Table.Td>{selectedOrder.id}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Total amount</Table.Th>
                  <Table.Td>
                    {NumberUtils.formatCurrency(selectedOrder.totalAmount)}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Order date</Table.Th>
                  <Table.Td>
                    {DateUtils.convertTimestampToUTC(selectedOrder.createdAt)}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>Order status</Table.Th>
                  <Table.Td>{selectedOrder.orderStatus}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Table layout="fixed" withTableBorder captionSide="top" striped>
              <Table.Caption>
                <Title order={4} c={"dark"}>
                  Order Items
                </Title>
              </Table.Caption>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={40}>No.</Table.Th>
                  <Table.Th>Book</Table.Th>
                  <Table.Th w={120}>Price per unit</Table.Th>
                  <Table.Th w={80}>Quantity</Table.Th>
                  <Table.Th w={100}>Subtotal</Table.Th>
                </Table.Tr>

                {selectedOrder.orderItems.map((item, index) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.book.title}</Table.Td>
                    <Table.Td>
                      {NumberUtils.formatCurrency(item.pricePerUnit)}
                    </Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>
                      {NumberUtils.formatCurrency(item.subtotal)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {/* Action Buttons */}
            {modalMode === "edit" && (
              <Group
                grow
                mt="md"
                style={{ justifyContent: "center", gap: "1rem" }}
              >
                <Button
                  color="green"
                  size="md"
                  radius="md"
                  style={{ padding: "10px 20px", fontWeight: "bold" }}
                  onClick={() => {
                    setNewStatus("COMPLETED");
                    handleStatusUpdate(selectedOrder.id);
                  }}
                >
                  Confirm Order
                </Button>
                <Button
                  color="red"
                  size="md"
                  radius="md"
                  variant="outline"
                  style={{ padding: "10px 20px", fontWeight: "bold" }}
                  onClick={() => {
                    setNewStatus("CANCELLED");
                    handleStatusUpdate(selectedOrder.id);
                  }}
                >
                  Cancel Order
                </Button>
              </Group>
            )}
          </Stack>
        ) : (
          <Text>No order selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminOrderPage;
