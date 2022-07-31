import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const theme = createTheme();
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {/* {"Copyright © "} */}
      <Link color="inherit" href="/">
        Chordstop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main style={{ padding: "15px" }}>{children}</main>

      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          {/* Chordstop */}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Something here to give the footer a purpose! */}
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};
export default Layout;
