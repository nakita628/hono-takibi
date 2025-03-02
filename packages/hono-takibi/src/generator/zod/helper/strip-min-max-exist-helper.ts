export function stripMinMaxExistHelper(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}
