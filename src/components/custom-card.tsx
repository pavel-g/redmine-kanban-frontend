import React from "react";
import {CustomCardModel} from "../models/custom-card-model";
import {observer} from "mobx-react";
import {MovableCardWrapper, CardHeader, CardTitle, CardRightContent, Detail} from "../styles/Base";

export const CustomCard = observer((props: CustomCardModel) => {
  if (!props) {
    return (
      <>
        <div>Empty card</div>
      </>
    )
  }

  const metadata = props.metadata

  return (
    <MovableCardWrapper>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardRightContent></CardRightContent>
      </CardHeader>
      <Detail>{props.description}</Detail>
    </MovableCardWrapper>
  )
})