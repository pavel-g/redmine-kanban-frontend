import React from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AddIssueMenuStore} from "../store/add-issue-menu-store";
import {observer} from "mobx-react";
import SyncIcon from '@material-ui/icons/Sync';

const AddIssueMenu = observer((props: {store: AddIssueMenuStore}) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const onMenuClose = () => {
    setAnchorEl(null);
  }

  const onAddIssueInsideClick = () => {
    props.store.onAddInsideClick && props.store.onAddInsideClick()
    onMenuClose()
  }
  const onAddIssueBeforeClick = () => {
    props.store.onAddBeforeClick && props.store.onAddBeforeClick()
    onMenuClose()
  }
  const onAddIssueAfterClick = () => {
    props.store.onAddAfterClick && props.store.onAddAfterClick()
    onMenuClose()
  }
  const onSyncClick = () => {
    props.store.onSyncClick && props.store.onSyncClick()
    onMenuClose()
  }

  return (
    <>
      <IconButton onClick={onSyncClick} disabled={!props.store.isMayBeSync}>
        <SyncIcon/>
      </IconButton>
      <IconButton onClick={onMenuClick}>
        <AddIcon/>
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        anchorEl={anchorEl}
        keepMounted
      >
        <MenuItem onClick={onAddIssueInsideClick}>Добавить подзадачу</MenuItem>
        <MenuItem onClick={onAddIssueBeforeClick}>Добавить группу выше</MenuItem>
        <MenuItem onClick={onAddIssueAfterClick}>Добавить группу ниже</MenuItem>
      </Menu>
    </>
  )

})

export default AddIssueMenu