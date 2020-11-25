import {RedmineIssueData} from "./redmine-issue-data";
import {RedmineUser} from "./redmine-user";
import {MergeRequestStatuses} from "./mergerequest-statuses";

export type CustomCardModel = {
  issueNumber: number,
  redmineIssueData: RedmineIssueData,
  customFields: {
    qa?: RedmineUser|null,
    cr?: RedmineUser|null
  },
  mergeRequests: MergeRequestStatuses[]
}

export function createEmptyCustomCardModel(issueNumber: number, redmineIssueData: RedmineIssueData): CustomCardModel {
  return {
    issueNumber: issueNumber,
    redmineIssueData: redmineIssueData,
    customFields: {},
    mergeRequests: []
  }
}