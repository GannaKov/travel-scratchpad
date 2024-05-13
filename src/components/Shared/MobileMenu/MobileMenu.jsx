/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import HomeIcon from "@mui/icons-material/Home";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import ChatIcon from "@mui/icons-material/Chat";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import styles from "./MobileMenu.module.css";
import { NavLink } from "react-router-dom";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

const MobileMenu = ({ toggleDrawer, openMobileMenu, user }) => {
  //   const [openMobileMenu, setOpenMobileMenu] = React.useState({
  //     right: false,
  //   });

  //   const toggleDrawer = (anchor, open) => (event) => {
  //     if (
  //       event.type === "keydown" &&
  //       (event.key === "Tab" || event.key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setOpenMobileMenu, { ...openMobileMenu, [anchor]: open };
  //   };

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
              {/* <ListItemText primary={text} /> */}
              <NavLink to="/">Home</NavLink>
            </ListItemButton>
          </ListItem>

          {user.isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeOfTravelIcon />
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
                <NavLink end to="/blog-main">
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
                {/* <ListItemText primary={text} /> */}
                <NavLink to="/add-form">Add Trip</NavLink>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              {/* <ListItemText primary={text} /> */}
              <NavLink to="/chat-ai">Chat Ai</NavLink>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );

  return (
    <div>
      {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer("right", true)}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton> */}
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
