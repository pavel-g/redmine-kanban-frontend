import React from "react"
import {CustomCardGitlabPipelineStatus} from "./custom-card-gitlab-pipeline-status";

export type CustomCardMergerequestStatusProps = {
  id: number,
  before_merge: {
    symbol: string,
    color: string,
    url: string
  },
  after_merge: {
    symbol: string,
    color: string,
    url: string
  }|null
}

export const CustomCardMergerequestStatus = (props: CustomCardMergerequestStatusProps) => {
  const pipelines: any[] = [
    (<CustomCardGitlabPipelineStatus key={0} {...props.before_merge}/>)
  ]
  if (props.after_merge) {
    pipelines.push(
      (<CustomCardGitlabPipelineStatus key={1} {...props.after_merge}/>)
    )
  }
  return (
    <>
      {pipelines}
    </>
  )
}