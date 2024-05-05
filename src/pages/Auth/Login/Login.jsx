// import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../services/requests";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useAuth from "../../../context/useAuthHook";

const Login = () => {
  const cookies = new Cookies();
  const { token, setToken } = useAuth();
  //const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .matches(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
        "Must be a valid email!"
      )
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(6, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await loginUser(values);
        if (res.code === 200) {
          setToken(res.data.tokens.accessToken);
          cookies.set("jwt_authorization", res.data.tokens.accessToken);
          cookies.set("refresh_token", res.data.tokens.refreshToken); //?????????
        }

        navigate("/", { replace: true });
      } catch (error) {
        // console.log("err in LogIn", error.response.data.message);
        console.log("err in LogIn", error);
      }
    },
  });

  //////just for test
  // setTimeout(() => {
  //   formik.handleSubmit();
  // }, 10 * 1000);
  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          variant="outlined"
          margin="dense"
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          variant="outlined"
          margin="dense"
        />

        <Button variant="contained" type="submit">
          Log in
        </Button>
      </form>
    </>
  );
};
export default Login;
