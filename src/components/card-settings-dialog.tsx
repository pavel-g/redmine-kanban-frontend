import React from "react"
import {observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CardSettingsForm} from "./card-settings-form";
import Button from '@material-ui/core/Button';
import {customCardSettingsDialogStore} from "../store/custom-card-settings-dialog-store";

export const CardSettingsDialog = observer(() => {
  const onClose = () => {
    customCardSettingsDialogStore.setVisible(false)
  }

  return (
    <Dialog open={customCardSettingsDialogStore.visible} onClose={onClose}>
      <DialogTitle>Настройка карточки</DialogTitle>
      <DialogContent>
        <CardSettingsForm/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Ok</Button>
      </DialogActions>
    </Dialog>
  )
})