// @ts-nocheck
import * as React from "react";

import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  usePermissions,
  useTranslate,
} from "react-admin";

import ImageIcon from "@mui/icons-material/Image";
import LabelIcon from "@mui/icons-material/Label";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { makeStyles } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const PREFIX = "Menu";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(1),
  },
}));

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const translate = useTranslate();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  const { permissions } = usePermissions();

  return (
    <Root className={classes.root}>
      {" "}
      <DashboardMenuItem />
      {permissions === "admin" && (
        <MenuItemLink
          to={`/users`}
          primaryText={translate(`resources.users.name`, {
            smart_count: 2,
          })}
          leftIcon={<PeopleIcon />}
          dense={dense}
        />
      )}
      <MenuItemLink
        to={`/images`}
        primaryText={translate(`resources.images.name`, {
          smart_count: 2,
        })}
        leftIcon={<ImageIcon />}
        dense={dense}
      />
      <MenuItemLink
        to={`/documentation`}
        primaryText={translate(`resources.documentation.name`, {
          smart_count: 2,
        })}
        leftIcon={<MenuBookIcon />}
        dense={dense}
      />
      <MenuItemLink
        to={`/privacy`}
        primaryText={translate(`resources.privacy.name`, {
          smart_count: 2,
        })}
        leftIcon={<VerifiedUserIcon />}
        dense={dense}
      />
      {/* <SubMenu
        handleToggle={() => handleToggle("menuSales")}
        isOpen={state.menuSales}
        name="pos.menu.sales"
        icon={<orders.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/commands`}
          primaryText={translate(`resources.commands.name`, {
            smart_count: 2,
          })}
          leftIcon={<orders.icon />}
          dense={dense}
        />
        <MenuItemLink
          to={`/invoices`}
          primaryText={translate(`resources.invoices.name`, {
            smart_count: 2,
          })}
          leftIcon={<invoices.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        name="pos.menu.catalog"
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/products`}
          primaryText={translate(`resources.products.name`, {
            smart_count: 2,
          })}
          leftIcon={<products.icon />}
          dense={dense}
        />
        <MenuItemLink
          to={`/categories`}
          primaryText={translate(`resources.categories.name`, {
            smart_count: 2,
          })}
          leftIcon={<categories.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="pos.menu.customers"
        icon={<visitors.icon />}
        dense={dense}
      >
        <MenuItemLink
          to={`/customers`}
          primaryText={translate(`resources.customers.name`, {
            smart_count: 2,
          })}
          leftIcon={<visitors.icon />}
          dense={dense}
        />
        <MenuItemLink
          to={`/segments`}
          primaryText={translate(`resources.segments.name`, {
            smart_count: 2,
          })}
          leftIcon={<LabelIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to={`/reviews`}
        primaryText={translate(`resources.reviews.name`, {
          smart_count: 2,
        })}
        leftIcon={<reviews.icon />}
        dense={dense}
      /> */}
    </Root>
  );
};

export default Menu;
