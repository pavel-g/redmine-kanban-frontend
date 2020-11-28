import {CustomCardModel} from "../models/custom-card-model";
import ReactTrello from "react-trello";

/**
 * Store data for custom card for ReactTrello
 */
export class CustomCardStore implements ReactTrello.Card<CustomCardModel> {

  metadata: CustomCardModel

  currentUser: string

  id: string

  title: string

  description: string

  constructor(data: CustomCardModel) {
    this.metadata = data
    this.currentUser = ""
    this.id = `issue_${data.issueNumber}`
    this.title = `${data.redmineIssueData.tracker.name} #${data.issueNumber}`
    this.description = `${data.redmineIssueData.subject}`
  }

}