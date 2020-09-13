import {observable} from "mobx";
import {BoardSidebarItem} from "../models/board-sidebar-item";
import axios from "axios"
import {Config} from "../config";

export class BoardStore {
  @observable items: BoardSidebarItem[] = []
  async loadItems(force: boolean = false): Promise<BoardSidebarItem[]> {
    if (this.items.length === 0 || force) {
      const response = await axios.get<BoardSidebarItem[]>(`${Config.backendUrl}/boards`)
      response.data.forEach(item => this.items.push(item))
    }
    return this.items
  }
}

export const boardStore = new BoardStore()
boardStore.loadItems()