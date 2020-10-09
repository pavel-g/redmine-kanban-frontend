import {RedmineIssueData} from "../models/redmine-issue-data";
import {Config} from "../config";
import axios from "axios";

type RedmineIssuesDataStore = {[id: number]: RedmineIssueData}

export class IssuesLoaderService {

  private issues: RedmineIssuesDataStore = {}

  async getIssueData(issueNumber: number): Promise<RedmineIssueData|null> {
    if (this.issues.hasOwnProperty(issueNumber)) {
      return this.issues[issueNumber]
    }

    const url = `${Config.backendUrl}/issue/${issueNumber}`
    const resp = await axios.get<RedmineIssueData>(url)
    const issueData = resp.data
    this.issues[issueNumber] = issueData
    return issueData
  }

  async getIssuesData(ids: number[]): Promise<RedmineIssueData[]> {
    const res: RedmineIssueData[] = []
    const idsForLoading: number[] = []

    for(let i = 0; i < ids.length; i++) {
      const id = ids[i]
      if (this.issues.hasOwnProperty(id)) {
        res.push(this.issues[id])
      } else {
        idsForLoading.push(id)
      }
    }

    const url = `${Config.backendUrl}/issues`
    const resp = await axios.post<RedmineIssueData[]>(url, idsForLoading)

    if (resp.data && resp.data.length > 0) {
      const data = resp.data
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          const issue = data[i]
          this.issues[issue.id] = issue
          res.push(issue)
        }
      }
    }

    return res
  }

  clear(): void {
    this.issues = {}
  }

}

export const issuesLoader = new IssuesLoaderService()