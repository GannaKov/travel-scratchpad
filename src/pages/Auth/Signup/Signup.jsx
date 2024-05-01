import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { signupUser } from "../../../services/requests";

const Signup = () => {
  const validationSchema = Yup.object({
    username: Yup.string("Enter your username")
      .max(50, "Too Long!")
      .required("Username is required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      //.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email!")
      // .matches(
      //   /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
      //   "Must be a valid email!"
      // )
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
      } catch (error) {
        console.log("err in Register", error.response.data.message);
        // console.log("in register", values);
      }
    },
  });

  return (
    <>
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
    </>
  );
};

export default Signup;

// import { useFormik } from "formik";
// import * as yup from "yup";

// import { TextField, Button } from "@mui/material";

// const validationSchema = yup.object({
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

// const Signup = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           id="username"
//           name="username"
//           label="User name"
//           margin="dense"
//           value={formik.values.username}
//           onBlur={formik.handleBlur}
//           error={formik.touched.username && Boolean(formik.errors.username)}
//           helperText={formik.touched.username && formik.errors.username}
//           fullWidth
//           variant="outlined"
//         />
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
