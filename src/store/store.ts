import axios from 'axios'
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {Config} from "../config";
import {action, makeObservable, observable} from "mobx";
import {Board} from "../models/board";
import {BoardFullInfo} from "../models/board-full-info";
import {IssueParam} from "../models/issue-param";
import {BoardDataLinking} from "../service/board-data-linking";

export class Store {

  constructor(id: number = -1, name: string = "", config: Board = {id: -1, name: ""}) {
    makeObservable(this, {
      id: observable,
      name: observable,
      config: observable,
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

  data: KanbanConfig[] = observable.array([])

  async loadData(force = false): Promise<KanbanConfig[]> {
    if (this.id < 0) {
      return []
    }
    if (this.data.length === 0 || force) {
      const response = await axios.get<BoardFullInfo>(`${Config.backendUrl}/board/${this.id}/kanban`)
      this.id = response.data.id
      this.name = response.data.name
      this.data.splice(0, this.data.length)
      // @ts-ignore
      Object.getOwnPropertyNames(this.config).forEach(propName => delete this.config[propName])
      Object.assign(this.config, response.data.config)

      const kanbanConfigs = await this.createKanbanConfigs(response.data.config.config as IssueParam[])
      this.data.push(...kanbanConfigs)
    }
    return this.data
  }

  private async createKanbanConfigs(issueParams: IssueParam[]): Promise<KanbanConfig[]> {
    const linker = new BoardDataLinking()
    return await linker.getKanbans(issueParams)
  }

  async setId(id: number): Promise<KanbanConfig[]> {
    this.id = id
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

}

export const store = new Store()
store.loadData()