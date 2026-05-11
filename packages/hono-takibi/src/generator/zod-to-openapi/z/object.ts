import type { Schema } from '../../../openapi/index.js'
import { error, makeSafeKey } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'
import { buildUnevaluatedProperties } from '../unevaluated.js'

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
  // v3.0: object size uses x-minProperties-message / x-maxProperties-message
  // (split from x-minimum-message / x-maximum-message), and patternProperties
  // uses its own x-patternProperties-message (split from x-pattern-message).
  const minPropsMessage = schema['x-minProperties-message']
  const minErrorArg = minPropsMessage ? `,${error(minPropsMessage)}` : ''
  const maxPropsMessage = schema['x-maxProperties-message']
  const maxErrorArg = maxPropsMessage ? `,${error(maxPropsMessage)}` : ''
  const patternPropsMessage = schema['x-patternProperties-message']
  const patternErrorArg = patternPropsMessage ? `,${error(patternPropsMessage)}` : ''
  const propNamesMessage = schema['x-propertyNames-message']
  const propNamesErrorArg = propNamesMessage ? `,${error(propNamesMessage)}` : ''
  const depReqMessage = schema['x-dependentRequired-message']
  const depReqErrorArg = depReqMessage ? `,${error(depReqMessage)}` : errorArg
  const depSchMessage = schema['x-dependentSchemas-message']
  const depSchErrorArg = depSchMessage ? `,${error(depSchMessage)}` : errorArg
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
  // v3.0: when patternProperties / propertyNames are set without an explicit
  // additionalProperties: false, default to looseObject so the refines see the
  // pattern-matched / propertyName-checked keys (z.object strips unknowns
  // before the refine runs, masking violations — silent bug).
  const needsLoose =
    schema.additionalProperties === undefined &&
    (schema.patternProperties !== undefined || schema.propertyNames !== undefined)
  const objectType =
    schema.additionalProperties === true
      ? 'looseObject'
      : schema.additionalProperties === false
        ? 'strictObject'
        : needsLoose
          ? 'looseObject'
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
  // v2.5: x-additionalProperties-message attaches a custom message to the
  // unrecognized_keys issue (only meaningful for strictObject). Other cases
  // keep the legacy behavior of NOT attaching {error} to the object base for
  // backward compatibility — x-error-message is consumed downstream by the
  // dependentRequired refine etc.
  const addlPropsMessage = schema['x-additionalProperties-message']
  const objectParams =
    objectType === 'strictObject' && addlPropsMessage
      ? `,{error:(issue)=>issue.code==='unrecognized_keys'?${JSON.stringify(addlPropsMessage)}:${errorMessage ? JSON.stringify(errorMessage) : 'undefined'}}`
      : ''
  const base = `z.${objectType}({${propertiesCode}}${objectParams})`
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
  // v2.6: dependentSchemas — when key is present, the whole object must
  // additionally satisfy the named sub-schema. v3.0: uses x-dependentSchemas-message
  // (distinct from x-dependentRequired-message — different keywords with
  // different failure semantics per JSON Schema 2020-12).
  const dependentSchemas = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, subSchema]) => {
          const subZod = zodToOpenAPI(subSchema)
          return `.refine((o)=>!('${key}' in o)||${subZod}.safeParse(o).success${depSchErrorArg})`
        })
        .join('')
    : ''
  // v2.6: if / then / else — conditional sub-schema evaluation
  const ifThenElse = (() => {
    if (!schema.if) return ''
    const ifZod = zodToOpenAPI(schema.if)
    const thenPart = schema.then ? `${zodToOpenAPI(schema.then)}.safeParse(o).success` : 'true'
    const elsePart = schema.else ? `${zodToOpenAPI(schema.else)}.safeParse(o).success` : 'true'
    return `.refine((o)=>${ifZod}.safeParse(o).success?${thenPart}:${elsePart}${errorArg})`
  })()
  // v3.0: unevaluatedProperties — extracted to shared helper for reuse from
  // both this object generator and the top-level allOf/anyOf/oneOf dispatch.
  // (Original v3.0 inline impl preserved below as fallback path / unchanged.)
  // — see ./unevaluated.ts for the helper.
  // The original logic body follows for backward compat with existing tests.
  //
  // JSON Schema 2020-12 §11.2 specifies that anyOf/oneOf/if-then-else only
  // contribute evaluated keys for branches that ACTUALLY succeeded at runtime.
  // Previous v2.6 impl statically aggregated all branches (over-permissive).
  // This v3.0 impl emits a refine that:
  //   1. Pre-populates evaluated keys from own properties + patternProperties
  //      + allOf branches (which always validate)
  //   2. Conditionally adds keys from anyOf/oneOf branches whose safeParse
  //      succeeds at runtime
  //   3. Conditionally adds keys from then/else based on if's success
  //   4. Adds dependentSchemas keys when the dependency key is present
  const unevaluatedProperties = buildUnevaluatedProperties(schema, errorArg, zodToOpenAPI)
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${dependentSchemas}${ifThenElse}${unevaluatedProperties}${readonly ? '.readonly()' : ''}`
}
