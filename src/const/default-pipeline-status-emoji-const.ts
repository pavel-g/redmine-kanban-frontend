import {GitlabPipelineStatusStylesRules} from "../models/gitlab-pipeline-status-styles-rules";

export const DefaultPipelineStatusEmojiConst: GitlabPipelineStatusStylesRules = {
  styles: [
    {
      statuses: ["success"],
      symbol: "🌑",
      color: "green"
    },
    {
      statuses: ["failed"],
      symbol: "🌑",
      color: "red"
    },
    {
      statuses: ["canceled", "skipped", "manual"],
      symbol: "🌑",
      color: "gray"
    },
    {
      statuses: ["created", "waiting_for_resource", "preparing", "pending"],
      symbol: "🌑",
      color: "yellow"
    },
    {
      statuses: ["running"],
      symbol: "🌑",
      color: "blue"
    }
  ],
  default: {
    symbol: "?",
    color: "black"
  }
}
