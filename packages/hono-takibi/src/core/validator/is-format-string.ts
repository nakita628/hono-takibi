import type { Format, FormatString } from '../../types/index.js'

/**
 *  Check if the format is a string type
 * @param { Format } format - OpenAPI format type
 * @returns { boolean } true if the format is a string type, false otherwise
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
