import { allOf } from '../../helper/allof.js'
import { anyOf } from '../../helper/anyof.js'
import { not } from '../../helper/not.js'
import { oneOf } from '../../helper/oneof.js'
import type { Schema } from '../../openapi/index.js'
import { refSchema } from '../../utils/index.js'
import { _enum, integer, number, object, string } from './z/index.js'

/**
 * Converts an OpenAPI `Schema` object into a Zod schema string.
 *
 * Handles primitives (`string`, `number`, `boolean`, `array`, `object`, `integer`),
 * references (`$ref`), constants (`const`), enums, combinators (`oneOf`, `anyOf`, `allOf`, `not`),
 * and other schema metadata (`nullable`, `minLength`, `maxLength`, `exclusiveMinimum`, etc).
 *
 * If the schema is unrecognized or empty, defaults to `'z.any()'`.
 *
 * @param schema - The OpenAPI schema object to convert
 * @returns A string representing the corresponding Zod schema
 *
 * @example
 * // String schema
 * zod({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Enum schema
 * zod({ type: 'string', enum: ['A', 'B'] })
 * // → 'z.enum(["A","B"])'
 *
 * @example
 * // Nullable number with exclusiveMinimum
 * zod({ type: 'number', exclusiveMinimum: 3, nullable: true })
 * // → 'z.number().gt(3).nullable()'
 *
 * @example
 * // Object with properties
 * zod({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * @example
 * // Reference schema
 * zod({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 *
 * @example
 * // Unknown schema
 * zod({})
 * // → 'z.any()'
 *
 * @remarks
 * - Automatically applies `.nullable()` if applicable
 * - Combines `.min()` / `.max()` into `.length()` where appropriate
 * - Optimizes out redundant `.min()` when `.gt()` is used
 * - Logs unhandled cases to `console.warn`
 */
export function zod(schema: Schema): string {
  if (schema === undefined) {
    throw new Error('hono-takibi: only #/components/schemas/* is supported')
  }
  /* $ref */
  if (schema.$ref) {
    return refSchema(schema.$ref)
  }
  /* const */
  if (schema.const !== undefined) {
    const z = `z.literal(${JSON.stringify(schema.const)})`
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* enum */
  if (schema.enum) {
    const z = _enum(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  const pickTypes = (t: Schema['type']): readonly string[] => {
    return t === undefined ? [] : Array.isArray(t) ? t : [t]
  }
  const types = pickTypes(schema.type)
  /* object */
  if (types.includes('object')) {
    const z = object(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* date */
  if (types.includes('date')) {
    const z = 'z.date()'
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  /* string */
  if (types.includes('string')) {
    const z = string({
      format: schema.format,
      pattern: schema.pattern,
      minLength: schema.minLength,
      maxLength: schema.maxLength,
    })
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* number */
  if (types.includes('number')) {
    const z = number({
      format: schema.format,
      minimum: schema.minimum,
      exclusiveMinimum: schema.exclusiveMinimum,
      maximum: schema.maximum,
      exclusiveMaximum: schema.exclusiveMaximum,
      multipleOf: schema.multipleOf,
    })
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  /* integer & bigint */
  if (types.includes('integer')) {
    const z = integer({
      format: schema.format,
      minimum: schema.minimum,
      exclusiveMinimum: schema.exclusiveMinimum,
      maximum: schema.maximum,
      exclusiveMaximum: schema.exclusiveMaximum,
      multipleOf: schema.multipleOf,
    })
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  /* array */
  if (types.includes('array')) {
    const array = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      if (schema.minItems === schema.maxItems) {
        const z = `${array}.length(${schema.minItems})`
        return applyModifiers(z, {
          _default: schema.default,
          nullable: schema.nullable,
          type: schema.type,
        })
      }
      return `${array}.min(${schema.minItems}).max(${schema.maxItems})`
    }
    if (typeof schema.minItems === 'number') {
      const z = `${array}.min(${schema.minItems})`
      return applyModifiers(z, {
        _default: schema.default,
        nullable: schema.nullable,
        type: schema.type,
      })
    }
    if (typeof schema.maxItems === 'number') {
      const z = `${array}.max(${schema.maxItems})`
      return applyModifiers(z, {
        _default: schema.default,
        nullable: schema.nullable,
        type: schema.type,
      })
    }
    return applyModifiers(array, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* boolean */
  if (types.includes('boolean')) {
    const z = 'z.boolean()'
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* combinators */
  if (schema.oneOf) {
    const z = oneOf(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  if (schema.anyOf) {
    const z = anyOf(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  if (schema.allOf) {
    const z = allOf(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
      format: schema.format,
    })
  }
  if (schema.not) {
    const z = not(schema)
    return applyModifiers(z, {
      _default: schema.default,
      nullable: schema.nullable,
      type: schema.type,
    })
  }
  /* null only */
  if (types.length === 1 && types[0] === 'null') {
    return 'z.null()'
  }
  console.warn('fallback to z.any()')
  return 'z.any()'
}

export function applyModifiers(
  z: string,
  args: {
    _default?: unknown
    nullable?: boolean
    type?:
      | 'string'
      | 'number'
      | 'integer'
      | 'date'
      | 'boolean'
      | 'array'
      | 'object'
      | 'null'
      | [
          'string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null',
          ...('string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null')[],
        ]
    format?: string
  },
): string {
  const o = [z]
  const defaultVal =
    args._default === undefined
      ? undefined
      : args.type === 'date'
        ? `new Date(${JSON.stringify(args._default)})`
        : args.type === 'integer' && args.format === 'int64'
          ? `${JSON.stringify(args._default)}n`
          : args.type === 'integer' && args.format === 'bigint'
            ? `BigInt(${JSON.stringify(args._default)})`
            : JSON.stringify(args._default)

  if (defaultVal !== undefined) {
    o.push(`.default(${defaultVal})`)
  }
  const isNullable =
    args.nullable === true ||
    (Array.isArray(args.type) ? args.type.includes('null') : args.type === 'null')
  if (isNullable) {
    o.push('.nullable()')
  }
  return o.join('')
}
