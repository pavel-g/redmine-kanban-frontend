import {CustomCardMetadataModel} from "../models/custom-card-metadata-model";
import {makeObservable, observable} from "mobx";
import {CustomCardModel} from "../models/custom-card-model";

export class CustomLaneStore implements ReactTrello.Lane<CustomCardMetadataModel> {

  cards: CustomCardModel[];
  id: string;
  label: string;
  title: string;

  constructor(id: string, label: string, title: string, cards: CustomCardModel[]) {
    makeObservable(this, {
      cards: observable,
      id: observable,
      label: observable,
      title: observable
    })
    this.id = id
    this.title = title
    this.label = label
    this.cards = cards
  }

}