import {action, makeObservable, observable} from "mobx";

export class SidebarStore {

  constructor(value: boolean = false) {
    makeObservable(this, {
      visible: observable,
      toggleSidebar: action
    })
  }

  visible: boolean = false

  toggleSidebar() {
    this.visible = !this.visible
  }

}

export const sidebarStore = new SidebarStore()