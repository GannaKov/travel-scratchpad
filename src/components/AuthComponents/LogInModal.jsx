/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/useAuthHook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/requests";
import styles from "./AuthForms.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  pt: 8,
  pb: 7,
  pl: 4,
  pr: 4,
};
const LogInModal = ({ openLogIn, setOpenLogIn, setOpenSignUp }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  //   const cookies = new Cookies();
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleCloseLogIn = () => setOpenLogIn(false);
  const handleChangeToSignUp = () => {
    handleCloseLogIn();
    setOpenSignUp(true);
  };
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

        if (res && res.code === 200) {
          navigate("/", { replace: true });
          handleCloseLogIn();
          setToken(res.data.tokens.accessToken);

          // if localStorage
          localStorage.setItem("refresh_token", res.data.tokens.refreshToken);
          formik.values.email = "";
          formik.values.password = "";
          //-----------------------------
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.error);
        }
      }
    },
  });
  const handleClickShowPassword = () => setIsPasswordShow((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Modal
        open={openLogIn}
        onClose={handleCloseLogIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className={styles.authTitle}>Sign in</h1>
          <form onSubmit={formik.handleSubmit} className={styles.authForm}>
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
              sx={{ marginBottom: "2rem" }}
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              //type="password"
              type={isPasswordShow ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "3rem", position: "relative" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {isPasswordShow ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              className={styles.authBtn}
              sx={{ marginBottom: "2rem" }}
            >
              Log in
            </Button>
            <p className={styles.authText}>Not registered yet?</p>
            <Button onClick={handleChangeToSignUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LogInModal;
