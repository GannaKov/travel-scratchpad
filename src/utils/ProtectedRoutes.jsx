/* eslint-disable react/prop-types */

// import { Navigate, useOutletContext, Outlet } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const context = useOutletContext();

//   if (!context.user) {
//     return <Navigate to="/" replace />;
//   }
//   return <Outlet context={context} />;
// };

// export default ProtectedRoutes;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuthHook";

const ProtectedRoutes = () => {
  const { token } = useAuth();
  console.log("t", token);

  // Check if the user is authenticated
  if (!token) {
    console.log("No token found, redirecting to login page");
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
export default ProtectedRoutes;
