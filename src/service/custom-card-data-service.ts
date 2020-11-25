import {issuesLoader, IssuesLoaderService} from "./issues-loader-service";
import {createEmptyCustomCardModel, CustomCardModel} from "../models/custom-card-model";
import {CustomCardStore} from "../store/custom-card-store";
import {usersLoader, UsersLoaderService} from "./users-loader-service";
import {RedmineUser} from "../models/redmine-user";
import {DefaultCRFieldName, DefaultQAFieldName} from "../const/default-redmine-fields";
import {mrInfoLoaderService, MrInfoLoaderService} from "./mr-info-loader-service";

export class CustomCardDataService {

  async createCustomCardStore(issueNumber: number): Promise<CustomCardStore|null> {
    const data = await this.createCustomCardData(issueNumber)
    return data ? new CustomCardStore(data) : null
  }

  async createCustomCardData(issueNumber: number): Promise<CustomCardModel|null> {
    const issuesLoader = this.getIssuesLoader()
    const issueData = await issuesLoader.getIssueData(issueNumber)
    if (!issueData) return null

    const data = createEmptyCustomCardModel(issueNumber, issueData)
    data.customFields.cr = await this.getRedmineUserFromCustomField(issueNumber, DefaultCRFieldName)
    data.customFields.qa = await this.getRedmineUserFromCustomField(issueNumber, DefaultQAFieldName)

    const mrInfoLoader = this.getMrInfoLoader()
    data.mergeRequests = await mrInfoLoader.getMrInfoForIssue(issueNumber)

    return data
  }

  private async getRedmineUserFromCustomField(issueNumber: number, fieldName: string): Promise<RedmineUser|null> {
    const value = await this.getValueCustomField(issueNumber, fieldName)
    if (!value) {
      return null
    }

    const userId = Number(value)
    return await this.getUsersLoader().getUserInfo(userId)
  }

  private async getValueCustomField(issueNumber: number, fieldName: string): Promise<string|null> {
    const issuesLoader = this.getIssuesLoader()
    const issueData = await issuesLoader.getIssueData(issueNumber)
    if (!issueData) return null
    const field = issueData.custom_fields.find(field => field.name === fieldName)
    return field ? field.value : null
  }

  private getIssuesLoader(): IssuesLoaderService {
    return issuesLoader
  }

  private getUsersLoader(): UsersLoaderService {
    return usersLoader
  }

  private getMrInfoLoader(): MrInfoLoaderService {
    return mrInfoLoaderService
  }

}