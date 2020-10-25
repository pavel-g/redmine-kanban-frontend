import {RedmineIssueProcessorService} from "./redmine-issue-processor-service";
import {usersLoader, UsersLoaderService} from "./users-loader-service";
import {RedmineUser} from "../models/redmine-user";

const DEFAULT_LABEL = 'Исп'

export type CurrentUserSelectorResult = {
  label: string,
  name: string
}

export class CurrentUserSelectorService {

  /** Хардкод правил мапинга текущего пользователя к статусу */
  rules = [
    {
      statuses: ['Code Review'],
      fromCustomField: 'Code Reviewer',
      label: 'CR'
    },
    {
      statuses: ['Resolved', 'Testing'],
      fromCustomField: 'Quality Assurance',
      label: 'QA'
    }
  ]

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