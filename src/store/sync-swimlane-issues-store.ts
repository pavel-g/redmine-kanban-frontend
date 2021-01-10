import {action, makeObservable, observable} from "mobx";
import {IssuesDifferenceModel} from "../models/issues-difference-model";

export class SyncSwimlaneIssuesStore {

  issuesDifference: IssuesDifferenceModel

  constructor(issueDifference: IssuesDifferenceModel = {added: [], removed: []}) {
    makeObservable(this, {
      issuesDifference: observable,
      setIssuesDifference: action
    })
    this.issuesDifference = issueDifference
  }

  setIssuesDifference(issueDifference: IssuesDifferenceModel) {
    this.issuesDifference = issueDifference
  }

}