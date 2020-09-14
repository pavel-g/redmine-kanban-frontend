import {action, observable} from "mobx";
import {BoardSidebarItem} from "../models/board-sidebar-item";
import axios from "axios"
import {Config} from "../config";

export class BoardStore {

  items: BoardSidebarItem[] = observable.array([])

  @action
  async loadItems(force: boolean = false): Promise<BoardSidebarItem[]> {
    if (this.items.length === 0 || force) {
      const response = await axios.get<BoardSidebarItem[]>(`${Config.backendUrl}/boards`)
      this.items.splice(0, this.items.length)
      response.data.forEach(item => this.items.push(item))
    }
    return this.items
  }

  @action
  async addNewBoard(name: string): Promise<void> {
    const postData = {
      name: name
    }
    await axios.post(`${Config.backendUrl}/board/create`, postData)
    await this.loadItems(true)
  }

}

export const boardStore = new BoardStore()
boardStore.loadItems()