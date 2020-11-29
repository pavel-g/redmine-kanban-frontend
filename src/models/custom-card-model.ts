import {CustomCardMetadataModel} from "./custom-card-metadata-model";
import ReactTrello from "react-trello";
import {DefaultCurrentUserRulesConst} from "../const/default-current-user-rules-const";
import {RedmineUser} from "./redmine-user";

const EXECUTOR_LABEL = 'Исп'

/**
 * Data for custom card for ReactTrello
 */
export class CustomCardModel implements ReactTrello.Card<CustomCardMetadataModel> {

  metadata: CustomCardMetadataModel

  id: string

  title: string

  description: string

  currentUser: string

  private rules = DefaultCurrentUserRulesConst

  constructor(data: CustomCardMetadataModel) {
    this.metadata = data
    this.id = `issue_${data.issueNumber}`
    this.title = `${data.redmineIssueData.tracker.name} #${data.issueNumber}`
    this.description = `${data.redmineIssueData.subject}`
    this.currentUser = this.getCurrentUser()
  }

  private getCurrentUser(): string {
    const status = this.metadata.redmineIssueData.status.name
    const rule = this.rules.find(rule => {
      return Boolean(
        rule.statuses.indexOf(status) >= 0
      )
    })
    if (rule) {
      const propertyName = rule.metadataPropertyName
      const userName = this.getUserNameFromProperty(propertyName) || "-"
      return `${rule.label}: ${userName}`
    }
    return this.getExecutor()
  }

  private getUserNameFromProperty(propertyName: string): string|null {
    if (!this.metadata.customFields) {
      return null
    }
    const customFields: any = this.metadata.customFields
    if (!customFields[propertyName]) {
      return null
    }
    const redmineUser: RedmineUser = customFields[propertyName]
    return `${redmineUser.firstname} ${redmineUser.lastname}`
  }

  private getExecutor(): string {
    return `${EXECUTOR_LABEL}: ${this.metadata.redmineIssueData.assigned_to.name}`
  }

}