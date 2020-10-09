import React from "react";
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
  const onAddButtonClick = () => {
    if (props.callback) {
      const data = {
        issueNumber: props.data.issueNumber,
        loadChildren: props.data.loadChildren,
        visible: props.data.visible
      }
      props.callback(true, data)
    }
  }

  const onCancelButtonClick = () => {
    if (props.callback) {
      props.callback(false)
    }
  }

  const onChangeIssueNumber = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    props.data.setIssueNumber(Number(event.currentTarget.value))
  }
  const onChangeLoadChildren = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.data.setLoadChildren(Boolean(event.currentTarget.checked))
  }

  return (
    <Dialog
      open={props.data.visible}
      onClose={onCancelButtonClick}
    >
      <DialogTitle>Новая группа</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            id={"new-group-number"}
            label={"Номер задачи"}
            value={props.data.issueNumber}
            type={"number"}
            onChange={onChangeIssueNumber}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              (<Checkbox
                checked={props.data.loadChildren}
                onChange={onChangeLoadChildren}
              />)
            }
            label={"Добавить вложенные задачи"}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelButtonClick}>Отменить</Button>
        <Button color={"primary"} onClick={onAddButtonClick}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )

})

export default AddGroupDialog