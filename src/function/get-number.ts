export const GetNumber = (value: any): number|null => {
  if (typeof value === 'number') {
    return value as number
  } else if (typeof value === 'string') {
    return (!isNaN(+value)) ? Number(value) : null
  }
  return null
}