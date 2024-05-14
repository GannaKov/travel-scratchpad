/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import HomeIcon from "@mui/icons-material/Home";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import ChatIcon from "@mui/icons-material/Chat";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import styles from "./MobileMenu.module.css";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ toggleDrawer, openMobileMenu, user }) => {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <nav className={styles.headerNav}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
                to="/"
              >
                Home
              </NavLink>
            </ListItemButton>
          </ListItem>

          {user.isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeOfTravelIcon />
                </ListItemIcon>

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
              </ListItemButton>
            </ListItem>
          )}
          {user.isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CropOriginalIcon />
                </ListItemIcon>

                <NavLink
                  to="/add-form"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active} ${styles.headerNavLink}`
                      : `${styles.headerNavLink}`
                  }
                >
                  Add Trip
                </NavLink>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>

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
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={openMobileMenu["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
};

export default MobileMenu;
