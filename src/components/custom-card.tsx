import React from "react";

export const CustomCard = (
  onClick?: (e: any) => void,
  className?: string|object,
  name?: string,
  cardStyle?: string,
  body?: string,
  dueOn?: string|Date,
  cardColor?: string,
  subTitle?: string,
  tagStyle?: string|object,
  escalationText?: string,
  tags?: string|object|string[],
  showDeleteButton?: boolean,
  onDelete?: (e: any) => void
) => {
  return (
    <div>Custom card</div>
  )
}