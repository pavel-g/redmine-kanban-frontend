import {AddGroupDialogStore} from "../../store/add-group-dialog-store";

export type AddGroupDialogData = {
  issueNumber: number|null,
  loadChildren: boolean,
  visible: boolean
}

export type AddGroupDialogProps = {
  data: AddGroupDialogStore,
  callback?: (ok: boolean, data?: AddGroupDialogData) => void
}