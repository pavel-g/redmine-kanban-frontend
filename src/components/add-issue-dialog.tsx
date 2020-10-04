import React, {useRef} from "react";
import {observer} from "mobx-react";
import {AddIssueDialogProps} from "../models/components/add-issue-dialog-props";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddIssueDialog = observer((props: AddIssueDialogProps) => {
  const issueNumberRef = useRef(props.data.issueNumber)

  const onAddButtonClick = () => {
    if (props.callback) {
      props.callback(issueNumberRef.current)
    }
  }

  const onCancelButtonClick = () => {
    if (props.callback) {
      props.callback(null)
    }
  }

  return (
    <Dialog
      open={props.data.visible}
      onClose={onCancelButtonClick}
    >
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent>
        <TextField
          id={"new-issue-number"}
          label={"Номер задачи"}
          value={issueNumberRef.current}
          type={"number"}
          onChange={(event) => {issueNumberRef.current = Number(event.currentTarget.value)}}
        >
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelButtonClick}>Отменить</Button>
        <Button color={"primary"} onClick={onAddButtonClick}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )
})

export default AddIssueDialog