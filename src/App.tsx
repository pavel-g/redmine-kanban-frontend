import React from 'react';
import './App.css';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import KanbansAll from "./components/kanbans-all";
import {store} from "./store/store";
import {sidebarStore} from "./store/sidebar"
import Sidebar, {SidebarProps} from "./components/sidebar";
import AddBoardDialog from "./components/add-board-dialog";
import {addBoardDialogStore} from "./store/add-board-dialog";
import EditBoardDialog from "./components/edit-board-dialog";
import {editBoardDialogStore} from "./store/edit-board-dialog";
import EditIcon from '@material-ui/icons/Edit';
import {ConverterKanbanConfigForEditor} from "./converters/converter-kanban-config-for-editor";
import AddIssueDialog from "./components/add-issue-dialog";
import {addIssueDialogStore} from "./store/add-issue-dialog-store";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

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

const OnOpenSidebarClick = () => {
  return sidebarStore.toggleSidebar()
}

const EditButtonClick = () => {
  editBoardDialogStore.data.visible = true
  const config = ConverterKanbanConfigForEditor(store.data)
  editBoardDialogStore.data.config = JSON.stringify(config, null, "    ")
}

const AddGroupIssueButtonClick = () => {
  addIssueDialogStore.data.issueNumber = null
  addIssueDialogStore.show()
}

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={OnOpenSidebarClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Redmine Kanban
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={EditButtonClick}
          >
            <EditIcon/>
          </IconButton>
          <IconButton
            edge={"start"}
            className={classes.menuButton}
            color={"inherit"}
            onClick={AddGroupIssueButtonClick}
          >
            <PlaylistAddIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar visible={sidebarStore.visible}></Sidebar>
      <AddBoardDialog data={addBoardDialogStore.data}/>
      <EditBoardDialog data={editBoardDialogStore.data}/>
      <AddIssueDialog data={addIssueDialogStore.data}/>
      <KanbansAll boards={store.data}></KanbansAll>
    </div>
  )
}

export default App;
