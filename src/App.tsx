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
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from "axios";
import {Config} from "./config";
import {Board} from "./models/board";
import AddGroupDialog from "./components/add-group-dialog";
import {AddGroupDialogStore} from "./store/add-group-dialog-store";
import {AddGroupDialogData} from "./models/components/add-group-dialog-props";
import {Title} from "./components/title";
import TuneIcon from '@material-ui/icons/Tune';
import {customCardSettingsDialogStore} from "./store/custom-card-settings-dialog-store";
import {CardSettingsDialog} from "./components/card-settings-dialog";
import {editBoardGeneratorInputStore} from "./store/edit-board-generator-input-store";
import {TotalTimeSummary} from "./components/total-time-summary";

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
  const boardId = store.id
  const resp = await axios.get<Board>(`${Config.backendUrl}/board/${boardId}`)
  const data = resp.data
  editBoardDialogStore.data.config = JSON.stringify(data.config, null, "    ")
  editBoardDialogStore.data.visible = true
  editBoardGeneratorInputStore.setValue('')
}

const CardSettingsButtonClick = () => {
  customCardSettingsDialogStore.setVisible(true)
}

const App = () => {
  const classes = useStyles();

  const [addGroupDialogStore] = useState(() => new AddGroupDialogStore())
  const onSelectNewGroup = async (ok: boolean, data?: AddGroupDialogData) => {
    if (ok && data) {
      const issueNumber = data.issueNumber
      const loadChildren = data.loadChildren
      if (issueNumber != null) {
        await store.addGroupIssue(issueNumber, loadChildren)
      }
    }
    addGroupDialogStore.setIssueNumber(null)
    addGroupDialogStore.setLoadChildren(true)
    addGroupDialogStore.hide()
  }
  const onShowAddGroupDialog = () => {
    addGroupDialogStore.setIssueNumber(null)
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
            <Title store={store}/>
          </Typography>
          <Typography variant="h6" className={classes.title} style={{textAlign: 'right', marginRight: '30px'}}>
            <TotalTimeSummary/>
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={CardSettingsButtonClick}
          >
            <TuneIcon/>
          </IconButton>
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
      <Sidebar store={sidebarStore}/>
      <AddBoardDialog store={addBoardDialogStore}/>
      <EditBoardDialog store={editBoardDialogStore}/>
      <AddGroupDialog
        data={addGroupDialogStore}
        callback={onSelectNewGroup}
      />
      <CardSettingsDialog/>
      <KanbansAll store={store}/>
    </div>
  )
}

export default App;
