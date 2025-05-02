import { Container, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeader } from "../../components/Header";
import AdminNavbar from "../../components/AdminNavbar";

function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here (clear tokens, user data, etc.)
    // Then redirect to login page
    navigate("/login");
  };
  return (
    <div>
      <AdminHeader />
      <main>
        <Container size="xl">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
              <AdminNavbar />
            </Grid.Col>

            <Grid.Col span={{ base: 10, sm: 11, md: 9 }}>
              <Outlet />
            </Grid.Col>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default AdminLayout;
