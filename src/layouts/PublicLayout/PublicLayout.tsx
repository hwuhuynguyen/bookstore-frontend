import { Outlet } from "react-router-dom";
import DefaultFooter from "../../components/Footer/DefaultFooter";
import DefaultHeader from "../../components/Header";

const PublicLayout = () => {
  return (
    <div>
      <DefaultHeader />
      <Outlet />
      <DefaultFooter />
    </div>
  );
};

export default PublicLayout;
