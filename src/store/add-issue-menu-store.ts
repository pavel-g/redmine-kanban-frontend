import {makeAutoObservable} from "mobx";

export class AddIssueMenuStore {
  onAddInsideClick: () => void = () => {}
  onAddBeforeClick: () => void = () => {}
  onAddAfterClick: () => void = () => {}
  onSyncClick: () => void = () => {}
  isMayBeSync: boolean = false
  constructor() {
    makeAutoObservable(this)
  }
}