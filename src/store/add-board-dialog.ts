import {action, observable, reaction} from "mobx";

export class AddBoardDialogStore {

  data = observable.object({
    visible: false,
    name: ""
  })

  @action
  toggleVisible() {
    this.data.visible = !this.data.visible
  }

  @action
  setName(name: string) {
    this.data.name = name
  }

  @action
  clear() {
    this.data.name = ""
  }

}

export const addBoardDialogStore = new AddBoardDialogStore()