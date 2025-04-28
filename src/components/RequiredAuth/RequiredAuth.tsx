// src/components/RequireAuth.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { accessToken, role } = useAuthStore();
  const location = useLocation();
  // Replace this with your actual authentication check
  
  if (!accessToken) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "ADMIN") {
    // Redirect to home page if authenticated but not admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
