import type { $ZodIssueCode } from 'zod/v4/core'

import { isSchemaObject } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'

// Build-time check: emitted code uses the literal "custom" as Zod issue code.
// If Zod ever renames this code, this assignment fails to compile and the
// generator stops at build time instead of producing silently broken output.
const _CUSTOM_CODE_GUARD: $ZodIssueCode = 'custom'
void _CUSTOM_CODE_GUARD

/**
 * Hybrid emission for type-less JSON Schema schemas.
 *
 * JSON Schema 2020-12 allows schemas without a `type` field where keywords
 * apply only when the value's actual type matches. e.g.,
 *   { "required": ["x"] }  // applies only when value is a non-array object
 *   { "minimum": 0 }       // applies only when value is a number
 *
 * Zod's type-first design cannot express this directly. We emit
 * `z.unknown().superRefine((val, ctx) => { ... })` with value-type-aware checks
 * so each keyword applies only when relevant — preserving JSON Schema's
 * keyword-independent semantics while staying inside Zod.
 *
 * message strategy is now slot-driven. Hardcoded English defaults have
 * been removed. Each emitted `ctx.addIssue` consults the corresponding
 * `x-<keyword>-message` vendor extension (see openapi/index.ts) and omits the
 * `message` field entirely when the slot is empty, letting Zod's built-in
 * default ('Invalid input', i18n-aware via `z.config({locales})`) flow through.
 */
const TYPELESS_KEYWORDS: readonly (keyof Schema)[] = [
  'required',
  'properties',
  'additionalProperties',
  'patternProperties',
  'propertyNames',
  'minProperties',
  'maxProperties',
  'dependentRequired',
  'dependentSchemas',
  'unevaluatedProperties',
  'minItems',
  'maxItems',
  'uniqueItems',
  'items',
  'prefixItems',
  'contains',
  'minContains',
  'maxContains',
  'unevaluatedItems',
  'minLength',
  'maxLength',
  'pattern',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'multipleOf',
  'enum',
  'const',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
  'if',
  'then',
  'else',
]

export function hasTypelessConstraint(schema: Schema): boolean {
  return TYPELESS_KEYWORDS.some((k) => schema[k] !== undefined)
}

/**
 * Reads a vendor-extension message slot (e.g. `x-required-message`) from the
 * schema and returns it as a JSON-encoded string literal expression ready to
 * splice into generated code (`'"foo"'`). Returns `undefined` when the slot is
 * not a string — callers must omit the `message` field in that case so Zod's
 * default flows through.
 */
function pickMessage(schema: Schema, slot: keyof Schema): string | undefined {
  const value = schema[slot]
  return typeof value === 'string' ? JSON.stringify(value) : undefined
}

/**
 * Centralized table mapping short slot keys to the `x-<keyword>-message`
 * vendor extension names used in `Schema`. All emitters must read through
 * `messageFor(schema, '<key>')` instead of typing slot literal strings inline
 * — this gives type-safety (typos surface at compile time) and a single
 * audit point for the slot inventory.
 */
const MESSAGE_SLOTS = {
  required: 'x-required-message',
  properties: 'x-properties-message',
  additionalProperties: 'x-additionalProperties-message',
  patternProperties: 'x-patternProperties-message',
  propertyNames: 'x-propertyNames-message',
  minProperties: 'x-minProperties-message',
  maxProperties: 'x-maxProperties-message',
  dependentRequired: 'x-dependentRequired-message',
  dependentSchemas: 'x-dependentSchemas-message',
  unevaluatedProperties: 'x-unevaluatedProperties-message',
  minItems: 'x-minItems-message',
  maxItems: 'x-maxItems-message',
  uniqueItems: 'x-uniqueItems-message',
  prefixItems: 'x-prefixItems-message',
  items: 'x-items-message',
  contains: 'x-contains-message',
  minContains: 'x-minContains-message',
  maxContains: 'x-maxContains-message',
  unevaluatedItems: 'x-unevaluatedItems-message',
  minLength: 'x-minLength-message',
  maxLength: 'x-maxLength-message',
  pattern: 'x-pattern-message',
  minimum: 'x-minimum-message',
  maximum: 'x-maximum-message',
  exclusiveMinimum: 'x-exclusiveMinimum-message',
  exclusiveMaximum: 'x-exclusiveMaximum-message',
  multipleOf: 'x-multipleOf-message',
  enum: 'x-enum-message',
  const: 'x-const-message',
  allOf: 'x-allOf-message',
  anyOf: 'x-anyOf-message',
  oneOf: 'x-oneOf-message',
  not: 'x-not-message',
  if: 'x-if-message',
  // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
  then: 'x-then-message',
  else: 'x-else-message',
  length: 'x-length-message',
  error: 'x-error-message',
} as const satisfies Record<string, keyof Schema>

/**
 * Resolves the message string for a slot. Precedence:
 *   1. `x-<keyword>-message` (the slot itself)
 *   2. `x-error-message` (shared fallback, except for `error` / `then` / `else`)
 *   3. Zod default ('Invalid input')
 */
function messageFor(schema: Schema, key: keyof typeof MESSAGE_SLOTS): string | undefined {
  const direct = pickMessage(schema, MESSAGE_SLOTS[key])
  if (direct !== undefined || key === 'error' || key === 'then' || key === 'else') return direct
  return pickMessage(schema, MESSAGE_SLOTS.error)
}

/**
 * Builds an `addIssue` payload literal `{code:'custom'[,path:...][,message:...]}`.
 * `messageExpr` and `pathExpr` are raw code fragments — pass already-encoded
 * expressions like `'"foo"'` (string literal) or `'["k"]'` (path array) or
 * `'"Unknown: "+k'` (runtime concatenation).
 */
function issueObj(messageExpr: string | undefined, pathExpr?: string): string {
  const parts = ["code:'custom'"]
  if (pathExpr !== undefined) {
    parts.push(`path:${pathExpr}`)
  }
  if (messageExpr !== undefined) {
    parts.push(`message:${messageExpr}`)
  }
  return `{${parts.join(',')}}`
}

// After the `typeof val === 'object' && val !== null && !Array.isArray(val)` guard
// in emitTypelessRefine, `val` narrows to `object`. `Object.hasOwn(val, k)`,
// `Object.keys(val)`, `Object.entries(val)` all accept that type. Indexed access
// (`val[k]`) doesn't — for that we use `Reflect.get(val, k)`, which is valid JS
// and avoids a TS `as` cast. The `any` it returns is immediately consumed by
// `Schema.safeParse(unknown)` so it never escapes into a typed variable.
function makeObjectChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  const ownKeysJson = JSON.stringify(Object.keys(schema.properties ?? {}))
  const patternsJson = JSON.stringify(Object.keys(schema.patternProperties ?? {}))

  const requiredMsg = messageFor(schema, 'required')
  const requiredChecks = Array.isArray(schema.required)
    ? schema.required.map(
        (key) =>
          // Use Object.hasOwn to honor JSON Schema's "own property" semantics —
          // `in` would also count inherited keys (__proto__/toString/constructor).
          `if(!Object.hasOwn(val,${JSON.stringify(key)})){ctx.addIssue(${issueObj(requiredMsg)})}`,
      )
    : []
  const minPropsMsg = messageFor(schema, 'minProperties')
  const minPropsCheck =
    typeof schema.minProperties === 'number'
      ? `if(Object.keys(val).length<${schema.minProperties}){ctx.addIssue(${issueObj(minPropsMsg)})}`
      : undefined
  const maxPropsMsg = messageFor(schema, 'maxProperties')
  const maxPropsCheck =
    typeof schema.maxProperties === 'number'
      ? `if(Object.keys(val).length>${schema.maxProperties}){ctx.addIssue(${issueObj(maxPropsMsg)})}`
      : undefined
  const propertyMsg = messageFor(schema, 'properties')
  const propertyChecks = schema.properties
    ? Object.entries(schema.properties).map(
        ([key, sub]) =>
          `if(Object.hasOwn(val,${JSON.stringify(key)})){const Schema=${recurse(sub)};if(!Schema.safeParse(Reflect.get(val,${JSON.stringify(key)})).success){ctx.addIssue(${issueObj(propertyMsg)})}}`,
      )
    : []
  const additionalPropsMsg = messageFor(schema, 'additionalProperties')
  const additionalPropsCheck = (() => {
    if (schema.additionalProperties === false) {
      return `for(const k of Object.keys(val)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue(${issueObj(additionalPropsMsg)})}}`
    }
    if (isSchemaObject(schema.additionalProperties)) {
      const subZod = recurse(schema.additionalProperties)
      return `{const Schema=${subZod};for(const k of Object.keys(val)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue(${issueObj(additionalPropsMsg)})}}}}`
    }
    return undefined
  })()
  const patternPropsMsg = messageFor(schema, 'patternProperties')
  const patternPropChecks = schema.patternProperties
    ? Object.entries(schema.patternProperties).map(
        ([pattern, sub]) =>
          `{const Schema=${recurse(sub)};for(const k of Object.keys(val)){if(new RegExp(${JSON.stringify(pattern)}).test(k)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue(${issueObj(patternPropsMsg)})}}}}`,
      )
    : []
  const propNamesMsg = messageFor(schema, 'propertyNames')
  const propNamesCheck = schema.propertyNames?.pattern
    ? `for(const k of Object.keys(val)){if(!new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k)){ctx.addIssue(${issueObj(propNamesMsg)})}}`
    : undefined
  const depRequiredMsg = messageFor(schema, 'dependentRequired')
  const depRequiredChecks = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps.map((d) => `Object.hasOwn(val,${JSON.stringify(d)})`).join('&&')
          return depsCheck
            ? `if(Object.hasOwn(val,${JSON.stringify(key)})){if(!(${depsCheck})){ctx.addIssue(${issueObj(depRequiredMsg)})}}`
            : undefined
        })
        .filter((s): s is string => s !== undefined)
    : []
  /* JSON Schema 2020-12 §10.2.2.4: `dependentSchemas` is an applicator —
   * sub-schema issues propagate. When `x-dependentSchemas-message` (or its
   * `x-error-message` fallback) is set, the inner issue's `message` is
   * replaced while `code` / `path` / `expected` are preserved (override
   * semantics, aligned with `x-allOf-message` and related applicator slots). */
  const depSchemasMsg = messageFor(schema, 'dependentSchemas')
  const depSchMsgField =
    depSchemasMsg !== undefined ? `,message:${JSON.stringify(depSchemasMsg)}` : ''
  const depSchemasChecks = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas).map(
        ([key, sub]) =>
          `if(Object.hasOwn(val,${JSON.stringify(key)})){const Schema=${recurse(sub)};const r=Schema.safeParse(val);if(!r.success){for(const issue of r.error.issues){ctx.addIssue({...issue,path:issue.path${depSchMsgField}})}}}`,
      )
    : []
  const unevaluatedPropsMsg = messageFor(schema, 'unevaluatedProperties')
  const unevaluatedPropsCheck =
    schema.unevaluatedProperties === false
      ? `for(const k of Object.keys(val)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue(${issueObj(unevaluatedPropsMsg)})}}`
      : undefined

  return [
    ...requiredChecks,
    minPropsCheck,
    maxPropsCheck,
    ...propertyChecks,
    additionalPropsCheck,
    ...patternPropChecks,
    propNamesCheck,
    ...depRequiredChecks,
    ...depSchemasChecks,
    unevaluatedPropsCheck,
  ].filter((s): s is string => s !== undefined)
}

function makeArrayChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  // Local type guard — Array.isArray's predicate (arg is any[]) does not
  // narrow `readonly Schema[]` from a union, so define one inline. Boolean
  // schemas (JSON Schema 2020-12 §10.3.1.2) are handled at the call site.
  const isSingleSchema = (items: Schema | readonly Schema[] | boolean): items is Schema =>
    typeof items === 'object' && !Array.isArray(items)

  const minItemsMsg = messageFor(schema, 'minItems')
  const minItemsCheck =
    typeof schema.minItems === 'number'
      ? `if(val.length<${schema.minItems}){ctx.addIssue(${issueObj(minItemsMsg)})}`
      : undefined
  const maxItemsMsg = messageFor(schema, 'maxItems')
  const maxItemsCheck =
    typeof schema.maxItems === 'number'
      ? `if(val.length>${schema.maxItems}){ctx.addIssue(${issueObj(maxItemsMsg)})}`
      : undefined
  const uniqueMsg = messageFor(schema, 'uniqueItems')
  const uniqueCheck =
    schema.uniqueItems === true
      ? `{const seen=new Set();for(const item of val){const key=JSON.stringify(item);if(seen.has(key)){ctx.addIssue(${issueObj(uniqueMsg)});break}seen.add(key)}}`
      : undefined
  const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
  const prefixMsg = messageFor(schema, 'prefixItems')
  const prefixChecks = schema.prefixItems
    ? schema.prefixItems.map(
        (sub, idx) =>
          `if(val.length>${idx}){const Schema=${recurse(sub)};if(!Schema.safeParse(val[${idx}]).success){ctx.addIssue(${issueObj(prefixMsg)})}}`,
      )
    : []
  // items as boolean schemas
  // items: false → trailing items not allowed (length must be <= prefixCount)
  // items: true → trailing items unconstrained (no-op)
  const itemsMsg = messageFor(schema, 'items')
  const itemsCheck = (() => {
    const items = schema.items
    if (items === false) {
      return `if(val.length>${prefixCount}){ctx.addIssue(${issueObj(itemsMsg)})}`
    }
    if (items === undefined || items === true || !isSingleSchema(items)) {
      return undefined
    }
    return `{const Schema=${recurse(items)};for(let i=${prefixCount};i<val.length;i++){if(!Schema.safeParse(val[i]).success){ctx.addIssue(${issueObj(itemsMsg)})}}}`
  })()
  const containsMsg = messageFor(schema, 'contains')
  const minContainsMsg = messageFor(schema, 'minContains')
  const maxContainsMsg = messageFor(schema, 'maxContains')
  const containsCheck = schema.contains
    ? (() => {
        const subZod = recurse(schema.contains)
        const minC = schema.minContains ?? 1
        const maxC = schema.maxContains
        // When `minContains` is explicit, prefer its dedicated slot; otherwise
        // fall back to the `x-contains-message` slot (the default minContains=1
        // case represents "contains itself").
        const lowerMsg = schema.minContains !== undefined ? minContainsMsg : containsMsg
        const minCheck = `if(m<${minC}){ctx.addIssue(${issueObj(lowerMsg)})}`
        const maxCheck =
          maxC !== undefined ? `;if(m>${maxC}){ctx.addIssue(${issueObj(maxContainsMsg)})}` : ''
        return `{const m=val.filter((i)=>${subZod}.safeParse(i).success).length;${minCheck}${maxCheck}}`
      })()
    : undefined
  const unevaluatedItemsMsg = messageFor(schema, 'unevaluatedItems')
  const unevaluatedItemsCheck =
    schema.unevaluatedItems === false
      ? `if(val.length>${prefixCount}){ctx.addIssue(${issueObj(unevaluatedItemsMsg)})}`
      : undefined

  return [
    minItemsCheck,
    maxItemsCheck,
    uniqueCheck,
    ...prefixChecks,
    itemsCheck,
    containsCheck,
    unevaluatedItemsCheck,
  ].filter((s): s is string => s !== undefined)
}

function makeStringChecks(schema: Schema): readonly string[] {
  const minMsg = messageFor(schema, 'minLength')
  const minCheck =
    typeof schema.minLength === 'number'
      ? `if([...val].length<${schema.minLength}){ctx.addIssue(${issueObj(minMsg)})}`
      : undefined
  const maxMsg = messageFor(schema, 'maxLength')
  const maxCheck =
    typeof schema.maxLength === 'number'
      ? `if([...val].length>${schema.maxLength}){ctx.addIssue(${issueObj(maxMsg)})}`
      : undefined
  const patternMsg = messageFor(schema, 'pattern')
  const patternCheck = schema.pattern
    ? `if(!new RegExp(${JSON.stringify(schema.pattern)}).test(val)){ctx.addIssue(${issueObj(patternMsg)})}`
    : undefined
  return [minCheck, maxCheck, patternCheck].filter((s): s is string => s !== undefined)
}

function makeNumberChecks(schema: Schema): readonly string[] {
  // Draft 4: exclusiveMinimum: true folds the boundary into the minimum check
  // (use `<=` instead of `<`); exclusiveMinimum: number adds a separate check.
  const minimumIsExclusive = schema.exclusiveMinimum === true && typeof schema.minimum === 'number'
  const minMsg = messageFor(schema, 'minimum')
  const exMinMsg = messageFor(schema, 'exclusiveMinimum')
  const minCheck =
    typeof schema.minimum === 'number'
      ? minimumIsExclusive
        ? `if(val<=${schema.minimum}){ctx.addIssue(${issueObj(exMinMsg)})}`
        : `if(val<${schema.minimum}){ctx.addIssue(${issueObj(minMsg)})}`
      : undefined
  const exMinCheck =
    typeof schema.exclusiveMinimum === 'number'
      ? `if(val<=${schema.exclusiveMinimum}){ctx.addIssue(${issueObj(exMinMsg)})}`
      : undefined
  const maximumIsExclusive = schema.exclusiveMaximum === true && typeof schema.maximum === 'number'
  const maxMsg = messageFor(schema, 'maximum')
  const exMaxMsg = messageFor(schema, 'exclusiveMaximum')
  const maxCheck =
    typeof schema.maximum === 'number'
      ? maximumIsExclusive
        ? `if(val>=${schema.maximum}){ctx.addIssue(${issueObj(exMaxMsg)})}`
        : `if(val>${schema.maximum}){ctx.addIssue(${issueObj(maxMsg)})}`
      : undefined
  const exMaxCheck =
    typeof schema.exclusiveMaximum === 'number'
      ? `if(val>=${schema.exclusiveMaximum}){ctx.addIssue(${issueObj(exMaxMsg)})}`
      : undefined
  const multipleOfMsg = messageFor(schema, 'multipleOf')
  const multipleOfCheck =
    typeof schema.multipleOf === 'number'
      ? `{const r=Math.abs(val/${schema.multipleOf}-Math.round(val/${schema.multipleOf}));if(r>1e-10){ctx.addIssue(${issueObj(multipleOfMsg)})}}`
      : undefined
  return [minCheck, exMinCheck, maxCheck, exMaxCheck, multipleOfCheck].filter(
    (s): s is string => s !== undefined,
  )
}

function makeGenericChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  // deepEqual via JSON.stringify (handles primitives + null + arrays + objects)
  const enumMsg = messageFor(schema, 'enum')
  const enumCheck = Array.isArray(schema.enum)
    ? `if(!${JSON.stringify(schema.enum)}.some((e)=>JSON.stringify(e)===JSON.stringify(val))){ctx.addIssue(${issueObj(enumMsg)})}`
    : undefined
  const constMsg = messageFor(schema, 'const')
  const constCheck =
    schema.const !== undefined
      ? `if(JSON.stringify(${JSON.stringify(schema.const)})!==JSON.stringify(val)){ctx.addIssue(${issueObj(constMsg)})}`
      : undefined
  const allOfMsg = messageFor(schema, 'allOf')
  const allOfChecks = Array.isArray(schema.allOf)
    ? schema.allOf.map(
        (sub) =>
          `{const Schema=${recurse(sub)};if(!Schema.safeParse(val).success){ctx.addIssue(${issueObj(allOfMsg)})}}`,
      )
    : []
  const anyOfMsg = messageFor(schema, 'anyOf')
  const anyOfCheck =
    Array.isArray(schema.anyOf) && schema.anyOf.length > 0
      ? `if(!(${schema.anyOf.map((sub) => `${recurse(sub)}.safeParse(val).success`).join('||')})){ctx.addIssue(${issueObj(anyOfMsg)})}`
      : undefined
  const oneOfMsg = messageFor(schema, 'oneOf')
  const oneOfCheck =
    Array.isArray(schema.oneOf) && schema.oneOf.length > 0
      ? `if((${schema.oneOf.map((sub) => `(${recurse(sub)}.safeParse(val).success?1:0)`).join('+')})!==1){ctx.addIssue(${issueObj(oneOfMsg)})}`
      : undefined
  const notMsg = messageFor(schema, 'not')
  const notCheck = schema.not
    ? `if(${recurse(schema.not)}.safeParse(val).success){ctx.addIssue(${issueObj(notMsg)})}`
    : undefined
  const ifSchema = schema.if
  const ifMsg = messageFor(schema, 'if')
  const thenMsg = messageFor(schema, 'then') ?? ifMsg
  const elseMsg = messageFor(schema, 'else') ?? ifMsg
  const ifCheck = ifSchema
    ? (() => {
        const ifZod = recurse(ifSchema)
        const thenSchema = schema.then
        const elseSchema = schema.else
        const thenPart = thenSchema
          ? `if(ifOk){const Schema=${recurse(thenSchema)};if(!Schema.safeParse(val).success){ctx.addIssue(${issueObj(thenMsg)})}}`
          : ''
        const elsePart = elseSchema
          ? `if(!ifOk){const Schema=${recurse(elseSchema)};if(!Schema.safeParse(val).success){ctx.addIssue(${issueObj(elseMsg)})}}`
          : ''
        return thenPart || elsePart
          ? `{const ifOk=${ifZod}.safeParse(val).success;${thenPart};${elsePart}}`
          : undefined
      })()
    : undefined

  return [enumCheck, constCheck, ...allOfChecks, anyOfCheck, oneOfCheck, notCheck, ifCheck].filter(
    (s): s is string => s !== undefined,
  )
}

export function emitTypelessRefine(schema: Schema, recurse: (s: Schema) => string): string {
  const objectChecks = makeObjectChecks(schema, recurse)
  const arrayChecks = makeArrayChecks(schema, recurse)
  const stringChecks = makeStringChecks(schema)
  const numberChecks = makeNumberChecks(schema)
  const genericChecks = makeGenericChecks(schema, recurse)

  const blocks = [
    objectChecks.length > 0
      ? `if(typeof val==='object'&&val!==null&&!Array.isArray(val)){${objectChecks.join(';')}}`
      : undefined,
    arrayChecks.length > 0 ? `if(Array.isArray(val)){${arrayChecks.join(';')}}` : undefined,
    stringChecks.length > 0 ? `if(typeof val==='string'){${stringChecks.join(';')}}` : undefined,
    numberChecks.length > 0 ? `if(typeof val==='number'){${numberChecks.join(';')}}` : undefined,
    genericChecks.length > 0 ? genericChecks.join(';') : undefined,
  ].filter((s): s is string => s !== undefined)

  if (blocks.length === 0) {
    return 'z.any()'
  }
  return `z.unknown().superRefine((val,ctx)=>{${blocks.join(';')}})`
}

/**
 * Generates the `.refine()` chain for `unevaluatedProperties` per JSON Schema
 * 2020-12 §11.2. Used by both the dedicated `object()` generator and the
 * top-level allOf/anyOf/oneOf dispatch in `zodToOpenAPI` (so a schema like
 * `{ allOf: [...], unevaluatedProperties: false }` correctly enforces it).
 *
 * The generated refine:
 *   1. Pre-populates evaluated keys from own `properties` + `patternProperties`
 *      + `allOf` branches (which always validate)
 *   2. Conditionally adds keys from `anyOf`/`oneOf` branches whose `safeParse`
 *      succeeds at runtime
 *   3. Conditionally adds keys from `then`/`else` based on `if`'s runtime success
 *   4. Adds `dependentSchemas` keys when the dependency key is present in data
 *
 * Message precedence : `x-unevaluatedProperties-message` > caller-provided
 * `messageOverride` (typically `x-error-message`) > Zod default. When neither
 * slot is set the emitted `ctx.addIssue` omits the `message` field entirely.
 */
function ownPropsStmt(sub: Schema): string | undefined {
  const keys = sub.properties ? Object.keys(sub.properties) : []
  return keys.length > 0 ? `for(const k of ${JSON.stringify(keys)}){e.add(k)}` : undefined
}

function patternPropsStmt(sub: Schema): string | undefined {
  if (!sub.patternProperties) {
    return undefined
  }
  const patterns = Object.keys(sub.patternProperties)
  return `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)}){if(new RegExp(p).test(k)){e.add(k)}}}`
}

function collectAllOfStmts(list: readonly Schema[]): readonly string[] {
  return list.flatMap((sub) =>
    [
      ownPropsStmt(sub),
      patternPropsStmt(sub),
      ...(sub.allOf ? collectAllOfStmts(sub.allOf) : []),
    ].filter((s): s is string => s !== undefined),
  )
}

function conditionalBranchStmt(sub: Schema, recurse: (s: Schema) => string): string | undefined {
  if (!sub.properties && !sub.patternProperties) {
    return undefined
  }
  const ifBody = [ownPropsStmt(sub), patternPropsStmt(sub)]
    .filter((s): s is string => s !== undefined)
    .join(';')
  return ifBody ? `if(${recurse(sub)}.safeParse(o).success){${ifBody}}` : undefined
}

export function makeUnevaluatedProperties(
  schema: Schema,
  _errorArg: string,
  recurse: (s: Schema) => string,
  messageOverride?: string,
): string {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) {
    return ''
  }

  const ownStmt = ownPropsStmt(schema)
  const patternStmt = patternPropsStmt(schema)
  const allOfStmts = schema.allOf ? collectAllOfStmts(schema.allOf) : []
  const anyOfStmts = schema.anyOf
    ? schema.anyOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((s): s is string => s !== undefined)
    : []
  const oneOfStmts = schema.oneOf
    ? schema.oneOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((s): s is string => s !== undefined)
    : []
  const ifSchema = schema.if
  const ifStmts = ifSchema
    ? (() => {
        const ifOkStmt = `const ifOk=${recurse(ifSchema)}.safeParse(o).success`
        const ifKeys = ifSchema.properties ? Object.keys(ifSchema.properties) : []
        const thenKeys = schema.then?.properties ? Object.keys(schema.then.properties) : []
        const elseKeys = schema.else?.properties ? Object.keys(schema.else.properties) : []
        return [
          ifOkStmt,
          ifKeys.length > 0
            ? `if(ifOk){for(const k of ${JSON.stringify(ifKeys)}){e.add(k)}}`
            : undefined,
          thenKeys.length > 0
            ? `if(ifOk){for(const k of ${JSON.stringify(thenKeys)}){e.add(k)}}`
            : undefined,
          elseKeys.length > 0
            ? `if(!ifOk){for(const k of ${JSON.stringify(elseKeys)}){e.add(k)}}`
            : undefined,
        ].filter((s): s is string => s !== undefined)
      })()
    : []
  const depSchemaStmts = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, sub]) => {
          const keys = sub.properties ? Object.keys(sub.properties) : []
          return keys.length > 0
            ? `if(${JSON.stringify(key)} in o){for(const k of ${JSON.stringify(keys)}){e.add(k)}}`
            : undefined
        })
        .filter((s): s is string => s !== undefined)
    : []
  const evalStmts = [
    'const e=new Set()',
    ownStmt,
    patternStmt,
    ...allOfStmts,
    ...anyOfStmts,
    ...oneOfStmts,
    ...ifStmts,
    ...depSchemaStmts,
  ].filter((s): s is string => s !== undefined)
  // Message precedence: slot-message > caller override > undefined (omit so
  // Zod uses its default). The literal uses double-quoted `"custom"` to match
  // makeUnevaluatedProperties' existing quoting convention; emitTypelessRefine
  // uses single quotes (see `issueObj`).
  const slotMsg = messageFor(schema, 'unevaluatedProperties')
  const overrideMsg = messageOverride !== undefined ? JSON.stringify(messageOverride) : undefined
  const finalMsg = slotMsg ?? overrideMsg
  const messageField = finalMsg !== undefined ? `,message:${finalMsg}` : ''
  const finalStmt =
    up === false
      ? `for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]${messageField}})}}`
      : (() => {
          const subZod = recurse(up)
          return `const Schema=${subZod};for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}`
        })()

  return `.superRefine((o,ctx)=>{${[...evalStmts, finalStmt].join(';')}})`
}

/**
 * Same as `makeUnevaluatedProperties` but returns the body of a
 * `z.unknown().check((ctx)=>{...})` callback instead of `.superRefine(...)`.
 *
 * Needed when the composed schema is a `ZodIntersection` (allOf with multiple
 * `z.object(...)` members) — Zod's object strip mode removes excess keys before
 * `superRefine` sees them, so the unevaluated check from inside the composed
 * schema never observes the raw input. By calling this from a `z.unknown()`
 * wrapper we operate on `ctx.value` (the request payload), preserving the
 * keys needed for §11.2 semantics.
 *
 * Returns `''` when `unevaluatedProperties` is absent or `true` — the caller
 * can detect "no check needed" by checking the return for emptiness.
 */
export function makeUnevaluatedPropertiesCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
  messageOverride?: string,
): string {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) {
    return ''
  }
  const ownStmt = ownPropsStmt(schema)
  const patternStmt = patternPropsStmt(schema)
  const allOfStmts = schema.allOf ? collectAllOfStmts(schema.allOf) : []
  const anyOfStmts = schema.anyOf
    ? schema.anyOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((s): s is string => s !== undefined)
    : []
  const oneOfStmts = schema.oneOf
    ? schema.oneOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((s): s is string => s !== undefined)
    : []
  const ifSchema = schema.if
  const ifStmts = ifSchema
    ? (() => {
        const ifOkStmt = `const ifOk=${recurse(ifSchema)}.safeParse(o).success`
        const ifKeys = ifSchema.properties ? Object.keys(ifSchema.properties) : []
        const thenKeys = schema.then?.properties ? Object.keys(schema.then.properties) : []
        const elseKeys = schema.else?.properties ? Object.keys(schema.else.properties) : []
        return [
          ifOkStmt,
          ifKeys.length > 0
            ? `if(ifOk){for(const k of ${JSON.stringify(ifKeys)}){e.add(k)}}`
            : undefined,
          thenKeys.length > 0
            ? `if(ifOk){for(const k of ${JSON.stringify(thenKeys)}){e.add(k)}}`
            : undefined,
          elseKeys.length > 0
            ? `if(!ifOk){for(const k of ${JSON.stringify(elseKeys)}){e.add(k)}}`
            : undefined,
        ].filter((s): s is string => s !== undefined)
      })()
    : []
  const depSchemaStmts = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, sub]) => {
          const keys = sub.properties ? Object.keys(sub.properties) : []
          return keys.length > 0
            ? `if(${JSON.stringify(key)} in o){for(const k of ${JSON.stringify(keys)}){e.add(k)}}`
            : undefined
        })
        .filter((s): s is string => s !== undefined)
    : []
  const evalStmts = [
    'const e=new Set()',
    ownStmt,
    patternStmt,
    ...allOfStmts,
    ...anyOfStmts,
    ...oneOfStmts,
    ...ifStmts,
    ...depSchemaStmts,
  ].filter((s): s is string => s !== undefined)
  const slotMsg = messageFor(schema, 'unevaluatedProperties')
  const overrideMsg = messageOverride !== undefined ? JSON.stringify(messageOverride) : undefined
  const finalMsg = slotMsg ?? overrideMsg
  const messageField = finalMsg !== undefined ? `,message:${finalMsg}` : ''
  const finalStmt =
    up === false
      ? `for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o${messageField}})}}`
      : (() => {
          const subZod = recurse(up)
          return `const Schema=${subZod};for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}}}`
        })()
  return `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;${[...evalStmts, finalStmt].join(';')}}`
}
