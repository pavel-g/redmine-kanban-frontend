import {action, observable} from "mobx";

export class EditBoardDialogStore {

  @observable data = {
    id: -1,
    name: "",
    visible: false,
    config: ""
  }

  @action
  toggleVisible() {
    this.data.visible = !this.data.visible
  }

  @action
  setConfig(value: string) {
    this.data.config = value
  }

  @action
  clear() {
    this.data.config = ""
    this.data.id = -1
    this.data.name = ""
  }

}

export const editBoardDialogStore = new EditBoardDialogStore()