export function stripMinIfgTExistHelper(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}
