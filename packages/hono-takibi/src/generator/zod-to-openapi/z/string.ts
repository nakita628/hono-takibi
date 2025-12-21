import type { Schemas } from '../../../openapi/index.js'
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

/**
 * Builds a Zod string schema from an OpenAPI string schema definition.
 *
 * - If `schema.format` exists and matches `FORMAT_STRING`, uses `z.<format>()`; otherwise falls back to `z.string()`
 * - If `schema.pattern` is set, appends `.regex(...)` using the `regex()` helper
 * - If `minLength` and `maxLength` are defined and equal, appends `.length(n)`
 * - Otherwise, appends `.min(n)` and/or `.max(n)` individually
 * - Returns the concatenated Zod schema string
 *
 * @example
 * ```ts
 * // With format, pattern, and minLength
 * string({ type: 'string', format: 'email', pattern: '^.+@example\\.com$', minLength: 5 })
 * // => 'z.email().regex(/^.+@example\\.com$/).min(5)'
 * ```
 *
 * @param schemas - OpenAPI string schema
 * @returns Concatenated Zod string schema
 */
export function string(schemas: Schemas): string {
  const format = schemas.format && FORMAT_STRING[schemas.format]
  const base = format ? `z.${format}` : 'z.string()'

  const pattern = schemas.pattern ? regex(schemas.pattern) : undefined

  const isFixedLength =
    schemas.minLength !== undefined &&
    schemas.maxLength !== undefined &&
    schemas.minLength === schemas.maxLength

  return [
    base,
    pattern,
    // minLength === maxLength → .length(n)
    isFixedLength ? `.length(${schemas.minLength})` : undefined,
    !isFixedLength && schemas.minLength !== undefined ? `.min(${schemas.minLength})` : undefined,
    !isFixedLength && schemas.maxLength !== undefined ? `.max(${schemas.maxLength})` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join('')
}
