import React from "react"
import {observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {SyncSwimlaneIssuesForm} from "./sync-swimlane-issues-form";
import {SyncSwimlaneIssuesStore} from "../store/sync-swimlane-issues-store";
import {SyncSwimlaneIssuesDialogStore} from "../store/sync-swimlane-issues-dialog-store";

export type SyncSwimlaneIssuesDialogProps = {
  formStore: SyncSwimlaneIssuesStore,
  dialogStore: SyncSwimlaneIssuesDialogStore
}

export const SyncSwimlaneIssuesDialog = observer((props: SyncSwimlaneIssuesDialogProps) => {
  const onOkClick = () => {
    props.dialogStore.setVisible(false)
    const data = props.formStore.issuesDifference
    props.dialogStore.callback(data)
  }
  const onCancelClick = () => {
    props.dialogStore.setVisible(false)
    props.dialogStore.callback(null)
  }
  return (
    <Dialog open={props.dialogStore.visible} maxWidth="md">
      <DialogTitle>Синхронизация подзадач</DialogTitle>
      <DialogContent>
        <SyncSwimlaneIssuesForm store={props.formStore}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick}>
          Отмена
        </Button>
        <Button onClick={onOkClick} color="primary">
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  )
})