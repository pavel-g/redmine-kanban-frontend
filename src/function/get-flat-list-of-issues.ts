import {Board} from "../models/board";
import {IssueParam} from "../models/issue-param";

export function GetFlatListOfIssuesFromIssuesParams(params: IssueParam[]): number[] {
  const res: number[] = []
  params.forEach(swimlaneConfig => {
    if (swimlaneConfig.children) {
      swimlaneConfig.children.forEach(issue => {
        if (typeof issue.number === 'number') {
          res.push(issue.number)
        }
      })
    }
  })
  return res
}

export function GetFlatListOfIssuesFromBoard(board: Board): number[] {
  const config = board.config
  if (!config || config.length === 0) {
    return []
  }
  return GetFlatListOfIssuesFromIssuesParams(config)
}
