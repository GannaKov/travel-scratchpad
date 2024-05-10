/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { signupUser } from "../../services/requests";

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
const SignUpModal = ({ openSignUp, setOpenSignUp }) => {
  const navigate = useNavigate();

  const handleCloseSignUp = () => setOpenSignUp(false);

  const validationSchema = Yup.object({
    username: Yup.string("Enter your username")
      .max(50, "Too Long!")
      .required("Username is required"),
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
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await signupUser(values);
        if (res.code === 201) {
          console.log("Hurra in Regisre");
        }
        // return <Navigate to="/login" replace />;
        navigate("/", { replace: true }); // hier change!!!!!!
      } catch (error) {
        console.log("err in Register", error.response.data.message);
        alert(error.response.data.error);
      }
    },
  });

  return (
    <div>
      <Modal
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Sign up</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="User name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              fullWidth
              variant="outlined"
              margin="dense"
            />

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
              Sign up
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpModal;
