import {createTheme} from "@mui/material/styles";
import red from "@mui/material/colors/blue";

export const mainTheme = createTheme({
  palette: {
    primary: {
      contrastText: "#fff",
      dark: "#00AAA1",
      light: "#F2F8F7",
      main: "#E8F3F3",
    },
  },
  text: {
    disabled: "rgba(0, 0, 0, 0.38)",
    primary: "red",
    primaryChannel: "0 0 0",
    secondary: "red",
    secondaryChannel: "0 0 0",
  },
  typography: {
    fontFamily: '"Noto+Sans", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
    },
  },
});
console.log(createTheme());
