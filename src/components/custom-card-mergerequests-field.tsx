import React from "react";
import {MergeRequestStatuses} from "../models/mergerequest-statuses";
import {CustomCardGitlabPipelineStatus} from "./custom-card-gitlab-pipeline-status";
import {FindPipelineStatusStyle} from "../function/find-pipeline-status-style";
import {DefaultPipelineStatusEmojiConst} from "../const/default-pipeline-status-emoji-const";

export type CustomCardMergerequestsFieldProps = {
  mergerequests: MergeRequestStatuses[]
}

export const CustomCardMergerequestsField = (props: CustomCardMergerequestsFieldProps) => {
  const mrStatusViews: JSX.Element[] = []
  for (let i = 0; i < props.mergerequests.length; i++) {
    const mr = props.mergerequests[i]
    const beforeMerge = mr.before_merge
    const afterMerge = mr.after_merge
    if (beforeMerge) {
      const styleBeforeMerge = FindPipelineStatusStyle(beforeMerge.status, DefaultPipelineStatusEmojiConst)
      const viewBeforeMerge = (
        <CustomCardGitlabPipelineStatus symbol={styleBeforeMerge.symbol} color={styleBeforeMerge.color} url={beforeMerge.web_url}/>
      )
      mrStatusViews.push(viewBeforeMerge)
    }
    if (beforeMerge && afterMerge) {
      const styleAfterMerge = FindPipelineStatusStyle(afterMerge.status, DefaultPipelineStatusEmojiConst)
      const viewAfterMerge = (
        <CustomCardGitlabPipelineStatus symbol={styleAfterMerge.symbol} color={styleAfterMerge.color} url={afterMerge.web_url}/>
      )
      mrStatusViews.push(viewAfterMerge)
    }
  }
  return (
    <span>
      MR: {mrStatusViews}
    </span>
  )
}