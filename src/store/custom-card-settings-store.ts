import {action, makeObservable, observable} from "mobx";
import {CustomCardSettingsModel, CustomCardSettingsUsersViewOption} from "../models/store/custom-card-settings-model";
import {DefaultCustomCardSettingsConst} from "../const/default-custom-card-settings-const";

export class CustomCardSettingsStore {

  settings: CustomCardSettingsModel

  constructor(settings: CustomCardSettingsModel) {
    makeObservable(this, {
      settings: observable,
      setDescription: action,
      setUsers: action,
      setMergeRequests: action
    })
    this.settings = settings

    // TODO: 2020-11-29 Remove global variable after implement UI for settings
    const global = window as any
    global["customCardSettingsStore"] = this
  }

  setDescription(value: boolean) {
    this.settings.description = value
  }

  setUsers(value: CustomCardSettingsUsersViewOption) {
    this.settings.users = value
  }

  setMergeRequests(value: boolean) {
    this.settings.mergeRequests = value
  }

}

export const customCardSettingsStore = new CustomCardSettingsStore(DefaultCustomCardSettingsConst)
