import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
// import { useCheckAuth } from "ra-core";
// import { useNavigate } from "react-router-dom";

//https://github.com/mui/material-ui/blob/v5.6.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
const theme = createTheme();

const LoginPage = () => {
  // const checkAuth = useCheckAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   checkAuth({}, false)
  //     .then(() => {
  //       // already authenticated, redirect to the home page
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       // not authenticated, stay on the login page
  //     });
  // }, [checkAuth, navigate]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => signIn("google")}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                built by Entitree
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
{
  /* <>
      Not signed in <br />
      
    </> */
}

export default LoginPage;
