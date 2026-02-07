import type { Schema } from '../../../openapi/index.js'
import { makeSafeKey } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * Handles the following OpenAPI object patterns:
 * - Plain object: `z.object({...})`
 * - additionalProperties: true → `z.looseObject({...})`
 * - additionalProperties: false → `z.strictObject({...})`
 * - additionalProperties: Schema → `z.record(z.string(), ...)`
 *
 * @param schema - Schema definition
 * @returns The Zod object schema string
 *
 * @example
 * ```ts
 * // Basic object with properties
 * object({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * // Strict object (no additional properties)
 * object({ type: 'object', additionalProperties: false })
 * // → 'z.strictObject({})'
 *
 * // Record type (dictionary)
 * object({ type: 'object', additionalProperties: { type: 'number' } })
 * // → 'z.record(z.string(),z.number())'
 * ```
 */
export function object(schema: Schema): string {
  // Delegate combinators to zodToOpenAPI
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema)
  }

  // additionalProperties as Schema → record type
  if (typeof schema.additionalProperties === 'object') {
    const record = `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties)})`
    const recordPatternProps = schema.patternProperties
      ? Object.entries(schema.patternProperties)
          .map(([pattern, propSchema]) => {
            const zodSchema = zodToOpenAPI(propSchema)
            return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success))`
          })
          .join('')
      : ''
    const recordPropNames = schema.propertyNames?.pattern
      ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k)))`
      : ''
    return `${record}${recordPropNames}${recordPatternProps}`
  }

  // Determine object type based on additionalProperties boolean
  const objectType =
    schema.additionalProperties === true
      ? 'looseObject'
      : schema.additionalProperties === false
        ? 'strictObject'
        : 'object'

  // Build properties code if present
  const propertiesCode = schema.properties
    ? Object.entries(schema.properties)
        .map(([key, propSchema]) => {
          const isRequired = Array.isArray(schema.required) && schema.required.includes(key)
          const safeKey = makeSafeKey(key)
          const z = zodToOpenAPI(propSchema, isRequired ? undefined : { isOptional: true })
          return `${safeKey}:${z}`
        })
        .join(',')
    : ''

  const base = `z.${objectType}({${propertiesCode}})`
  const minP =
    typeof schema.minProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length>=${schema.minProperties})`
      : ''
  const maxP =
    typeof schema.maxProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length<=${schema.maxProperties})`
      : ''
  // propertyNames: validate that all keys match the given schema constraints
  const propNames = schema.propertyNames?.pattern
    ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k)))`
    : schema.propertyNames?.enum
      ? `.refine((o)=>Object.keys(o).every((k)=>${JSON.stringify(schema.propertyNames.enum)}.includes(k)))`
      : ''
  // patternProperties: validate values match schema per key pattern
  const patternProps = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema)
          return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success))`
        })
        .join('')
    : ''
  // dependentRequired: if key present, dependent keys must also be present
  const depReq = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps.map((d) => `'${d}' in o`).join('&&')
          return `.refine((o)=>!('${key}' in o)||(${depsCheck}))`
        })
        .join('')
    : ''
  return `${base}${minP}${maxP}${propNames}${patternProps}${depReq}`
}
