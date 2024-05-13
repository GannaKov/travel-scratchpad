/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
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

      cookies.set("jwt_authorization", token, {
        maxAge: 15 * 60,
      });
    } else {
      //now in logout
      //cookies.remove("jwt_authorization"); /////?????
      // if localStorage change back
      //cookies.remove("refresh_token");
      //localStorage.removeItem("refresh_token");
      //---------
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
