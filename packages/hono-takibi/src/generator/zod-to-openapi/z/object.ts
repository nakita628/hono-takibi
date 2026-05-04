import type { Schema } from '../../../openapi/index.js'
import { error, makeSafeKey } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema. Dispatches `additionalProperties` to
 * `z.looseObject` (true), `z.strictObject` (false), `z.record` (Schema), or
 * default `z.object`. Combinators (oneOf/anyOf/allOf/not) delegate to the main
 * `zodToOpenAPI` entry.
 */
export function object(schema: Schema, readonly?: boolean): string {
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema, undefined, readonly)
  }
  const errorMessage = schema['x-error-message']
  const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
  const minimumMessage = schema['x-minimum-message']
  const minErrorArg = minimumMessage ? `,${error(minimumMessage)}` : ''
  const maximumMessage = schema['x-maximum-message']
  const maxErrorArg = maximumMessage ? `,${error(maximumMessage)}` : ''
  const patternMessage = schema['x-pattern-message']
  const patternErrorArg = patternMessage ? `,${error(patternMessage)}` : ''
  const propNamesMessage = schema['x-propertyNames-message']
  const propNamesErrorArg = propNamesMessage ? `,${error(propNamesMessage)}` : patternErrorArg
  const depReqMessage = schema['x-dependentRequired-message']
  const depReqErrorArg = depReqMessage ? `,${error(depReqMessage)}` : errorArg
  if (typeof schema.additionalProperties === 'object') {
    const record = `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties, undefined, readonly)})`
    const recordPatternProps = schema.patternProperties
      ? Object.entries(schema.patternProperties)
          .map(([pattern, propSchema]) => {
            const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
            return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success)${patternErrorArg})`
          })
          .join('')
      : ''
    const recordPropNames = schema.propertyNames?.pattern
      ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))${propNamesErrorArg})`
      : ''
    return `${record}${recordPropNames}${recordPatternProps}${readonly ? '.readonly()' : ''}`
  }
  const objectType =
    schema.additionalProperties === true
      ? 'looseObject'
      : schema.additionalProperties === false
        ? 'strictObject'
        : 'object'
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
  const minProperties =
    typeof schema.minProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length>=${schema.minProperties}${minErrorArg})`
      : ''
  const maxProperties =
    typeof schema.maxProperties === 'number'
      ? `.refine((o)=>Object.keys(o).length<=${schema.maxProperties}${maxErrorArg})`
      : ''
  const propertyNames = schema.propertyNames?.pattern
    ? `.refine((o)=>Object.keys(o).every((k)=>new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))${propNamesErrorArg})`
    : schema.propertyNames?.enum
      ? `.refine((o)=>Object.keys(o).every((k)=>${JSON.stringify(schema.propertyNames.enum)}.includes(k))${propNamesErrorArg})`
      : ''
  const patternProperties = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
          return `.refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp(${JSON.stringify(pattern)}).test(k)||${zodSchema}.safeParse(v).success)${patternErrorArg})`
        })
        .join('')
    : ''
  const dependentRequired = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps.map((d) => `'${d}' in o`).join('&&')
          return `.refine((o)=>!('${key}' in o)||(${depsCheck})${depReqErrorArg})`
        })
        .join('')
    : ''
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${readonly ? '.readonly()' : ''}`
}
