import {autorun, observable} from "mobx";

export class SidebarStore {
  @observable visible = {value: false}
  showSidebar() {
    this.visible.value = true
  }
  hideSidebar() {
    this.visible.value = false
  }
  toggleSidebar() {
    this.visible.value = !this.visible.value
  }
}

export const sidebarStore = new SidebarStore()