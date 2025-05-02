import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {DefaultHeader} from "../../components/Header";
import DefaultFooter from "../../components/Footer/DefaultFooter";

const PublicLayout = () => {
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);
  // Mock auth state - in real app, you'd use context or state management
  const isLoggedIn = false; // Replace with actual auth check

  return (
    <div>
      <DefaultHeader />
      <Outlet />
      <DefaultFooter/>
    </div>
  );
};

export default PublicLayout;
