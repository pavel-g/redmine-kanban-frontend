import {action, autorun, observable} from "mobx";

export class SidebarStore {

  @observable visible = {value: false} // TODO: 2020-09-14 Заменить на observable.box

  @action
  toggleSidebar() {
    this.visible.value = !this.visible.value
  }

}

export const sidebarStore = new SidebarStore()