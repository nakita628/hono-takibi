/**
 * Converts a string to a safe TypeScript object key.
 * - Returns as-is if it's a valid identifier
 * - Otherwise wraps it in double quotes (via JSON.stringify)
 */
export function getToSafeIdentifier(str: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(str) ? str : JSON.stringify(str)
}
