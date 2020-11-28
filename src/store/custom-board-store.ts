import {CustomCardMetadataModel} from "../models/custom-card-metadata-model";
import {makeObservable, observable} from "mobx";
import {CustomLaneStore} from "./custom-lane-store";

/**
 * Store data for instance of ReactTrello
 */
export class CustomBoardStore implements ReactTrello.BoardData<CustomCardMetadataModel> {

  lanes: CustomLaneStore[]

  constructor(lanes: CustomLaneStore[] = []) {
    makeObservable(this, {
      lanes: observable
    })
    this.lanes = lanes
  }

}