import React, {useState} from 'react';
import './App.css';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import KanbansAll from "./components/kanbans-all";
import {store} from "./store/store";
import {sidebarStore} from "./store/sidebar"
import Sidebar from "./components/sidebar";
import AddBoardDialog from "./components/add-board-dialog";
import {addBoardDialogStore} from "./store/add-board-dialog";
import EditBoardDialog from "./components/edit-board-dialog";
import {editBoardDialogStore} from "./store/edit-board-dialog";
import EditIcon from '@material-ui/icons/Edit';
import AddIssueDialog from "./components/add-issue-dialog";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from "axios";
import {Config} from "./config";
import {Board} from "./models/board";
import {AddIssueDialogStore} from "./store/add-issue-dialog-store";

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

const EditButtonClick = async () => {
  const boardId = store.id.get()
  const resp = await axios.get<Board>(`${Config.backendUrl}/board/${boardId}`)
  const data = resp.data
  editBoardDialogStore.data.config = JSON.stringify(data.config, null, "    ")
  editBoardDialogStore.data.visible = true
}

const App = () => {
  const classes = useStyles();

  const addIssueDialogStore = new AddIssueDialogStore()
  const onSelectNewIssue = async (issueNumber: number|null) => {
    if (issueNumber != null) {
      await store.addGroupIssue(issueNumber)
    }
    addIssueDialogStore.setIssueNumber(0)
    addIssueDialogStore.hide()
  }
  const onShowAddIssueDialog = () => {
    addIssueDialogStore.setIssueNumber(0)
    addIssueDialogStore.show()
  }

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
            onClick={onShowAddIssueDialog}
          >
            <PlaylistAddIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar visible={sidebarStore.visible}/>
      <AddBoardDialog data={addBoardDialogStore.data}/>
      <EditBoardDialog data={editBoardDialogStore.data}/>
      <AddIssueDialog
        data={addIssueDialogStore}
        callback={onSelectNewIssue}
      />
      <KanbansAll store={store}/>
    </div>
  )
}

export default App;
