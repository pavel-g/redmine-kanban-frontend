import {action, makeObservable, observable} from "mobx";

export class SyncSwimlaneIssuesDialogStore {

  visible: boolean

  constructor(visible = false) {
    makeObservable(this, {
      visible: observable,
      setVisible: action
    })
    this.visible = visible
  }

  setVisible(value: boolean): void {
    this.visible = value
  }

}