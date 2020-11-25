import {CustomCardModel} from "../models/custom-card-model";
import {makeObservable, observable} from "mobx";
import {CustomLaneStore} from "./custom-lane-store";

/**
 * Store data for instance of ReactTrello
 */
export class CustomBoardStore implements ReactTrello.BoardData<CustomCardModel> {

  lanes: CustomLaneStore[]

  constructor(lanes: CustomLaneStore[] = []) {
    makeObservable(this, {
      lanes: observable
    })
    this.lanes = lanes
  }

}