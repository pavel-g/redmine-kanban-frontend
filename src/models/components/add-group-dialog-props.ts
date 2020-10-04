export type AddGroupDialogData = {
  issueNumber: number,
  loadChildren: boolean,
  visible: boolean
}

export type AddGroupDialogProps = {
  data: AddGroupDialogData,
  callback?: (ok: boolean, data?: AddGroupDialogData) => void
}