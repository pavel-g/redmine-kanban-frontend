import {GroupStoreModel} from "./store/group-store-model";

/**
 * Model of swimlane
 */
export type CustomSwimlaneModel = {
  id: string,
  title: string|null,
  issueNumber: number|null,
  reactTrelloConfig: GroupStoreModel
}

/**
 * Common validator for CustomSwimlaneModel
 * @param model
 */
export function validateCustomGroupModel(model: CustomSwimlaneModel): Promise<boolean> {
  if (typeof model.title === 'string' || typeof model.issueNumber === 'number') {
    return Promise.resolve(true)
  } else {
    return Promise.reject(Error('title and issueNumber undefined'))
  }
}