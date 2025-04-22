import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import LoginPage from "../pages/Login/Login";

export const publicRoutes = [
    {
        path: "/",
        element: <div>Home Page</div>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/login-1",
        element: <AdminLayout/>,
    }
];