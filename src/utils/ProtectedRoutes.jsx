/* eslint-disable react/prop-types */

import { Navigate, useOutletContext, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const context = useOutletContext();

  if (!context.user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={context} />;
};

export default ProtectedRoutes;
