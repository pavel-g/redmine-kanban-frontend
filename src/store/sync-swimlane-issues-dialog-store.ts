import {makeAutoObservable} from "mobx";
import {IssuesDifferenceModel} from "../models/issues-difference-model";

type SyncSwimlaneIssuesDialogCallback = (result: IssuesDifferenceModel|null) => void

export class SyncSwimlaneIssuesDialogStore {

  visible: boolean
  callback: SyncSwimlaneIssuesDialogCallback

  constructor(visible = false, callback: SyncSwimlaneIssuesDialogCallback = () => {}) {
    makeAutoObservable(this)
    this.visible = visible
    this.callback = callback
  }

  setVisible(value: boolean): void {
    this.visible = value
  }

}
