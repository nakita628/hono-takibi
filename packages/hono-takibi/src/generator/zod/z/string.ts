import type { Schema } from '../../../openapi/index.js'
import { regex } from '../../../utils/index.js'

const FORMAT_STRING: Record<string, string> = {
  email: '.email()',
  uuid: '.uuid()',
  uuidv4: '.uuidv4()',
  uuidv6: '.uuidv6()',
  uuidv7: '.uuidv7()',
  uri: '.url()',
  emoji: '.emoji()',
  base64: '.base64()',
  base64url: '.base64url()',
  nanoid: '.nanoid()',
  cuid: '.cuid()',
  cuid2: '.cuid2()',
  ulid: '.ulid()',
  ipv4: '.ipv4()',
  ipv6: '.ipv6()',
  cidrv4: '.cidrv4()',
  cidrv6: '.cidrv6()',
  date: '.iso.date()',
  time: '.iso.time()',
  'date-time': '.iso.datetime()',
  duration: '.iso.duration()',
  binary: '.file()',
  toLowerCase: '.toLowerCase()',
  toUpperCase: '.toUpperCase()',
  trim: '.trim()',
  jwt: '.jwt()',
}

/** Build a Zod string schema from an OpenAPI string schema. */
export function string(schema: Schema): string {
  const parts: string[] = []

  const format = schema.format && FORMAT_STRING[schema.format]
  parts.push(format ? `z${format}` : 'z.string()')

  if (schema.pattern) {
    parts.push(regex(schema.pattern))
  }

  if (
    schema.minLength !== undefined &&
    schema.maxLength !== undefined &&
    schema.minLength === schema.maxLength
  ) {
    parts.push(`.length(${schema.minLength})`)
  } else {
    if (schema.minLength !== undefined) {
      parts.push(`.min(${schema.minLength})`)
    }
    if (schema.maxLength !== undefined) {
      parts.push(`.max(${schema.maxLength})`)
    }
  }

  if (schema.default !== undefined) {
    parts.push(`.default(${JSON.stringify(schema.default)})`)
  }

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  if (isNullable) {
    parts.push('.nullable()')
  }

  return parts.join('')
}
