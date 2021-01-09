export function GetAddedIssues(expected: number[], actual: number[]): number[] {
  const res: number[] = []
  for (let i = 0; i < expected.length; i++) {
    const expectedItem = expected[i]
    if (actual.indexOf(expectedItem) < 0) {
      res.push(expectedItem)
    }
  }
  return res
}