/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useAuth from "../../context/useAuthHook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/requests";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const LogInModal = ({ openLogIn, setOpenLogIn }) => {
  //   const cookies = new Cookies();
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleCloseLogIn = () => setOpenLogIn(false);

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
          setToken(res.data.tokens.accessToken);

          // if localStorage
          localStorage.setItem("refresh_token", res.data.tokens.refreshToken);

          //-----------------------------
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.error);
        }
      }
    },
  });
  return (
    <div>
      <Modal
        open={openLogIn}
        onClose={handleCloseLogIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </div>
  );
};

export default LogInModal;
