import {
  Container,
  Paper,
  Title,
  Group,
  Badge,
  Table,
  Stack,
  Box,
  Text,
  Button,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import {
  IconCheck,
  IconX,
  IconClockHour8,
  IconHome2,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import { OrderResponse } from "../../models/Order";

function formatVnPayCurrency(value: string) {
  const amount = parseInt(value, 10) / 100;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  // Convert to Vietnam time (UTC+7)
  const vnOffset = 7 * 60; // 7 hours in minutes
  const localTime = new Date(date.getTime() + vnOffset * 60 * 1000);

  const day = String(localTime.getUTCDate()).padStart(2, '0');
  const month = String(localTime.getUTCMonth() + 1).padStart(2, '0');
  const year = localTime.getUTCFullYear();

  const hour = String(localTime.getUTCHours()).padStart(2, '0');
  const minute = String(localTime.getUTCMinutes()).padStart(2, '0');
  const second = String(localTime.getUTCSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

export default function ClientCODStatusPage() {
  const { orderId } = useParams();
  const {
    data: orderResponse,
    isLoading: isLoadingOrderResponse,
    isError: isErrorOrderResponse,
  } = useQuery<OrderResponse, ErrorMessage>({
    queryKey: ["client-api", "handleVnPayReturn", orderId],
    queryFn: () =>
      FetchUtils.getWithToken(ResourceURL.CLIENT_USER_ORDER + "/" + orderId),
    refetchOnWindowFocus: false,
  });

  if (isLoadingOrderResponse) {
    return (
      <Container size="sm" py="xl">
        <Paper p="lg" shadow="sm" radius="md">
          <Group>
            <IconClockHour8 />
            <Text>Loading transaction...</Text>
          </Group>
        </Paper>
      </Container>
    );
  }

  if (isErrorOrderResponse) {
    return (
      <Container size="sm" py="xl">
        <Paper p="lg" shadow="sm" radius="md" bg="red.1">
          <Group>
            <IconX color="red" />
            <Text color="red.8">
              Failed to fetch transaction. Please reload.
            </Text>
          </Group>
        </Paper>
      </Container>
    );
  }

  // Render
  return (
    <Container size="xs">
      <Paper
        shadow="lg"
        p={0}
        radius="xl"
        withBorder
        style={{
          overflow: "hidden",
          borderTop: `6px solid var(--mantine-color-green-6)`,
        }}
      >
        {/* Status Section */}
        <Box
          px="xl"
          py="lg"
          bg={`var(--mantine-color-green-1)`}
          style={{
            borderBottom: `1px solid var(--mantine-color-gray-3)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Group>
            <Badge
              size="lg"
              radius="md"
              color={"green"}
              variant="filled"
              leftSection={<IconCheck size={16} />}
              style={{
                fontSize: 14,
                paddingRight: 12,
                textTransform: "uppercase",
              }}
            >
              SUCCESSFUL
            </Badge>
            <Text size="sm" c="dimmed">
              Your order has been placed successfully.
            </Text>
          </Group>
        </Box>

        <Stack px="xl" py={20} gap={28}>
          <Title order={3} ff="system-ui" fw={600} ml={36}>
            PAYMENT DETAILS
          </Title>
          <Table
            horizontalSpacing="lg"
            verticalSpacing={10}
            highlightOnHover={false}
            withColumnBorders={false}
            style={{
              th: { width: 120, color: "#bbb", fontWeight: 500, fontSize: 15 },
              td: { fontWeight: 530, fontSize: 16 },
              tr: { borderBottom: "1px solid #f5f5f7" },
            }}
          >
            <Table.Tbody>
              <Table.Tr>
                <Table.Th>Amount</Table.Th>
                <Table.Td>
                  {orderResponse?.totalAmount
                    ? formatVnPayCurrency((orderResponse.totalAmount * 100).toString())
                    : "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Order date</Table.Th>
                <Table.Td>
                  {orderResponse?.createdAt
                    ? formatDate(orderResponse?.createdAt)
                    : "-"}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Title order={3} ff="system-ui" fw={600} ml={36}>
            ORDER DETAILS
          </Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Subtotal</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orderResponse?.orderItems.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.book.title}</Table.Td>
                  <Table.Td>{item.quantity}</Table.Td>
                  <Table.Td>
                    {formatVnPayCurrency((item.subtotal * 100).toString())}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="space-between">
            <Button
              component={Link}
              to="/"
              variant="transparent"
              size="sm"
              leftSection={<IconHome2 size={18} />}
            >
              Back to Home
            </Button>
            <Text size="xs" color="dimmed">
              Order ID: <strong>{orderResponse?.id ?? "N/A"}</strong>
            </Text>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
