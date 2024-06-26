import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuthHook";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 10 * 1000);
  return <div>Logout Page</div>;
};

export default Logout;
