import React from "react"
import {observer} from "mobx-react";
import {CustomCardSpentTimeStore} from "../store/custom-card-spent-time-store";

export const CustomCardSpentTime = observer((params: {store: CustomCardSpentTimeStore}): JSX.Element => {
  return (
    <div>Время: {params.store.formattedSpendTime}/{params.store.formattedEstimationTime}</div>
  )
})