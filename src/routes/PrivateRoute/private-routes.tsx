import { Navigate, Outlet } from "react-router-dom";
import PublicRouteAnimation from "../PublicRoute/public-route-animation";
import Navbar from "../../component/common/navbar";
import { getToken } from "../../utils/helper";

const PrivateRoutes = () => {
  const token = getToken();
  return token ? (
    <PublicRouteAnimation>
      <Navbar />
      <Outlet />
    </PublicRouteAnimation>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
