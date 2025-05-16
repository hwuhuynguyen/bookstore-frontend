import { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import ClientSearchBookPage from "../pages/ClientSearchBookPage";
import ClientBookDetailPage from "../pages/ClientBookDetailPage";
import ClientShoppingCart from "../pages/ClientShoppingCart";
import ClientSettingPage from "../pages/ClientSettingPage";
import ClientUserPage from "../pages/ClientUserPage";
import ErrorPage from "../pages/ErrorNotFoundPage";
import ClientOrderPage from "../pages/ClientOrderPage";
import ClientOrderDetailPage from "../pages/ClientOrderDetailPage";
import ClientWishlistPage from "../pages/ClientWishlistPage";
import ClientNotificationPage from "../pages/ClientNotificationPage";
import ClientReviewPage from "../pages/ClientReviewPage";
import RegisterPage from "../pages/Register";
import RequireAuth from "../components/RequiredAuth";
import GuestRoute from "../components/GuestOnly";
import ClientPaymentStatusPage from "../pages/ClientPaymentStatusPage";
import ClientCODStatusPage from "../pages/ClientCODStatusPage";

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
        element: (
          <RequireAuth>
            <ClientShoppingCart />,
          </RequireAuth>
        ),
      },
      {
        path: "cart/payment",
        element: (
          <RequireAuth>
            <ClientPaymentStatusPage />
          </RequireAuth>
        ),
      },
      {
        path: "cart/payment/:orderId",
        element: (
          <RequireAuth>
            <ClientCODStatusPage />
          </RequireAuth>
        ),
      },
      {
        path: "order",
        element: (
          <RequireAuth>
            <ClientOrderPage />
          </RequireAuth>
        ),
      },
      {
        path: "order/detail/:orderId",
        element: (
          <RequireAuth>
            <ClientOrderDetailPage />
          </RequireAuth>
        ),
      },
      {
        path: "user",
        element: (
          <RequireAuth>
            <ClientUserPage />
          </RequireAuth>
        ),
      },
      {
        path: "user/setting",
        element: (
          <RequireAuth>
            <ClientSettingPage />
          </RequireAuth>
        ),
      },
      {
        path: "user/notification",
        element: (
          <RequireAuth>
            <ClientNotificationPage />
          </RequireAuth>
        ),
      },
      {
        path: "user/review",
        element: (
          <RequireAuth>
            <ClientReviewPage />
          </RequireAuth>
        ),
      },
      {
        path: "user/wishlist",
        element: (
          <RequireAuth>
            <ClientWishlistPage />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
