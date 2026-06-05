import { makeUnevaluatedProperties } from '../../../helper/zod.js'
import type { Schema } from '../../../openapi/index.js'
import { error, makeSafeKey } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

export function object(schema: Schema, options?: { readonly?: boolean }) {
  const readonly = options?.readonly
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema, undefined, options)
  }
  const errorMessage = schema['x-error-message']
  const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
  // minProperties / maxProperties / patternProperties each have a dedicated
  // message slot, falling back to x-error-message when unset.
  const minPropertiesMessage = schema['x-minProperties-message'] ?? errorMessage
  const minErrorArg = minPropertiesMessage ? `,${error(minPropertiesMessage)}` : ''
  const maxPropertiesMessage = schema['x-maxProperties-message'] ?? errorMessage
  const maxErrorArg = maxPropertiesMessage ? `,${error(maxPropertiesMessage)}` : ''
  const patternPropertiesMessage = schema['x-patternProperties-message'] ?? errorMessage
  const propertyNamesMessage = schema['x-propertyNames-message'] ?? errorMessage
  const dependentRequiredMessage = schema['x-dependentRequired-message']
  // The pattern message slot, if set, OVERRIDES the inner issue's message
  // (otherwise we keep Zod's native message verbatim — code/expected stay).
  const patternPropertiesMessageOverride = patternPropertiesMessage
    ? `,message:${JSON.stringify(patternPropertiesMessage)}`
    : ''
  // `x-if-message` overrides the inner issue message emitted by the
  // if/then/else superRefine. Inner `path`/`code`/`expected` are preserved;
  //   x-then-message / x-else-message > x-if-message > x-error-message > undefined
  // (Zod default、JSON Schema 2020-12 §7.1 / OpenAPI 3.2 §4.9)
  const ifMessage = schema['x-if-message'] ?? errorMessage
  const thenMessageSlot = schema['x-then-message']
  const elseMessageSlot = schema['x-else-message']
  const thenMessage = thenMessageSlot ?? ifMessage
  const elseMessage = elseMessageSlot ?? ifMessage
  const ifMessageOverride = ifMessage ? `,message:${JSON.stringify(ifMessage)}` : ''
  const thenOverride = thenMessage ? `,message:${JSON.stringify(thenMessage)}` : ''
  const elseOverride = elseMessage ? `,message:${JSON.stringify(elseMessage)}` : ''
  // `x-properties-message` overrides the inner issue
  // message for per-property validation failures emitted via the object's
  // `{error}` handler. The handler is only attached when at least one of the
  // per-issue-code slots (`x-additionalProperties-message`,
  // `x-properties-message`, `x-error-message`) is set. Priority:
  //   unrecognized_keys → x-additionalProperties-message (only on strictObject)
  //   other codes       → x-properties-message > x-error-message > undefined
  const propertiesMessage = schema['x-properties-message']
  // When additionalProperties is undefined but patternProperties / propertyNames /
  // unevaluatedProperties are present, use looseObject so the refines see unknown
  // keys — z.object strips them before the refine runs, masking violations (silent bug).
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
  const additionalPropertiesMessage = schema['x-additionalProperties-message']
  // when `x-properties-message` is set, every issue
  // emitted by the base object whose code is NOT `unrecognized_keys` (i.e.
  // per-property validation failures: invalid_type, invalid_format, …) gets
  // its message overridden. `unrecognized_keys` (strictObject only) continues
  // to be governed by `x-additionalProperties-message`. Priority for non-
  // unrecognized_keys issues: x-properties-message > x-error-message > undefined.
  // The handler is only attached when at least one of {additionalPropertiesMessage,
  // propertiesMessage} is set; otherwise we keep the legacy emit (no objectParams)
  // so `errorMessage` continues to be consumed downstream by sibling refines.
  const objectParams = (() => {
    const hasStrictAdditional =
      objectType === 'strictObject' && Boolean(additionalPropertiesMessage)
    const hasProperties =
      schema.properties !== undefined && Object.keys(schema.properties).length > 0
    const errorMessageEffective = hasProperties ? errorMessage : undefined
    if (!hasStrictAdditional && !propertiesMessage && !errorMessageEffective) return ''
    const unrecExpr = hasStrictAdditional
      ? JSON.stringify(additionalPropertiesMessage)
      : 'undefined'
    const otherExpr = propertiesMessage
      ? JSON.stringify(propertiesMessage)
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
  const propertyNamesMessageField = propertyNamesMessage
    ? `,message:${JSON.stringify(propertyNamesMessage)}`
    : ''
  const propertyNames = schema.propertyNames?.pattern
    ? (() => {
        const pat = schema.propertyNames.pattern
        return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pat)});for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k]${propertyNamesMessageField}})}}})`
      })()
    : schema.propertyNames?.enum
      ? (() => {
          const allowed = JSON.stringify(schema.propertyNames.enum)
          return `.superRefine((o,ctx)=>{const allowed=${allowed};for(const k of Object.keys(o)){if(!allowed.includes(k)){ctx.addIssue({code:"custom",path:[k]${propertyNamesMessageField}})}}})`
        })()
      : ''
  // patternProperties builds the RegExp once per parse and propagates each
  // sub-issue's path/code/message; the pattern message slot overrides the inner
  // message when set, otherwise Zod's native message stays.
  const patternProperties = schema.patternProperties
    ? Object.entries(schema.patternProperties)
        .map(([pattern, propSchema]) => {
          const zodSchema = zodToOpenAPI(propSchema, undefined, options)
          return `.superRefine((o,ctx)=>{const regex=new RegExp(${JSON.stringify(pattern)});const Schema=${zodSchema};for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]${patternPropertiesMessageOverride}})}}}})`
        })
        .join('')
    : ''
  // Emits an issue per missing dependent key with path:[d] so the JSON pointer
  // locates it; x-dependentRequired-message (or x-error-message) overrides the
  // default `requires "<dep>" when "<key>" present` message.
  const dependentRequired = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const stmts = deps
            .map((d) => {
              const fallback = dependentRequiredMessage ?? errorMessage
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
  // dependentSchemas propagates inner issues with their original path/code/expected;
  // x-dependentSchemas-message (or x-error-message) replaces the inner message
  // (override semantics, aligned with x-allOf-message in zod-to-openapi/index.ts).
  const dependentSchemasMessage = schema['x-dependentSchemas-message'] ?? schema['x-error-message']
  const dependentSchemasMessageField =
    dependentSchemasMessage !== undefined
      ? `,message:${JSON.stringify(dependentSchemasMessage)}`
      : ''
  const dependentSchemas = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, subSchema]) => {
          const subZod = zodToOpenAPI(subSchema, undefined, options)
          return `.superRefine((o,ctx)=>{if(!Object.hasOwn(o,${JSON.stringify(key)})){return}const Schema=${subZod};const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${dependentSchemasMessageField}})}}})`
        })
        .join('')
    : ''
  // if-then-else emits a superRefine whose inner issues propagate with original
  // path/code. When neither then nor else is set, no refine is emitted (no-op).
  const ifThenElse = (() => {
    if (!schema.if) return ''
    if (!schema.then && !schema.else) return ''
    const ifZod = zodToOpenAPI(schema.if, undefined, options)
    const thenZod = schema.then ? zodToOpenAPI(schema.then, undefined, options) : 'undefined'
    const elseZod = schema.else ? zodToOpenAPI(schema.else, undefined, options) : 'undefined'
    const useSplitBranch = thenMessageSlot !== undefined || elseMessageSlot !== undefined
    if (!useSplitBranch) {
      return `.superRefine((o,ctx)=>{const If=${ifZod};const ifOk=If.safeParse(o).success;const Branch=ifOk?${thenZod}:${elseZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${ifMessageOverride}})}}})`
    }
    return `.superRefine((o,ctx)=>{const If=${ifZod};const ifOk=If.safeParse(o).success;if(ifOk){const Branch=${thenZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${thenOverride}})}}}else{const Branch=${elseZod};if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${elseOverride}})}}}})`
  })()
  // Delegated to makeUnevaluatedProperties (see helper/zod.ts).
  // JSON Schema 2020-12 §11.2: anyOf/oneOf/if-then-else contribute evaluated
  // keys only for branches that ACTUALLY succeeded at runtime.
  const unevaluatedProperties = makeUnevaluatedProperties(
    schema,
    errorArg,
    zodToOpenAPI,
    errorMessage,
  )
  return `${base}${minProperties}${maxProperties}${propertyNames}${patternProperties}${dependentRequired}${dependentSchemas}${ifThenElse}${unevaluatedProperties}${readonly ? '.readonly()' : ''}`
}
