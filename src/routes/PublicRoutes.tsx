import { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import ClientSearchBookPage from "../pages/ClientSearchBookPage";
import ClientBookDetailPage from "../pages/ClientBookDetailPage";
import ClientShoppingCart from "../pages/ClientShoppingCart";
import ClientSettingPage from "../pages/ClientSettingPage";
import ClientUserPage from "../pages/ClientUserPage";
import ErrorPage from "../pages/ErrorPage";
import ClientOrderPage from "../pages/ClientOrderPage";
import ClientOrderDetailPage from "../pages/ClientOrderDetailPage";

export const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "books",
          element: <ClientSearchBookPage />,
        },
        {
          path: "books/:id",
          element: <ClientBookDetailPage />,
        },
        // {
        //   path: "categories",
        //   element: <CategoriesPage />,
        // },
        {
          path: "login",
          element: <LoginPage />,
        },

        // --- FOR AUTHENTICATED USERS ---
        {
          path: "cart",
          element: <ClientShoppingCart />,
        },
        {
          path: "order",
          element: <ClientOrderPage />,
        },
        {
          path: "order/detail/:orderId",
          element: <ClientOrderDetailPage />,
        },
        {
          path: "user",
          element: <ClientUserPage />,
        },
        {
          path: "user/setting",
          element: <ClientSettingPage />,
        },
        // {
        //   path: "register",
        //   element: <RegisterPage />,
        // },
        // {
        //   path: "profile",
        //   element: <ProfilePage />,
        // },
        // {
        //   path: "orders",
        //   element: <OrdersPage />,
        // },
        {
          path: "*",
          element: <ErrorPage />,
        }
      ],
    },
  ];