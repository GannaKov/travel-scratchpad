import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const currentAccessTokenCookies = cookies.get("jwt_authorization")
    ? cookies.get("jwt_authorization")
    : null;

  const [token, setToken_] = useState(currentAccessTokenCookies);
  const [user, setUser_] = useState({ user: {}, isAuthenticated: false });

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUser = (newUser) => {
    setUser_(newUser);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ user: decoded, isAuthenticated: true });
    } else {
      cookies.remove("jwt_authorization");
      cookies.remove("refresh_token");
      setUser({ user: {}, isAuthenticated: false });
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken, user, setUser }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
