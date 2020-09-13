import {KanbanConfig} from "./jkanban/kanban-config";

export type Board = {
  id: number,
  name: string,
  config?: KanbanConfig[]|null
}