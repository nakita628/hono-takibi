import type { Schema } from '../../../openapi/types.js'
import { _default, length, max, min, regex } from '../../../utils/index.js'

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

  /* ---------- base / format ---------- */
  const fmt = schema.format && FORMAT_STRING[schema.format]
  parts.push(fmt ? `z${fmt}` : 'z.string()')

  /* ---------- pattern ---------- */
  if (schema.pattern) parts.push(regex(schema.pattern))

  /* ---------- length constraints ---------- */
  const { minLength, maxLength } = schema

  // special-case: equal min & max  → .length()
  if (minLength !== undefined && maxLength !== undefined && minLength === maxLength) {
    parts.push(length(minLength)) // utils.length() -> '.length(n)'
  } else {
    if (minLength !== undefined) parts.push(min(minLength))
    if (maxLength !== undefined) parts.push(max(maxLength))
  }

  /* ---------- default (always last) ---------- */
  if (schema.default !== undefined) parts.push(_default(schema.default))

  return parts.join('')
}
