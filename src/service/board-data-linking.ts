import {IssueParam} from "../models/issue-param";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {BoardConfig} from "../models/jkanban/board-config";
import {ColumnParam} from "../models/column-param";
import {DefaultColumnsConst} from "../const/default-columns-const";
import {ItemConfig} from "../models/jkanban/item-config";
import {RedmineIssueProcessorService} from "./redmine-issue-processor-service";
import {issuesLoader, IssuesLoaderService} from "./issues-loader-service";
import {mrInfoLoaderService, MrInfoLoaderService} from "./mr-info-loader-service";

export class BoardDataLinking {

  private columns = DefaultColumnsConst

  private boardIndex = 0

  async getKanbans(issues: IssueParam[]): Promise<KanbanConfig[]> {
    if (!issues || issues.length === 0) {
      return []
    }
    await Promise.all(
      [
        this.preloadAllIssues(issues),
        this.preloadAllMrInfo(issues)
      ]
    )
    return (await (Promise.all(issues.map(issue => {
      return this.getKanban(issue)
    })))).filter(issue => Boolean(issue)) as KanbanConfig[]
  }

  async getKanban(issue?: IssueParam): Promise<KanbanConfig|null> {
    if (issue && (issue.number || issue.title)) {
      const title = await this.getGroupTitle(issue)
      return {
        id: issue.number || -1,
        element: `issue_${issue.number}`,
        title: title,
        boards: await this.getBoards(issue),
        number: issue.number || -1,
      } as KanbanConfig
    }
    return null
  }

  private getBoardUniqId(): string {
    this.boardIndex++
    return `board_${this.boardIndex}`
  }

  private async getBoards(issue: IssueParam): Promise<BoardConfig[]> {
    const store: {column: ColumnParam, issue: IssueParam, children: IssueParam[]}[] = []
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      store.push({column: column, issue: issue, children: []})
    }
    if (issue.children && issue.children.length > 0) {
      for (let i = 0; i < issue.children.length; i++) {
        const childIssue = issue.children[i]
        if (typeof childIssue.number !== 'number') {
          continue
        }
        const redmineIssueData = await this.getIssueLoader().getIssueData(childIssue.number)
        if (!redmineIssueData) {
          continue
        }
        const childIssueStatus = redmineIssueData.status.name
        const column = store.find(item => item.column.status === childIssueStatus)
        if (!column) {
          continue
        }
        column.children.push(childIssue)
      }
    }
    return await Promise.all(store.map(async item => {
      const redmineIssueData = await this.getIssueLoader().getIssueData(item.issue.number || -1)
      return {
        id: this.getBoardUniqId(),
        title: item.column.name || redmineIssueData?.status.name,
        item: await this.getItemsConfig(item.children)
      } as BoardConfig
    }))
  }

  private getIssueLoader(): IssuesLoaderService {
    return issuesLoader
  }

  private getMrInfoLoader(): MrInfoLoaderService {
    return mrInfoLoaderService
  }

  private getIssueNumbersFlatList(issues: IssueParam[]): number[] {
    const res: number[] = []
    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i]
      if (typeof issue.number === 'number') {
        res.push(issue.number)
      }
      if (issue.children && issue.children.length > 0) {
        res.push(...this.getIssueNumbersFlatList(issue.children))
      }
    }
    return res
  }

  private async preloadAllIssues(issues: IssueParam[]): Promise<void> {
    const ids = this.getIssueNumbersFlatList(issues)
    await this.getIssueLoader().getIssuesData(ids)
  }

  private async preloadAllMrInfo(issues: IssueParam[]): Promise<void> {
    const ids = this.getIssueNumbersFlatList(issues)
    await this.getMrInfoLoader().getMrInfoForIssues(ids)
  }

  private async getGroupTitle(issueParam: IssueParam): Promise<string> {
    if (typeof issueParam.number === 'number') {
      const id = issueParam.number
      const redmineIssueData = await this.getIssueLoader().getIssueData(id)
      if (redmineIssueData) {
        return `${redmineIssueData.tracker.name} #${redmineIssueData.id}: ${redmineIssueData.subject} (статус: ${redmineIssueData.status.name})`
      }
    }
    if (typeof issueParam.title === 'string') {
      return issueParam.title
    }
    console.error('Не удалось определить заголовок для группы issueParam =', issueParam)
    return ""
  }

  private async getItemConfig(issueParam: IssueParam): Promise<ItemConfig|null> {
    if (typeof issueParam.number !== 'number') {
      return null
    }
    const redmineIssueData = await this.getIssueLoader().getIssueData(issueParam.number)
    const mrInfo = await this.getMrInfoLoader().getMrInfoForIssue(issueParam.number)
    if (!redmineIssueData) return null
    const processor = new RedmineIssueProcessorService(redmineIssueData, mrInfo)
    return await processor.convertToItemConfig()
  }

  private async getItemsConfig(issueParams: IssueParam[]): Promise<ItemConfig[]> {
    const promises: (Promise<ItemConfig|null>)[] = []
    for(let i = 0; i < issueParams.length; i++) {
      const issueParam = issueParams[i]
      promises.push(this.getItemConfig(issueParam))
    }
    const res = await Promise.all(promises)
    return res.filter(item => item !== null) as ItemConfig[]
  }

}