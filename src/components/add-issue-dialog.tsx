import React from "react";
import {observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {delay} from "../function/delay";
import {AddIssueDialogStore} from "../store/add-issue-dialog-store";
import {GetNumber} from "../function/get-number";

const AddIssueDialog = observer((props: {store: AddIssueDialogStore}) => {

  const onAddButtonClick = () => {
    props.store.callback(props.store.issueNumber)
  }

  const onCancelButtonClick = () => {
    props.store.callback(null)
  }

  const onChange = delay((event) => {
    if (!event || !event.currentTarget || typeof event.currentTarget.value === 'undefined') {
      return
    }

    props.store.issueNumber = GetNumber(event.currentTarget.value)
  }, 250)

  return (
    <Dialog
      open={props.store.visible}
      onClose={onCancelButtonClick}
    >
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent>
        <TextField
          id={"new-issue-number"}
          label={"Номер задачи"}
          value={props.store.issueNumber}
          type={"number"}
          onChange={onChange}
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