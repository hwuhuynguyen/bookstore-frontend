import useAdminAuthStore from "../../stores/AdminAuthStore";
import AdminLoginPage from "../../pages/AdminLoginPage";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Group,
  Menu,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import AppLogo from "../../components/AppLogo";
import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import {
  IconFingerprint,
  IconLogin,
  IconLogout,
  IconSettings,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import NotifyUtils from "../../utils/NotifyUtils";

function AdminLayout() {
  const { user, resetAuthState } = useAdminAuthStore();
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

  const [opened, { toggle }] = useDisclosure();
  const handleSignoutMenu = () => {
    if (user) {
      resetAuthState();
      NotifyUtils.simpleSuccess("Logout successfully!");
    }
  };
  if (!user) {
    return <AdminLoginPage />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <AppLogo />
          <Group gap="xs" style={{ flexDirection: "row" }}>
            <Menu position="bottom-end" trigger="click">
              <Menu.Target>
                <UnstyledButton>
                  <Group
                    gap="xs"
                    px={theme.spacing.sm}
                    py={theme.spacing.xs}
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
                  <Menu.Item leftSection={<IconUser size={14} />} w={200}>
                    My account
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings size={14} />}>
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
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AdminNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
