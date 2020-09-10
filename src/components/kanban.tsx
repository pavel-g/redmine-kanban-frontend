import React from "react";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import ReactTrello from "react-trello";
import {ConverterJKanbanConfigToTrelloConfig} from "../converters/converter-jkanban-config-to-trello-config";
import {observer} from "mobx-react";
import {Config} from "../config";

const gotoRedmineIssue = (cardId: string) => {
  const url = `${Config.redminePublicUrl}/issues/${cardId}`
  window.open(url)
}

const Kanban = observer((props: {id: number, config: KanbanConfig}) => {
  const data: ReactTrello.BoardData = ConverterJKanbanConfigToTrelloConfig(props.config);
  return (
    <div>
      <p>{props.config.title}</p>
      <ReactTrello style={{backgroundColor: "white", overflowY: "unset", height: "unset"}} data={data} onCardClick={gotoRedmineIssue}></ReactTrello>
    </div>
  )
})

export default Kanban