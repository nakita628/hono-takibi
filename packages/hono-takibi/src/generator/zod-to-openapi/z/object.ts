import type { $ZodIssueCode } from 'zod/v4/core'

import { makeUnevaluatedProperties } from '../../../helper/zod.js'
import type { Schema } from '../../../openapi/index.js'
import { error, makeSafeKey } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

// Build-time check: generated code branches on `issue.code === 'unrecognized_keys'`.
// A Zod rename surfaces as a compile error here.
const _UNRECOGNIZED_KEYS_GUARD: $ZodIssueCode = 'unrecognized_keys'
void _UNRECOGNIZED_KEYS_GUARD

/**
 * Generates a Zod object schema. Dispatches `additionalProperties` to
 * `z.looseObject` (true), `z.strictObject` (false), `z.record` (Schema), or
 * default `z.object`. Combinators (oneOf/anyOf/allOf/not) delegate to the main
 * `zodToOpenAPI` entry.
 */
export function object(schema: Schema, options?: { readonly?: boolean }): string {
  const readonly = options?.readonly
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema, undefined, options)
  }
  const errorMessage = schema['x-error-message']
  const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
  // (split from x-minimum-message / x-maximum-message), and patternProperties
  // uses its own x-patternProperties-message (split from x-pattern-message).
  const minPropsMessage = schema['x-minProperties-message'] ?? errorMessage
  const minErrorArg = minPropsMessage ? `,${error(minPropsMessage)}` : ''
  const maxPropsMessage = schema['x-maxProperties-message'] ?? errorMessage
  const maxErrorArg = maxPropsMessage ? `,${error(maxPropsMessage)}` : ''
  const patternPropsMessage = schema['x-patternProperties-message'] ?? errorMessage
  const propNamesMessage = schema['x-propertyNames-message'] ?? errorMessage
  const depReqMessage = schema['x-dependentRequired-message']
  // is no longer applied to inner sub-issues (would force code='custom' and
  // erase code/expected). Survives in the OpenAPI roundtrip via wrap().
  // collapsing everything into a single `custom` issue at the parent path.
  // The pattern message slot, if set, OVERRIDES the inner issue's message
  // (otherwise we keep Zod's native message verbatim — code/expected stay).
  const patternPropsMessageOverride = patternPropsMessage
    ? `,message:${JSON.stringify(patternPropsMessage)}`
    : ''
  // `x-if-message` overrides the inner issue message emitted by the
  // if/then/else superRefine. Inner `path`/`code`/`expected` are preserved;
  //   x-then-message / x-else-message > x-if-message > x-error-message > undefined
  // (Zod default、JSON Schema 2020-12 §7.1 / OpenAPI 3.2 §4.9)
  const ifMessage = schema['x-if-message'] ?? errorMessage
  const thenMessage = schema['x-then-message']
  const elseMessage = schema['x-else-message']
  const thenMsg = thenMessage ?? ifMessage
  const elseMsg = elseMessage ?? ifMessage
  const ifMessageOverride = ifMessage ? `,message:${JSON.stringify(ifMessage)}` : ''
  const thenOverride = thenMsg ? `,message:${JSON.stringify(thenMsg)}` : ''
  const elseOverride = elseMsg ? `,message:${JSON.stringify(elseMsg)}` : ''
  // `x-properties-message` overrides the inner issue
  // message for per-property validation failures emitted via the object's
  // `{error}` handler. The handler is only attached when at least one of the
  // per-issue-code slots (`x-additionalProperties-message`,
  // `x-properties-message`, `x-error-message`) is set. Priority:
  //   unrecognized_keys → x-additionalProperties-message (only on strictObject)
  //   other codes       → x-properties-message > x-error-message > undefined
  const propsMessage = schema['x-properties-message']
  // additionalProperties: false, default to looseObject so the refines see the
  // pattern-matched / propertyName-checked keys (z.object strips unknowns
  // before the refine runs, masking violations — silent bug).
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
            undefined,
            isRequired ? options : { ...options, isOptional: true },
          )
          return `${safeKey}:${z}`
        })
        .join(',')
    : ''
  // unrecognized_keys issue (only meaningful for strictObject). Other cases
  // keep the legacy behavior of NOT attaching {error} to the object base for
  // backward compatibility — x-error-message is consumed downstream by the
  // dependentRequired refine etc.
  const addlPropsMessage = schema['x-additionalProperties-message']
  // when `x-properties-message` is set, every issue
  // emitted by the base object whose code is NOT `unrecognized_keys` (i.e.
  // per-property validation failures: invalid_type, invalid_format, …) gets
  // its message overridden. `unrecognized_keys` (strictObject only) continues
  // to be governed by `x-additionalProperties-message`. Priority for non-
  // unrecognized_keys issues: x-properties-message > x-error-message > undefined.
  // The handler is only attached when at least one of {addlPropsMessage,
  // propsMessage} is set; otherwise we keep the legacy emit (no objectParams)
  // so `errorMessage` continues to be consumed downstream by sibling refines.
  const objectParams = (() => {
    const hasStrictAddl = objectType === 'strictObject' && Boolean(addlPropsMessage)
    const hasProperties =
      schema.properties !== undefined && Object.keys(schema.properties).length > 0
    const errorMessageEffective = hasProperties ? errorMessage : undefined
    if (!hasStrictAddl && !propsMessage && !errorMessageEffective) return ''
    const unrecExpr = hasStrictAddl ? JSON.stringify(addlPropsMessage) : 'undefined'
    const otherExpr = propsMessage
      ? JSON.stringify(propsMessage)
      : errorMessageEffective
        ? JSON.stringify(errorMessageEffective)
        : 'undefined'
    return `,{error:(issue)=>issue.code==='unrecognized_keys'?${unrecExpr}:${otherExpr}}`
  })()
  // For `additionalProperties: { ... }`, switch the base to `z.record(z.string(), …)`
  // so the unified constraint chain below (minProperties / propertyNames /
  // dependentRequired / dependentSchemas / if-then-else / unevaluatedProperties /
  // patternProperties) applies to both shapes. Previously the record path
  // early-returned and silently dropped every one of those constraints.
  const base =
    typeof schema.additionalProperties === 'object'
      ? `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties, undefined, options)})`
      : `z.${objectType}({${propertiesCode}}${objectParams})`
  const minProperties =
    typeof schema.minProperties === 'number'
      ? `.refine((val)=>Object.keys(val).length>=${schema.minProperties}${minErrorArg})`
      : ''
  const maxProperties =
    typeof schema.maxProperties === 'number'
      ? `.refine((val)=>Object.keys(val).length<=${schema.maxProperties}${maxErrorArg})`
      : ''
  const propNamesMsgField = propNamesMessage ? `,message:${JSON.stringify(propNamesMessage)}` : ''
  const propertyNames = schema.propertyNames?.pattern
    ? (() => {
        const pat = schema.propertyNames.pattern
        return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pat)});for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k]${propNamesMsgField}})}}})`
      })()
    : schema.propertyNames?.enum
      ? (() => {
          const allowed = JSON.stringify(schema.propertyNames.enum)
          return `.superRefine((o,ctx)=>{const allowed=${allowed};for(const k of Object.keys(o)){if(!allowed.includes(k)){ctx.addIssue({code:"custom",path:[k]${propNamesMsgField}})}}})`
        })()
      : ''
  // (RegExp built once per parse, not per-key) so sub-issue path/code/message
  // survive. The pattern message slot OVERRIDES the inner issue message when
  // set; otherwise Zod's native message stays.
  const patternProperties = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema, undefined, options)
          return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pattern)});const Schema=${zodSchema};for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]${patternPropsMessageOverride}})}}}})`
        })
        .join('')
    : ''
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
              return `if(!Object.hasOwn(o,${JSON.stringify(d)})){ctx.addIssue({code:'custom',message:${msgExpr},path:[${JSON.stringify(d)}]})}`
            })
            .join(';')
          return `.superRefine((o,ctx)=>{if(!Object.hasOwn(o,${JSON.stringify(key)})){return}${stmts}})`
        })
        .join('')
    : ''
  // their original path / code / expected. When `x-dependentSchemas-message`
  // (or its `x-error-message` fallback) is set, the inner issue's `message`
  // is replaced (override semantics, aligned with `x-allOf-message` and
  // related applicator slots in `zod-to-openapi/index.ts`).
  const depSchMsg = schema['x-dependentSchemas-message'] ?? schema['x-error-message']
  const depSchMsgField = depSchMsg !== undefined ? `,message:${JSON.stringify(depSchMsg)}` : ''
  const dependentSchemas = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, subSchema]) => {
          const subZod = zodToOpenAPI(subSchema, undefined, options)
          return `.superRefine((o,ctx)=>{if(!Object.hasOwn(o,${JSON.stringify(key)})){return}const Schema=${subZod};const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${depSchMsgField}})}}})`
        })
        .join('')
    : ''
  // inner issues propagate with original path/code. When neither then nor
  // else is set, no refine is emitted (no-op).
  const ifThenElse = (() => {
    if (!schema.if) return ''
    if (!schema.then && !schema.else) return ''
    const ifZod = zodToOpenAPI(schema.if, undefined, options)
    const thenZod = schema.then ? zodToOpenAPI(schema.then, undefined, options) : 'undefined'
    const elseZod = schema.else ? zodToOpenAPI(schema.else, undefined, options) : 'undefined'
    const useSplitBranch = thenMessage !== undefined || elseMessage !== undefined
    if (!useSplitBranch) {
      return `.superRefine((o,ctx)=>{const If=${ifZod};const ifOk=If.safeParse(o).success;const Branch=ifOk?${thenZod}:${elseZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${ifMessageOverride}})}}})`
    }
    return `.superRefine((o,ctx)=>{const If=${ifZod};const ifOk=If.safeParse(o).success;if(ifOk){const Branch=${thenZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${thenOverride}})}}}else{const Branch=${elseZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${elseOverride}})}}}})`
  })()
  // both this object generator and the top-level allOf/anyOf/oneOf dispatch.
  //   // — see ./unevaluated.ts for the helper.
  // The original logic body follows for backward compat with existing tests.
  //
  // JSON Schema 2020-12 §11.2 specifies that anyOf/oneOf/if-then-else only
  // contribute evaluated keys for branches that ACTUALLY succeeded at runtime.
  //   //   1. Pre-populates evaluated keys from own properties + patternProperties
  //      + allOf branches (which always validate)
  //   2. Conditionally adds keys from anyOf/oneOf branches whose safeParse
  //      succeeds at runtime
  //   3. Conditionally adds keys from then/else based on if's success
  //   4. Adds dependentSchemas keys when the dependency key is present
  const unevaluatedProperties = makeUnevaluatedProperties(
    schema,
    errorArg,
    zodToOpenAPI,
    errorMessage,
  )
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${dependentSchemas}${ifThenElse}${unevaluatedProperties}${readonly ? '.readonly()' : ''}`
}
