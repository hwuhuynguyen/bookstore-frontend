import { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import ClientSearchBookPage from "../pages/ClientSearchBookPage";
import ClientBookDetailPage from "../pages/ClientBookDetailPage";
import ClientShoppingCart from "../pages/ClientShoppingCart";

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
        {
          path: "cart",
          element: <ClientShoppingCart />,
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
        // {
        //   path: "*",
        //   element: <NotFoundPage />,
        // }
      ],
    },
  ];