import {IssuesDifferenceModel} from "../../models/issues-difference-model";

export function IsEmptyIssuesDifference(issuesDifference: IssuesDifferenceModel): boolean {
  return (
    issuesDifference.removed.length === 0 &&
    issuesDifference.added.length === 0
  )
}