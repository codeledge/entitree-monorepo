import { UserMenu, Logout, Link, Login } from "react-admin";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export const MyUserMenu = (props) => (
  <UserMenu>
    <MenuItem component={Link} {...props} to="/login">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>Login</ListItemText>
    </MenuItem>
    <MenuItem component={Link} {...props} to="/settings">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>Settings</ListItemText>
    </MenuItem>
    <Logout {...props} icon={<ExitToAppIcon />} />
  </UserMenu>
);
