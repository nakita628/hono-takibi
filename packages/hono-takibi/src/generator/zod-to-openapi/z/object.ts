import { buildUnevaluatedProperties } from '../../../helper/zod.js'
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
  // v3.0: object size uses x-minProperties-message / x-maxProperties-message
  // (split from x-minimum-message / x-maximum-message), and patternProperties
  // uses its own x-patternProperties-message (split from x-pattern-message).
  const minPropsMessage = schema['x-minProperties-message']
  const minErrorArg = minPropsMessage ? `,${error(minPropsMessage)}` : ''
  const maxPropsMessage = schema['x-maxProperties-message']
  const maxErrorArg = maxPropsMessage ? `,${error(maxPropsMessage)}` : ''
  const patternPropsMessage = schema['x-patternProperties-message']
  const propNamesMessage = schema['x-propertyNames-message']
  const depReqMessage = schema['x-dependentRequired-message']
  // v3.1: x-dependentSchemas-message is intentionally retained as a slot but
  // is no longer applied to inner sub-issues (would force code='custom' and
  // erase code/expected). Survives in the OpenAPI roundtrip via wrap().
  // v3.1: superRefine emits sub-path + preserves issue code/message instead of
  // collapsing everything into a single `custom` issue at the parent path.
  // The pattern message slot, if set, OVERRIDES the inner issue's message
  // (otherwise we keep Zod's native message verbatim — code/expected stay).
  const patternPropsMessageOverride = patternPropsMessage
    ? `,message:${JSON.stringify(patternPropsMessage)}`
    : ''
  if (typeof schema.additionalProperties === 'object') {
    const record = `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties, undefined, readonly)})`
    const recordPatternProps = schema.patternProperties
      ? Object.entries(schema.patternProperties)
          .map(([pattern, propSchema]) => {
            const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
            return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pattern)});const Schema=${zodSchema};for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]${patternPropsMessageOverride}})}})`
          })
          .join('')
      : ''
    const recordPropNames = schema.propertyNames?.pattern
      ? (() => {
          const pat = schema.propertyNames.pattern
          const msg = propNamesMessage
            ? JSON.stringify(propNamesMessage)
            : `"Property name '"+k+"' does not match pattern ${pat.replace(/"/g, '\\"')}"`
          return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pat)});for(const k of Object.keys(o)){if(!regex.test(k))ctx.addIssue({code:"custom",path:[k],message:${msg}})}})`
        })()
      : ''
    return `${record}${recordPropNames}${recordPatternProps}${readonly ? '.readonly()' : ''}`
  }
  // v3.0: when patternProperties / propertyNames are set without an explicit
  // additionalProperties: false, default to looseObject so the refines see the
  // pattern-matched / propertyName-checked keys (z.object strips unknowns
  // before the refine runs, masking violations — silent bug).
  // v3.2: unevaluatedProperties also requires loose mode — z.object strips
  // unknown keys *before* the superRefine runs, so the per-key issue emission
  // never sees the offending properties (silent pass-through bug).
  const needsLoose =
    schema.additionalProperties === undefined &&
    (schema.patternProperties !== undefined ||
      schema.propertyNames !== undefined ||
      schema.unevaluatedProperties !== undefined)
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
    ? (() => {
        const pat = schema.propertyNames.pattern
        const msg = propNamesMessage
          ? JSON.stringify(propNamesMessage)
          : `"Property name '"+k+"' does not match pattern ${pat.replace(/"/g, '\\"')}"`
        return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pat)});for(const k of Object.keys(o)){if(!regex.test(k))ctx.addIssue({code:"custom",path:[k],message:${msg}})}})`
      })()
    : schema.propertyNames?.enum
      ? (() => {
          const allowed = JSON.stringify(schema.propertyNames.enum)
          const msg = propNamesMessage
            ? JSON.stringify(propNamesMessage)
            : `"Property name '"+k+"' is not in allowed list"`
          return `.superRefine((o,ctx)=>{const allowed=${allowed};for(const k of Object.keys(o)){if(!allowed.includes(k))ctx.addIssue({code:"custom",path:[k],message:${msg}})}})`
        })()
      : ''
  // v3.1: patternProperties uses superRefine + closure-captured RegExp/Schema
  // (RegExp built once per parse, not per-key) so sub-issue path/code/message
  // survive. The pattern message slot OVERRIDES the inner issue message when
  // set; otherwise Zod's native message stays.
  const patternProperties = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema, undefined, readonly)
          return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pattern)});const Schema=${zodSchema};for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]${patternPropsMessageOverride}})}})`
        })
        .join('')
    : ''
  // v3.1: dependentRequired uses superRefine and emits one issue per missing
  // dep, with `path: [d]` so JSON pointer locates the missing key. The
  // x-dependentRequired-message (or x-error-message fallback) overrides the
  // default message; default = "requires \"<dep>\" when \"<key>\" present".
  const dependentRequired = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const stmts = deps
            .map((d) => {
              const fallback = depReqMessage ?? errorMessage
              const msg = fallback ?? `requires "${d}" when "${key}" present`
              const msgExpr = /^\s*\(.*?\)\s*=>/.test(msg)
                ? `(${msg})({code:'custom',path:[${JSON.stringify(d)}],input:o})`
                : JSON.stringify(msg)
              return `if(!Object.hasOwn(o,${JSON.stringify(d)}))ctx.addIssue({code:'custom',message:${msgExpr},path:[${JSON.stringify(d)}]})`
            })
            .join(';')
          return `.superRefine((o,ctx)=>{if(!Object.hasOwn(o,${JSON.stringify(key)}))return;${stmts}})`
        })
        .join('')
    : ''
  // v3.1: dependentSchemas uses superRefine and propagates inner issues with
  // their original path/code/expected — the x-dependentSchemas-message slot is
  // INTENTIONALLY no longer applied to inner sub-issues (would force them all
  // to `code: 'custom'` and lose code/expected). The slot is still consumed
  // for backward-compat (it survives in the OpenAPI annotation roundtrip)
  // but does not override propagated messages.
  const dependentSchemas = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, subSchema]) => {
          const subZod = zodToOpenAPI(subSchema)
          return `.superRefine((o,ctx)=>{if(!Object.hasOwn(o,${JSON.stringify(key)}))return;const Schema=${subZod};const valid=Schema.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})`
        })
        .join('')
    : ''
  // v3.1: if/then/else uses superRefine + closure-captured branch schema;
  // inner issues propagate with original path/code. When neither then nor
  // else is set, no refine is emitted (no-op).
  const ifThenElse = (() => {
    if (!schema.if) return ''
    if (!schema.then && !schema.else) return ''
    const ifZod = zodToOpenAPI(schema.if)
    const thenZod = schema.then ? zodToOpenAPI(schema.then) : 'undefined'
    const elseZod = schema.else ? zodToOpenAPI(schema.else) : 'undefined'
    return `.superRefine((o,ctx)=>{const If=${ifZod};const ifOk=If.safeParse(o).success;const Branch=ifOk?${thenZod}:${elseZod};if(!Branch)return;const valid=Branch.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})`
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
  const unevaluatedProperties = buildUnevaluatedProperties(
    schema,
    errorArg,
    zodToOpenAPI,
    errorMessage,
  )
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${dependentSchemas}${ifThenElse}${unevaluatedProperties}${readonly ? '.readonly()' : ''}`
}
