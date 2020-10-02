import {action, observable} from "mobx";
import {AddIssueDialogData} from "../models/components/add-issue-dialog-props";

export class AddIssueDialogStore {

  data = observable.object({
    visible: false,
    issueNumber: null
  } as AddIssueDialogData)

  @action
  show() {
    this.data.visible = true
  }

  @action
  hide() {
    this.data.visible = false
  }

  @action
  setIssueNumber(value: number|null): void {
    this.data.issueNumber = value
  }

}

export const addIssueDialogStore = new AddIssueDialogStore()