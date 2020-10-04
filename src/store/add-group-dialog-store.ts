import {action, observable} from "mobx";

export class AddGroupDialogStore {

  @observable
  visible = false

  @observable
  issueNumber = 0

  @observable
  loadChildren = true

  @action
  show() {
    this.visible = true
  }

  @action
  hide() {
    this.visible = false
  }

  @action
  setIssueNumber(value: number): void {
    this.issueNumber = value
  }

  @action
  setLoadChildren(value: boolean): void {
    this.loadChildren = value
  }

}