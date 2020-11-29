import React, {ChangeEvent} from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AddBoardDialogStore, addBoardDialogStore} from "../store/add-board-dialog";
import {boardStore} from "../store/board";
import {observer} from "mobx-react";

const OnAddBoardDialogClose = () => {
  addBoardDialogStore.clear()
  addBoardDialogStore.toggleVisible()
}

const OnAddBoardButtonClick = async () => {
  await boardStore.addNewBoard(addBoardDialogStore.data.name)
  OnAddBoardDialogClose()
}

const OnNameChange = (event: ChangeEvent) => {
  // @ts-ignore
  const value = (event.target['value'] as string) || ""
  addBoardDialogStore.setName(value)
}

const AddBoardDialog = observer((props: {store: AddBoardDialogStore}) => {
  return (
    <Dialog
      open={props.store.data.visible}
      onClose={OnAddBoardDialogClose}
    >
      <DialogTitle>Новая доска</DialogTitle>
      <DialogContent>
        <TextField id="new-board-name" label="Название" value={props.store.data.name} onChange={OnNameChange}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={OnAddBoardDialogClose}>Отменить</Button>
        <Button color="primary" onClick={OnAddBoardButtonClick}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )
})

export default AddBoardDialog