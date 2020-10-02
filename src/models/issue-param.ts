export type IssueParam = {
    number?: number,
    title?: string,
    children?: IssueParam[]
}