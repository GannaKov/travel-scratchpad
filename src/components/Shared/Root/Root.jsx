/* eslint-disable react/prop-types */
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

import LogInModal from "../../AuthComponents/LogInModal";
import SignUpModal from "../../AuthComponents/SignUpModal";
import Logo from "../../../assets/images/logo2.jpeg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
//-----

//----------------------------
const Root = ({ openLogIn, setOpenLogIn, openSignUp, setOpenSignUp }) => {
  const { setToken } = useAuth();
  const { user } = useAuth();

  const cookies = new Cookies();
  const navigate = useNavigate();

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
            // console.log("in effect1 access", res.accessToken);
            setToken(res.accessToken);
          }
        })
        .catch((err) => {
          console.log(err);
          setToken(null);
          navigate("/");
        });
    }
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
        <img src={Logo} alt="Logo" className={styles.headerLogo} />

        <nav className={styles.headerNav}>
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
            <li className={styles.navItem}>
              <NavLink
                to="/chat-ai"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Chat Ai
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.authWrp}>
          {!user.isAuthenticated ? (
            <div className={styles.authBtnWrp}>
              <ButtonsTemplate
                onClick={handleLogInClickOpen}
                color="deepOrange"
                size="small"
                variant="outlined"
              >
                Log In
              </ButtonsTemplate>

              <ButtonsTemplate
                onClick={handleSignUpClickOpen}
                handleSignUpClickOpen
                color="deepOrange"
                size="small"
                variant="outlined"
              >
                Sign Up
              </ButtonsTemplate>
              {/* <LogInModal
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
              /> */}
            </div>
          ) : (
            <ButtonsTemplate
              onClick={handleLogout}
              color="pink"
              size="small"
              variant="outlined"
            >
              Log Out
            </ButtonsTemplate>
          )}
          {user.isAuthenticated && (
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
          )}
        </div>
      </header>
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
      <Outlet />
      <footer className={styles.footerWrp}>
        <div className={styles.footerSubscrSocWrp}>
          <ul className={styles.footerSocialList}>
            <li className={styles.footerSocialItem}>
              <a className={styles.footerSocialLink} href="#">
                <FacebookIcon />
              </a>
            </li>
            <li className={styles.footerSocialItem}>
              <a className={styles.footerSocialLink} href="#">
                <InstagramIcon />
              </a>
            </li>
            <li className={styles.footerSocialItemt}>
              <a className={styles.footerSocialLink} href="#">
                <PinterestIcon />
              </a>
            </li>
          </ul>
          <div className={styles.footerSubscribeWrp}>
            <h4 className={styles.footerSubscribeTitle}>SUBSCRIBE</h4>
            <form className={styles.footerSubscribeForm}>
              <label
                className={styles.footerSubscribeLabel}
                htmlFor="email-sbscr"
              >
                Enter your email&nbsp;&nbsp;&#8432;
              </label>
              <input
                className={styles.footerSubscribeInput}
                type="email"
                placeholder="email"
                required
                id="email-sbscr"
                name="email-sbscr"
              />

              <ButtonsTemplate color="white" size="small" variant="outlined">
                Subscribe
              </ButtonsTemplate>
            </form>
          </div>
        </div>

        <div>
          <p className={styles.footerText}> © 2024 Ganna Kovchyk</p>
        </div>
      </footer>
    </div>
  );
};

export default Root;
