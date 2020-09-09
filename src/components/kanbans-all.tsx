import React from "react";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import Kanban from "./kanban";
import {observer} from "mobx-react";

type KanbansAllProps = {boards: KanbanConfig[]}

const KanbansAll = observer((props: KanbansAllProps) => {
  const components = props.boards.map((boardConfig) => {
    return (
      <Kanban id={-1} config={boardConfig}></Kanban>
    )
  })
  return (
    <>
      {components}
    </>
  )
})

export default KanbansAll