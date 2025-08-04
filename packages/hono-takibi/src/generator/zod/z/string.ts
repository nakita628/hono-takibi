import type { Schema } from '../../../openapi/index.js'
import { regex } from '../../../utils/index.js'

const FORMAT_STRING: Record<string, string> = {
  email: 'email()',
  uuid: 'uuid()',
  uuidv4: 'uuidv4()',
  uuidv6: 'uuidv6()',
  uuidv7: 'uuidv7()',
  uri: 'url()',
  emoji: 'emoji()',
  base64: 'base64()',
  base64url: 'base64url()',
  nanoid: 'nanoid()',
  cuid: 'cuid()',
  cuid2: 'cuid2()',
  ulid: 'ulid()',
  ipv4: 'ipv4()',
  ipv6: 'ipv6()',
  cidrv4: 'cidrv4()',
  cidrv6: 'cidrv6()',
  date: 'iso.date()',
  time: 'iso.time()',
  'date-time': 'iso.datetime()',
  duration: 'iso.duration()',
  binary: 'file()',
  toLowerCase: 'toLowerCase()',
  toUpperCase: 'toUpperCase()',
  trim: 'trim()',
  jwt: 'jwt()',
}

/** Build a Zod string schema from an OpenAPI string schema. */
export function string(schema: Schema): string {
  const o: string[] = []
  const format = schema.format && FORMAT_STRING[schema.format]
  o.push(format ? `z.${format}` : 'z.string()')
  // pattern
  if (schema.pattern) {
    o.push(regex(schema.pattern))
  }
  // length
  if (
    schema.minLength !== undefined &&
    schema.maxLength !== undefined &&
    schema.minLength === schema.maxLength
  ) {
    o.push(`.length(${schema.minLength})`)
  } else {
    if (schema.minLength !== undefined) {
      o.push(`.min(${schema.minLength})`)
    }
    if (schema.maxLength !== undefined) {
      o.push(`.max(${schema.maxLength})`)
    }
  }
  return o.join('')
}
