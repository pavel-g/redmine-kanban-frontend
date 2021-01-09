export function GetRemovedIssues(expected: number[], actual: number[]): number[] {
  const res: number[] = []
  for (let i = 0; i < actual.length; i++) {
    const actualItem = actual[i]
    if (expected.indexOf(actualItem) < 0) {
      res.push(actualItem)
    }
  }
  return res
}
