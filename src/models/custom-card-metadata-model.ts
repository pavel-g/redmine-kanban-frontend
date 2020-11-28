import {RedmineIssueData} from "./redmine-issue-data";
import {RedmineUser} from "./redmine-user";
import {MergeRequestStatuses} from "./mergerequest-statuses";

/**
 * Metadata for custom card for ReactTrello
 */
export type CustomCardMetadataModel = {
  issueNumber: number,
  redmineIssueData: RedmineIssueData,
  customFields: {
    qa?: RedmineUser|null,
    cr?: RedmineUser|null
  },
  mergeRequests: MergeRequestStatuses[]
}

export function createEmptyCustomCardModel(issueNumber: number, redmineIssueData: RedmineIssueData): CustomCardMetadataModel {
  return {
    issueNumber: issueNumber,
    redmineIssueData: redmineIssueData,
    customFields: {},
    mergeRequests: []
  }
}