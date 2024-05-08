import {
  Navigate,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorProtectedBoundary = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log("error", error);

  if (isRouteErrorResponse(error)) {
    // if (error.status === 404) {
    //   return [];
    // }

    if (error.status === 400) {
      console.log("in 400");

      return <Navigate to="/login" replace />;
    }
    if (error.status === 403) {
      console.log("in 403");
      // return <div>You aren&apos;t authorized. Please Log in</div>;
      return <Navigate to="/login" replace />;
    }
    console.log("in ERROR 1");
    if (error.status === 503) {
      console.log("in 500");
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
};

export default ErrorProtectedBoundary;
