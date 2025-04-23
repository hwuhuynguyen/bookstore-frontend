import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { protectedRoutes } from "./ProtectedRoutes";

const AppRoutes = () => {
    /**
     * Create a browser router instance with all application routes
     */
    const router = createBrowserRouter([
        ...publicRoutes,
        ...protectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;