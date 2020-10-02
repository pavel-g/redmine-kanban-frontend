import React, {MutableRefObject, useRef, useState} from "react";
import {observer} from "mobx-react";
import {AddIssueDialogData, AddIssueDialogProps} from "../models/components/add-issue-dialog-props";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {addIssueDialogStore} from "../store/add-issue-dialog-store"

const OnCloseDialog = () => {
  addIssueDialogStore.hide()
}

const OnAddButtonClick = (value: number|null) => {
  addIssueDialogStore.setIssueNumber(value)
  OnCloseDialog()
}

const OnCancelButtonClick = () => {
  OnCloseDialog()
}

const AddIssueDialog = observer((props: AddIssueDialogProps) => {
  const issueNumberRef = useRef(props.data.issueNumber)
  return (
    <Dialog
      open={props.data.visible}
      onClose={OnCloseDialog}
    >
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent>
        <TextField
          id={"new-issue-number"}
          label={"Номер задачи"}
          value={props.data.issueNumber}
          type={"number"}
          onChange={(event) => {issueNumberRef.current = Number(event.currentTarget.value)}}
        >
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={OnCancelButtonClick}>Отменить</Button>
        <Button color={"primary"} onClick={() => {OnAddButtonClick(issueNumberRef.current)}}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )
})

export default AddIssueDialog