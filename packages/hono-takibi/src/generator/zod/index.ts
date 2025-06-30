import type { Schema, Type } from '../../openapi/index.js'
import { string, number, array, _enum, integer, length, max, min, object } from './z/index.js'
import { stripMinIfgtExist, stripMaxIfLtExist, stripMinMaxExist } from '../../core/utils/index.js'
import { zodToOpenAPI } from '../zod-to-openapi/index.js'
import { getRefSchemaName } from '../../core/schema/references/get-ref-schema-name.js'
import { oneOf } from '../zod-openapi-hono/openapi/components/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/components/anyof/index.js'
import { allOf } from '../zod-openapi-hono/openapi/components/allof/index.js'
import { not } from '../zod-openapi-hono/openapi/components/not/index.js'

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
 * @param { Schema } schema - The schema definition object
 * @returns { string } Generated Zod schema string
 */
export function zod(schema: Schema): string {
  // enum
  if (schema.enum) {
    const res = _enum(schema)
    if (res !== undefined) {
      return res
    }
  }

  // object
  if (schema.type === 'object') {
    return object(schema)
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
      const property = stripMinMaxExist(res, schema.minLength, schema.maxLength)
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
      return stripMinIfgtExist(res, schema.minimum)
    }
    // lt
    if (
      res.includes(`max(${schema.maximum})`) &&
      res.includes(`lt(${schema.maximum})`) &&
      schema.maximum
    ) {
      return stripMaxIfLtExist(res, schema.maximum)
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
        const zodArray = array(zod(schema.items))
        return `${zodArray}${minItemsSchema}${maxItemsSchema}`
      }
      if (schema.minItems) {
        const minItemsSchema = min(schema.minItems)
        const zodArray = array(zod(schema.items))
        return `${zodArray}${minItemsSchema}`
      }
      if (schema.maxItems) {
        const maxItemsSchema = max(schema.maxItems)
        const zodArray = array(zod(schema.items))
        return `${zodArray}${maxItemsSchema}`
      }
      // length
      if (schema.minLength && schema.maxLength && schema.minLength === schema.maxLength) {
        const minLengthSchema = length(schema.minLength)
        const zodArray = array(zodToOpenAPI(schema.items))
        return `${zodArray}${minLengthSchema}`
      }
      return array(zodToOpenAPI(schema.items))
    }
    return 'z.array(z.any())'
  }

  // oneOf
  if (schema.oneOf) {
    return oneOf(schema)
  }

  // anyOf
  if (schema.anyOf) {
    return anyOf(schema)
  }

  // allOf
  if (schema.allOf) {
    return allOf(schema)
  }

  // not
  if (schema.not) {
    return not(schema)
  }

  if (schema.$ref) {
    return getRefSchemaName(schema.$ref)
  }

  // fallback
  if (schema.type) {
    return TYPE_TO_ZOD_SCHEMA[schema.type]
  }
  console.warn(`Unknown type: ${schema.type}, ${JSON.stringify(schema)} falling back to z.any()`)
  return 'z.any()'
}
