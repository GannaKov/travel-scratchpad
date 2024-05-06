import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorProtectedBoundary = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn&apos;t exist!</div>;
    }

    if (error.status === 403) {
      return <div>You aren&apos;t authorized. Please Log in</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
};

export default ErrorProtectedBoundary;
