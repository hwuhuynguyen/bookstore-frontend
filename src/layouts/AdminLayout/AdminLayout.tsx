import { AppShell, Button, Text, Burger, Group } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here (clear tokens, user data, etc.)
    // Then redirect to login page
    navigate('/login');
  };
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between">
            <Text size="xl" fw={700}>Bookstore Admin Panel</Text>
            <Group>
              <Text>Admin User</Text>
            </Group>
          </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
            <Text size="lg" fw={700} mb="lg">Bookstore Admin</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button variant="subtle" component={Link} to="/admin/dashboard">Dashboard</Button>
              <Button variant="subtle" component={Link} to="/admin/books">Manage Books</Button>
              <Button variant="subtle" component={Link} to="/admin/categories">Categories</Button>
              <Button variant="subtle" component={Link} to="/admin/orders">Orders</Button>
              <Button variant="subtle" component={Link} to="/admin/users">Users</Button>
            </div>
            <Button fullWidth onClick={handleLogout} color="red">Logout</Button>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout;
