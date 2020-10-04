export type AddIssueDialogData = {
  visible: boolean,
  issueNumber: number|null
}

export type AddIssueDialogProps = {
  data: AddIssueDialogData,
  callback?: (issueNumber: number|null) => void
}