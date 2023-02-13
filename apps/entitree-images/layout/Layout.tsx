import * as React from "react";
import { Layout, LayoutProps, Sidebar } from "react-admin";
import AppBar from "./AppBar";
import Menu from "./Menu";

const CustomSidebar = (props: any) => (
  <Sidebar
    {...props}
    size={200}
  />
);

const CustomLayout = (props: LayoutProps) => {
  return (
    <Layout
      {...props}
      appBar={AppBar}
      sidebar={CustomSidebar}
      menu={Menu}
      //   theme={theme}
    />
  );
};

export default CustomLayout;
