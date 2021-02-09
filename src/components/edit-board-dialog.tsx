import React, {ChangeEvent} from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {observer} from "mobx-react";
import {EditBoardDialogStore, editBoardDialogStore} from "../store/edit-board-dialog";
import {store} from "../store/store";

const Close = () => {
  editBoardDialogStore.data.config = ""
  editBoardDialogStore.data.visible = false
}

const Save = async () => {
  await store.save(editBoardDialogStore.data.config)
  Close()
}

const Change = (event: ChangeEvent) => {
  // @ts-ignore
  const value = (event.target['value'] as string) || ""
  editBoardDialogStore.data.config = value
}

const EditBoardDialog = observer((props: {store: EditBoardDialogStore}) => {
  return (
    <Dialog
      open={props.store.data.visible}
      onClose={Close}
      maxWidth="md"
    >
      <DialogTitle>Редактирование доски</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={20}
          value={props.store.data.config}
          onChange={Change}
          fullWidth={true}
          style={{width: 450}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={Close}>Отменить</Button>
        <Button onClick={Save} color="primary">Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
})

export default EditBoardDialog