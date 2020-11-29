import React from "react";
import {CustomCardModel} from "../models/custom-card-model";
import {observer} from "mobx-react";
import {MovableCardWrapper, CardHeader, CardTitle, CardRightContent, Detail, Footer} from "../styles/Base";
import {CustomCardMergerequestsField} from "./custom-card-mergerequests-field";
import {Config} from "../config";

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

  return (
    <MovableCardWrapper>
      <CardHeader>
        <CardTitle onClick={onTitleClick}>{props.title}</CardTitle>
        <CardRightContent></CardRightContent>
      </CardHeader>
      <Detail>
        {props.description}
      </Detail>
      <Footer>
        <div>{props.currentUser}</div>
        <div><CustomCardMergerequestsField mergerequests={props.metadata.mergeRequests}/></div>
      </Footer>
    </MovableCardWrapper>
  )
})