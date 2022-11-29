import * as React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import { FC, createElement } from "react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import cartouche from "./cartouche.png";
import cartoucheDark from "./cartoucheDark.png";
import { makeStyles } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const PREFIX = "CardWithIcon";

const classes = {
  card: `${PREFIX}-card`,
  main: `${PREFIX}-main`,
  title: `${PREFIX}-title`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    minHeight: 52,
    display: "flex",
    flexDirection: "column",
    flex: "1",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },

  [`& .${classes.main}`]: (props: Props) => ({
    overflow: "inherit",
    padding: 16,
    background: `url(${
      theme.palette.mode === "dark" ? cartoucheDark : cartouche
    }) no-repeat`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .icon": {
      color: theme.palette.mode === "dark" ? "inherit" : "#dc2440",
    },
  }),

  [`& .${classes.title}`]: {},
}));

interface Props {
  icon: any;
  to: string;
  title?: string;
  subtitle?: string | number;
  children?: ReactNode;
}

const CardWithIcon = (props: Props) => {
  const { icon, title, subtitle, to, children } = props; //icon

  return (
    <StyledCard className={classes.card} >
      {/* <Link to={to}> */}
      <Box className={classes.main} p={2}>
        <Box width="3em" className="icon">
          {createElement(icon, { fontSize: "large" })}
        </Box>
        <Box textAlign="right">
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {subtitle || " "}
          </Typography>
        </Box>
      </Box>
      {/* </Link> */}
      {children && <Divider />}
      {children}
    </StyledCard>
  );
};

export default CardWithIcon;
