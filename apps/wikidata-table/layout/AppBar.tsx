import * as React from "react";
import { AppBar } from "react-admin";
import { MyUserMenu } from "./UserMenu";

const CustomAppBar = (props: any) => {
  return <AppBar {...props} elevation={1} userMenu={<MyUserMenu />}></AppBar>;
};

export default CustomAppBar;
