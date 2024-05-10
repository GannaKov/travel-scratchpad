/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";

import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { logoutUser, refreshToken } from "../../../services/requests";
import useAuth from "../../../context/useAuthHook";
//------
import { ButtonsTemplate } from "../Buttons/Buttons";
import ModalTemplate from "../../AuthComponents/ModalTemplate";
import LogInForm from "../../AuthComponents/LogInForm";
import LogInModal from "../../AuthComponents/LogInModal";
import SignUpModal from "../../AuthComponents/SignUpModal";
//-----

//----------------------------
const Root = () => {
  const { setToken } = useAuth();
  const { user } = useAuth();

  const cookies = new Cookies();
  const navigate = useNavigate();
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    // // if localStorage
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      refreshToken()
        .then((res) => {
          if (res.status === 204) {
            console.log("204");
            setToken(null);

            navigate("/");
          } else {
            console.log("in effect1 access", res.accessToken);
            setToken(res.accessToken);
          }
        })
        .catch((err) => {
          console.log(err);
          setToken(null);
          navigate("/");
        });
    }
    //else {
    //   navigate("/");
    // }
  }, []);

  useEffect(() => {
    let refreshAccessTokenTimerId;
    console.log("in effect2");
    if (user.isAuthenticated) {
      const tokenExpirationTime = Date.now() + user.user.expiresAt;
      const refreshTime = tokenExpirationTime - Date.now() - 10 * 1000;

      console.log("refreshTime", refreshTime);

      refreshAccessTokenTimerId = setTimeout(() => {
        refreshToken()
          .then((res) => {
            if (res.status === 204) {
              console.log("204");
              setToken(null);

              navigate("/");
            } else {
              // console.log("in effect2", res.accessToken);
              setToken(res.accessToken);
              cookies.set("jwt_authorization", res.accessToken);
              //cookies.set("refresh_token", res.refreshToken);
            }
          })
          .catch((err) => {
            console.log(err);
            setToken(null);
            navigate("/");
          });
      }, refreshTime);
    }

    return () => {
      if (user.isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [user]);

  // ----LogIn Modal Open
  const handleLogInClickOpen = () => {
    setOpenLogIn(true);
  };
  //-----
  // --- SignUp modal Open  handleSignUpClickOpen
  const handleSignUpClickOpen = () => {
    setOpenSignUp(true);
  };
  //--------
  const handleLogout = () => {
    logoutUser();
    setToken(null);
    cookies.remove("jwt_authorization");
    localStorage.removeItem("refresh_token");

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
                  My Trips
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
                  Add
                </NavLink>
              </li>
            )}

            {!user.isAuthenticated ? (
              <div className={styles.authBtnWrp}>
                <ButtonsTemplate
                  // onClick={() => navigate("/login")}
                  onClick={handleLogInClickOpen}
                  color="deepOrange"
                  size="small"
                  variant="outlined"
                >
                  Log In
                </ButtonsTemplate>

                <ButtonsTemplate
                  // onClick={() => navigate("/register")}
                  onClick={handleSignUpClickOpen}
                  handleSignUpClickOpen
                  color="deepOrange"
                  size="small"
                  variant="outlined"
                >
                  Sign Up
                </ButtonsTemplate>
                <LogInModal
                  openLogIn={openLogIn}
                  setOpenLogIn={setOpenLogIn}
                  handleLogInClickOpen={handleLogInClickOpen}
                  setOpenSignUp={setOpenSignUp}
                />
                <SignUpModal
                  openSignUp={openSignUp}
                  setOpenSignUp={setOpenSignUp}
                  handleSignUpClickOpen={handleSignUpClickOpen}
                  setOpenLogIn={setOpenLogIn}
                />
              </div>
            ) : (
              <ButtonsTemplate
                onClick={handleLogout}
                color="pink"
                size="small"
                variant="contained"
              >
                Log Out
              </ButtonsTemplate>
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

      <Outlet />
    </div>
  );
};

export default Root;
