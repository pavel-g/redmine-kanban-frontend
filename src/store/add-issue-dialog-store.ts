import {action, IObservableValue, observable} from "mobx";

export class AddIssueDialogStore {

  @observable
  visible: boolean = false

  @observable
  issueNumber: number|null = null

  @action
  show() {
    this.visible = true
  }

  @action
  hide() {
    this.visible = false
  }

  @action
  setIssueNumber(value: number|null): void {
    this.issueNumber = value
  }

}