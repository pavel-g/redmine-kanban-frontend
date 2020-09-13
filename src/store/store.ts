import axios from 'axios'
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {Config} from "../config";
import {observable} from "mobx";
import {Board} from "../models/board";

export class Store {

  id = observable.box(-1)

  name = observable.box("")

  data: KanbanConfig[] = observable([])

  async loadData(force = false): Promise<KanbanConfig[]> {
    if (this.id.get() < 0) {
      return []
    }
    if (this.data.length === 0 || force) {
      const response = await axios.get<Board>(`${Config.backendUrl}/board/${this.id}/kanban`)
      this.id.set(response.data.id)
      this.name.set(response.data.name)
      this.data.splice(0, this.data.length)
      response.data.config?.forEach((kanbanConfig) => {
        this.data.push(kanbanConfig)
      })
    }
    return this.data
  }

  async setId(id: number): Promise<KanbanConfig[]> {
    this.id.set(id)
    return await this.loadData(true)
  }

}

export const store = new Store()
store.loadData()