export function regexPattern(pattern: string) {
  const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  const res = `/${escapedPattern}/`
  return res
}
