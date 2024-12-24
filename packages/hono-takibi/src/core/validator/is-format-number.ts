import type { Format, FormatNumber } from '../../types'

export function isFormatNumber(format: Format): format is FormatNumber {
  return ['int32', 'int64', 'float', 'double'].includes(format)
}
