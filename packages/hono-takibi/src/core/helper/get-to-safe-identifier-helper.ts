/**
 * getToSafeIdentifierHelper
 * @param {string} str - The string to be converted to a safe identifier
 * @returns {string} - A normalized, safe identifier
 */
export function getToSafeIdentifierHelper(str: string): string {
  const trimmed = str.trim()
  if (trimmed.includes('-')) {
    return trimmed.replace(/\s*-\s*/g, '_')
  }
  return trimmed
}
