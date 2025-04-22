import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

export const ProtectedRoutesWrapper = () => {
  const { accessToken } = useAuthStore();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ historyLocation: location }} />;
  }

  // If authenticated, render the child routes
  return <AdminLayout/>;
};
