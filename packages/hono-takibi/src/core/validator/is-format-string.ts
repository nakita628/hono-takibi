import type { Format, FormatString } from '../../types'

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
