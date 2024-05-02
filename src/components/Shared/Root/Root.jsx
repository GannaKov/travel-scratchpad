import { useState } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";
import { useAuth } from "../../../context/AuthContext";

import Button from "@mui/material/Button";

const Root = () => {
  const { token, setToken } = useAuth();
  console.log("token", token);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //console.log("user", user);

  const loginUser = () => {
    setUser({ id: 1, username: "Anna" });
    /////just for test!!!!!
    setToken("this is a test token");
    navigate("/", { replace: true });
  };
  // const logoutUser = () => {
  //   setUser(null);
  // };
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
            {token && (
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
            {token && (
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
            {!token ? (
              <div>
                <Button
                  // color="red[500]"
                  variant="contained"
                  type="submit"
                  sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
                  size="small"
                  // onClick={() => navigate("/login")}
                  onClick={loginUser}
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
                // onClick={() => navigate("/logout")}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
            {token && (
              <span>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.headerNavLink}`
                      : `${styles.headerNavLink}`
                  }
                >
                  {user.username}
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
