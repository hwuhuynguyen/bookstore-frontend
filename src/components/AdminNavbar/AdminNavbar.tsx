import { Button, Stack } from "@mantine/core";
import {
  Icon,
  IconBook2,
  IconCategory,
  IconFileBarcode,
  IconHome,
  IconMessageCircle,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();

  const navButton = (
    name: string,
    path: string,
    Icon: Icon,
    childPaths?: string[]
  ) => (
    <Button
      component={Link}
      to={path}
      size="md"
      radius="md"
      leftSection={<Icon size={18} strokeWidth={1.5} />}
      variant={
        location.pathname === path ||
        childPaths?.some((path) => location.pathname.startsWith(path))
          ? "light"
          : "subtle"
      }
      styles={{
        root: { width: "100%", padding: "0 12px", fontSize: 14 },
        inner: { justifyContent: "start" },
      }}
      className="w-full px-3 text-sm justify-start gap-2"
      color="cyan"
    >
      <span className="hidden lg:inline">{name}</span>
    </Button>
  );

  return (
    <Stack gap={5}>
      {navButton("Dashboard", "/admin/dashboard", IconHome)}
      {navButton("Category", "/admin/categories", IconCategory, [
        "/user/setting/personal",
        "/user/setting/phone",
        "/user/setting/email",
        "/user/setting/password",
      ])}
      {navButton("Book", "/admin/books", IconBook2)}
      {navButton("Author", "/admin/authors", IconUser)}
      {navButton("Order", "/admin/orders", IconFileBarcode, [
        "/order/detail",
      ])}
      {navButton("User", "/admin/users", IconUsersGroup)}
      {navButton("Consultation Requests", "/admin/dashboard", IconMessageCircle)}
    </Stack>
  );
}

export default AdminNavbar;
