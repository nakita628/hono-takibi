import type { Schema } from '../../../openapi/types.js'
import { _default, max, min, regex } from '../../../utils/index.js'

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

/**
 * Generates a Zod schema string for string types.
 *
 * @param schema - The parameters to generate the Zod string schema.
 * @returns The generated Zod schema string.
 */
export function string(schema: Schema): string {
  const validations: string[] = []

  const base = schema.format && FORMAT_STRING[schema.format]
  validations.push(base ? `z${base}` : 'z.string()')

  // pattern
  if (schema.pattern) {
    validations.push(regex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(min(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(max(schema.maxLength))
  }
  // default
  if (schema.default) {
    validations.push(_default(schema.default))
  }
  return validations.join('')
}
