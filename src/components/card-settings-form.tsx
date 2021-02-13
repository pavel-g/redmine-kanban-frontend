import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {CustomCardSettingsUsersViewOption} from "../models/store/custom-card-settings-model";
import {customCardSettingsStore} from "../store/custom-card-settings-store";
import {observer} from "mobx-react";

export const CardSettingsForm = observer(() => {
  const setDescription = (event: any) => {
    if (!event && !event.target) {
      return
    }
    customCardSettingsStore.setDescription(event.target.checked)
  }

  const setUsers = (event: any) => {
    if (!event && !event.target) {
      return
    }
    customCardSettingsStore.setUsers(event.target.value)
  }

  const setMergeRequests = (event: any) => {
    if (!event && !event.target) {
      return
    }
    customCardSettingsStore.setMergeRequests(event.target.checked)
  }

  const setProgress = (event: any) => {
    if (!event && !event.target) {
      return
    }
    customCardSettingsStore.setProgress(event.target.checked)
  }

  const setSpentTime = (event: any) => {
    if (!event && !event.target) {
      return
    }
    customCardSettingsStore.setSpentTime(event.target.checked)
  }

  return (
    <>

      {/*Description*/}
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={customCardSettingsStore.settings.description}
              onChange={setDescription}
              name="descriptionState"
              color="primary"
            />
          }
          label="Описание"
        />
      </FormGroup>

      {/*User*/}
      <FormGroup row>
        <FormControl>
          <InputLabel shrink id="user-label-label">
            Исполнитель
          </InputLabel>
          <Select
            labelId="user-label-label"
            id="user-label"
            value={customCardSettingsStore.settings.users}
            onChange={setUsers}
          >
            <MenuItem value={CustomCardSettingsUsersViewOption.NONE}>Отключить</MenuItem>
            <MenuItem value={CustomCardSettingsUsersViewOption.CURRENT}>Текущий исполнитель</MenuItem>
            <MenuItem value={CustomCardSettingsUsersViewOption.FULL}>Все исполнители</MenuItem>
          </Select>
          <FormHelperText>Исполнитель</FormHelperText>
        </FormControl>
      </FormGroup>

      {/*Merge requests*/}
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={customCardSettingsStore.settings.mergeRequests}
              onChange={setMergeRequests}
              name="mrState"
              color="primary"
            />
          }
          label="Gitlab Merge Requests"
        />
      </FormGroup>

      {/*Progress*/}
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={customCardSettingsStore.settings.progress}
              onChange={setProgress}
              name="progress"
              color="primary"
            />
          }
          label="Прогресс"/>
      </FormGroup>

      {/*Spent time*/}
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={customCardSettingsStore.settings.spentTime}
              onChange={setSpentTime}
              name="spentTime"
              color="primary"
            />
          }
          label="Потраченное время"/>
      </FormGroup>

    </>
  )
})