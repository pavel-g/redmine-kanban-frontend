import {makeObservable, observable} from "mobx";
import {CustomSwimlaneModel} from "../models/custom-swimlane-model";

export class CustomSwimlaneStore {

  data: CustomSwimlaneModel

  constructor(data: CustomSwimlaneModel) {
    makeObservable(this, {
      data: observable
    })
    this.data = data
  }

}