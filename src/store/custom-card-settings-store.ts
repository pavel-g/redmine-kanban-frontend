import {makeObservable, observable} from "mobx";
import {CustomCardSettingsModel} from "../models/store/custom-card-settings-model";
import {DefaultCustomCardSettingsConst} from "../const/default-custom-card-settings-const";

export class CustomCardSettingsStore {

  settings: CustomCardSettingsModel

  constructor(settings: CustomCardSettingsModel) {
    makeObservable(this, {
      settings: observable
    })
    this.settings = settings

    // TODO: 2020-11-29 Remove global variable after implement UI for settings
    const global = window as any
    global["customCardSettingsStore"] = this
  }

}

export const customCardSettingsStore = new CustomCardSettingsStore(DefaultCustomCardSettingsConst)
