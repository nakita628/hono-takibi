import type { Format, FormatNumber } from '../../types'

/**
 * Checks if the format is a number type
 *
 * @function isFormatNumber
 *
 * @param format - OpenAPI format type
 * @returns true if the format is a number type, false otherwise
 */
export function isFormatNumber(format: Format): format is FormatNumber {
  return ['int32', 'int64', 'float', 'double'].includes(format)
}
