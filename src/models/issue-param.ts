import {RedmineIssueData} from "./redmine-issue-data";

/**
 * Описание задачи из группы или группы задач
 */
export type IssueParam = {
    number?: number,
    title?: string,
    children?: IssueParam[],
    redmineData?: RedmineIssueData
}