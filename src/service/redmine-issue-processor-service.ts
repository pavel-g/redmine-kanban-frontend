import {RedmineIssueData} from "../models/redmine-issue-data";
import {usersLoader, UsersLoaderService} from "./users-loader-service";
import {CurrentUserSelectorResult, CurrentUserSelectorService} from "./current-user-selector-service";
import {ItemConfig} from "../models/jkanban/item-config";
import {Config} from "../config";
import {MergeRequestStatusInCard} from "../models/jkanban/mergerequest-status-in-card";
import {MergeRequestStatuses} from "../models/mergerequest-statuses";
import {createEmptyCustomCardModel, CustomCardMetadataModel} from "../models/custom-card-metadata-model";
import {CustomCardStore} from "../store/custom-card-store";

export class RedmineIssueProcessorService {

  constructor(
    public data: RedmineIssueData,
    public mrStatuses: MergeRequestStatuses[]
  ) {
  }

  async getCurrentUser(): Promise<CurrentUserSelectorResult> {
    const currentUserSelector = new CurrentUserSelectorService(this)
    const res = await currentUserSelector.getCurrentUser()
    return res
  }

  getValueCustomField(fieldName: string): string|null {
    const field = this.data.custom_fields.find(field => field.name === fieldName)
    return field ? field.value : null
  }

  async convertToItemConfig(): Promise<CustomCardStore> {
    const userSelector = new CurrentUserSelectorService(this)

    const customCardData = createEmptyCustomCardModel(this.data.id, this.data)
    customCardData.mergeRequests = this.mrStatuses
    // TODO: 2020-10-31 Moved field names for CR and QA in board params in database and backend
    customCardData.customFields.cr = await userSelector.getRedmineUserFromCustomField('Code Reviewer')
    customCardData.customFields.qa = await userSelector.getRedmineUserFromCustomField('Quality Assurance')

    return new CustomCardStore(customCardData)
  }

  private getUsersLoader(): UsersLoaderService {
    return usersLoader
  }

  private getIssueUrl(number: number): string {
    return `${Config.redminePublicUrl}/issues/${number}`;
  }

  private getMrs(): MergeRequestStatusInCard[] {

    const res: MergeRequestStatusInCard[] = []

    for (let i = 0; i < this.mrStatuses.length; i++) {

      const mr = this.mrStatuses[i]

      if (mr.before_merge) {

        res.push({
          status: mr.before_merge.status,
          url: mr.before_merge.web_url
        })

        if (mr.after_merge) {
          res.push({
            status: mr.after_merge.status,
            url: mr.after_merge.web_url
          })
        }

      }

    }

    return res

  }

  private convertStatusToEmoji(status: string): string {
    switch (status) {
      case "success":
        return `🟢`
      case "failed":
        return `🔴`
      case "canceled":
      case "skipped":
      case "manual":
        return `🔵`
      case "created":
      case "waiting_for_resource":
      case "preparing":
      case "pending":
        return `🟠`
      case "running":
        return `🟠`
      default:
        return `⚪`
    }
  }

}