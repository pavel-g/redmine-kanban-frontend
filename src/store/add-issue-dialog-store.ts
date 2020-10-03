import {action, observable} from "mobx";
import {AddIssueDialogData} from "../models/components/add-issue-dialog-props";
import {store} from "./store";

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
  async setIssueNumber(value: number|null): Promise<void> {
    this.data.issueNumber = value
    if (value != null) {
      await store.addGroupIssue(value)
    }
  }

}

export const addIssueDialogStore = new AddIssueDialogStore()