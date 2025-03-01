import type { Schema, Type } from '../../types'
import type { Config } from '../../config'
import { generateZodArray } from './generate-zod-array'
import { generateZodString } from './generate-zod-string'
import { isFormatString } from '../../core/validator/is-format-string'
import { generateZodNumber } from './generate-zod-number'
import { generateZodIntegerSchema } from './generate-zod-integer-schema'
import { generateAllOfCode } from '../zod-openapi-hono/openapi/component/allof/generate-allof-code'
import { generateAnyOfCode } from '../zod-openapi-hono/openapi/component/anyof/generate-anyof-code'
import { generateOneOfCode } from '../zod-openapi-hono/openapi/component/oneof/generate-oneof-code'
import { getVariableSchemaNameHelper } from '../../core/helper/get-variable-schema-name-helper'
import { generateZodObject } from './generate-zod-object'
import { generateZodEnum } from './generate-zod-enum'
import { generateZodMax } from './generate-zod-max'
import { generateZodMin } from './generate-zod-min'
import { stripMinIfgTExistHelper } from './helper/strip-min-if-gt-exist-helper'
import { stripMaxIfLtExistHelper } from './helper/strip-max-if-lt-exist-helper'
import { generateZodLength } from './generate-zod-length'
import { stripMinMaxExistHelper } from './helper/strip-min-max-exist-helper'

/**
 * Mapping of OpenAPI/JSON Schema types to Zod schema strings
 *
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
 *
 * @function generateZod
 * @param schema - The schema definition object
 * @param schema.type - The type of the schema (e.g., 'string', 'object', 'array')
 * @param schema.format - Optional format specification (e.g., 'date-time', 'email')
 * @param schema.pattern - Optional regex pattern for string validation
 * @param schema.minLength - Optional minimum length for string validation
 * @param schema.maxLength - Optional maximum length for string validation
 * @param schema.minimum - Optional minimum value for number validation
 * @param schema.maximum - Optional maximum value for number validation
 * @param schema.exclusiveMinimum - Whether the minimum value is exclusive for number validation
 * @param schema.exclusiveMaximum - Whether the maximum value is exclusive for number validation
 * @param schema.minItems - Optional minimum number of items for array validation
 * @param schema.maxItems - Optional maximum number of items for array validation
 * @param schema.default - Optional default value for the schema
 * @param schema.example - Optional example value for the schema
 * @param schema.properties - Object properties definition
 * @param schema.required - Array of required property names
 * @param schema.items - Schema for array items
 * @param schema.enum - Array of enum values
 * @param schema.nullable - Whether the schema is nullable
 * @param schema.additionalProperties - Schema for additional properties in objects
 * @param schema.allOf - Array of allOf schemas
 * @param schema.anyOf - Array of anyOf schemas
 * @param schema.oneOf - Array of oneOf schemas
 * @param schema.$ref - Reference to a schema
 * @returns Generated Zod schema string
 *
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
 *
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
 *
 * @remarks
 * - Handles special cases first (enum, object, string with validation, array with items)
 * - Falls back to basic type mapping for simple types
 * - Returns z.any() for unknown types with a warning
 * 
 * @returns string
 */
export function generateZod(
  config: Config,
  schema: Schema,
  paramName?: string,
  isPath?: boolean,
): string {
  // enum
  if (schema.enum) {
    return generateZodEnum(schema)
  }

  // object
  if (schema.type === 'object') {
    return generateZodObject(schema, config)
  }

  // string
  if (schema.type === 'string') {
    const res = generateZodString({
      pattern: schema.pattern,
      minLength: schema.minLength,
      maxLength: schema.maxLength,
      format: schema.format && isFormatString(schema.format) ? schema.format : undefined,
      nullable: schema.nullable,
      default: schema.default,
      example: schema.example,
      paramName,
      isPath,
    })
    // length
    if (
      schema.minLength &&
      schema.maxLength &&
      schema.maxLength &&
      schema.minLength === schema.maxLength &&
      res.includes(`min(${schema.minLength})`) &&
      res.includes(`max(${schema.maxLength})`)
    ) {
      const property = stripMinMaxExistHelper(res, schema.minLength, schema.maxLength)
      return `${property}${generateZodLength(schema.minLength)}`
    }
    return res
  }

  // number
  if (schema.type === 'number') {
    const res = generateZodNumber({
      pattern: schema.pattern,
      minLength: schema.minLength,
      maxLength: schema.maxLength,
      minimum: schema.minimum,
      maximum: schema.maximum,
      default: schema.default,
      example: schema.example,
      paramName,
      isPath,
      exclusiveMinimum: schema.exclusiveMinimum,
      exclusiveMaximum: schema.exclusiveMaximum,
    })
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
    return generateZodIntegerSchema({
      minLength: schema.minLength,
      maxLength: schema.maxLength,
      minimum: schema.minimum,
      maximum: schema.maximum,
      default: schema.default,
      example: schema.example,
      paramName,
      isPath,
    })
  }

  // array
  if (schema.type === 'array' && schema.items) {
    if (schema.minItems && schema.maxItems) {
      const minItemsSchema = generateZodMin(schema.minItems)
      const maxItemsSchema = generateZodMax(schema.maxItems)

      const zodArray = generateZodArray(generateZod(config, schema.items, undefined, undefined))
      const res = `${zodArray}${minItemsSchema}${maxItemsSchema}`
      return res
    }
    if (schema.minItems) {
      const minItemsSchema = generateZodMin(schema.minItems)
      const zodArray = generateZodArray(generateZod(config, schema.items, undefined, undefined))
      const res = `${zodArray}${minItemsSchema}`
      return res
    }
    if (schema.maxItems) {
      const maxItemsSchema = generateZodMax(schema.maxItems)
      const zodArray = generateZodArray(generateZod(config, schema.items, undefined, undefined))
      const res = `${zodArray}${maxItemsSchema}`
      return res
    }
    // length
    if (schema.minLength && schema.maxLength && schema.minLength === schema.maxLength) {
      const minLengthSchema = generateZodLength(schema.minLength)
      const zodArray = generateZodArray(generateZod(config, schema.items, undefined, undefined))
      const res = `${zodArray}${minLengthSchema}`
      return res
    }
    return generateZodArray(generateZod(config, schema.items, undefined, undefined))
  }

  if (schema.allOf) {
    return generateAllOfCode(schema, config)
  }

  if (schema.anyOf) {
    return generateAnyOfCode(schema, config)
  }

  if (schema.oneOf) {
    return generateOneOfCode(schema, config)
  }

  if (schema.$ref) {
    const refParts = schema.$ref.split('/')
    const refName = refParts[refParts.length - 1]
    const schemaName = getVariableSchemaNameHelper(refName, config)
    return schemaName
  }

  // fallback
  if (schema.type) {
    return TYPE_TO_ZOD_SCHEMA[schema.type]
  }
  console.warn(`Unknown type: ${schema.type}, ${JSON.stringify(schema)} falling back to z.any()`)
  return 'z.any()'
}
