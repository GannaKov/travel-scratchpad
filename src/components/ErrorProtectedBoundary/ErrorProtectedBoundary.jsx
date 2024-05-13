/* eslint-disable react/prop-types */
import {
  Navigate,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";

const ErrorProtectedBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <Navigate to="/" />;
    }
    if (error.status === 403) {
      return <Navigate to="/" />;
    }
    if (error.status === 413) {
      return alert("Oooops! Images must be together no more than 4.5 MB");
    }
    if (error.status === 500) {
      return <NotFound text=" Oops! Looks like our API is down" />;
    }
    if (error.status === 404) {
      return <div>Not found trip</div>;
    }
  }

  return (
    <NotFound
      text=" Oops! The page you are looking for does not exist. It might have
            been moved or deleted."
    />
  );
  //<div>Something went wrong</div>;
};

export default ErrorProtectedBoundary;
