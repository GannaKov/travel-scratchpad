/* eslint-disable react/prop-types */

import AuthNav from "../AuthNav/AuthNav";
import BlogSharedLayout from "../../BlogComponents/BlogSharedLayout/BlogSharedLayout";

const AppBar = ({ isLoggedIn }) => {
  return <> {isLoggedIn ? <BlogSharedLayout /> : <AuthNav />}</>;
};

export default AppBar;
