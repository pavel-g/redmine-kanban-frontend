import axios from 'axios'
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {Config} from "../config";
import {action, IObservableObject, IObservableValue, observable} from "mobx";
import {Board} from "../models/board";
import {BoardFullInfo} from "../models/board-full-info";
import {IssueParam} from "../models/issue-param";

export class Store {

  id = observable.box(-1)

  name = observable.box("")

  config: Board = observable.object({
    id: -1,
    name: ""
  })

  data: KanbanConfig[] = observable.array([])

  @action
  async loadData(force = false): Promise<KanbanConfig[]> {
    if (this.id.get() < 0) {
      return []
    }
    if (this.data.length === 0 || force) {
      const response = await axios.get<BoardFullInfo>(`${Config.backendUrl}/board/${this.id}/kanban`)
      this.id.set(response.data.id)
      this.name.set(response.data.name)
      this.data.splice(0, this.data.length)
      // @ts-ignore
      Object.getOwnPropertyNames(this.config).forEach(propName => delete this.config[propName])
      Object.assign(this.config, response.data.config)
      response.data.kanban?.forEach((kanbanConfig) => {
        this.data.push(kanbanConfig)
      })
    }
    return this.data
  }

  @action
  async setId(id: number): Promise<KanbanConfig[]> {
    this.id.set(id)
    return await this.loadData(true)
  }

  @action
  async save(config: string): Promise<void> {
    const postData = {
      config: JSON.parse(config)
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  @action
  async addGroupIssue(issueNumber: number, loadChildren: boolean): Promise<void> {
    if (!this.config.config) {
      return
    }

    const children = (loadChildren)
      ? (await axios.get<number[]>(`${Config.backendUrl}/issue/${issueNumber}/children`)).data
      : null

    console.log('loaded children ids:', children) // DEBUG

    const issueParam: IssueParam = {number: issueNumber}
    if (children) {
      issueParam.children = children.map(issueNumber => {
        return {
          number: issueNumber
        }
      })
    }

    this.config.config.push(issueParam)
    const postData = {
      config: this.config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

  @action
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

  @action
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

  @action
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