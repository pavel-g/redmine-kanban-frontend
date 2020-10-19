import {MergeRequestStatuses} from "../models/mergerequest-statuses";
import {Config} from "../config";
import axios from "axios";
import {IssueNumberAndMrInfo} from "../models/issuenumber-and-mr-info";

type MrInfoStore = {[issueNumber: number]: MergeRequestStatuses[]}

export class MrInfoLoaderService {

  private mrs: MrInfoStore = {}

  async getMrInfoForIssue(issueNumber: number): Promise<MergeRequestStatuses[]> {
    if (this.mrs.hasOwnProperty(issueNumber)) {
      return this.mrs[issueNumber] || []
    }

    const url = `${Config.backendUrl}/issue/${issueNumber}/merge-requests/info`
    const resp = await axios.get<MergeRequestStatuses[]>(url)
    this.mrs[issueNumber] = resp.data || []
    return this.mrs[issueNumber]
  }

  async getMrInfoForIssues(issueNumbers: number[]): Promise<IssueNumberAndMrInfo[]> {
    const res: IssueNumberAndMrInfo[] = []
    const idsForLoading: number[] = []

    for (let i = 0; i < issueNumbers.length; i++) {
      const issueNumber = issueNumbers[i]
      if (this.mrs.hasOwnProperty(issueNumber)) {
        res.push({issueNumber: issueNumber, mergeRequestsInfo: this.mrs[issueNumber]})
      } else {
        idsForLoading.push(issueNumber)
      }
    }

    const url = `${Config.backendUrl}/issues/merge-requests-info`
    const resp = await axios.post<IssueNumberAndMrInfo[]>(url, idsForLoading)
    if (resp.data) {
      res.push(...resp.data)
      for (let i = 0; i < resp.data.length; i++) {
        const mr = resp.data[i]
        this.mrs[mr.issueNumber] = mr.mergeRequestsInfo
      }
    }

    return res
  }

  clear() {
    this.mrs = {}
  }

}

export const mrInfoLoaderService = new MrInfoLoaderService()