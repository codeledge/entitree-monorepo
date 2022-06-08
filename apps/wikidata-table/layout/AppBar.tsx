import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppBar } from "react-admin";
import makeStyles from "@mui/styles/makeStyles";

// const useStyles = makeStyles({
//   title: {
//     flex: 1,
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//   },
//   spacer: {
//     flex: 1,
//   },
// });

// function AppContent(props) {
//   const classes = useStyles(); // ✅ This is safe because it is called inside ThemeProvider
//   return <Card className={classes.root}>...</Card>;
// }

const CustomAppBar = (props: any) => {
  return <AppBar {...props} elevation={1}></AppBar>;
};

export default CustomAppBar;
