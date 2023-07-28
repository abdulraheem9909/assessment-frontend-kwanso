import { Navigate, Outlet } from "react-router-dom";
import PublicRouteAnimation from "./public-route-animation";
import { getToken } from "../../utils/helper";

const PublicRoutes = () => {
  const token = getToken();
  return !token ? (
    <PublicRouteAnimation>
      <Outlet />
    </PublicRouteAnimation>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoutes;
