export enum CustomCardSettingsUsersViewOption {
  FULL = "FULL",
  CURRENT = "CURRENT",
  NONE = "NONE"
}

export type CustomCardSettingsModel = {
  users: CustomCardSettingsUsersViewOption,
  mergeRequests: boolean
  description: boolean
}