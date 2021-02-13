import {CustomCardSettingsModel, CustomCardSettingsUsersViewOption} from "../models/store/custom-card-settings-model";

export const DefaultCustomCardSettingsConst: CustomCardSettingsModel = {
  description: true,
  mergeRequests: true,
  users: CustomCardSettingsUsersViewOption.CURRENT,
  spentTime: false,
  progress: false
}