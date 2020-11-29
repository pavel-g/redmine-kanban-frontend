/**
 * Style for multiple statuses for gitlab pipelines
 */
export type GitlabPipelineStatusesStyle = {
  statuses: string[],
  symbol: string,
  color: string
}

/**
 * Simple status style for gitlab pipeline
 */
export type GitlabPipelineSimpleStatusStyle = {
  symbol: string,
  color: string
}

/**
 * Rules for styles of statuses for gitlab pipelines
 */
export type GitlabPipelineStatusStylesRules = {
  styles: GitlabPipelineStatusesStyle[],
  default: GitlabPipelineSimpleStatusStyle
}