import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertTriangle, IconHome2 } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import OrderItemRow from "../../components/OrderItemRow";
import StatusUtils from "../../utils/StatusUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderResponse } from "../../models/Order";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import ApplicationConstants from "../../constants/ApplicationConstants";
import NumberUtils from "../../utils/NumberUtils";
import NotifyUtils from "../../utils/NotifyUtils";

function ClientOrderDetailPage() {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const { orderId } = useParams();

  const {
    data: orderResponse,
    isLoading: isLoadingOrderResponse,
    isError: isErrorOrderResponse,
  } = useQuery<OrderResponse, ErrorMessage>({
    queryKey: ["client-api", "getOrderDetail", orderId],
    queryFn: () =>
      FetchUtils.getWithToken(ResourceURL.CLIENT_ORDER + "/" + orderId),
    refetchOnWindowFocus: false,
  });

  const cancelOrder = useMutation({
    mutationFn: (orderId: string) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_ORDER}/${orderId}/cancel`,
        {}
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "getOrderDetail", orderId],
      });
      NotifyUtils.simpleSuccess("This order is cancelled successfully.");
    },
  });

  const handleCancelOrder = () => {
    if (orderId) cancelOrder.mutate(orderId);
  };

  const order = orderResponse as OrderResponse;

  let orderContentFragment;

  if (isLoadingOrderResponse) {
    orderContentFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorOrderResponse) {
    orderContentFragment = (
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

  if (order) {
    orderContentFragment = (
      <Stack>
        <Card p="md" radius="md">
          <Group justify="space-between">
            <Stack gap={0}>
              <Text fw={500}>Order ID: {order.id}</Text>
              <Text color="dimmed">
                Order date: {DateUtils.convertTimestampToUTC(order.createdAt)}
              </Text>
              <Text color="dimmed">
                Payment method: {order.payment.paymentType}
              </Text>
            </Stack>
            <Group gap="xs">
              {StatusUtils.orderStatusBadgeFragment(order.orderStatus)}
              {StatusUtils.orderPaymentStatusBadgeFragment(
                order.payment.paymentStatus
              )}
            </Group>
          </Group>
        </Card>

        <Grid>
          <Grid.Col span={4}>
            <Card p="md" radius="md" style={{ height: "100%" }}>
              <Stack gap="xs">
                <Text fw={500} color="dimmed">
                  Delivery information
                </Text>
                <Stack gap={5}>
                  <Text size="sm" fw={500}>
                    {order.siteUser.firstName + " " + order.siteUser.lastName}
                  </Text>
                  <Text size="sm">{order.siteUser.phoneNumber}</Text>
                  <Text size="sm">{order.shippingAddress.address}</Text>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card p="md" radius="md" style={{ height: "100%" }}>
              <Stack gap="xs">
                <Text fw={500} color="dimmed">
                  Delivery method
                </Text>
                <Text size="sm">Standard shipping (2-3 days)</Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card p="md" radius="md" style={{ height: "100%" }}>
              <Stack gap="xs">
                <Text fw={500} color="dimmed">
                  Payment method
                </Text>
                <Group gap="xs">
                  <Text size="sm">{order.payment.paymentType}</Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card p={0} radius="md">
          <ScrollArea>
            <Table verticalSpacing="sm" horizontalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ minWidth: 325 }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Product
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 125, textAlign: "center" }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Unit price
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 150, textAlign: "center" }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Quantity
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 125, textAlign: "center" }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Total
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {order.orderItems.map((orderItem) => (
                  <OrderItemRow
                    key={orderItem.id}
                    orderItem={orderItem}
                    canReview={
                      order.orderStatus === "COMPLETED" &&
                      order.payment.paymentStatus === "COMPLETED"
                    }
                  />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>

        <Grid>
          <Grid.Col span={{ sm: 7, md: 8, lg: 9 }} />
          <Grid.Col span={{ sm: 5, md: 4, lg: 3 }}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" fw={500}>
                  Total
                </Text>
                <Text
                  size="lg"
                  fw={700}
                  color="blue"
                  style={{ textAlign: "right" }}
                >
                  {NumberUtils.formatCurrency(order.totalAmount)}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider />

        <Group justify="space-between">
          <Button
            component={Link}
            to="/order"
            variant="transparent"
            size="sm"
            leftSection={<IconHome2 size={18} />}
          >
            Back to Order page
          </Button>
          {ApplicationConstants.CANCELABLE_STATUSES.includes(
            order.orderStatus
          ) && (
            <Button
              color="red"
              variant="light"
              radius="md"
              style={{ width: "fit-content" }}
              onClick={handleCancelOrder}
            >
              Cancel order
            </Button>
          )}
        </Group>
      </Stack>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
            <UserNavbar />
          </Grid.Col>

          <Grid.Col span={{ base: 10, sm: 11, md: 9 }}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>Order details</Title>
                {orderContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientOrderDetailPage;
