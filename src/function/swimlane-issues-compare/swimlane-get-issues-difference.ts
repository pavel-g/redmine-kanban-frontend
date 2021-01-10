import {CustomSwimlaneModel} from "../../models/custom-swimlane-model";
import {issuesLoader} from "../../service/issues-loader-service";
import {GetIssuesFromSwimlane} from "./get-issues-from-swimlane";
import {GetChildrenIssuesFromRedmineIssueData} from "./get-children-issues-from-redmine-issue-data";
import {GetAddedIssues} from "./get-added-issues";
import {GetRemovedIssues} from "./get-removed-issues";
import {IssuesDifferenceModel} from "../../models/issues-difference-model";

export async function SwimlaneGetIssuesDifference(swimlane: CustomSwimlaneModel): Promise<IssuesDifferenceModel> {
  if (typeof swimlane.issueNumber !== 'number') {
    return Promise.reject("Swimlane does not have issue number")
  }

  const issueNumber = swimlane.issueNumber
  const issueData = await issuesLoader.getIssueData(issueNumber)
  if (!issueData) {
    return Promise.reject("Can not get issue data")
  }

  const issuesInSwimlane = GetIssuesFromSwimlane(swimlane)
  const issuesInRedmine = GetChildrenIssuesFromRedmineIssueData(issueData)

  return {
    added: GetAddedIssues(issuesInRedmine, issuesInSwimlane),
    removed: GetRemovedIssues(issuesInRedmine, issuesInSwimlane)
  }
}