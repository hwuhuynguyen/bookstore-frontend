import {
  Anchor,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

function OrderCard({ order }: { order: any }) {
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

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

  return (
    <Card
      p="md"
      radius="md"
      style={{
        backgroundColor:
          colorTheme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      }}
    >
      <Stack>
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

        <Divider />

        {order.orderItems.map((orderItem: any) => (
          <Group key={orderItem.id} justify="space-between">
            <Group>
              <Image
                radius="md"
                style={{ height: "60px" }}
                src={
                  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                }
                alt={orderItem.id}
              />
              <Stack gap={3.5}>
                <Anchor
                  component={Link}
                  to={"/books/" + orderItem.title}
                  fw={500}
                  size="sm"
                >
                  {orderItem.title}
                </Anchor>
              </Stack>
            </Group>

            <Group gap="xs">
              <Text>{orderItem.price}</Text>
              <Text
                color="blue"
                size="lg"
                style={{ fontFamily: theme.fontFamilyMonospace }}
              >
                ×{orderItem.quantity || 0}
              </Text>
            </Group>
          </Group>
        ))}

        <Divider />

        <Group justify="space-between">
          <Button
            radius="md"
            variant="outline"
            component={Link}
            to={"/order/detail/" + order.orderCode}
          >
            View details
          </Button>
          <Group gap={5}>
            <Text>Total: </Text>
            <Text fw={500}>{order.total}</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default OrderCard;
