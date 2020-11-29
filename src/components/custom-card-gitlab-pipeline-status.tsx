import React from "react"

export type CustomCardGitlabPipelineStatusProps = {
  symbol: string,
  color: string,
  url: string
}

export const CustomCardGitlabPipelineStatus = (props: CustomCardGitlabPipelineStatusProps) => {
  const onStatusClick = () => {
    window.open(props.url)
  }
  return (
    <span style={{color: props.color}} onClick={onStatusClick}>{props.symbol}</span>
  )
}