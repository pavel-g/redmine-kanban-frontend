import React from 'react';
import Drawer from "@material-ui/core/Drawer"
import {observer} from "mobx-react";
import {sidebarStore} from "../store/sidebar"
import BoardsList from "./boards-list";
import {boardStore} from "../store/board";

export type SidebarProps = {
  visible: {value: boolean}
}

const Sidebar = observer((props: SidebarProps) => {
  return (
    <Drawer
      open={props.visible.value}
      anchor="left"
      onClose={onCloseSidebar}
    >
      <BoardsList items={boardStore.items}></BoardsList>
    </Drawer>
  )
})

const onCloseSidebar = () => {
  sidebarStore.toggleSidebar()
}

export default Sidebar