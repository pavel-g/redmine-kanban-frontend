import {GroupStoreModel} from "../models/store/group-store-model";
import {IssueParam} from "../models/issue-param";
import {CustomCardMetadataModel} from "../models/custom-card-metadata-model";
import {issuesLoader, IssuesLoaderService} from "./issues-loader-service";
import {DefaultColumnsConst} from "../const/default-columns-const";
import * as UUID from "uuid"
import {CustomCardDataService} from "./custom-card-data-service";
import {mrInfoLoaderService, MrInfoLoaderService} from "./mr-info-loader-service";
import {CustomSwimlaneModel} from "../models/custom-swimlane-model";
import {CustomSwimlaneStore} from "../store/custom-swimlane-store";

export class BoardDataLinkingForReactTrello {

  private columns = DefaultColumnsConst

  async getSwimlanes(issues: IssueParam[] | null): Promise<CustomSwimlaneStore[]> {
    if (!issues || issues.length === 0) {
      return []
    }
    await this.preloadAllIssue(issues)
    await this.preloadAllMrInfo(issues)
    const res: CustomSwimlaneStore[] = []
    for (let i = 0; i < issues.length; i++) {
      const rawItem = issues[i]
      if (typeof rawItem.number === 'number' || typeof rawItem.title === 'string') {
        const swimlane = await this.getGroupConfig(rawItem)
        if (swimlane) res.push(new CustomSwimlaneStore(swimlane))
      }
    }
    return res
  }

  private async getGroup(group: IssueParam): Promise<GroupStoreModel> {
    return {
      lanes: await this.getLanes(group)
    }
  }

  private async getGroupConfig(group: IssueParam): Promise<CustomSwimlaneModel|null> {
    if (typeof group.number !== 'number' && typeof group.title !== 'string') {
      console.error(`Number and title undefined`)
      return null
    }
    const title = await this.getGroupTitle(group)
    return {
      id: UUID.v4(),
      issueNumber: group.number || null,
      title: title,
      reactTrelloConfig: await this.getGroup(group)
    } as CustomSwimlaneModel
  }

  private async getLanes(group: IssueParam): Promise<ReactTrello.Lane<CustomCardMetadataModel>[]> {
    const lanes = this.createEmptyLanes()
    if (!group.children || group.children.length === 0) {
      return lanes
    }
    const customCardDataService = new CustomCardDataService()

    for (let i = 0; i < group.children.length; i++) {
      const issue = group.children[i]

      if (typeof issue.number != 'number') continue

      const issueNumber = issue.number
      const issueStatus = await this.getIssueStatus(issueNumber)

      if (typeof issueStatus !== 'string') {
        console.error(`Unknown issue status issueNumber = ${issueNumber}`)
        continue
      }

      const column = lanes.find(lane => lane.label === issueStatus)

      if (!column) {
        console.error(`Column for status = ${issueStatus} not found`)
        continue
      }

      if (!column.cards) column.cards = []

      const cardStore = await customCardDataService.createCustomCardStore(issueNumber)

      if (!cardStore) {
        console.error(`Can not create store for card with issueNumber = ${issueNumber}`)
        continue
      }

      column.cards.push(cardStore)
    }

    return lanes
  }

  private async preloadAllIssue(issues: IssueParam[]): Promise<void> {
    const issueNumbers: number[] = this.getIssueNumbersFlatList(issues)
    await this.getIssuesLoader().getIssuesData(issueNumbers)
  }

  private getIssuesLoader(): IssuesLoaderService {
    return issuesLoader
  }

  private async preloadAllMrInfo(issues: IssueParam[]): Promise<void> {
    const ids = this.getIssueNumbersFlatList(issues)
    await this.getMrInfoLoader().getMrInfoForIssues(ids)
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

  private createEmptyLanes(): ReactTrello.Lane<CustomCardMetadataModel>[] {
    const lanes: ReactTrello.Lane<CustomCardMetadataModel>[] = []
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      lanes.push({
        cards: [],
        id: `lane_${UUID.v4()}`,
        title: column.name,
        label: column.status
      })
    }
    return lanes
  }

  private async getIssueStatus(issueNumber: number): Promise<string|null> {
    const loader = this.getIssuesLoader()
    const data = await loader.getIssueData(issueNumber)
    return data ? data.status.name : null
  }

  private async getGroupTitle(group: IssueParam): Promise<string|null> {
    if (typeof group.number === 'number') {
      const issueLoader = this.getIssuesLoader()
      const issueData = await issueLoader.getIssueData(group.number)
      if (!issueData) {
        console.error(`Not found issue data for issueNumber = ${group.number}`)
        return null
      }
      return `${issueData.tracker.name} #${group.number}: ${issueData.subject} (${issueData.status.name})`
    } else if (typeof group.title === 'string') {
      return group.title
    }
    console.error(`Impossible get group title for group = `, group)
    return null
  }

}