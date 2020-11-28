import {CustomCardMetadataModel} from "./custom-card-metadata-model";
import ReactTrello from "react-trello";

/**
 * Data for custom card for ReactTrello
 */
export class CustomCardModel implements ReactTrello.Card<CustomCardMetadataModel> {

  metadata: CustomCardMetadataModel

  currentUser: string

  id: string

  title: string

  description: string

  constructor(data: CustomCardMetadataModel) {
    this.metadata = data
    this.currentUser = ""
    this.id = `issue_${data.issueNumber}`
    this.title = `${data.redmineIssueData.tracker.name} #${data.issueNumber}`
    this.description = `${data.redmineIssueData.subject}`
  }

}