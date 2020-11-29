import {action, makeObservable, observable} from "mobx";

export class AddIssueDialogStore {

  constructor() {
    makeObservable(this, {
      visible: observable,
      issueNumber: observable,
      show: action,
      hide: action,
      setIssueNumber: action
    })
  }

  visible: boolean = false

  issueNumber: number|null = null

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }

  setIssueNumber(value: number|null): void {
    this.issueNumber = value
  }

}