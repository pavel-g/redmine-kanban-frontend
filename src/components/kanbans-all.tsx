import React from "react";
import Kanban from "./kanban";
import {observer} from "mobx-react";
import {KanbansAllProps} from "../models/components/kanban-all-props";
import {Store} from "../store/store";

const KanbansAll = observer((props: {store: Store}) => {
  const components = props.store.config.config?.map(issueParam => {
    return (
      <Kanban
        number={issueParam.number}
        title={issueParam.title}
        children={issueParam.children}
        redmineData={issueParam.redmineData}
      />
    )
  })
  console.log('KanbanAll components', components) // DEBUG
  return (
    <>
      {components}
    </>
  )
})

export default KanbansAll