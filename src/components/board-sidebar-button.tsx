import React from "react"
import {BoardSidebarItem} from "../models/board-sidebar-item";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {store} from "../store/store"

export type BoardSidebarButtonProps = {
  item: BoardSidebarItem
}

const OnBoardButtonClick = (id: number) => () => {
  store.setId(id)
}

const BoardSidebarButton = (props: BoardSidebarButtonProps) => {
  return (
    <ListItem button onClick={OnBoardButtonClick(props.item.id)}>
      <ListItemIcon><AssignmentTurnedInIcon/></ListItemIcon>
      <ListItemText primary={props.item.name}></ListItemText>
    </ListItem>
  )
}

export default BoardSidebarButton