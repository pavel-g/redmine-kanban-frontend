import {GitlabPipelineSimpleStatusStyle} from "./gitlab-pipeline-status-styles-rules";

export type GitlabMergerequestsStatusesStyles = {
  before_merge: GitlabPipelineSimpleStatusStyle|null
  after_merge: GitlabPipelineSimpleStatusStyle|null
}