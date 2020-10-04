import React, {useRef} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {AddGroupDialogProps} from "../models/components/add-group-dialog-props";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AddGroupDialog = observer((props: AddGroupDialogProps) => {

  const issueNumberRef = useRef(props.data.issueNumber)
  const loadChildrenRef = useRef(props.data.loadChildren)

  const onCancelButtonClick = () => {
    if (props.callback) {
      props.callback(false)
    }
  }

  const onAddButtonClick = () => {
    if (props.callback) {
      const data = {
        issueNumber: issueNumberRef.current,
        loadChildren: loadChildrenRef.current,
        visible: props.data.visible
      }
      props.callback(true, data)
    }
  }

  return (
    <Dialog
      open={props.data.visible}
      onClose={onCancelButtonClick}
    >
      <DialogTitle>Новая группа</DialogTitle>
      <DialogContent>
        <TextField
          id={"new-group-number"}
          label={"Номер задачи"}
          value={issueNumberRef.current}
          type={"number"}
          onChange={(event) => {issueNumberRef.current = Number(event.currentTarget.value)}}
        />
        <FormControlLabel
          control={
            (<Checkbox
              checked={loadChildrenRef.current}
              onChange={(event) => {loadChildrenRef.current = Boolean(event.currentTarget.checked)}}
            />)
          }
          label={"Добавить вложенные задачи"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelButtonClick}>Отменить</Button>
        <Button color={"primary"} onClick={onAddButtonClick}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )

})

export default AddGroupDialog