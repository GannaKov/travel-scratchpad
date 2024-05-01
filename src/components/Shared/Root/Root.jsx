import React, { useState } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";

import Button from "@mui/material/Button";

const Root = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //console.log("user", user);

  const loginUser = () => {
    setUser({ id: 1, username: "Anna" });
  };
  const logoutUser = () => {
    setUser(null);
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
            {user && (
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
            {user && (
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
            {!user ? (
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
                onClick={logoutUser}
              >
                Log Out
              </Button>
            )}
            {user && (
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

      <Outlet context={{ user, setUser, loginUser, logoutUser }} />
    </div>
  );
};

export default Root;
