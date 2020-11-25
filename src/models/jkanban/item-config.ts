import {MergeRequestStatusInCard} from "./mergerequest-status-in-card";
import {CustomCardModel} from "../custom-card-model";

export type ItemConfig = {
    id: string
    title: string,
    description: string,
    url: string,
    mrs: MergeRequestStatusInCard[],
    rawData: CustomCardModel
}