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
  // additionally satisfy the named sub-schema.
  const dependentSchemas = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, subSchema]) => {
          const subZod = zodToOpenAPI(subSchema)
          return `.refine((o)=>!('${key}' in o)||${subZod}.safeParse(o).success${depReqErrorArg})`
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
  // v2.6: unevaluatedProperties — collect "evaluated" keys statically from
  // own properties + patternProperties + composed sub-schemas. Then refine.
  //
  // KNOWN LIMITATION (documented in takibi-lab/hono-takibi/2026/05/10.md §4.5):
  //   JSON Schema 2020-12 §11.2 specifies that anyOf/oneOf only contribute
  //   evaluated keys for branches that ACTUALLY succeeded at runtime. This
  //   implementation aggregates statically across all branches, which is
  //   over-permissive (false-allow). For strict semantic conformance, users
  //   should restructure schemas to use allOf or discriminatedUnion. The
  //   current behavior is acceptable for the common allOf composition pattern.
  //   Refs ($ref) are not currently expanded for evaluated key collection.
  const unevaluatedProperties = (() => {
    const up = schema.unevaluatedProperties
    if (up === undefined || up === true) return ''
    const evaluated = new Set<string>()
    if (schema.properties) for (const k of Object.keys(schema.properties)) evaluated.add(k)
    const collectFromList = (list?: readonly Schema[]) => {
      if (!list) return
      for (const sub of list) {
        if (sub.properties) for (const k of Object.keys(sub.properties)) evaluated.add(k)
        // recurse into nested allOf to fix loid finding A.1 (one-level only was
        // a bug; nested compositions are now picked up at least one extra level).
        if (sub.allOf) collectFromList(sub.allOf)
      }
    }
    collectFromList(schema.allOf)
    collectFromList(schema.anyOf)
    collectFromList(schema.oneOf)
    // if-branch is also evaluated when it succeeds (loid finding A.4)
    if (schema.if?.properties) for (const k of Object.keys(schema.if.properties)) evaluated.add(k)
    if (schema.then?.properties)
      for (const k of Object.keys(schema.then.properties)) evaluated.add(k)
    if (schema.else?.properties)
      for (const k of Object.keys(schema.else.properties)) evaluated.add(k)
    // dependentSchemas branches (loid finding A.6)
    if (schema.dependentSchemas) {
      for (const sub of Object.values(schema.dependentSchemas)) {
        if (sub.properties) for (const k of Object.keys(sub.properties)) evaluated.add(k)
      }
    }
    const evaluatedJson = JSON.stringify([...evaluated])
    const patterns = schema.patternProperties
      ? `||${JSON.stringify(Object.keys(schema.patternProperties))}.some((p)=>new RegExp(p).test(k))`
      : ''
    if (up === false) {
      return `.refine((o)=>Object.keys(o).every((k)=>${evaluatedJson}.includes(k)${patterns})${errorArg})`
    }
    // up is a Schema → unknown keys must match it
    const subZod = zodToOpenAPI(up)
    return `.refine((o)=>Object.entries(o).every(([k,v])=>${evaluatedJson}.includes(k)${patterns}||${subZod}.safeParse(v).success)${errorArg})`
  })()
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${dependentSchemas}${ifThenElse}${unevaluatedProperties}${readonly ? '.readonly()' : ''}`
}
