import {MergeRequestStatusInCard} from "./mergerequest-status-in-card";
import {CustomCardMetadataModel} from "../custom-card-metadata-model";

export type ItemConfig = {
    id: string
    title: string,
    description: string,
    url: string,
    mrs: MergeRequestStatusInCard[],
    rawData: CustomCardMetadataModel
}