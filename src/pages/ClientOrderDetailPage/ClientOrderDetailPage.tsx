import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconLock,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import OrderItemRow from "../../components/OrderItemRow";

function ClientOrderDetailPage() {
  let orderContentFragment;
  const [isLoading, setIsLoading] = useState(false);
  // const [order, setOrder] = useState({})
  const order = {
    orderId: 1,
    createdAt: "2025-04-22T10:00:00Z",
    orderCode: "ORD-20250422-0001",
    orderStatus: 2,
    total: 150.75,
    orderItems: [
      {
        id: 101,
        title: "Wireless Mouse",
        quantity: 2,
        price: 25.0,
      },
      {
        id: 102,
        title: "Mechanical Keyboard",
        quantity: 1,
        price: 100.75,
      },
    ],
    orderPaymentStatus: 1,
  };

  const orderStatusBadgeFragment = (status: number) => {
    switch (status) {
      case 1:
        return (
          <Badge color="gray" variant="filled" size="sm">
            Pending
          </Badge>
        );
      case 2:
        return (
          <Badge color="blue" variant="filled" size="sm">
            Shipped
          </Badge>
        );
      case 3:
        return (
          <Badge color="green" variant="filled" size="sm">
            Delivered
          </Badge>
        );
      case 4:
        return (
          <Badge color="red" variant="filled" size="sm">
            Canceled
          </Badge>
        );
    }
  };

  const orderPaymentStatusBadgeFragment = (paymentStatus: number) => {
    switch (paymentStatus) {
      case 1:
        return (
          <Badge color="gray" variant="filled" size="sm">
            Not paid
          </Badge>
        );
      case 2:
        return (
          <Badge color="green" variant="filled" size="sm">
            Paid
          </Badge>
        );
    }
  };

  if (order) {
    orderContentFragment = (
      <Stack>
        <Card p="md" radius="md">
          <Group justify="space-between">
            <Stack gap={0}>
              <Text fw={500}>Order ID: {order.orderCode}</Text>
              <Text color="dimmed">Order date: {"22/04/2025"}</Text>
            </Stack>
            <Group gap="xs">
              {orderStatusBadgeFragment(order.orderStatus)}
              {orderPaymentStatusBadgeFragment(order.orderPaymentStatus)}
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
                    Nguyen Huu Huy
                  </Text>
                  <Text size="sm">091.234.5678</Text>
                  <Text size="sm">Da Nang, Vietnam</Text>
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
                  <Text size="sm">By cash</Text>
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
                  <Table.Th style={{ minWidth: 125, textAlign: 'center'  }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Unit price
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 150, textAlign: 'center' }}>
                    <Text fw="initial" size="sm" color="dimmed">
                      Quantity
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 125, textAlign: 'center'  }}>
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
                      order.orderStatus === 4 && order.orderPaymentStatus === 2
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
                <Text size="sm" color="dimmed">
                  Subtotal
                </Text>
                <Text size="sm" style={{ textAlign: "right" }}>
                  {"000.000 VND"}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" color="dimmed">
                  Tax (10%)
                </Text>
                <Text size="sm" style={{ textAlign: "right" }}>
                  {"000.000 VND"}
                </Text>
              </Group>
              <Group justify="space-between">
                <Group gap="xs">
                  <Text size="sm" color="dimmed">
                    Shipping fee
                  </Text>
                </Group>
                <Text size="sm" style={{ textAlign: "right" }}>
                  {"000.000 VND"}
                </Text>
              </Group>
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
                  {"000.000 VND"}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider />

        <Button
          color="red"
          radius="md"
          style={{ width: "fit-content" }}
          disabled={![1, 2].includes(order.orderStatus)}
        >
          Cancel order
        </Button>
      </Stack>
    );
  }

  if (isLoading) {
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
