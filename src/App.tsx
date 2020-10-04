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
import AddGroupDialog from "./components/add-group-dialog";
import {AddGroupDialogStore} from "./store/add-group-dialog-store";
import {AddGroupDialogData} from "./models/components/add-group-dialog-props";

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

  const addGroupDialogStore = new AddGroupDialogStore()
  const onSelectNewGroup = async (ok: boolean, data?: AddGroupDialogData) => {
    if (!ok || !data) {
      return
    }
    const issueNumber = data.issueNumber
    const loadChildren = data.loadChildren
    if (issueNumber != null) {
      await store.addGroupIssue(issueNumber, loadChildren)
    }
    addGroupDialogStore.setIssueNumber(0)
    addGroupDialogStore.setLoadChildren(true)
    addGroupDialogStore.hide()
  }
  const onShowAddGroupDialog = () => {
    addGroupDialogStore.setIssueNumber(0)
    addGroupDialogStore.setLoadChildren(true)
    addGroupDialogStore.show()
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
            onClick={onShowAddGroupDialog}
          >
            <PlaylistAddIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar visible={sidebarStore.visible}/>
      <AddBoardDialog data={addBoardDialogStore.data}/>
      <EditBoardDialog data={editBoardDialogStore.data}/>
      <AddGroupDialog
        data={addGroupDialogStore}
        callback={onSelectNewGroup}
      />
      <KanbansAll store={store}/>
    </div>
  )
}

export default App;
