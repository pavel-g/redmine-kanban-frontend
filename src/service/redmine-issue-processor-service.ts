import {RedmineIssueData} from "../models/redmine-issue-data";
import {usersLoader, UsersLoaderService} from "./users-loader-service";
import {CurrentUserSelectorResult, CurrentUserSelectorService} from "./current-user-selector-service";
import {ItemConfig} from "../models/jkanban/item-config";
import {Config} from "../config";

export class RedmineIssueProcessorService {

  constructor(public data: RedmineIssueData) {
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

  async convertToItemConfig(): Promise<ItemConfig> {
    const currentUser = await this.getCurrentUser()

    const res = {
      id: `${this.data.id}`,
      title: `${this.data.tracker?.name} #${this.data.id}`,
      description: `${this.data.subject}\n\n${currentUser.label}: ${currentUser.name}`,
      url: this.getIssueUrl(this.data.id)
    }
    return res
  }

  private getUsersLoader(): UsersLoaderService {
    return usersLoader
  }

  private getIssueUrl(number: number): string {
    return `${Config.redminePublicUrl}/issues/${number}`;
  }

}