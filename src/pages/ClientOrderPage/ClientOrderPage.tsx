import React, { useState } from "react";
import {
  Card,
  Container,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMoodAnnoyed } from "@tabler/icons-react";
import useAuthStore from "../../stores/AuthStore";
import UserNavbar from "../../components/UserNavbar";
import OrderCard from "../../components/OrderCard";

function ClientOrderPage() {
  const theme = useMantineTheme();
  const { user } = useAuthStore();
  // const [orders, setOrders] = useState([]);

  const orders = [{
    orderId: 1,
    createdAt: '2025-04-22T10:00:00Z',
    orderCode: 'ORD-20250422-0001',
    orderStatus: 2, 
    total: 150.75,
    orderItems: [
      {
        id: 101,
        title: 'Wireless Mouse',
        quantity: 2,
        price: 25.00,
      },
      {
        id: 102,
        title: 'Mechanical Keyboard',
        quantity: 1,
        price: 100.75,
      },
    ],
    orderPaymentStatus: 1,
  }];
  
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState<number>(0);

  let ordersContentFragment;

  if (isLoading) {
    ordersContentFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (orders && orders.length === 0) {
    ordersContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[5] }}
      >
        <IconMoodAnnoyed size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No orders yet
        </Text>
      </Stack>
    );
  }

  if (orders && orders.length > 0) {
    ordersContentFragment = (
      <>
        <Stack gap="xs">
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </Stack>

        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            total={100}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span">Page {activePage}</Text>
            <span>/{100}</span>
          </Text>
        </Group>
      </>
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
              <Stack gap="md">
                <Title order={2}>Orders</Title>

                {ordersContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientOrderPage;
