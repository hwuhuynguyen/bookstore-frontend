import { Button, Stack } from "@mantine/core";
import {
  Icon,
  IconBell,
  IconFileBarcode,
  IconHeart,
  IconSettings,
  IconStar,
  IconUser,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

function UserNavbar() {
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
    >
      <span className="hidden lg:inline">{name}</span>
    </Button>
  );

  return (
    <Stack gap={5}>
      {navButton("Account", "/user", IconUser)}
      {navButton("Settings", "/user/setting", IconSettings, [
        "/user/setting/personal",
        "/user/setting/phone",
        "/user/setting/email",
        "/user/setting/password",
      ])}
      {navButton("Notifications", "/user/notification", IconBell)}
      {navButton("Order Management", "/order", IconFileBarcode, [
        "/order/detail",
      ])}
      {navButton("Reviews", "/user/review", IconStar)}
      {navButton("Wishlist", "/user/wishlist", IconHeart)}
      {/* {navButton("Consultation Requests", "/user/chat", IconMessageCircle)} */}
    </Stack>
  );
}

export default UserNavbar;
