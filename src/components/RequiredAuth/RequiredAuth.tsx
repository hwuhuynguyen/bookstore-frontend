// src/components/RequireAuth.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { accessToken } = useAuthStore();
  const location = useLocation();
  
  if (!accessToken) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ historyLocation: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
