import {
  Group,
  Menu,
  Stack,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconFingerprint,
  IconLogin,
  IconLogout,
  IconSettings,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import classes from "./DefaultHeader.module.css";
import AppLogo from "../AppLogo";
import useAdminAuthStore from "../../stores/AdminAuthStore";
import NotifyUtils from "../../utils/NotifyUtils";

function AdminHeader() {
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

  const { ref: refHeaderStack } = useElementSize();

  const { user, resetAuthState } = useAdminAuthStore();

  const handleSignoutMenu = () => {
    if (user) {
      resetAuthState();
      NotifyUtils.simpleSuccess("Logout successfully!");
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
        <Group gap="xs" style={{ flexDirection: "row" }}>
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
    </Stack>
  );
}

export default AdminHeader;
