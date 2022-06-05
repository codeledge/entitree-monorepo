import * as React from "react";

import { Box, Button, Card, CardActions, Typography } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useTranslate } from "react-admin";

const PREFIX = "Welcome";

const classes = {
  root: `${PREFIX}-root`,
  actions: `${PREFIX}-actions`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    background:
      theme.palette.mode === "dark"
        ? "#535353"
        : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

    color: "#fff",
    padding: 20,
    marginTop: theme.spacing(2),
    marginBottom: "1em",
  },

  // media: {
  //     background: `url(${publishArticleImage}) top right / cover`,
  //     marginLeft: 'auto',
  // },
  [`& .${classes.actions}`]: {
    [theme.breakpoints.down("md")]: {
      padding: 0,
      flexWrap: "wrap",
      "& a": {
        marginTop: "1em",
        marginLeft: "0!important",
        marginRight: "1em",
      },
    },
  },
}));

const Welcome = () => {
  const translate = useTranslate();

  return (
    <StyledCard className={classes.root}>
      <Box display="flex">
        <Box flex="1">
          <Typography variant="h5" component="h2" gutterBottom>
            {translate("pos.dashboard.welcome.title")}
          </Typography>
          <Box maxWidth="40em">
            <Typography variant="body1" component="p" gutterBottom>
              {translate("pos.dashboard.welcome.subtitle")}
            </Typography>
          </Box>
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              href="https://github.com/codeledge/entitree-images"
              startIcon={<CodeIcon />}
            >
              {translate("pos.dashboard.welcome.source_button")}
            </Button>
            <Button
              variant="contained"
              href="/#/image/create"
              startIcon={<CloudUploadIcon />}
            >
              {translate("pos.image_create")}
            </Button>
          </CardActions>
        </Box>

        {/* <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    className={classes.media}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                /> */}
      </Box>
    </StyledCard>
  );
};

export default Welcome;
