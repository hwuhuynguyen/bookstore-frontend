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
import ClientWishlistPage from "../pages/ClientWishlistPage";
import ClientNotificationPage from "../pages/ClientNotificationPage";
import ClientReviewPage from "../pages/ClientReviewPage";
import RegisterPage from "../pages/Register";
import RequireAuth from "../components/RequiredAuth";
import GuestRoute from "../components/GuestOnly";

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
        element: (
          <GuestRoute>
            <LoginPage />,
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />,
          </GuestRoute>
        ),
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
        element: (
          <RequireAuth>
            <ClientUserPage />,
          </RequireAuth>
        ),
      },
      {
        path: "user/setting",
        element: <ClientSettingPage />,
      },
      {
        path: "user/notification",
        element: <ClientNotificationPage />,
      },
      {
        path: "user/review",
        element: <ClientReviewPage />,
      },
      {
        path: "user/wishlist",
        element: <ClientWishlistPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
