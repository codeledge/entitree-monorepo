import { alpha, styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchInput from "./Search";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

class Header extends React.Component {
  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <Link href="/" style={{ color: "white" }}>
            <MusicNoteIcon sx={{ mr: 2 }} />
          </Link>
          {/* <Link href="/" > */}
          <Typography variant="h6" color="inherit" noWrap>
            CompareIt
          </Typography>
          <SearchInput /> <SearchIcon style={{ marginLeft: "5px" }} />
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;
