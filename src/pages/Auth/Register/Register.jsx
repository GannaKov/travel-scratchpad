import { TextField, Button } from "@mui/material";

export const Register = () => {
  return (
    <>
      <h1>Sign up</h1>

      <form method="post">
        <TextField
          id="firstname"
          label="First name"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <TextField
          id="lastname"
          label="Last name"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <TextField
          id="firstname"
          type="password"
          label="Password"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <Button variant="contained">Sign up</Button>
      </form>
    </>
  );
};
