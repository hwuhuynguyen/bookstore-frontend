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
import { OrderResponse } from "../../models/Order";
import DateUtils from "../../utils/DateUtils";
import ApplicationConstants from "../../constants/ApplicationConstants";
import NumberUtils from "../../utils/NumberUtils";

function OrderCard({ order }: { order: OrderResponse }) {
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

  const orderStatusBadgeFragment = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge color="gray" variant="filled" size="sm">
            Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge color="blue" variant="filled" size="sm">
            Processing
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled" size="sm">
            Comlpeted
          </Badge>
        );
      case "CANCELED":
        return (
          <Badge color="red" variant="filled" size="sm">
            Canceled
          </Badge>
        );
    }
  };

  const orderPaymentStatusBadgeFragment = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "PENDING":
        return (
          <Badge color="gray" variant="filled" size="sm">
            Not paid
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled" size="sm">
            Completed
          </Badge>
        );
      case "FAILED":
        return (
          <Badge color="red" variant="filled" size="sm">
            FAILED
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
            <Text fw={500}>Order ID: {order.id}</Text>
            <Text color="dimmed">
              Order date: {DateUtils.convertTimestampToUTC(order.createdAt)}
            </Text>
          </Stack>
          <Group gap="xs">
            {orderStatusBadgeFragment(order.orderStatus)}
            {orderPaymentStatusBadgeFragment(order.payment.paymentStatus)}
          </Group>
        </Group>

        <Divider />

        {order.orderItems.map((orderItem) => (
          <Group key={orderItem.id} justify="space-between">
            <Group>
              <Image
                radius="md"
                style={{ height: "60px" }}
                src={
                  orderItem.book?.imageUrl ||
                  ApplicationConstants.DEFAULT_THUMBNAIL_URL
                }
                alt={orderItem.book?.title}
                onError={(e) => {
                  e.currentTarget.src =
                    ApplicationConstants.DEFAULT_THUMBNAIL_URL;
                }}
              />
              <Stack gap={3.5}>
                <Anchor
                  component={Link}
                  to={"/books/" + orderItem.book.slug}
                  fw={500}
                  size="sm"
                >
                  {orderItem.book.title}
                </Anchor>
              </Stack>
            </Group>

            <Group gap="xs">
              <Text>{NumberUtils.formatCurrency(orderItem.book.price)}</Text>
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
            to={"/order/detail/" + order.id}
          >
            View details
          </Button>
          <Group gap={5}>
            <Text>Total: </Text>
            <Text fw={500}>
              {NumberUtils.formatCurrency(order.totalAmount)}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default OrderCard;
