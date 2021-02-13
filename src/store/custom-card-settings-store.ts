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
    this.saveSettings()
  }

  setUsers(value: CustomCardSettingsUsersViewOption): void {
    this.settings.users = value
    this.saveSettings()
  }

  setMergeRequests(value: boolean): void {
    this.settings.mergeRequests = value
    this.saveSettings()
  }

  setProgress(value: boolean): void {
    this.settings.progress = value
    this.saveSettings()
  }

  setSpentTime(value: boolean): void {
    this.settings.spentTime = value
    this.saveSettings()
  }

  setSettings(value: CustomCardSettingsModel): void {
    this.settings.description = value.description
    this.settings.spentTime = value.spentTime
    this.settings.progress = value.progress
    this.settings.users = value.users
    this.settings.mergeRequests = value.mergeRequests
  }

  private saveSettings(): void {
    const settings = JSON.stringify(this.settings)
    window.localStorage.setItem('card_settings', settings)
  }

}

export const customCardSettingsStore = new CustomCardSettingsStore(DefaultCustomCardSettingsConst)

const settings = window.localStorage.getItem('card_settings')
if (typeof settings === 'string') {
  customCardSettingsStore.setSettings(JSON.parse(settings))
}