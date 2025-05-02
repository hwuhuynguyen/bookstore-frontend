import { Navigate, RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import RequireAuth from "../components/RequiredAuth";
import AdminBookPage from "../pages/AdminBookPage";
import AdminCategoryPage from "../pages/AdminCategoryPage";
import AdminOrderPage from "../pages/AdminOrderPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminAuthorPage from "../pages/AdminAuthorPage";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
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
    ],
  },
];