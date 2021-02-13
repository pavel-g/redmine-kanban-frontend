import {makeAutoObservable} from "mobx";

export class AddIssueDialogStore {

  constructor() {
    makeAutoObservable(this)
  }

  visible: boolean = false
  issueNumber: number|null = null
  callback: (result: number|null) => void = (result: number|null) => {}

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }

  setIssueNumber(value: number|null): void {
    this.issueNumber = value
  }

  setCallback(cb: (result: number|null) => void): void {
    this.callback = cb
  }

}