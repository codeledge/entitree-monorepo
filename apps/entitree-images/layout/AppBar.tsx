import * as React from "react";
import { AppBar } from "react-admin";

const CustomAppBar = (props) => {
  return (
    <AppBar
      {...props}
      elevation={1}
    ></AppBar>
  );
};

export default CustomAppBar;
