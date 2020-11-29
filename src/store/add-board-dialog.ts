import {action, makeObservable, observable} from "mobx";

type AddBoardDialogStoreData = {
  visible: boolean,
  name: string
}

export class AddBoardDialogStore {

  constructor(data?: AddBoardDialogStoreData) {
    makeObservable(this, {
      data: observable,
      toggleVisible: action,
      setName: action,
      clear: action
    })
    if (data) {
      this.data = data
    }
  }

  data: AddBoardDialogStoreData = {
    visible: false,
    name: ""
  }

  toggleVisible() {
    this.data.visible = !this.data.visible
  }

  setName(name: string) {
    this.data.name = name
  }

  clear() {
    this.data.name = ""
  }

}

export const addBoardDialogStore = new AddBoardDialogStore()