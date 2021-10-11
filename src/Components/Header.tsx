import React, {useState, Component} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {Sidebar} from '../Components/Sidebar';
import { AppBar, IconButton, Toolbar, Drawer } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import App from "../App";
import { render } from "react-dom";

// Components
// Styles
import { Wrapper, StyledButton } from './App.styles';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(15),
    },
    title: {
      flexGrow: 1,
    },
  })
);



export default function Header(){

  const [sideBar, setSideBar] = useState(false);
  const classes = useStyles();

  const toggleSideBar = () => {
      setSideBar(!sideBar);
  };
    return (
  
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu"
                        onClick={toggleSideBar}>
                        <MenuIcon />
                        <Drawer anchor="left" open={sideBar} onClose={toggleSideBar}>
                            <Sidebar />
                        </Drawer>
                    </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }


  



