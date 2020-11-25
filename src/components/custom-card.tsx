import React from "react";
import {CustomCardStore} from "../store/custom-card-store";
import {observer} from "mobx-react";

export const CustomCard = observer((props: {store: CustomCardStore}) => {
  if (!props || !props.store || !props.store.data) {
    return (
      <>
        <div>Empty card</div>
      </>
    )
  }

  const metadata = props.store.data

  return (
    <>
      <div>Custom Card</div>
      <div>{metadata.redmineIssueData.tracker.name} #{metadata.redmineIssueData.id}</div>
      <hr/>
      <div>{metadata.redmineIssueData.subject}</div>
    </>
  )
})