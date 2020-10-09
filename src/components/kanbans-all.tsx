import React from "react";
import Kanban from "./kanban";
import {observer} from "mobx-react";
import {KanbansAllProps} from "../models/components/kanban-all-props";
import {Store} from "../store/store";

const KanbansAll = observer((props: {store: Store}) => {
  const components = props.store.data.map(param => {
    return (
      <Kanban
        {...param}
      />
    )
  })

  return (
    <>
      {components}
    </>
  )
})

export default KanbansAll