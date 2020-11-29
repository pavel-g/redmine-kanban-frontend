import React from 'react'
import {observer} from "mobx-react";
import List from '@material-ui/core/List';
import {BoardSidebarItem} from "../models/board-sidebar-item";
import BoardSidebarButton from "./board-sidebar-button";

export type BoardsListProps = {
  items: BoardSidebarItem[]
}

const BoardsList = observer((props: BoardsListProps) => {
  const list = props.items.map(item => {
    return (<BoardSidebarButton item={item}/>)
  })
  return (
    <List>
      {list}
    </List>
  )
})

export default BoardsList