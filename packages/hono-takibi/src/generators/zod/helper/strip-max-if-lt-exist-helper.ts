export function stripMaxIfLtExistHelper(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}
