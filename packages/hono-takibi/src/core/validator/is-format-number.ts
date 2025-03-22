import type { Format, FormatNumber } from '../../type'

/**
 * @function isFormatNumber
 * @description Checks if the format is a number type
 * @param format - OpenAPI format type
 * @returns true if the format is a number type, false otherwise
 */
export function isFormatNumber(format: Format): format is FormatNumber {
  return ['int32', 'int64', 'float', 'double'].includes(format)
}
