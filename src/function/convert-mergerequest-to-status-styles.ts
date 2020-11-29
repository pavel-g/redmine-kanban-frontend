import {MergeRequestStatuses} from "../models/mergerequest-statuses";
import {GitlabMergerequestsStatusesStyles} from "../models/gitlab-mergerequests-statuses-styles";
import {FindPipelineStatusStyle} from "./find-pipeline-status-style";
import {DefaultPipelineStatusEmojiConst} from "../const/default-pipeline-status-emoji-const";

export function ConvertMergerequestToStatusStyles(mr: MergeRequestStatuses): GitlabMergerequestsStatusesStyles {
  const beforeMergeStatus = mr.before_merge?.status || null
  const afterMergeStatus = mr.after_merge?.status || null
  return {
    before_merge: beforeMergeStatus ? FindPipelineStatusStyle(beforeMergeStatus, DefaultPipelineStatusEmojiConst) : null,
    after_merge: afterMergeStatus ? FindPipelineStatusStyle(afterMergeStatus, DefaultPipelineStatusEmojiConst) : null
  }
}