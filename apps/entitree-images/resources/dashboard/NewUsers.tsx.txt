import * as React from "react";

import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import CardWithIcon from "./CardWithIcon";
import CustomerIcon from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useTranslate } from "react-admin";

const PREFIX = "NewUsers";

const classes = {
  link: `${PREFIX}-link`,
  linkContent: `${PREFIX}-linkContent`,
};

const StyledCardWithIcon = styled(CardWithIcon)(({ theme }) => ({
  [`& .${classes.link}`]: {
    borderRadius: 0,
  },

  [`& .${classes.linkContent}`]: {
    color: theme.palette.primary.main,
  },
}));

const NewUsers = () => {
  const translate = useTranslate();

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('/api/admin/users?filter={}&range=[0,4]&sort=["createdAt","DESC"]')
      .then((res) => {
        const data = res.data;
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledCardWithIcon
      to="/user"
      icon={CustomerIcon}
      title={translate("pos.dashboard.new_customers")}
      // subtitle={"nb"}
    >
      <List>
        {users
          ? users.map((record: User) => (
              <ListItem
                button
                to={`/users/${record.id}`}
                component={Link}
                key={record.id}
              >
                <ListItemAvatar>
                  <Avatar src={`${record.image}?size=32x32`} />
                </ListItemAvatar>
                <ListItemText primary={`${record.email}`} />
              </ListItem>
            ))
          : null}
      </List>
      <Box flexGrow="1">&nbsp;</Box>
      <Button
        className={classes.link}
        component={Link}
        to="/users"
        size="small"
        color="primary"
      >
        <Box p={1} className={classes.linkContent}>
          {translate("pos.dashboard.all_users")}
        </Box>
      </Button>
    </StyledCardWithIcon>
  );
};

export default NewUsers;
