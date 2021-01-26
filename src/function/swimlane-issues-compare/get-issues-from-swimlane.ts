import {CustomSwimlaneModel} from "../../models/custom-swimlane-model";

export function GetIssuesFromSwimlane(swimlane: CustomSwimlaneModel): number[] {
  const res: number[] = []
  swimlane.reactTrelloConfig.lanes.forEach(lane => {
    lane.cards?.forEach(card => {
      const issueNumber = card.metadata?.redmineIssueData.id
      if (typeof issueNumber === 'number') {
        res.push(issueNumber)
      }
    })
  })
  return res
}