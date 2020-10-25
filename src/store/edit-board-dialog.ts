import {action, makeObservable, observable} from "mobx";

type EditBoardDialogStoreData = {
  id: number,
  name: string,
  visible: boolean,
  config: string
}

export class EditBoardDialogStore {

  constructor(data?: EditBoardDialogStoreData) {
    makeObservable(this, {
      data: observable,
      toggleVisible: action,
      setConfig: action,
      clear: action
    })
    if (data) {
      this.data = data
    }
  }

  data: EditBoardDialogStoreData = {
    id: -1,
    name: "",
    visible: false,
    config: ""
  }

  toggleVisible() {
    this.data.visible = !this.data.visible
  }

  setConfig(value: string) {
    this.data.config = value
  }

  clear() {
    this.data.config = ""
    this.data.id = -1
    this.data.name = ""
  }

}

export const editBoardDialogStore = new EditBoardDialogStore()