import { useEffect, useState } from "react";
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
  CopyButton,
  Button,
  Center,
  Divider,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  IconCheck,
  IconX,
  IconInfoCircle,
  IconShieldCheck,
  IconCopy,
  IconClockHour8,
  IconHome2,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import { TransactionResponse } from "../../models/Payment";

function formatVnPayCurrency(value: string) {
  const amount = parseInt(value, 10) / 100;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function formatDate(dateStr: string) {
  if (!dateStr || dateStr.length < 14) return dateStr ?? "-";
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(8, 10);
  const minute = dateStr.substring(10, 12);
  const second = dateStr.substring(12, 14);
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

export default function ClientPaymentStatusPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [transactionDetails, setTransactionDetails] = useState<
    Record<string, string>
  >({});
  const plainParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (Object.keys(plainParams).length > 0) {
      setTransactionDetails(plainParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const {
    data: transactionResponse,
    isLoading: isLoadingTransactionResponse,
    isError: isErrorTransactionResponse,
  } = useQuery<TransactionResponse, ErrorMessage>({
    queryKey: ["client-api", "handleVnPayReturn", plainParams],
    queryFn: () =>
      FetchUtils.getWithToken(
        ResourceURL.CLIENT_PAYMENT_VNPAY_RETURN,
        plainParams
      ),
    refetchOnWindowFocus: false,
  });

  let statusColor = "gray";
  let icon = <IconInfoCircle size={16} />;
  let statusText = "UNKNOWN";

  if (transactionResponse?.paymentStatus === "COMPLETED") {
    statusColor = "green";
    icon = <IconCheck size={16} />;
    statusText = "SUCCESSFUL";
  } else if (transactionResponse?.paymentStatus === "FAILED") {
    statusColor = "red";
    icon = <IconX size={16} />;
    statusText = "FAILED";
  }
  if (isLoadingTransactionResponse) {
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

  if (isErrorTransactionResponse) {
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
          borderTop: `6px solid var(--mantine-color-${statusColor}-6)`,
        }}
      >
        {/* Status Section */}
        <Box
          px="xl"
          py="lg"
          bg={`var(--mantine-color-${statusColor}-1)`}
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
              color={statusColor}
              variant="filled"
              leftSection={icon}
              style={{
                fontSize: 14,
                paddingRight: 12,
                textTransform: "uppercase",
              }}
            >
              {statusText}
            </Badge>
            <Text size="sm" c="dimmed">
              {transactionResponse?.paymentStatus === "COMPLETED" &&
                "Your payment was completed successfully."}
              {transactionResponse?.paymentStatus === "FAILED" &&
                "There was a problem with your payment. Please try again."}
              {!["COMPLETED", "FAILED"].includes(
                transactionResponse?.paymentStatus ?? ""
              ) && "The transaction status is unknown."}
            </Text>
          </Group>
        </Box>

        <Stack px="xl" py={20} gap={28}>
          <Group justify="space-between">
            <Box>
              <Center>
                <Title order={3} ff="system-ui" fw={600} mb={3}>
                  PAYMENT DETAILS
                </Title>
              </Center>
              <Group gap={10} mt={8}>
                {transactionDetails.vnp_TxnRef && (
                  <Badge color="blue" size="sm" radius="md" variant="light">
                    Order #{transactionDetails.vnp_TxnRef}
                  </Badge>
                )}
                <Badge
                  color="gray"
                  leftSection={<IconShieldCheck size={15} />}
                  size="sm"
                  variant="light"
                  radius="md"
                >
                  Secured by VNPay
                </Badge>
              </Group>
            </Box>
            <CopyButton value={transactionDetails.vnp_TransactionNo ?? ""}>
              {({ copied, copy }) => (
                <Button
                  variant="subtle"
                  color={copied ? "green" : "blue"}
                  leftSection={<IconCopy size={17} />}
                  size="xs"
                  onClick={copy}
                  style={{ minWidth: 110 }}
                  disabled={!transactionDetails.vnp_TransactionNo}
                >
                  {copied ? "Copied!" : "Copy ID"}
                </Button>
              )}
            </CopyButton>
          </Group>

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
                  {transactionDetails.vnp_Amount
                    ? formatVnPayCurrency(transactionDetails.vnp_Amount)
                    : "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Bank</Table.Th>
                <Table.Td>{transactionDetails.vnp_BankCode ?? "-"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Card Type</Table.Th>
                <Table.Td>{transactionDetails.vnp_CardType ?? "-"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Payment Date</Table.Th>
                <Table.Td>
                  {transactionDetails.vnp_PayDate
                    ? formatDate(transactionDetails.vnp_PayDate)
                    : "-"}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Transaction No</Table.Th>
                <Table.Td>
                  {transactionDetails.vnp_TransactionNo ?? "-"}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Divider />
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
              {transactionResponse?.order.orderItems.map((item, index) => (
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
              Transaction ID:{" "}
              <strong>{transactionDetails.vnp_TransactionNo ?? "N/A"}</strong>
            </Text>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
