import { Navigate, RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminBookPage from "../pages/AdminBookPage";
import AdminCategoryPage from "../pages/AdminCategoryPage";
import AdminOrderPage from "../pages/AdminOrderPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminAuthorPage from "../pages/AdminAuthorPage";
import ErrorNotFoundPage from "../pages/ErrorNotFoundPage";
import AdminInventoryPage from "../pages/AdminInventoryPage";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "authors",
        element: <AdminAuthorPage />,
      },
      {
        path: "books",
        element: <AdminBookPage />,
      },
      {
        path: "categories",
        element: <AdminCategoryPage />,
      },
      {
        path: "orders",
        element: <AdminOrderPage />,
      },
      {
        path: "users",
        element: <AdminUserPage />,
      },
      {
        path: "inventory",
        element: <AdminInventoryPage />,
      },
      {
        path: "*",
        element: <ErrorNotFoundPage />,
      },
    ],
  },
];
