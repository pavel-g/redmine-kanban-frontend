import {CustomCardModel} from "../models/custom-card-model";
import {computed, makeObservable, observable} from "mobx";
import ReactTrello from "react-trello";

/**
 * Store data for custom card for ReactTrello
 */
export class CustomCardStore implements ReactTrello.Card<CustomCardModel> {

  data: CustomCardModel

  constructor(data: CustomCardModel) {
    makeObservable(this, {
      data: observable,
      currentUser: computed,
      id: computed,
      title: computed,
      description: computed,
      metadata: computed
    })
    this.data = data
  }

  get currentUser(): string {
    return ''
  }

  get id(): string {
    return `issue_${this.data.issueNumber}`
  }

  get title(): string {
    return `${this.data.redmineIssueData.tracker.name} #${this.data.redmineIssueData.id}`
  }

  get description(): string {
    return this.data.redmineIssueData.subject
  }

  get metadata(): CustomCardModel {
    return this.data
  }

}