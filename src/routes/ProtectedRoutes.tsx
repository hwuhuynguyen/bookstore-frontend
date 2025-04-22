import { ProtectedRoutesWrapper } from "./ProtectedRoutesWrapper";

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedRoutesWrapper />,
    children: [
      {
        path: "/admin",
        element: <>Admin page</>,
      },
    ],
  },
];
