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
import { useState } from "react";
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

function DefaultHeader() {
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

  //   useNotificationEvents();

  //   const { newNotifications } = useClientSiteStore();

  const [disabledNotificationIndicator, setDisabledNotificationIndicator] =
    useState(true);

  //   useEffect(() => {
  //     if (newNotifications.length > 0) {
  //       setDisabledNotificationIndicator(false);
  //     }
  //   }, [newNotifications.length]);

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search.trim() !== "") {
      updateActiveSearch(search.trim())
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
      //   NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
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
          {/* <Popover
              opened={openedCategoryMenu}
              onClose={() => setOpenedCategoryMenu(false)}
              target={(
                <Button onClick={() => setOpenedCategoryMenu((o) => !o)} leftSection={<IconList size={16}/>} radius="md">
                  Danh mục sản phẩm
                </Button>
              )}
              width={widthHeaderStack}
              position="bottom"
              placement="start"
              radius="md"
              shadow="md"
            >
              <CategoryMenu setOpenedCategoryMenu={setOpenedCategoryMenu}/>
            </Popover> */}
          <Link to="/books">
            <Button variant="subtle" radius="md">
              New arrivals
            </Button>
          </Link>
          <Button variant="subtle" color="green" radius="md">
            Trending
          </Button>
          <Button variant="subtle" color="pink" radius="md">
            Promotion
          </Button>
        </Group>
        <Group gap="xs">
          <Badge color="pink" size="xs" variant="filled">
            Hot
          </Badge>
          <Text size="sm" color="dimmed">
            Free shipping for orders over 1 million VND
          </Text>
        </Group>
      </Group>
    </Stack>
  );
}

export default DefaultHeader;
