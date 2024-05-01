import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./BlogSharedLayout.module.css";

const BlogSharedLayout = () => {
  const navigate = useNavigate();
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
                BlogHome
              </NavLink>
            </li>
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
          </ul>
        </nav>
        <Button
          // color="red[500]"
          variant="contained"
          type="submit"
          sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
          size="small"
          onClick={() => navigate("/logout")}
        >
          Log Out
        </Button>
      </header>

      <Outlet />
    </div>
  );
};

export default BlogSharedLayout;
