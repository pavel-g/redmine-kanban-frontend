import {BoardFullInfo} from "../models/board-full-info";
import {IssueParam} from "../models/issue-param";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {BoardConfig} from "../models/jkanban/board-config";
import {ColumnParam} from "../models/column-param";
import {DefaultColumnsConst} from "../const/default-columns-const";
import {Config} from "../config";
import {ItemConfig} from "../models/jkanban/item-config";

export class BoardDataLinking {

  private columns = DefaultColumnsConst

  private boardIndex = 0

  private publicUrlPrefix = `${Config.redminePublicUrl}`

  getKanbans(issues: IssueParam[]): KanbanConfig[] {
    const res: KanbanConfig[] = issues.map(issue => {
      return this.getKanban(issue)
    }).filter(issue => Boolean(issue)) as KanbanConfig[]
    return res
  }

  getKanban(issue?: IssueParam): KanbanConfig|null {
    if (issue && issue.redmineData && (issue.number || issue.title)) {
      return {
        id: issue.number || -1,
        element: `issue_${issue.number}`,
        title: `${issue.redmineData.tracker.name} #${issue.redmineData.id}: ${issue.redmineData.subject}`,
        boards: this.getBoards(issue)
      } as KanbanConfig
    }
    return null
  }

  private getBoardUniqId(): string {
    this.boardIndex++
    return `board_${this.boardIndex}`
  }

  private getBoards(issue: IssueParam): BoardConfig[] {
    const store: {column: ColumnParam, issue: IssueParam, children: IssueParam[]}[] = []
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      store.push({column: column, issue: issue, children: []})
    }
    if (issue.children && issue.children.length > 0) {
      for (let i = 0; i < issue.children.length; i++) {
        const childIssue = issue.children[i]
        const childIssueStatus = childIssue?.redmineData?.status?.name
        const column = store.find(item => item.column.status === childIssueStatus)
        if (!column) {
          continue
        }
        column.children.push(childIssue)
      }
    }
    return store.map(item => {
      return {
        id: this.getBoardUniqId(),
        title: item.column.name || item?.issue?.redmineData?.status?.name,
        item: item.children.map(childIssue => {
          return {
            id: `${childIssue?.redmineData?.id}`,
            title: `${childIssue?.redmineData?.tracker?.name} #${childIssue?.redmineData?.id}`,
            description: childIssue?.redmineData?.subject,
            url: this.getIssueUrl(childIssue?.redmineData?.id || -1)
          } as ItemConfig
        })
      } as BoardConfig
    })
  }

  private getIssueUrl(number: string|number): string|null {
    return `${this.publicUrlPrefix}/issues/${number}`;
  }

}

export const boardDataLinking = new BoardDataLinking()