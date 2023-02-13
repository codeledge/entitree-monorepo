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
      <DashboardMenuItem />
      {permissions === "admin" && (
        <MenuItemLink
          to={`/user`}
          primaryText={translate(`resources.users.name`, {
            smart_count: 2,
          })}
          leftIcon={<PeopleIcon />}
          dense={dense}
        />
      )}
      <MenuItemLink
        to={`/image`}
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
    </Root>
  );
};

export default Menu;
