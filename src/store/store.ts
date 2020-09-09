import * as axios from 'axios'
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {Config} from "../config";
import {observable} from "mobx";

export class Store {
  @observable data: KanbanConfig[] = []
  async loadData(): Promise<KanbanConfig[]> {
    if (this.data.length === 0) {
      const response = await axios.default.get<KanbanConfig[]>(`${Config.backendUrl}/kanban-data`)
      response.data.forEach((kanbanConfig) => {
        this.data.push(kanbanConfig)
      })
    }
    return this.data
  }
}

export const store = new Store()
store.loadData()