import {GitlabPipelineSimpleStatusStyle, GitlabPipelineStatusStylesRules} from "../models/gitlab-pipeline-status-styles-rules";

export function FindPipelineStatusStyle(status: string|null, stylesRules: GitlabPipelineStatusStylesRules): GitlabPipelineSimpleStatusStyle {
  if (status === null) {
    return {color: stylesRules.default.color, symbol: stylesRules.default.symbol}
  }
  const style = stylesRules.styles.find(s => {
    return s.statuses.indexOf(status) >= 0
  })
  return (
    (style)
    ? {color: style.color, symbol: style.symbol}
    : {color: stylesRules.default.color, symbol: stylesRules.default.symbol}
  )
}