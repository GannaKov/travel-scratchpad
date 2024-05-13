/* eslint-disable react/prop-types */
import {
  Navigate,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

const ErrorProtectedBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <Navigate to="/" />;
    }
    if (error.status === 403) {
      return <Navigate to="/" />;
    }

    if (error.status === 500) {
      return <div>Looks like our API is down</div>;
    }
    if (error.status === 404) {
      return <div>Not found trip</div>;
    }
  }

  return <div>Something went wrong</div>;
};

export default ErrorProtectedBoundary;
