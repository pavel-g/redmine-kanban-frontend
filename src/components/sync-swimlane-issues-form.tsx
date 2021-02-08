import React, {useRef} from "react"
import {observer} from "mobx-react";
import TextField from '@material-ui/core/TextField';
import {SyncSwimlaneIssuesStore} from "../store/sync-swimlane-issues-store";
import {IssuesDifferenceModel} from "../models/issues-difference-model";
import {delay} from "../function/delay";

export type SyncSwimlaneIssuesFormProps = {
  store: SyncSwimlaneIssuesStore,
}

export const SyncSwimlaneIssuesForm = observer((props: SyncSwimlaneIssuesFormProps) => {
  const valueRef = useRef(JSON.stringify(props.store.issuesDifference, null, "    "))
  const onChange = delay((e: any) => {
    if (!e || !e.target || typeof e.target.value !== 'string') {
      return
    }
    const rawValue = e.target.value as string
    valueRef.current = rawValue
    const newValue = JSON.parse(rawValue) as IssuesDifferenceModel
    props.store.setIssuesDifference(newValue)
  }, 250)
  return (
    <TextField
      label="Diff"
      multiline
      rows={15}
      defaultValue=""
      value={valueRef.current}
      onChange={onChange}
      fullWidth={true}
    />
  )
})