import {IssueParam} from "../models/issue-param";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {BoardConfig} from "../models/jkanban/board-config";

const GetChildren = (boardsConfig: BoardConfig[]): IssueParam[] => {
  const res: IssueParam[] = []
  boardsConfig.forEach(boardConfig => {
    boardConfig.item.forEach(item => {
      const newItem: IssueParam = {
        number: Number(item.id)
      }
      res.push(newItem)
    })
  })
  return res
}

export const ConverterKanbanConfigForEditor = (config: KanbanConfig[]): IssueParam[] => {
  const res: IssueParam[] = []
  config.forEach(oldItem => {
    const newItem: IssueParam = {}
    if (oldItem.id) {
      newItem.number = oldItem.id
    } else if (oldItem.title) {
      newItem.title = oldItem.title
    }
    if (oldItem.boards) {
      newItem.children = GetChildren(oldItem.boards)
    }
    res.push(newItem)
  })
  return res
}