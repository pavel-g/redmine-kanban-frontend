import axios from 'axios'
import {Config} from "../config";
import {action, makeObservable, observable} from "mobx";
import {Board} from "../models/board";
import {IssueParam} from "../models/issue-param";
import {BoardDataLinkingForReactTrello} from "../service/board-data-linking-for-react-trello";
import {CustomSwimlaneStore} from "./custom-swimlane-store";
import {LocalStorageBoardIdKeyConst} from "../const/local-storage-board-id-key-const";
import {IssuesDifferenceModel} from "../models/issues-difference-model";
import {GetFlatListOfIssuesFromBoard} from "../function/get-flat-list-of-issues";
import {GetTotalTime} from "../function/get-total-time";
import {issuesLoader, IssuesLoaderService} from "../service/issues-loader-service";
import {CustomCardDataService} from "../service/custom-card-data-service";
import {CustomCardModel} from "../models/custom-card-model";

export class Store {

  constructor(id: number = -1, name: string = "", config: Board = {id: -1, name: ""}) {
    makeObservable(this, {
      id: observable,
      name: observable,
      config: observable,
      data: observable,
      issuesFlatList: observable,
      estimatedTotalTime: observable,
      loadData: action,
      setId: action,
      save: action,
      addGroupIssue: action,
      addGroupBefore: action,
      addGroupAfter: action,
      addIssueInside: action
    })
    this.id = id
    this.name = name
    this.config = config
  }

  id: number = -1

  name: string = ""

  config: Board = {
    id: -1,
    name: ""
  }

  data: CustomSwimlaneStore[] = []

  issuesFlatList: number[] = []

  estimatedTotalTime: number|null = null

  spentTotalTime: number|null = null

  async loadData(force = false): Promise<CustomSwimlaneStore[]> {
    if (this.id < 0) {
      return []
    }
    if (this.data.length === 0 || force) {
      const response = await axios.get<Board>(`${Config.backendUrl}/board/${this.id}`)
      if (!response || !response.data) {
        return []
      }
      const respData = response.data
      this.id = respData.id
      this.name = respData.name
      this.config = respData
      this.issuesFlatList = GetFlatListOfIssuesFromBoard(this.config)
      if (this.config.config && this.config.config.length > 0) {
        this.data = await this.createReactTrelloSwimlanes(this.config.config)
      }
      const issuesLoader = this.getIssuesLoader()
      const issuesData = await issuesLoader.getIssuesData(this.issuesFlatList)
      this.spentTotalTime = GetTotalTime(issuesData, 'spent_hours')
      this.estimatedTotalTime = GetTotalTime(issuesData, 'estimated_hours')
    }
    return this.data
  }

  private async createReactTrelloSwimlanes(issueParams: IssueParam[]): Promise<CustomSwimlaneStore[]> {
    const linker = new BoardDataLinkingForReactTrello()
    return await linker.getSwimlanes(issueParams)
  }

  async setId(id: number): Promise<CustomSwimlaneStore[]> {
    this.id = id
    window.localStorage.setItem(LocalStorageBoardIdKeyConst, String(id))
    return await this.loadData(true)
  }

  async save(config: string): Promise<void> {
    const postData = {
      config: JSON.parse(config)
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  async addGroupIssue(issueNumber: number, loadChildren: boolean): Promise<void> {
    const children = (loadChildren)
      ? (await axios.get<number[]>(`${Config.backendUrl}/issue/${issueNumber}/children`)).data
      : null

    const issueParam: IssueParam = {number: issueNumber}
    if (children) {
      issueParam.children = children.map(issueNumber => {
        return {
          number: issueNumber
        }
      })
    }

    if (!this.config.config) {
      this.config.config = []
    }

    this.config.config.push(issueParam)
    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  async addGroupBefore(issueNumber: number, id: number|string): Promise<void> {
    if (!this.config.config) {
      return
    }

    const targetGroup = this.findById(id)
    if (!targetGroup) {
      return
    }

    const index = this.config.config.indexOf(targetGroup)
    const newIssueParam: IssueParam = {number: issueNumber}
    this.config.config.splice(index, 0, newIssueParam)

    // TODO: 2020-10-04 Вынести обощённый код в отдельный метод - повторяется кусок ещё в методах addGroupAfter и addIssueInside
    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  async addGroupAfter(issueNumber: number, id: number|string): Promise<void> {
    if (!this.config.config) {
      return
    }

    const targetGroup = this.findById(id)
    if (!targetGroup) {
      return
    }

    const index = this.config.config.indexOf(targetGroup)
    const newIssueParam: IssueParam = {number: issueNumber}
    this.config.config.splice(index + 1, 0, newIssueParam)

    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  async addIssueInside(issueNumber: number, id: number|string): Promise<void> {
    if (!this.config.config) {
      return
    }

    const targetGroup = this.findById(id)
    if (!targetGroup) {
      return
    }

    const newIssueParam: IssueParam = {number: issueNumber}
    if (!targetGroup.children) {
      targetGroup.children = []
    }
    targetGroup.children.push(newIssueParam)

    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  async syncIssuesInsideGroup(issuesDiffrence: IssuesDifferenceModel, id: number|string): Promise<void> {
    if (!this.config.config) {
      return
    }

    const targetGroup = this.findById(id)
    if (!targetGroup) {
      return
    }

    issuesDiffrence.added.forEach(addedIssueNumber => {
      if (!targetGroup.children) {
        targetGroup.children = []
      }
      targetGroup.children.push({number: addedIssueNumber})
    })

    issuesDiffrence.removed.forEach(removedIssueNumber => {
      if (!targetGroup.children) {
        return
      }

      const foundIssue = targetGroup.children.find(issueParam => issueParam.number === removedIssueNumber)
      if (!foundIssue) {
        return
      }

      targetGroup.children.splice(targetGroup.children.indexOf(foundIssue), 1)
      if (targetGroup.children.length === 0) {
        delete targetGroup.children
      }
    })

    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  private findById(id: number|string): IssueParam|null {
    if (typeof id === 'number') {
      return this.findByIssueNumber(id)
    } else if (typeof id === 'string') {
      return this.findByGroupName(id)
    }
    return null
  }

  private findByIssueNumber(id: number): IssueParam|null {
    return this.config?.config?.find(issueParam => issueParam.number === id) || null
  }

  private findByGroupName(id: string): IssueParam|null {
    return this.config?.config?.find(issueParam => issueParam.title === id) || null
  }

  private getIssuesLoader(): IssuesLoaderService {
    return issuesLoader
  }

  async getFlatData(): Promise<(CustomCardModel | null)[]> {
    const issueNumbers = GetFlatListOfIssuesFromBoard(this.config)
    const customCardDataService = new CustomCardDataService()
    return await Promise.all(issueNumbers.map(issueNumber => customCardDataService.createCustomCardStore(issueNumber)))
  }

}

export const store = new Store()
const boardId = window.localStorage.getItem(LocalStorageBoardIdKeyConst)
if (typeof boardId === 'string') {
  store.setId(Number(boardId))
}

// DEBUG: begin
(window as Record<string, any>)['globalStore'] = store
// DEBUG: end