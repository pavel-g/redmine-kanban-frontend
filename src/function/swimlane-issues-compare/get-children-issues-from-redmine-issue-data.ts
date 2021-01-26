import {RedmineIssueData} from "../../models/redmine-issue-data";

export function GetChildrenIssuesFromRedmineIssueData(issueData: RedmineIssueData): number[] {
  return issueData.children?.map(child => child.id) || []
}