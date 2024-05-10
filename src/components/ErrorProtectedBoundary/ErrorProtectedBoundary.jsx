import {
  Navigate,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

const ErrorProtectedBoundary = () => {
  const error = useRouteError();
  console.log("error", error);

  if (isRouteErrorResponse(error)) {
    // if (error.status === 404) {
    //   return [];
    // }

    if (error.status === 401) {
      console.log("in 401");

      return <Navigate to="/" />;
    }
    if (error.status === 403) {
      console.log("in 403");
      // return <div>You aren&apos;t authorized. Please Log in</div>;
      return <Navigate to="/" />; //?????
    }

    if (error.status === 500) {
      console.log("in 500");
      return <div>Looks like our API is down</div>;
    }
  }

  return <div>Something went wrong</div>;
};

export default ErrorProtectedBoundary;
