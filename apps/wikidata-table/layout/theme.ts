import { defaultTheme } from "react-admin";
import indigo from "@mui/material/colors/indigo";
import pink from "@mui/material/colors/pink";
import red from "@mui/material/colors/red";
import { ThemeOptions } from "@mui/material";
import { blue } from "@mui/material/colors";

export const myTheme: ThemeOptions = {
  ...defaultTheme,
  palette: {
    // primary: {
    //   main: blue[300],
    // },
    secondary: {
      main: indigo[500],
    },
    // secondary: "#8C1A11",
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  components: {
    // MuiDrawer: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#fafafb",
    //     },
    //   },
    // },
  },
  // sidebar: {
  //   backgroundColor: "green",
  // },
};
