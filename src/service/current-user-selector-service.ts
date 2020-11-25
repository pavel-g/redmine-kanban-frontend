import {RedmineIssueProcessorService} from "./redmine-issue-processor-service";
import {usersLoader, UsersLoaderService} from "./users-loader-service";
import {RedmineUser} from "../models/redmine-user";
import {DefaultCurrentUserRulesConst} from "../const/default-current-user-rules-const";

const DEFAULT_LABEL = 'Исп'

export type CurrentUserSelectorResult = {
  label: string,
  name: string
}

// TODO: 2020-10-31 Must be implemented in custom card or called from custom card
export class CurrentUserSelectorService {

  // TODO: 2020-10-31 Must be moved in database and backend
  /* Hard code rules of mapping statuses and current user field */
  rules = DefaultCurrentUserRulesConst

  constructor(
    private processor: RedmineIssueProcessorService
  ) {
  }

  async getCurrentUser(): Promise<CurrentUserSelectorResult> {
    var status = this.processor.data.status.name

    for(var i = 0; i < this.rules.length; i++) {
      var rule = this.rules[i]
      if (rule.statuses.indexOf(status) >= 0) {
        const userData = await this.getRedmineUserFromCustomField(rule.fromCustomField)
        return {
          name: userData ? `${userData.firstname} ${userData.lastname}` : "",
          label: rule.label
        }
      }
    }

    return {
      name: this.processor.data?.assigned_to?.name || "",
      label: DEFAULT_LABEL
    }
  }

  async getRedmineUserFromCustomField(fieldName: string): Promise<RedmineUser|null> {
    const value = this.processor.getValueCustomField(fieldName)
    if (!value) {
      return null
    }

    const userId = Number(value)
    return await this.getUsersLoader().getUserInfo(userId)
  }

  private getUsersLoader(): UsersLoaderService {
    return usersLoader
  }

}