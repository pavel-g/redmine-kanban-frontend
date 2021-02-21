import React from 'react'
import {observer} from "mobx-react";
import {delay} from "../function/delay";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {editBoardGeneratorInputStore} from "../store/edit-board-generator-input-store";
import {EditBoardGeneratorTypeEnum} from "../enums/edit-board-generator-type-enum";
import axios from "axios";
import {Config} from "../config";

export const EditBoardGeneratorInputForm = observer((props: {onGenerate?: (config: string) => void}) => {
  const onChange = delay((event: any) => {
    const value = (event?.target?.value || '') as string
    editBoardGeneratorInputStore.setValue(value)
  }, 250)

  const onClick = async () => {
    if (props.onGenerate) {
      const backendUrl = Config.backendUrl
      if (editBoardGeneratorInputStore.type === EditBoardGeneratorTypeEnum.ROOT) {
        const issueNumber = editBoardGeneratorInputStore.rootOrNull
        const resp = await axios.get<string>(`${backendUrl}/generate-from-root/${issueNumber}`)
        const data = JSON.stringify(resp.data, null, "    ")
        props.onGenerate(data)
      } else if (editBoardGeneratorInputStore.type === EditBoardGeneratorTypeEnum.LIST) {
        const issueNumbers = editBoardGeneratorInputStore.listOrNull
        if (issueNumbers !== null) {
          const body = JSON.stringify(issueNumbers)
          const resp = await axios.post<string>(
            `${backendUrl}/generate-from-list`,
            body,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
          const data = JSON.stringify(resp.data, null, "    ")
          props.onGenerate(data)
        }
      }
    }
  }

  return (
    <Box flexDirection="row">
      <TextField
        onChange={onChange}
      />
      <Button
        disabled={editBoardGeneratorInputStore.buttonDisabled}
        onClick={onClick}
      >
        {editBoardGeneratorInputStore.buttonLabel}
      </Button>
    </Box>
  )
})