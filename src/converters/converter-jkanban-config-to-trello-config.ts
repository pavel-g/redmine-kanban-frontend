import {KanbanConfig} from "../models/jkanban/kanban-config";
import ReactTrello from "react-trello";
import {ItemConfig} from "../models/jkanban/item-config";

export function ConverterJKanbanConfigToTrelloConfig(src: KanbanConfig): ReactTrello.BoardData {
  const lanes = src.boards.map((jkanbanBoard) => {
    const res: ReactTrello.Lane<ItemConfig> = {
      id: jkanbanBoard.id,
      label: jkanbanBoard.title,
      title: jkanbanBoard.title,
      cards: jkanbanBoard.item
    }
    return res
  })
  return {
    lanes: lanes
  }
}