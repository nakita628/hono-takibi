import type { Schema } from '../../types/index.js'
import { regex,_default } from './index.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodNullable } from './generate-zod-nullable.js'

const FORMAT_STRING: Record<string, string> = {
  email: '.email()',
  uuid: '.uuid()',
  ip: '.ip()',
  cidr: '.cidr()',
  cuid: '.cuid()',
  cuid2: '.cuid2()',
  ulid: '.ulid()',
  nanoid: '.nanoid()',
  uri: '.url()',
  base64: '.base64()',
  toLowerCase: '.toLowerCase()',
  toUpperCase: '.toUpperCase()',
  date: '.date()',
  'date-time': '.datetime()',
  time: '.time()',
  duration: '.duration()',
  trim: '.trim()',
  emoji: '.emoji()',
  binary: '.instanceof(Uint8Array)',
}

/**
 * Generates a Zod string schema
 * @param { Schema } schema - The parameters to generate the zod string schema.
 * @returns { string } Generated Zod string schema string
 * @example
 * // Basic string validation
 * generateZodString({})
 * // Returns: 'z.string()'
 * @example
 * // With regex pattern
 * generateZodString({ pattern: '^[A-Z]+$' })
 * // Returns: 'z.string().regex(/^[A-Z]+$/)'
 * @example
 * // With length constraints
 * generateZodString({ minLength: 3, maxLength: 10 })
 * // Returns: 'z.string().min(3).max(10)'
 * @example
 * // With format
 * generateZodString({ format: 'email' })
 * // Returns: 'z.string().email()'
 * @example
 * // Combined validations
 * generateZodString({
 *   pattern: '^[a-z]+$',
 *   minLength: 3,
 *   maxLength: 10,
 *   format: 'email'
 * })
 * // Returns: 'z.string().regex(/^[a-z]+$/).min(3).max(10).email()'
 */
export function string(schema: Schema): string {
  const validations: string[] = []

  if (schema.format === 'binary') {
    validations.push('z.instanceof(Uint8Array)')
  } else {
    const base = schema.format && FORMAT_STRING[schema.format]
    validations.push(base ? `z.string()${base}` : 'z.string()')
  }

  // pattern
  if (schema.pattern) {
    validations.push(regex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(generateZodMin(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(generateZodMax(schema.maxLength))
  }
  // nullable
  if (schema.nullable) {
    validations.push(generateZodNullable())
  }
  // default
  if (schema.default) {
    validations.push(_default(schema.default))
  }
  return validations.join('')
}
