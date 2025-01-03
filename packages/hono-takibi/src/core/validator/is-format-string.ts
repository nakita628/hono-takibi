import type { Format, FormatString } from '../../types'

/**
 * Checks if the format is a string type
 *
 * @function isFormatString
 * @param format - OpenAPI format type
 * @returns true if the format is a string type, false otherwise
 */
export function isFormatString(format: Format): format is FormatString {
  return [
    'email',
    'uri',
    'emoji',
    'uuid',
    'cuid',
    'cuid2',
    'ulid',
    'date-time',
    'ip',
    'cidr',
    'trim',
    'toLowerCase',
    'toUpperCase',
    'date',
    'time',
    'duration',
    'base64',
  ].includes(format)
}
