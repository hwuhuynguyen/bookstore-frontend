import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user } = useAuthStore();
  
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestRoute;
