import {action, computed, makeObservable, observable} from "mobx";
import {IssuesDifferenceModel} from "../models/issues-difference-model";
import {IsEmptyIssuesDifference} from "../function/swimlane-issues-compare/is-empty-issues-difference";

export class SyncSwimlaneIssuesStore {

  issuesDifference: IssuesDifferenceModel

  constructor(issueDifference: IssuesDifferenceModel = {added: [], removed: []}) {
    makeObservable(this, {
      issuesDifference: observable,
      setIssuesDifference: action,
      isEmptyIssuesDifference: computed
    })
    this.issuesDifference = issueDifference
  }

  setIssuesDifference(issueDifference: IssuesDifferenceModel) {
    this.issuesDifference = issueDifference
  }

  get isEmptyIssuesDifference(): boolean {
    return IsEmptyIssuesDifference(this.issuesDifference)
  }

}