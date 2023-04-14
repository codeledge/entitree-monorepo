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
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Menu = ({ dense = false }: MenuProps) => {
  const translate = useTranslate();

  const { permissions } = usePermissions();

  return (
    <div>
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
      <MenuItemLink
        to={`/account`}
        primaryText={translate(`pos.configuration`, {
          smart_count: 2,
        })}
        leftIcon={<SettingsIcon />}
        dense={dense}
      />
    </div>
  );
};

export default Menu;
