import axios from 'axios'
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {Config} from "../config";
import {action, IObservableValue, observable} from "mobx";
import {Board} from "../models/board";
import {BoardFullInfo} from "../models/board-full-info";
import {IssueParam} from "../models/issue-param";

export class Store {

  id = observable.box(-1)

  name = observable.box("")

  config: IObservableValue<Board> = observable.box({
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
      this.config.set(response.data.config)
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
  async addGroupIssue(issueNumber: number): Promise<void> {
    const config = this.config.get()
    const issueParam: IssueParam = {number: issueNumber}
    config.config?.push(issueParam)
    const postData = {
      config: config.config
    }
    await axios.post(`${Config.backendUrl}/board/${this.id}/update`, postData)
    await this.loadData(true)
  }

}

export const store = new Store()
store.loadData()