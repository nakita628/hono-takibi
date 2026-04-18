import type { Schema } from '../../../openapi/index.js'
import { error, makeSafeKey } from '../../../utils/index.js'
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
 * @param readonly - Whether to add `.readonly()` modifier to the generated object
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
export function object(schema: Schema, readonly?: boolean): string {
  // Delegate combinators to zodToOpenAPI
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema, undefined, readonly)
  }
  // Read vendor extensions for error messages
  const errorMessage = schema['x-error-message']
  const errorErrArg = errorMessage ? `,${error(errorMessage)}` : ''
  const minimumMessage = schema['x-minimum-message']
  const minErrArg = minimumMessage ? `,${error(minimumMessage)}` : ''
  const maximumMessage = schema['x-maximum-message']
  const maxErrArg = maximumMessage ? `,${error(maximumMessage)}` : ''
  const patternMessage = schema['x-pattern-message']
  const patternErrArg = patternMessage ? `,${error(patternMessage)}` : ''
  const propNamesMsg = schema['x-propertyNames-message']
  const propNamesErrArg = propNamesMsg ? `,${error(propNamesMsg)}` : patternErrArg
  const depReqMsg = schema['x-dependentRequired-message']
  const depReqErrArg = depReqMsg ? `,${error(depReqMsg)}` : errorErrArg
  // additionalProperties as Schema → record type
  if (typeof schema.additionalProperties === 'object') {
    const record = `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties, undefined, readonly)})`
    const recordPatternProps = schema.patternProperties
      ? Object.entries(schema.patternProperties)
          .map(([pattern, propSchema]) => {
            const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
            return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success)${patternErrArg})`
          })
          .join('')
      : ''
    const recordPropNames = schema.propertyNames?.pattern
      ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))${propNamesErrArg})`
      : ''
    return `${record}${recordPropNames}${recordPatternProps}${readonly ? '.readonly()' : ''}`
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
          const z = zodToOpenAPI(
            propSchema,
            isRequired ? undefined : { isOptional: true },
            readonly,
          )
          return `${safeKey}:${z}`
        })
        .join(',')
    : ''
  const base = `z.${objectType}({${propertiesCode}})`
  const minP =
    typeof schema.minProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length>=${schema.minProperties}${minErrArg})`
      : ''
  const maxP =
    typeof schema.maxProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length<=${schema.maxProperties}${maxErrArg})`
      : ''
  // propertyNames: validate that all keys match the given schema constraints
  const propNames = schema.propertyNames?.pattern
    ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))${propNamesErrArg})`
    : schema.propertyNames?.enum
      ? `.refine((o)=>Object.keys(o).every((k)=>${JSON.stringify(schema.propertyNames.enum)}.includes(k))${propNamesErrArg})`
      : ''
  // patternProperties: validate values match schema per key pattern
  const patternProps = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
          return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success)${patternErrArg})`
        })
        .join('')
    : ''
  // dependentRequired: if key present, dependent keys must also be present
  const depReq = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps.map((d) => `'${d}' in o`).join('&&')
          return `.refine((o)=>!('${key}' in o)||(${depsCheck})${depReqErrArg})`
        })
        .join('')
    : ''
  return `${base}${minP}${maxP}${propNames}${patternProps}${depReq}${readonly ? '.readonly()' : ''}`
}
