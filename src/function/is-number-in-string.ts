export function IsNumberInString(value: string): boolean {
  return (typeof value === 'string' && !isNaN(+value) && isFinite(+value))
}