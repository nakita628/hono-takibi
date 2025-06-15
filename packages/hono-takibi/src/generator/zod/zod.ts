import type { Schema, Type } from '../../openapi/index.js'
import type { Config } from '../../config/index.js'
import { string, number, array, _enum, integer, length, max, min, object } from './index.js'
import { getVariableSchemaName } from '../../core/helper/index.js'
import { stripMinIfgTExistHelper } from './helper/strip-min-if-gt-exist-helper.js'
import { stripMaxIfLtExistHelper } from './helper/strip-max-if-lt-exist-helper.js'
import { stripMinMaxExistHelper } from './helper/strip-min-max-exist-helper.js'
import { oneOf } from '../zod-openapi-hono/openapi/component/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/component/anyof/index.js'
import { allOf } from '../zod-openapi-hono/openapi/component/allof/index.js'
import { not } from '../zod-openapi-hono/openapi/component/not/index.js'
import { zodToOpenAPI } from '../zod-to-openapi/index.js'

/**
 * Mapping of OpenAPI/JSON Schema types to Zod schema strings
 * @remarks
 * - Basic types are mapped directly to their Zod equivalents
 * - Complex types (object, string with validation, array with items) are handled separately
 * - Used as a fallback for simple type conversions
 */
const TYPE_TO_ZOD_SCHEMA: Record<Type, string> = {
  number: 'z.number()',
  integer: 'z.number().int()',
  bigint: 'z.bigint()',
  boolean: 'z.boolean()',
  date: 'z.date()',
  null: 'z.null()',
  any: 'z.any()',
  unknown: 'z.unknown()',
  string: 'z.string()',
  object: 'z.object({})',
  array: 'z.array()',
} as const

/**
 * Generates a Zod schema string from an OpenAPI/JSON Schema definition
 * @param { Config } config - The configuration object
 * @param { Schema } schema - The schema definition object
 * @returns { string } Generated Zod schema string
 * @example
 * // Enum type
 * generateZod({ enum: ['active', 'inactive'] })
 * // Returns: 'z.enum(["active","inactive"])'
 *
 * @example
 * // Object with properties
 * generateZod({
 *   type: 'object',
 *   properties: {
 *     name: { type: 'string' },
 *     age: { type: 'number' }
 *   },
 *   required: ['name']
 * })
 * // Returns: 'z.object({name: z.string(), age: z.number().optional()})'
 * @example
 * // String with validation
 * generateZod({
 *   type: 'string',
 *   minLength: 3,
 *   maxLength: 10,
 *   pattern: '^[a-z]+$'
 * })
 * // Returns: 'z.string().min(3).max(10).regex(/^[a-z]+$/)'
 *
 * @example
 * // Array with items
 * generateZod({
 *   type: 'array',
 *   items: { type: 'string' }
 * })
 * // Returns: 'z.array(z.string())'
 * @remarks
 * - Handles special cases first (enum, object, string with validation, array with items)
 * - Falls back to basic type mapping for simple types
 * - Returns z.any() for unknown types with a warning
 */
export function zod(config: Config, schema: Schema): string {
  // enum
  if (schema.enum) {
    const res = _enum(schema)
    if (res !== undefined) {
      return res
    }
  }

  // object
  if (schema.type === 'object') {
    return object(schema, config)
  }

  // string
  if (schema.type === 'string') {
    const res = string(schema)
    // length
    if (
      schema.minLength &&
      schema.maxLength &&
      schema.minLength === schema.maxLength &&
      res.includes(`min(${schema.minLength})`) &&
      res.includes(`max(${schema.maxLength})`)
    ) {
      const property = stripMinMaxExistHelper(res, schema.minLength, schema.maxLength)
      return `${property}${length(schema.minLength)}`
    }
    return res
  }

  // number
  if (schema.type === 'number') {
    const res = number(schema)
    // gt
    if (
      res.includes(`min(${schema.minimum})`) &&
      res.includes(`gt(${schema.minimum})`) &&
      schema.minimum
    ) {
      return stripMinIfgTExistHelper(res, schema.minimum)
    }
    // lt
    if (
      res.includes(`max(${schema.maximum})`) &&
      res.includes(`lt(${schema.maximum})`) &&
      schema.maximum
    ) {
      return stripMaxIfLtExistHelper(res, schema.maximum)
    }
    return res
  }

  // integer
  if (schema.type === 'integer') {
    return integer(schema)
  }

  // array
  if (schema.type === 'array') {
    if (schema.items) {
      if (schema.minItems && schema.maxItems) {
        const minItemsSchema = min(schema.minItems)
        const maxItemsSchema = max(schema.maxItems)

        const zodArray = array(zod(config, schema.items))
        const res = `${zodArray}${minItemsSchema}${maxItemsSchema}`
        return res
      }
      if (schema.minItems) {
        const minItemsSchema = min(schema.minItems)
        const zodArray = array(zod(config, schema.items))
        const res = `${zodArray}${minItemsSchema}`
        return res
      }
      if (schema.maxItems) {
        const maxItemsSchema = max(schema.maxItems)
        const zodArray = array(zod(config, schema.items))
        const res = `${zodArray}${maxItemsSchema}`
        return res
      }
      // length
      if (schema.minLength && schema.maxLength && schema.minLength === schema.maxLength) {
        const minLengthSchema = length(schema.minLength)
        const zodArray = array(zodToOpenAPI(config, schema.items, undefined, undefined))
        const res = `${zodArray}${minLengthSchema}`
        return res
      }
      return array(zodToOpenAPI(config, schema.items, undefined, undefined))
    }
    return 'z.array(z.any())'
  }

  // oneOf
  if (schema.oneOf) {
    return oneOf(schema, config)
  }

  // anyOf
  if (schema.anyOf) {
    return anyOf(schema, config)
  }

  // allOf
  if (schema.allOf) {
    return allOf(schema, config)
  }

  // not
  if (schema.not) {
    return not(schema)
  }

  if (schema.$ref) {
    const refParts = schema.$ref.split('/')
    const refName = refParts[refParts.length - 1]
    const schemaName = getVariableSchemaName(refName, config.schema.name)
    return schemaName
  }

  // fallback
  if (schema.type) {
    return TYPE_TO_ZOD_SCHEMA[schema.type]
  }
  console.warn(`Unknown type: ${schema.type}, ${JSON.stringify(schema)} falling back to z.any()`)
  return 'z.any()'
}
