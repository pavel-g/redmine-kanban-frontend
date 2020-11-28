import React from "react";
import {CustomCardStore} from "../store/custom-card-store";
import {observer} from "mobx-react";

export const CustomCard = observer((props: CustomCardStore) => {
  if (!props) {
    return (
      <>
        <div>Empty card</div>
      </>
    )
  }

  const metadata = props.metadata

  return (
    <>
      <div>Custom Card</div>
      <div>{metadata.redmineIssueData.tracker.name} #{metadata.redmineIssueData.id}</div>
      <hr/>
      <div>{metadata.redmineIssueData.subject}</div>
    </>
  )
})