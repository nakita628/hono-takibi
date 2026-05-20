import type { $ZodIssueCode } from 'zod/v4/core'

import { isSchemaObject } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'

// Build-time check: emitted code uses Zod's "custom" issue code literally.
const _CUSTOM_CODE_GUARD: $ZodIssueCode = 'custom'
void _CUSTOM_CODE_GUARD

// JSON Schema 2020-12 typeless keywords. Emit `z.unknown().superRefine(...)`
// with value-type-aware checks. Messages are slot-driven (x-<keyword>-message).
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

// Returns the slot value JSON-encoded for splicing into generated code, or
// undefined when the slot is absent / non-string (callers omit `message`).
function pickMessage(schema: Schema, slot: keyof Schema): string | undefined {
  const value = schema[slot]
  return typeof value === 'string' ? JSON.stringify(value) : undefined
}

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
  implication: 'x-implication-message',
  if: 'x-if-message',
  // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
  then: 'x-then-message',
  else: 'x-else-message',
  length: 'x-length-message',
  error: 'x-error-message',
} as const satisfies Record<string, keyof Schema>

// Precedence: x-<keyword>-message > x-error-message (except error/then/else) > Zod default.
function messageFor(schema: Schema, key: keyof typeof MESSAGE_SLOTS): string | undefined {
  const direct = pickMessage(schema, MESSAGE_SLOTS[key])
  if (direct !== undefined || key === 'error' || key === 'then' || key === 'else') return direct
  return pickMessage(schema, MESSAGE_SLOTS.error)
}

// `messageExpr` / `pathExpr` are raw code fragments (already-encoded literals).
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

function makeObjectChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  const ownKeysJson = JSON.stringify(Object.keys(schema.properties ?? {}))
  const patternsJson = JSON.stringify(Object.keys(schema.patternProperties ?? {}))

  const requiredMsg = messageFor(schema, 'required')
  const requiredChecks = Array.isArray(schema.required)
    ? schema.required.map(
        (key) =>
          // JSON Schema 2020-12 §6.5.3: "own property" — `in` would include inherited.
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
  // JSON Schema 2020-12 §10.2.2.4: `dependentSchemas` applicator;
  // sub-schema issues propagate, message overrides via x-dependentSchemas-message.
  const depSchemasMsg = messageFor(schema, 'dependentSchemas')
  const depSchMsgField =
    depSchemasMsg !== undefined ? `,message:${JSON.stringify(depSchemasMsg)}` : ''
  const depSchemasChecks = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas).map(
        ([key, sub]) =>
          `if(Object.hasOwn(val,${JSON.stringify(key)})){const Schema=${recurse(sub)};const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${depSchMsgField}})}}}`,
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
  // items:false → trailing items forbidden; items:true → unconstrained.
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
  // Draft 4: exclusiveMinimum:true folds into minimum (<=); number adds a separate check.
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
      ? `{const mod=Math.abs(val/${schema.multipleOf}-Math.round(val/${schema.multipleOf}));if(mod>1e-10){ctx.addIssue(${issueObj(multipleOfMsg)})}}`
      : undefined
  return [minCheck, exMinCheck, maxCheck, exMaxCheck, multipleOfCheck].filter(
    (s): s is string => s !== undefined,
  )
}

function makeGenericChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  // deepEqual via JSON.stringify
  const enumMsg = messageFor(schema, 'enum')
  const enumCheck = Array.isArray(schema.enum)
    ? `if(!${JSON.stringify(schema.enum)}.some((e)=>JSON.stringify(e)===JSON.stringify(val))){ctx.addIssue(${issueObj(enumMsg)})}`
    : undefined
  const constMsg = messageFor(schema, 'const')
  const constCheck =
    schema.const !== undefined
      ? `if(JSON.stringify(${JSON.stringify(schema.const)})!==JSON.stringify(val)){ctx.addIssue(${issueObj(constMsg)})}`
      : undefined
  // JSON Schema 2020-12 §10.2.1.1: allOf applicator; message overrides via x-allOf-message.
  const allOfMsg = messageFor(schema, 'allOf')
  const allOfMsgField = allOfMsg !== undefined ? `,message:${JSON.stringify(allOfMsg)}` : ''
  const allOfChecks = Array.isArray(schema.allOf)
    ? schema.allOf.map(
        (sub) =>
          `{const Schema=${recurse(sub)};const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path${allOfMsgField}})}}}`,
      )
    : []
  // Precedence: x-implication-message > x-anyOf-message > x-error-message.
  const anyOfMsg =
    pickMessage(schema, 'x-implication-message') ??
    pickMessage(schema, 'x-anyOf-message') ??
    pickMessage(schema, 'x-error-message')
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

// `.refine()` for `unevaluatedProperties` per JSON Schema 2020-12 §11.2.
// Precedence: x-unevaluatedProperties-message > messageOverride > Zod default.
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

// Variant for `z.unknown().check((ctx)=>{...})` (operates on `ctx.value`).
// Needed for `ZodIntersection` where strip mode removes excess keys before
// `superRefine` sees them.
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
