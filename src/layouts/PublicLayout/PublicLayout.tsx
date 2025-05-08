import { Outlet } from "react-router-dom";
import { DefaultHeader } from "../../components/Header";
import DefaultFooter from "../../components/Footer/DefaultFooter";

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
