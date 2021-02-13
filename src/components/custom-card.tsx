import React, {useState} from "react";
import {CustomCardModel} from "../models/custom-card-model";
import {observer} from "mobx-react";
import {CardHeader, CardRightContent, CardTitle, Detail, Footer, MovableCardWrapper} from "../styles/Base";
import {CustomCardMergerequestsField} from "./custom-card-mergerequests-field";
import {Config} from "../config";
import {customCardSettingsStore} from "../store/custom-card-settings-store";
import {CustomCardSettingsUsersViewOption} from "../models/store/custom-card-settings-model";
import {CustomCardSpentTime} from "./custom-card-spent-time";
import {CustomCardSpentTimeStore} from "../store/custom-card-spent-time-store";

export const CustomCard = observer((props: CustomCardModel) => {
  if (!props) {
    return (
      <>
        <div>Empty card</div>
      </>
    )
  }

  const metadata = props.metadata

  const issueUrl = `${Config.redminePublicUrl}/issues/${metadata.issueNumber}`

  const onTitleClick = () => {
    window.open(issueUrl)
  }

  const descriptionView = customCardSettingsStore.settings.description ? (<Detail>{props.description}</Detail>) : undefined

  const mergeRequestsView = customCardSettingsStore.settings.mergeRequests
    ? (<div><CustomCardMergerequestsField mergerequests={props.metadata.mergeRequests}/></div>)
    : undefined

  let userView: JSX.Element|undefined

  if (customCardSettingsStore.settings.users === CustomCardSettingsUsersViewOption.CURRENT) {
    userView = (<div>{props.currentUser}</div>)
  } else if (customCardSettingsStore.settings.users === CustomCardSettingsUsersViewOption.FULL) {
    const executor = (metadata.redmineIssueData?.assigned_to?.name) ? metadata.redmineIssueData.assigned_to.name : "-"
    userView = (
      <>
        <div>Исп: {executor}</div>
        <div>CR: {props.metadata.customFields.cr?.firstname} {props.metadata.customFields.cr?.lastname}</div>
        <div>QA: {props.metadata.customFields.qa?.firstname} {props.metadata.customFields.qa?.lastname}</div>
      </>
    )
  } else {
    userView = undefined
  }

  const progressView = customCardSettingsStore.settings.progress
    ? (<div>Прогресс: {props.metadata.redmineIssueData?.done_ratio || 0}%</div>)
    : undefined

  const [spentTimeStore] = useState(() => new CustomCardSpentTimeStore())
  spentTimeStore.setSpentTime(props.metadata.redmineIssueData.spent_hours || 0)
  spentTimeStore.setEstimationTime(props.metadata.redmineIssueData.estimated_hours || 0)
  const spentTimeView = customCardSettingsStore.settings.spentTime
    ? (<CustomCardSpentTime store={spentTimeStore}/>)
    : undefined

  return (
    <MovableCardWrapper>
      <CardHeader>
        <CardTitle onClick={onTitleClick}>{props.title}</CardTitle>
        <CardRightContent/>
      </CardHeader>
      {descriptionView}
      <Footer>
        {userView}
        {mergeRequestsView}
        {progressView}
        {spentTimeView}
      </Footer>
    </MovableCardWrapper>
  )
})