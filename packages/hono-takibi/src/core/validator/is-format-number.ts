import type { Format, FormatNumber } from '../../types'

/**
 * Check if the format is a number type
 * @param {Format} format - OpenAPI format type
 * @returns {boolean} true if the format is a number type, false otherwise
 */
export function isFormatNumber(format: Format): format is FormatNumber {
  return ['int32', 'int64', 'float', 'double'].includes(format)
}
