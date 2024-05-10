/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LogInForm from "./LogInForm";

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

const ModalTemplate = ({ openLogIn, setOpenLogIn, children }) => {
  const handleCloseLogIn = () => setOpenLogIn(false);
  return (
    <Modal
      open={openLogIn}
      onClose={handleCloseLogIn}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
export default ModalTemplate;

// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { useState } from "react";

// const ModalTemplate = ({ openLogIn, setOpenLogIn, handleLogInClickOpen }) => {
//   //   const [openLogIn, setOpenLogIn] = useState(false);

//   //   const handleLogInClickOpen = () => {
//   //     setOpenLogIn(true);
//   //   };

//   const handleLogInClose = () => {
//     setOpenLogIn(false);
//   };

//   return (
//     <>
//       {/* <Button variant="outlined" onClick={handleLogInClickOpen}>
//         Open form dialog
//       </Button> */}
//       <Dialog
//         open={openLogIn}
//         onClose={handleLogInClose}
//         PaperProps={{
//           component: "form",
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             const email = formJson.email;
//             console.log(email);
//             handleLogInClickOpen();
//           },
//         }}
//       >
//         <DialogTitle>Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here.
//             We will send updates occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLogInClickOpen}>Cancel</Button>
//           <Button type="submit">Subscribe</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
