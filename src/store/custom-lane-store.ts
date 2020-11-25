import {CustomCardModel} from "../models/custom-card-model";
import {makeObservable, observable} from "mobx";
import {CustomCardStore} from "./custom-card-store";

export class CustomLaneStore implements ReactTrello.Lane<CustomCardModel> {

  cards: CustomCardStore[];
  id: string;
  label: string;
  title: string;

  constructor(id: string, label: string, title: string, cards: CustomCardStore[]) {
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