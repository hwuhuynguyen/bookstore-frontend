import { Container, Grid } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../components/Header";
import AdminNavbar from "../../components/AdminNavbar";
import useAdminAuthStore from "../../stores/AdminAuthStore";
import AdminLoginPage from "../../pages/AdminLoginPage";

function AdminLayout() {
  const { user } = useAdminAuthStore();

  if (!user) {
    return <AdminLoginPage />;
  }

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
