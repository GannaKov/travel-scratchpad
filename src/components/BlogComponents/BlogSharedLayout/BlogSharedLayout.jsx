import { NavLink, Outlet } from "react-router-dom";

import styles from "./BlogSharedLayout.module.css";

const BlogSharedLayout = () => {
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
      </header>

      <Outlet />
    </div>
  );
};

export default BlogSharedLayout;
