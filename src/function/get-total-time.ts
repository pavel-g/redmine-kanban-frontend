import {RedmineIssueData} from "../models/redmine-issue-data";
import {GetNumber} from "./get-number";

export function GetTotalTime(issues: RedmineIssueData[], timeFieldName: string): number {
  return issues.map(issue => {
    // @ts-ignore
    return GetNumber(issue[timeFieldName]) || 0
  }).reduce((a, b) => a + b, 0)
}