import React from "react";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import ReactTrello from "react-trello";
import {ConverterJKanbanConfigToTrelloConfig} from "../converters/converter-jkanban-config-to-trello-config";

function Kanban(props: {id: number, config: KanbanConfig}) {
  const data: ReactTrello.BoardData = ConverterJKanbanConfigToTrelloConfig(props.config);
  return (
    <ReactTrello data={data}></ReactTrello>
  )
}

export default Kanban