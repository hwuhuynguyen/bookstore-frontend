import { Button, Stack } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  Icon,
  IconBox,
  IconBuildingWarehouse,
  IconCategory,
  IconFileBarcode,
  IconFingerprint,
  IconHome,
  IconUser,
} from "@tabler/icons-react";

interface NavbarLink {
  link: string;
  label: string;
  icon: Icon;
}


const navbarLinks: NavbarLink[] = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: IconHome,
  },
  {
    link: "/admin/users",
    label: "Users",
    icon: IconFingerprint,
  },
  {
    link: "/admin/categories",
    label: "Category",
    icon: IconCategory,
  },
  {
    link: "/admin/authors",
    label: "Authors",
    icon: IconUser,
  },
  {
    link: "/admin/books",
    label: "Books",
    icon: IconBox
  },
  {
    link: "/admin/inventory",
    label: "Inventory",
    icon: IconBuildingWarehouse,
    
  },
  {
    link: "/admin/orders",
    label: "Orders",
    icon: IconFileBarcode,
  },
];

export default function AdminNavbar() {
  const location = useLocation();

  return (
    <>
      {navbarLinks.map((navbarLink) => {
        const isActive = location.pathname === navbarLink.link;
        const IconComponent = navbarLink.icon;

        return (
          <Stack key={navbarLink.label} gap={0}>
            <Button
              component={Link}
              to={navbarLink.link}
              size="md"
              leftSection={<IconComponent size={18} strokeWidth={1.5} />}
              variant={isActive ? "light" : "subtle"}
              styles={{
                root: { width: "100%", padding: "0 12px", fontSize: 14 },
                inner: { justifyContent: "start" },
              }}
              className="w-full px-3 text-sm justify-start gap-2"
              color="cyan"
            >
              <span className="hidden lg:inline">{navbarLink.label}</span>
            </Button>
          </Stack>
        );
      })}
    </>
  );
}
