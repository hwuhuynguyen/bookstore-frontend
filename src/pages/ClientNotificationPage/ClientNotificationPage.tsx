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
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import NotificationCard from "../../components/NotificationCard";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { NotificationResponse } from "../../models/Notification";
import ApplicationConstants from "../../constants/ApplicationConstants";
import useClientSiteStore from "../../stores/ClientSiteStore";
import { useQuery } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import { IconAlertTriangle, IconMoodAnnoyed } from "@tabler/icons-react";

function ClientNotificationPage() {
  const theme = useMantineTheme();
  const [activePage, setActivePage] = useState(1);
  const {
    notificationResponses,
    isLoadingNotificationResponses,
    isErrorNotificationResponses,
  } = useGetAllNotificationsApi(activePage);
  const notifications =
    notificationResponses as ListResponse<NotificationResponse>;
  let notificationContentFragment;

  if (isLoadingNotificationResponses) {
    notificationContentFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (notifications && notifications.totalElements === 0) {
    notificationContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[5] }}
      >
        <IconMoodAnnoyed size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No notification yet
        </Text>
      </Stack>
    );
  }

  if (isErrorNotificationResponses) {
    notificationContentFragment = (
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

  if (notifications && notifications.totalElements > 0) {
    notificationContentFragment = (
      <>
        <Stack gap="xs">
          {notifications.data.map((notification: any) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </Stack>

        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={notifications.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text component="span">
            Page {activePage} / {notifications.totalPages}
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
              <Stack>
                <Title order={2}>Notifications</Title>

                {notificationContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientNotificationPage;

function useGetAllNotificationsApi(activePage: number) {
  const requestParams = {
    page: activePage - 1,
    size: ApplicationConstants.DEFAULT_CLIENT_NOTIFICATION_PAGE_SIZE,
    sort: "createdAt,desc",
  };

  const { newNotifications } = useClientSiteStore();

  const {
    data: notificationResponses,
    isLoading: isLoadingNotificationResponses,
    isError: isErrorNotificationResponses,
  } = useQuery<ListResponse<NotificationResponse>, ErrorMessage>({
    queryKey: [
      "client-api",
      "notifications",
      "getAllNotifications",
      requestParams,
      newNotifications.length,
    ],
    queryFn: () =>
      FetchUtils.getWithToken(ResourceURL.NOTIFICATION_BASE, requestParams),
    refetchOnWindowFocus: false,
  });

  return {
    notificationResponses,
    isLoadingNotificationResponses,
    isErrorNotificationResponses,
  };
}
