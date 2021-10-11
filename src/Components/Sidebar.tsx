import React from "react";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  listText: {
    color: "black",
  },
  fullList: {
    width: "auto",
  },
});

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      <List>
        <ListItem button href="/" component={Link}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText} primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LocalGroceryStoreIcon/>
          </ListItemIcon>
          <ListItemText className={classes.listText} primary="Order" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button href="/login" component={Link}>
          <ListItemIcon>
            <AccountCircleIcon/>
          </ListItemIcon>
          <ListItemText className={classes.listText} primary="Login" />
        </ListItem>
      </List>
    </div>
  );
};
