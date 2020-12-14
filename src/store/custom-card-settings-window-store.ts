import {action, makeObservable, observable} from "mobx";

export class CustomCardSettingsWindowStore {

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

export const customCardSettingsWindowStore = new CustomCardSettingsWindowStore(false)