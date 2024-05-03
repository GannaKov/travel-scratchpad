/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/requests";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const currentAccessTokenCookies = cookies.get("jwt_authorization")
    ? cookies.get("jwt_authorization")
    : null;

  const [token, setToken_] = useState(currentAccessTokenCookies);

  const [user, setUser_] = useState({
    user: {},
    isAuthenticated: false,
  });

  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUser = (newUser) => {
    setUser_(newUser);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const decoded = jwtDecode(token);

      setUser({ user: decoded, isAuthenticated: true });
    } else {
      delete axios.defaults.headers.common["Authorization"];

      cookies.remove("jwt_authorization");
      setUser({
        user: {},

        isAuthenticated: false,
      });
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token, user]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
