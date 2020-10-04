import React from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AddIssueMenuProps} from "../models/components/add-issue-menu-props";

const AddIssueMenu = (props: AddIssueMenuProps) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const onMenuClose = () => {
    setAnchorEl(null);
  }

  const onAddIssueInsideClick = () => {
    props.onAddInsideClick && props.onAddInsideClick()
    onMenuClose()
  }
  const onAddIssueBeforeClick = () => {
    props.onAddBeforeClick && props.onAddBeforeClick()
    onMenuClose()
  }
  const onAddIssueAfterClick = () => {
    props.onAddAfterClick && props.onAddAfterClick()
    onMenuClose()
  }

  return (
    <>
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

}

export default AddIssueMenu