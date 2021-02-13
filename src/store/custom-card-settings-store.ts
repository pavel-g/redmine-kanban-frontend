import {makeAutoObservable} from "mobx";
import {CustomCardSettingsModel, CustomCardSettingsUsersViewOption} from "../models/store/custom-card-settings-model";
import {DefaultCustomCardSettingsConst} from "../const/default-custom-card-settings-const";

export class CustomCardSettingsStore {

  settings: CustomCardSettingsModel

  constructor(settings: CustomCardSettingsModel) {
    makeAutoObservable(this)
    this.settings = settings

    // TODO: 2020-11-29 Remove global variable after implement UI for settings
    const global = window as any
    global["customCardSettingsStore"] = this
  }

  setDescription(value: boolean): void {
    this.settings.description = value
  }

  setUsers(value: CustomCardSettingsUsersViewOption): void {
    this.settings.users = value
  }

  setMergeRequests(value: boolean): void {
    this.settings.mergeRequests = value
  }

  setProgress(value: boolean): void {
    this.settings.progress = value
  }

  setSpentTime(value: boolean): void {
    this.settings.spentTime = value
  }

}

export const customCardSettingsStore = new CustomCardSettingsStore(DefaultCustomCardSettingsConst)
