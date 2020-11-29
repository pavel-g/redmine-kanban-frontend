import React from "react"
import {Store} from "../store/store";
import {observer} from "mobx-react";

export const Title = observer((props: {store: Store}) => {
  const boardName = (props.store.id >= 0 && typeof props.store.name === 'string') ? ` - ${props.store.name}` : ``

  return (
    <>
      Redmine Kanban{boardName}
    </>
  )
})