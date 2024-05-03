/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";
import { useAuth } from "../../../context/AuthContext";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { refreshToken } from "../../../services/requests";

const Root = () => {
  const { token, setToken } = useAuth();
  const { user, setUser } = useAuth();

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken()
      .then((res) => {
        console.log("in effect1", res);
        setToken(res.accessToken);
        cookies.set("jwt_authorization", res.accessToken);
        //cookies.set("refresh_token", res.refreshToken);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    let refreshAccessTokenTimerId;

    if (user.isAuthenticated) {
      const tokenExpirationTime = Date.now() + user.user.expiresAt;
      const refreshTime = tokenExpirationTime - Date.now() - 10 * 1000;
      console.log("exp", user.user.expiresAt);
      console.log("tokenExpirationTime", tokenExpirationTime);
      console.log("refreshTime", refreshTime);

      refreshAccessTokenTimerId = setTimeout(() => {
        refreshToken()
          .then((res) => {
            console.log("in effect2", res);
            setToken(res.accessToken);
            cookies.set("jwt_authorization", res.accessToken);
            //cookies.set("refresh_token", res.refreshToken);
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });
      }, refreshTime);
    }

    return () => {
      if (user.isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [user]);

  const handleLogout = () => {
    setToken(null);

    navigate("/", { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <header className={styles.headerWrp}>
        <nav className={styles.headerNav}>
          <p>Here logo</p>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Home
              </NavLink>
            </li>
            {user.isAuthenticated && (
              <li className={styles.navItem}>
                <NavLink
                  end
                  to="/blog-main"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.headerNavLink}`
                      : `${styles.headerNavLink}`
                  }
                >
                  BlogMain
                </NavLink>
              </li>
            )}
            {user.isAuthenticated && (
              <li className={styles.navItem}>
                <NavLink
                  to="/add-form"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.headerNavLink}`
                      : `${styles.headerNavLink}`
                  }
                >
                  BlogAdd
                </NavLink>
              </li>
            )}
            {!user.isAuthenticated ? (
              <div>
                <Button
                  // color="red[500]"
                  variant="contained"
                  type="submit"
                  sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
                  size="small"
                  onClick={() => navigate("/login")}
                  // onClick={loginUser}
                >
                  Log In
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: "#e89701" }}
                  size="small"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <Button
                // color="red[500]"
                variant="contained"
                type="submit"
                sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
                size="small"
                //onClick={() => navigate("/logout")}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
            {user.isAuthenticated && (
              <span>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.headerNavLink}`
                      : `${styles.headerNavLink}`
                  }
                >
                  {user.isAuthenticated && user.user.username}
                </NavLink>
              </span>
            )}
          </ul>
        </nav>
      </header>

      {/* <Outlet context={{ user, setUser, loginUser, logoutUser }} /> */}
      <Outlet />
    </div>
  );
};

export default Root;
