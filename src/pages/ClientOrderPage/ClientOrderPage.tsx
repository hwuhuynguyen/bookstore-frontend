import React, { useState } from "react";
import {
  Card,
  Center,
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
import { IconAlertTriangle, IconMoodAnnoyed } from "@tabler/icons-react";
import UserNavbar from "../../components/UserNavbar";
import OrderCard from "../../components/OrderCard";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { OrderResponse } from "../../models/Order";
import ResourceURL from "../../constants/ResourceURL";

function ClientOrderPage() {
  const theme = useMantineTheme();
  const [activePage, setActivePage] = useState<number>(1);

  const requestParams = {
    size: 5,
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
        ResourceURL.CLIENT_GET_MY_ORDERS,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const orders = orderResponses as ListResponse<OrderResponse>;

  let ordersContentFragment;

  if (isLoadingOrderResponses) {
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

  if (orders && orders.totalElements === 0) {
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

  if (orders && orders.totalElements > 0) {
    ordersContentFragment = (
      <>
        <Stack gap="xs">
          {orders.data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Stack>
        <Group justify="center" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={orders.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
        </Group>
        <Center>
          <Text component="span">
            Page {activePage} / {orders.totalPages}
          </Text>
        </Center>
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
