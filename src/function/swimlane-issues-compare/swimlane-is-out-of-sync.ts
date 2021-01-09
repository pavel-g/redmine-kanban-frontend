import {GetIssuesFromSwimlane} from "./get-issues-from-swimlane";
import {GetChildrenIssuesFromRedmineIssueData} from "./get-children-issues-from-redmine-issue-data";
import {CustomSwimlaneModel} from "../../models/custom-swimlane-model";
import {issuesLoader} from "../../service/issues-loader-service";
import {IsEqualIssues} from "./is-equal-issues";

export async function SwimlaneIsOutOfSync(swimlane: CustomSwimlaneModel): Promise<boolean> {
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

  return IsEqualIssues(issuesInRedmine, issuesInSwimlane)
}