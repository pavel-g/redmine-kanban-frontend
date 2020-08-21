import React from 'react';
import './App.css';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Provider} from "react-redux";
import store from "./redux/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }),
);

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Redmine Kanban
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </Provider>
  )
}

export default App;
