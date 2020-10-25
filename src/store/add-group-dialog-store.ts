import {action, makeObservable, observable} from "mobx";

export class AddGroupDialogStore {

  constructor() {
    makeObservable(this, {
      visible: observable,
      issueNumber: observable,
      loadChildren: observable,
      show: action,
      hide: action,
      setIssueNumber: action,
      setLoadChildren: action
    })
  }

  visible: boolean = false

  issueNumber: number|null = 0

  loadChildren = true

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }

  setIssueNumber(value: number|null): void {
    this.issueNumber = value
  }

  setLoadChildren(value: boolean): void {
    this.loadChildren = value
  }

}