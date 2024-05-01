import { TextField, Button } from "@mui/material";

export const Login = () => {
  return (
    <>
      <h1>Sign in</h1>
      <form method="post">
        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <TextField
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          margin="dense"
          fullWidth
        />

        <Button variant="contained">Sign in</Button>
      </form>
    </>
  );
};
