import {
  Badge,
  Button,
  Group,
  Indicator,
  Menu,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../stores/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import {
  IconBell,
  IconFileBarcode,
  IconFingerprint,
  IconHeart,
  IconLogin,
  IconLogout,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconStar,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import classes from "./DefaultHeader.module.css";
import AppLogo from "../AppLogo";
import NotifyUtils from "../../utils/NotifyUtils";
import useClientSearchBook from "../../stores/ClientSearchBookStore";
import useClientSiteStore from "../../stores/ClientSiteStore";
import {
  EventInitiationResponse,
  NotificationResponse,
} from "../../models/Notification";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";

function DefaultHeader() {
  useNotificationEvents();
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

  const { ref: refHeaderStack } = useElementSize();

  const { user, resetAuthState } = useAuthStore();
  const { updateActiveSearch } = useClientSearchBook();
  const currentTotalCartItems = useAuthStore(
    (state) => state.currentTotalCartItems
  );

  // Search state & function
  const navigate = useNavigate();
  const [search, setSearch] = useState("");


  const { newNotifications } = useClientSiteStore();

  const [disabledNotificationIndicator, setDisabledNotificationIndicator] =
    useState(true);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setDisabledNotificationIndicator(false);
    }
  }, [newNotifications]);

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search.trim() !== "") {
      updateActiveSearch(search.trim());
      navigate("/books");
    }
  };

  const handleSignoutMenu = () => {
    if (user) {
      resetAuthState();
      NotifyUtils.simpleSuccess("Logout successfully!");
    }
  };

  const handleNotificationButton = () => {
    if (user) {
      setDisabledNotificationIndicator(true);
      navigate("/user/notification");
    } else {
      NotifyUtils.simple("Please log in to continue with this action.");
    }
  };
  return (
    <Stack
      gap={0}
      ref={refHeaderStack}
      style={{
        maxWidth: "1320px",
        margin: "auto",
        marginBottom: "24px",
        position: "sticky",
        top: 0,
        zIndex: 3,
        backgroundColor: "white",
      }}
    >
      <Group gap="apart" py={theme.spacing.md} justify="space-between" mx={16}>
        <AppLogo />
        <TextInput
          placeholder="What are you looking for..."
          variant="filled"
          size="md"
          radius="md"
          leftSection={<IconSearch size={16} />}
          style={{ width: 500 }}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          onKeyDown={handleSearchInput}
        />
        <Group gap="xs" style={{ flexDirection: "row" }}>
          {user && (
            <>
              <Tooltip label="My cart" position="bottom">
                <UnstyledButton component={Link} to="/cart">
                  <Group
                    px={theme.spacing.sm}
                    py={theme.spacing.xs}
                    className={classes.iconGroup}
                  >
                    <IconShoppingCart strokeWidth={1} />
                    <Text fw={500} size="sm">
                      {currentTotalCartItems || 0}
                    </Text>
                  </Group>
                </UnstyledButton>
              </Tooltip>

              <Tooltip label="My order" position="bottom">
                <UnstyledButton component={Link} to="/order">
                  <Group
                    gap="xs"
                    px={theme.spacing.sm}
                    py={theme.spacing.xs}
                    className={classes.iconGroup}
                  >
                    <IconFileBarcode strokeWidth={1} />
                  </Group>
                </UnstyledButton>
              </Tooltip>
            </>
          )}

          <UnstyledButton onClick={handleNotificationButton}>
            <Indicator
              size={14}
              color="pink"
              withBorder
              disabled={disabledNotificationIndicator}
            >
              <Group
                gap="xs"
                px={theme.spacing.sm}
                py={theme.spacing.xs}
                className={classes.iconGroup}
              >
                <IconBell strokeWidth={1} />
              </Group>
            </Indicator>
          </UnstyledButton>

          <Menu position="bottom-end" trigger="click">
            <Menu.Target>
              <UnstyledButton>
                <Group
                  gap="xs"
                  px={theme.spacing.sm}
                  py={theme.spacing.xs}
                  className={classes.iconGroup}
                  style={{
                    color: user
                      ? theme.colors.blue[
                          colorTheme.colorScheme === "dark" ? 4 : 7
                        ]
                      : "inherit",
                  }}
                >
                  <IconUserCircle strokeWidth={1} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            {user && (
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  component={Link}
                  to="/user"
                  w={200}
                >
                  My account
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={14} />}
                  component={Link}
                  to="/user/setting"
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconStar size={14} />}
                  component={Link}
                  to="/user/review"
                >
                  Review
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconHeart size={14} />}
                  component={Link}
                  to="/user/wishlist"
                >
                  Favourite
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMessageCircle size={14} />}
                  component={Link}
                  to="/user/chat"
                >
                  Chat with admin
                </Menu.Item>
                <Menu.Item
                  color="pink"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleSignoutMenu}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            )}
            {!user && (
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconLogin size={14} />}
                  component={Link}
                  to="/login"
                  w={200}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconFingerprint size={14} />}
                  component={Link}
                  to="/register"
                  w={200}
                >
                  Register
                </Menu.Item>
              </Menu.Dropdown>
            )}
          </Menu>
        </Group>
      </Group>
      <Group gap="apart" mb="md" justify="space-between" mx={16}>
        <Group gap={2}>
          <Link to="/books">
            <Button variant="subtle" radius="md">
              Explore Our Library - What Will You Read Next?
            </Button>
          </Link>
        </Group>
        <Group gap="xs">
          <Badge color="pink" size="xs" variant="filled">
            Hot
          </Badge>
          <Text size="sm" color="dimmed">
            Free shipping for all orders
          </Text>
        </Group>
      </Group>
    </Stack>
  );
}

export default DefaultHeader;

function useNotificationEvents() {
  const { user } = useAuthStore();
  const { pushNewNotification } = useClientSiteStore();
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const [eventSourceUuid, setEventSourceUuid] = useState<string | null>(null);

  // Query to initialize notification events
  const { data: initResponse, isSuccess, isError } = useQuery<EventInitiationResponse, ErrorMessage>({
    queryKey: ["client-api", "notifications/init-events", "initNotificationEvents"],
    queryFn: () => FetchUtils.getWithToken(ResourceURL.CLIENT_NOTIFICATION_INIT_EVENTS),
    enabled: !!user,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Set up EventSource when we get the UUID
  useEffect(() => {
    if (isSuccess && initResponse?.eventSourceUuid && user) {
      setEventSourceUuid(initResponse.eventSourceUuid);
    }
  }, [isSuccess, initResponse, user]);

  // Create EventSource connection
  useEffect(() => {
    if (!eventSourceUuid || !user) {
      return;
    }

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    console.log("Setting up notification event listener...");
    
    const eventSource = new EventSource(
      `${ResourceURL.CLIENT_NOTIFICATION_EVENTS}?eventSourceUuid=${eventSourceUuid}`
    );

    eventSource.onopen = (event) => {
      console.log("EventSource connection opened:", event);
    };

    eventSource.onmessage = (event) => {
      try {
        console.log("Received notification:", event.data);
        const notificationResponse = JSON.parse(event.data) as NotificationResponse;
        pushNewNotification(notificationResponse);
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    };

    eventSource.onerror = (event) => {
      console.error("EventSource error:", event);
      
      // Check if the connection is closed
      if (eventSource.readyState === EventSource.CLOSED) {
        console.log("EventSource connection closed");
      } else if (eventSource.readyState === EventSource.CONNECTING) {
        console.log("EventSource reconnecting...");
      }
    };

    eventSourceRef.current = eventSource;

    // Cleanup function
    return () => {
      console.log("Cleaning up EventSource connection");
      eventSource.close();
    };
  }, [eventSourceUuid, user, pushNewNotification]);

  // Handle initialization errors
  useEffect(() => {
    if (isError) {
      console.error("Failed to initialize notification events.");
      NotifyUtils.simpleFailed(
        "Failed to initialize notification events. Please try again later."
      );
    }
  }, [isError]);

  // Cleanup on unmount or user logout
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        console.log("Component unmounting, closing EventSource");
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Close connection when user logs out
  useEffect(() => {
    if (!user && eventSourceRef.current) {
      console.log("User logged out, closing EventSource");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setEventSourceUuid(null);
    }
  }, [user]);
}