import React from 'react';
import Drawer from "@material-ui/core/Drawer"
import {observer} from "mobx-react";
import {SidebarStore, sidebarStore} from "../store/sidebar"
import BoardsList from "./boards-list";
import {boardStore} from "../store/board";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {addBoardDialogStore} from "../store/add-board-dialog";

export type SidebarProps = {
  store: SidebarStore
}

const OnAddButtonClick = () => {
  addBoardDialogStore.toggleVisible()
}

const Sidebar = observer((props: SidebarProps) => {
  return (
    <Drawer
      open={props.store.visible}
      anchor="left"
      onClose={onCloseSidebar}
    >
      <BoardsList items={boardStore.items}></BoardsList>
      <Divider/>
      <List>
        <ListItem button onClick={OnAddButtonClick}>
          <ListItemIcon><AddIcon/></ListItemIcon>
          <ListItemText primary="Добавить новую доску"></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
})

const onCloseSidebar = () => {
  sidebarStore.toggleSidebar()
}

export default Sidebar