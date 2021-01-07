import {action, makeObservable, observable} from "mobx";

export class CustomCardSettingsDialogStore {

  visible: boolean

  constructor(visible: boolean) {
    makeObservable(this, {
      visible: observable,
      setVisible: action
    })
    this.visible = visible
  }

  setVisible(value: boolean) {
    this.visible = value
  }

}

export const customCardSettingsDialogStore = new CustomCardSettingsDialogStore(false)