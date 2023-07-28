import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PublicRoutes from "./PublicRoute/public-route";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import PrivateRoutes from "./PrivateRoute/private-routes";
import TasksPage from "../pages/tasksPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoutes />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/list-tasks" replace />} />
          <Route path="/list-tasks" element={<TasksPage />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
