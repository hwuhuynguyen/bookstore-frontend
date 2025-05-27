import {
  Anchor,
  Box,
  Card,
  Group,
  MantineColor,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Link } from "react-router-dom";
import DateUtils from "../../utils/DateUtils";
import {
  NotificationRequest,
  NotificationResponse,
  NotificationType,
} from "../../models/Notification";
import {
  Icon,
  IconUser,
  IconPackage,
  IconCreditCard,
  IconGift,
  IconLockOpen,
  IconTruckDelivery,
  IconProgressCheck,
  IconProgressX,
  IconCreditCardRefund,
  IconFaceIdError,
} from "@tabler/icons-react";
import useAuthStore from "../../stores/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FetchUtils from "../../utils/FetchUtils";
import NotifyUtils from "../../utils/NotifyUtils";
import ResourceURL from "../../constants/ResourceURL";

function NotificationCard({
  notification,
}: {
  notification: NotificationResponse;
}) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const updateNotificationMutation = useMutation({
    mutationFn: (notification: NotificationRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.NOTIFICATION_BASE}/${notification.id}`,
        notification,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "authors"] });
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to update notification.");
    },
  });

  const handleMarkAsReadButton = () => {
    if (user) {
      const notificationRequest: NotificationRequest = {
        id: notification.id,
        userId: user.id,
        type: notification.type,
        message: notification.message,
        anchor: notification.anchor,
        isRead: true,
      };

      updateNotificationMutation.mutate(notificationRequest);
    }
  };
  const LeftIcon = notificationIconMap[notification.type].icon;
  const iconColor = notificationIconMap[notification.type].color;
  return (
    <Card
      px="md"
      py="sm"
      radius="md"
      style={{ backgroundColor: notification.read ? "white" : "whitesmoke" }}
    >
      <Group justify="space-between" style={{ flexWrap: "nowrap" }}>
        <Group style={{ flexWrap: "nowrap" }}>
          <ThemeIcon variant="filled" radius="xl" size="xl" color={iconColor}>
            <LeftIcon />
          </ThemeIcon>
          <Stack gap={3.5}>
            <Group gap={7.5}>
              {!notification.read && (
                <Box
                  style={{
                    width: 6.5,
                    height: 6.5,
                    borderRadius: "50%",
                    backgroundColor: "red"
                  }}
                />
              )}
              <Text size="xs" color="dimmed">
                {DateUtils.convertTimestampToUTC(notification.createdAt)}
              </Text>
            </Group>
            <Text size="sm">
              {notification.message}
              {notification.anchor && (
                <Anchor
                  component={Link}
                  to={notification.anchor}
                  ml={5}
                  inherit
                  onClick={handleMarkAsReadButton}
                >
                  View details
                </Anchor>
              )}
            </Text>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
}

export default NotificationCard;

interface NotificationFigure {
  icon: Icon;
  color: MantineColor;
}

const notificationIconMap: Record<NotificationType, NotificationFigure> = {
  [NotificationType.ORDER_PLACED]: {
    icon: IconPackage,
    color: 'teal',
  },
  [NotificationType.ORDER_DELIVERING]: {
    icon: IconTruckDelivery,
    color: 'indigo',
  },
  [NotificationType.ORDER_DELIVERED]: {
    icon: IconProgressCheck,
    color: 'green',
  },
  [NotificationType.ORDER_CANCELLED]: {
    icon: IconProgressX,
    color: 'red',
  },
  [NotificationType.PAYMENT_SUCCESS]: {
    icon: IconCreditCard,
    color: 'green',
  },
  [NotificationType.PAYMENT_FAILED]: {
    icon: IconCreditCard,
    color: 'red',
  },
  [NotificationType.PAYMENT_REFUNDED]: {
  icon: IconCreditCardRefund,
  color: 'yellow',
},
  [NotificationType.ACCOUNT_CREATED]: {
    icon: IconUser,
    color: 'blue',
  },
  [NotificationType.PASSWORD_RESET]: {
    icon: IconLockOpen,
    color: 'orange',
  },
  [NotificationType.PROMOTION_OFFER]: {
    icon: IconGift,
    color: 'pink',
  },
  [NotificationType.DEMOTION_OFFER]: {
    icon: IconFaceIdError,
    color: 'gray',
  },
};