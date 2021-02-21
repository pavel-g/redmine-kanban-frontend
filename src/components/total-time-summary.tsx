import React from "react";
import {observer} from "mobx-react";
import {store} from "../store/store";

export const TotalTimeSummary = observer((): JSX.Element => {
  return (
    <>
      {store.spentTotalTime?.toFixed(1) || "-"}/{store.estimatedTotalTime?.toFixed(1) || "-"}
    </>
  )
})