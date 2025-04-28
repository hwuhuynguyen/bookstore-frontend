import {
  Anchor,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import useAuthStore from "../../stores/AuthStore";
import { Link } from "react-router-dom";
import { Icon12Hours, IconMailOpened } from "@tabler/icons-react";

function NotificationCard({ notification }: { notification: any }) {
  const theme = useMantineTheme();

  const { user } = useAuthStore();

  return (
    <Card px="md" py="sm" radius="md">
      <Group justify="space-between" style={{ flexWrap: "nowrap" }}>
        <Group style={{ flexWrap: "nowrap" }}>
          <ThemeIcon variant="filled" radius="xl" size="xl">
            <Icon12Hours />
          </ThemeIcon>
          <Stack gap={3.5}>
            <Group gap={7.5}>
              {notification.status === 1 && (
                <Box
                  style={{
                    width: 6.5,
                    height: 6.5,
                    borderRadius: "50%",
                  }}
                />
              )}
              <Text size="xs" color="dimmed">
                22/04/2025
              </Text>
            </Group>
            <Text size="sm">
              {notification.message ||
                "Random message Random message Random message Random message Random message Random message Random message "}
              {
                <Anchor
                  component={Link}
                  to={notification.anchor}
                  ml={5}
                  inherit
                >
                  View details
                </Anchor>
              }
            </Text>
          </Stack>
        </Group>
        {
          <Button variant={"outline"} color={"cyan"} radius={"md"}>
            <Tooltip label="Marked as read" offset={10}>
              <IconMailOpened size={20} />
            </Tooltip>
          </Button>
        }
      </Group>
    </Card>
  );
}

export default NotificationCard;
