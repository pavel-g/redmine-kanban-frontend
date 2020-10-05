import {action, observable} from "mobx";

export class AddGroupDialogStore {

  @observable
  visible: boolean = false

  @observable
  issueNumber: number|null = 0

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
  setIssueNumber(value: number|null): void {
    this.issueNumber = value
  }

  @action
  setLoadChildren(value: boolean): void {
    this.loadChildren = value
  }

}