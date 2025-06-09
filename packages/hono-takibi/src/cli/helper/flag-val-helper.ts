/**
 * @param as - The array of strings to check for the flag
 * @param f - The flag to look for
 */
export function flagValHelper(as: string[], f: string) {
  const idx = as.indexOf(f)
  if (idx !== -1 && as[idx + 1] && as[idx + 1] !== '=') return as[idx + 1]
  const eq = as.find((a) => a.startsWith(`${f}=`))
  if (eq) return eq.split('=')[1]
  if (idx !== -1 && as[idx + 1] === '=' && as[idx + 2]) return as[idx + 2]
  return undefined
}
