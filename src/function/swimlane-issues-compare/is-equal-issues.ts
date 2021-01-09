export function IsEqualIssues(expected: number[], actual: number[]): boolean {
  for (let i = 0; i < expected.length; i++) {
    const expectedItem = expected[i]
    if (actual.indexOf(expectedItem) < 0) {
      return false
    }
  }
  for (let j = 0; j < actual.length; j++) {
    const actualItem = actual[j]
    if (expected.indexOf(actualItem) < 0) {
      return false
    }
  }
  return true
}