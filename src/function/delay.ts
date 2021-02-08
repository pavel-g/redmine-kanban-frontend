export function delay(callback: (...args: any[]) => void, ms: number = 0): () => void {
  let timer: number|null = null
  return () => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(callback, ms)
  }
}