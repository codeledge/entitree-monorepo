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
import { WikidataPageArray } from "../lib/data/page";
import { Page, PageCategories } from "../lib/data/types";
import SubMenu from "./SubMenu";
import { toTitleCase } from "../lib/helper";
import Icon from "@mui/material/Icon";
import { PAGE_MUI_EMOJI } from "../lib/emojis";

const PREFIX = "Menu";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(1),
  },
}));

type MenuName = Page["category"];

const Menu = ({ dense = false }: MenuProps) => {
  let defaultMenu = "";
  const [state, setState] = useState({});
  const translate = useTranslate();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  const { permissions } = usePermissions();
  // page.emoji ? <span>{page.emoji}</span> : <MenuBookIcon />
  return (
    <Root className={classes.root}>
      <DashboardMenuItem />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {PageCategories.map((category: MenuName) => (
        <SubMenu
          key={category}
          handleToggle={() => handleToggle(category)}
          isOpen={state[category]}
          name={toTitleCase(category)}
          icon={
            PAGE_MUI_EMOJI[category] ? (
              <Icon>{PAGE_MUI_EMOJI[category]}</Icon>
            ) : (
              <MenuBookIcon />
            )
          }
          dense={dense}
        >
          {WikidataPageArray.filter((page) => page.category == category).map(
            (page) => (
              <MenuItemLink
                key={page.id}
                state={{ _scrollToTop: true }}
                to={`/${page.id}`}
                primaryText={toTitleCase(page.id)}
                leftIcon={
                  page.muiEmoji ? <Icon>{page.muiEmoji}</Icon> : <ImageIcon />
                }
                dense={dense}
              />
            )
          )}
        </SubMenu>
      ))}
      {/* <MenuItemLink
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
      /> */}
    </Root>
  );
};
export default Menu;
