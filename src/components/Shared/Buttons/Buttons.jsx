/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    pink: {
      main: "#EC407A",
      light: "#E9DB5D",
      dark: "#D81B60",
      contrastText: "#FFFFFF",
    },
    darkGreen: {
      main: "#43A047",
      light: "#E9DB5D",
      dark: "#2E7D32",
      contrastText: "#FFFFFF",
    },
    lightPurple: {
      main: "#E040FB",
      light: "#E9DB5D",
      dark: "#D500F9",
      contrastText: "#FFFFFF",
    },
    deepOrange: {
      main: "#FF7043",
      light: "#E9DB5D",
      dark: "#DD2C00",
      contrastText: "#FFFFFF",
    },
  },
});
export const ButtonsTemplate = ({
  children,
  onClick,
  color,
  size,
  variant,
  type = "button",
}) => {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Button
        variant={variant}
        // sx={{ marginRight: "2rem" }}
        color={color}
        size={size}
        onClick={onClick}
        type={type}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

// export const addButtons = ({ children, onClick }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       {" "}
//       <Button
//         variant="contained"
//         type="submit"
//         sx={{ marginRight: "2rem" }}
//         color="darkGreen"
//         size="small"
//         onClick={onClick}
//       >
//         {children}
//       </Button>
//     </ThemeProvider>
//   );
// };
