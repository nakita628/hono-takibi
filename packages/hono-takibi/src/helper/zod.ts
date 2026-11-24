import {
  ANNOTATION_KEYWORDS,
  hasNoUserChain,
  isAnnotationOnly,
  isSchemaObject,
  isSingleSchema,
  isUntypedObject,
} from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { error, issueMessage, normalizeTypes } from '../utils/index.js'
import { discriminatedBranches } from './discriminator.js'
import { resolveSchemaRef } from './wire.js'

type Schemas = { readonly [k: string]: Schema }

// The message a slot holds as it is written, or undefined when the slot is absent /
// non-string (callers omit `message`). `issueMessage` is what writes it into the code.
function pickMessage(schema: Schema, slot: keyof Schema) {
  const value = schema[slot]
  return typeof value === 'string' ? value : undefined
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
} as const satisfies { [key: string]: keyof Schema }

// Precedence: x-<keyword>-message > x-error-message (except error/then/else) > Zod default.
function messageFor(schema: Schema, key: keyof typeof MESSAGE_SLOTS) {
  const direct = pickMessage(schema, MESSAGE_SLOTS[key])
  if (direct !== undefined || key === 'error' || key === 'then' || key === 'else') return direct
  return pickMessage(schema, MESSAGE_SLOTS.error)
}

// The `custom` issue a check on `val` reports, with the message of its keyword.
function issueObj(message: string | undefined) {
  return message === undefined
    ? "{code:'custom'}"
    : `{code:'custom',message:${issueMessage(message, "{code:'custom',path:[],input:val}")}}`
}

// How a check writes into what surrounds it: `ctx.addIssue(...)` in a refine (which sees
// the parsed value), `ctx.issues.push(...)` in a check on the raw input (a refine would see
// a stripped object instead). `issue` reports a `custom` issue of the check's own;
// `forward` hands on `issue`, an issue of a subschema, with the `message` field given.
type Report = {
  readonly issue: (issue: string) => string
  readonly forward: (messageField: string) => string
}

const REFINE_REPORT: Report = {
  issue: (issue) => `ctx.addIssue(${issue})`,
  forward: (messageField) => `ctx.addIssue({...issue,path:issue.path${messageField}})`,
}

// The pushed issue carries `input`: a raw issue without it does not type-check
// (`$ZodRawIssue` requires it), and a forwarded one is narrowed by its code (#405).
const RAW_REPORT: Report = {
  issue: (issue) => `ctx.issues.push({...${issue},input:val})`,
  forward: (messageField) => makeIssueForwarding(`{...issue,input:issue.input${messageField}}`),
}

// A check on the raw input, as the source of a callback that takes the payload (`ctx`).
// `async` is the same check for a parse that is asynchronous: a check that parses a schema
// of the document (`safeParse`) throws when that schema has an asynchronous refinement, so
// it is run again with `safeParseAsync` (see `withRawCheck` in the schema emitter). A check
// that parses nothing has no asynchronous form.
export type RawCheck = { readonly sync: string; readonly async?: string }

// How a schema is parsed inside a check: synchronously, or awaited.
type Parse = (zod: string, value: string) => string
const parseSync: Parse = (zod, value) => `${zod}.safeParse(${value})`
const parseAsync: Parse = (zod, value) => `(await ${zod}.safeParseAsync(${value}))`

// A check written for both parses: with an asynchronous form when it parses a schema, which
// is when the two differ.
function bothParses(build: (parse: Parse) => string): RawCheck {
  const sync = build(parseSync)
  const awaited = build(parseAsync)
  return sync === awaited ? { sync } : { sync, async: `async${awaited}` }
}

function makeObjectChecks(
  schema: Schema,
  recurse: (s: Schema) => string,
  report: Report = REFINE_REPORT,
  parse: Parse = parseSync,
): readonly string[] {
  const ownKeys = Object.keys(schema.properties ?? {})
  const patterns = Object.keys(schema.patternProperties ?? {})
  // The keys the schema declares, which `additionalProperties` and `unevaluatedProperties`
  // do not apply to. A list that is empty is not written: `[]` is a `never[]` to
  // TypeScript, so `[].includes(k)` does not type-check (#375), and the guard it was in is
  // always true.
  const declared = [
    ...(ownKeys.length > 0 ? [`!${JSON.stringify(ownKeys)}.includes(k)`] : []),
    ...(patterns.length > 0
      ? [`!${JSON.stringify(patterns)}.some((p)=>new RegExp(p).test(k))`]
      : []),
  ]
  const forUndeclaredKeys = (body: string) =>
    `for(const k of Object.keys(val)){${declared.length === 0 ? body : `if(${declared.join('&&')}){${body}}`}}`

  const requiredMessage = messageFor(schema, 'required')
  const requiredChecks = Array.isArray(schema.required)
    ? schema.required.map(
        (key) =>
          // JSON Schema 2020-12 §6.5.3: "own property" — `in` would include inherited.
          `if(!Object.hasOwn(val,${JSON.stringify(key)})){${report.issue(issueObj(requiredMessage))}}`,
      )
    : []
  const minPropertiesCheck =
    typeof schema.minProperties === 'number'
      ? `if(Object.keys(val).length<${schema.minProperties}){${report.issue(issueObj(messageFor(schema, 'minProperties')))}}`
      : undefined
  const maxPropertiesCheck =
    typeof schema.maxProperties === 'number'
      ? `if(Object.keys(val).length>${schema.maxProperties}){${report.issue(issueObj(messageFor(schema, 'maxProperties')))}}`
      : undefined
  const propertiesMessage = messageFor(schema, 'properties')
  const propertyChecks = schema.properties
    ? Object.entries(schema.properties).map(
        ([key, sub]) =>
          `if(Object.hasOwn(val,${JSON.stringify(key)})){const Schema=${recurse(sub)};if(!${parse('Schema', `Reflect.get(val,${JSON.stringify(key)})`)}.success){${report.issue(issueObj(propertiesMessage))}}}`,
      )
    : []
  const additionalPropertiesMessage = messageFor(schema, 'additionalProperties')
  const additionalPropertiesCheck = (() => {
    if (schema.additionalProperties === false) {
      return forUndeclaredKeys(report.issue(issueObj(additionalPropertiesMessage)))
    }
    if (isSchemaObject(schema.additionalProperties)) {
      const subZod = recurse(schema.additionalProperties)
      return `{const Schema=${subZod};${forUndeclaredKeys(`if(!${parse('Schema', 'Reflect.get(val,k)')}.success){${report.issue(issueObj(additionalPropertiesMessage))}}`)}}`
    }
    return undefined
  })()
  const patternPropertiesMessage = messageFor(schema, 'patternProperties')
  const patternPropertiesChecks = schema.patternProperties
    ? Object.entries(schema.patternProperties).map(
        ([pattern, sub]) =>
          `{const Schema=${recurse(sub)};for(const k of Object.keys(val)){if(new RegExp(${JSON.stringify(pattern)}).test(k)){if(!${parse('Schema', 'Reflect.get(val,k)')}.success){${report.issue(issueObj(patternPropertiesMessage))}}}}}`,
      )
    : []
  const propertyNamesCheck = schema.propertyNames?.pattern
    ? `for(const k of Object.keys(val)){if(!new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k)){${report.issue(issueObj(messageFor(schema, 'propertyNames')))}}}`
    : undefined
  const dependentRequiredMessage = messageFor(schema, 'dependentRequired')
  const dependentRequiredChecks = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps
            .map((dependency) => `Object.hasOwn(val,${JSON.stringify(dependency)})`)
            .join('&&')
          return depsCheck
            ? `if(Object.hasOwn(val,${JSON.stringify(key)})){if(!(${depsCheck})){${report.issue(issueObj(dependentRequiredMessage))}}}`
            : undefined
        })
        .filter((s): s is string => s !== undefined)
    : []
  // JSON Schema 2020-12 §10.2.2.4: `dependentSchemas` applicator;
  // sub-schema issues propagate, message overrides via x-dependentSchemas-message.
  const dependentSchemasMessage = messageFor(schema, 'dependentSchemas')
  const dependentSchemasMessageField =
    dependentSchemasMessage !== undefined
      ? `,message:${issueMessage(dependentSchemasMessage, 'issue')}`
      : ''
  const dependentSchemasChecks = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas).map(
        ([key, sub]) =>
          `if(Object.hasOwn(val,${JSON.stringify(key)})){const Schema=${recurse(sub)};const result=${parse('Schema', 'val')};if(!result.success){for(const issue of result.error.issues){${report.forward(dependentSchemasMessageField)}}}}`,
      )
    : []
  // `additionalProperties` as a schema or `true` evaluates every key it applies to
  // (all undeclared keys), so `unevaluatedProperties` has nothing left to reject
  // (#462). With `additionalProperties: false` those keys already fail there, so the
  // check stays.
  const unevaluatedPropertiesCheck =
    schema.unevaluatedProperties === false &&
    schema.additionalProperties !== true &&
    !isSchemaObject(schema.additionalProperties)
      ? forUndeclaredKeys(report.issue(issueObj(messageFor(schema, 'unevaluatedProperties'))))
      : undefined

  return [
    ...requiredChecks,
    minPropertiesCheck,
    maxPropertiesCheck,
    ...propertyChecks,
    additionalPropertiesCheck,
    ...patternPropertiesChecks,
    propertyNamesCheck,
    ...dependentRequiredChecks,
    ...dependentSchemasChecks,
    unevaluatedPropertiesCheck,
  ].filter((s): s is string => s !== undefined)
}

/**
 * Whether `items` evaluates every element after `prefixItems`: a schema, `true` or `false`
 * does (`false` evaluates them by failing), so `unevaluatedItems` has nothing left to check.
 * The array form of `items` names positions, not the rest, and is not counted.
 */
export function isRestEvaluated(schema: Schema) {
  return schema.items !== undefined && !Array.isArray(schema.items)
}

function makeArrayChecks(
  schema: Schema,
  recurse: (s: Schema) => string,
  report: Report = REFINE_REPORT,
  parse: Parse = parseSync,
): readonly string[] {
  const minItemsCheck =
    typeof schema.minItems === 'number'
      ? `if(val.length<${schema.minItems}){${report.issue(issueObj(messageFor(schema, 'minItems')))}}`
      : undefined
  const maxItemsCheck =
    typeof schema.maxItems === 'number'
      ? `if(val.length>${schema.maxItems}){${report.issue(issueObj(messageFor(schema, 'maxItems')))}}`
      : undefined
  const uniqueCheck =
    schema.uniqueItems === true
      ? `{const seen=new Set();for(const item of val){const key=JSON.stringify(item);if(seen.has(key)){${report.issue(issueObj(messageFor(schema, 'uniqueItems')))};break}seen.add(key)}}`
      : undefined
  const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
  const prefixItemsMessage = messageFor(schema, 'prefixItems')
  const prefixChecks = schema.prefixItems
    ? schema.prefixItems.map(
        (sub, index) =>
          `if(val.length>${index}){const Schema=${recurse(sub)};if(!${parse('Schema', `val[${index}]`)}.success){${report.issue(issueObj(prefixItemsMessage))}}}`,
      )
    : []
  // items:false → trailing items forbidden; items:true → unconstrained.
  const itemsMessage = messageFor(schema, 'items')
  const itemsCheck = (() => {
    const items = schema.items
    if (items === false) {
      return `if(val.length>${prefixCount}){${report.issue(issueObj(itemsMessage))}}`
    }
    if (items === undefined || items === true || !isSingleSchema(items)) {
      return undefined
    }
    return `{const Schema=${recurse(items)};for(let i=${prefixCount};i<val.length;i++){if(!${parse('Schema', 'val[i]')}.success){${report.issue(issueObj(itemsMessage))}}}}`
  })()
  // Precedence, as in the typed array: x-minContains-message / x-maxContains-message >
  // x-contains-message > x-error-message.
  const containsMessage = messageFor(schema, 'contains')
  const minContainsMessage = pickMessage(schema, 'x-minContains-message') ?? containsMessage
  const maxContainsMessage = pickMessage(schema, 'x-maxContains-message') ?? containsMessage
  const containsCheck = schema.contains
    ? (() => {
        const subZod = recurse(schema.contains)
        const minC = schema.minContains ?? 1
        const maxC = schema.maxContains
        const lowerBoundMessage =
          schema.minContains !== undefined ? minContainsMessage : containsMessage
        const minCheck = `if(m<${minC}){${report.issue(issueObj(lowerBoundMessage))}}`
        const maxCheck =
          maxC !== undefined ? `;if(m>${maxC}){${report.issue(issueObj(maxContainsMessage))}}` : ''
        // A callback of `filter` cannot await, so the awaited form counts in a loop.
        const count =
          parse === parseSync
            ? `const m=val.filter((i)=>${subZod}.safeParse(i).success).length`
            : `const Schema=${subZod};let m=0;for(const i of val){if(${parse('Schema', 'i')}.success){m++}}`
        return `{${count};${minCheck}${maxCheck}}`
      })()
    : undefined
  // `items` evaluates every element after the prefix, so none is left unevaluated.
  const unevaluatedItemsCheck =
    schema.unevaluatedItems === false && !isRestEvaluated(schema)
      ? `if(val.length>${prefixCount}){${report.issue(issueObj(messageFor(schema, 'unevaluatedItems')))}}`
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

function makeStringChecks(schema: Schema, report: Report = REFINE_REPORT): readonly string[] {
  const minCheck =
    typeof schema.minLength === 'number'
      ? `if([...val].length<${schema.minLength}){${report.issue(issueObj(messageFor(schema, 'minLength')))}}`
      : undefined
  const maxCheck =
    typeof schema.maxLength === 'number'
      ? `if([...val].length>${schema.maxLength}){${report.issue(issueObj(messageFor(schema, 'maxLength')))}}`
      : undefined
  const patternCheck = schema.pattern
    ? `if(!new RegExp(${JSON.stringify(schema.pattern)}).test(val)){${report.issue(issueObj(messageFor(schema, 'pattern')))}}`
    : undefined
  return [minCheck, maxCheck, patternCheck].filter((s): s is string => s !== undefined)
}

function makeNumberChecks(schema: Schema, report: Report = REFINE_REPORT): readonly string[] {
  // Draft 4: exclusiveMinimum:true folds into minimum (<=); number adds a separate check.
  const minimumIsExclusive = schema.exclusiveMinimum === true && typeof schema.minimum === 'number'
  const minimumMessage = messageFor(schema, 'minimum')
  const exclusiveMinimumMessage = messageFor(schema, 'exclusiveMinimum')
  const minCheck =
    typeof schema.minimum === 'number'
      ? minimumIsExclusive
        ? `if(val<=${schema.minimum}){${report.issue(issueObj(exclusiveMinimumMessage))}}`
        : `if(val<${schema.minimum}){${report.issue(issueObj(minimumMessage))}}`
      : undefined
  const exclusiveMinimumCheck =
    typeof schema.exclusiveMinimum === 'number'
      ? `if(val<=${schema.exclusiveMinimum}){${report.issue(issueObj(exclusiveMinimumMessage))}}`
      : undefined
  const maximumIsExclusive = schema.exclusiveMaximum === true && typeof schema.maximum === 'number'
  const maximumMessage = messageFor(schema, 'maximum')
  const exclusiveMaximumMessage = messageFor(schema, 'exclusiveMaximum')
  const maxCheck =
    typeof schema.maximum === 'number'
      ? maximumIsExclusive
        ? `if(val>=${schema.maximum}){${report.issue(issueObj(exclusiveMaximumMessage))}}`
        : `if(val>${schema.maximum}){${report.issue(issueObj(maximumMessage))}}`
      : undefined
  const exclusiveMaximumCheck =
    typeof schema.exclusiveMaximum === 'number'
      ? `if(val>=${schema.exclusiveMaximum}){${report.issue(issueObj(exclusiveMaximumMessage))}}`
      : undefined
  const multipleOfCheck =
    typeof schema.multipleOf === 'number'
      ? `{const mod=Math.abs(val/${schema.multipleOf}-Math.round(val/${schema.multipleOf}));if(mod>1e-10){${report.issue(issueObj(messageFor(schema, 'multipleOf')))}}}`
      : undefined
  return [minCheck, exclusiveMinimumCheck, maxCheck, exclusiveMaximumCheck, multipleOfCheck].filter(
    (s): s is string => s !== undefined,
  )
}

// `if` / `then` / `else` as one statement on `val`. Precedence: x-then-message /
// x-else-message > x-if-message > x-error-message.
function makeConditionalStmt(
  schema: Schema,
  recurse: (s: Schema) => string,
  report: Report,
  parse: Parse = parseSync,
): string | undefined {
  const ifSchema = schema.if
  const ifMessage = messageFor(schema, 'if')
  const thenMessage = messageFor(schema, 'then') ?? ifMessage
  const elseMessage = messageFor(schema, 'else') ?? ifMessage
  return ifSchema
    ? (() => {
        const ifZod = recurse(ifSchema)
        const thenSchema = schema.then
        const elseSchema = schema.else
        const thenPart = thenSchema
          ? `if(ifOk){const Schema=${recurse(thenSchema)};if(!${parse('Schema', 'val')}.success){${report.issue(issueObj(thenMessage))}}}`
          : ''
        const elsePart = elseSchema
          ? `if(!ifOk){const Schema=${recurse(elseSchema)};if(!${parse('Schema', 'val')}.success){${report.issue(issueObj(elseMessage))}}}`
          : ''
        return thenPart || elsePart
          ? `{const ifOk=${parse(ifZod, 'val')}.success;${thenPart};${elsePart}}`
          : undefined
      })()
    : undefined
}

function makeGenericChecks(
  schema: Schema,
  recurse: (s: Schema) => string,
  report: Report = REFINE_REPORT,
  parse: Parse = parseSync,
): readonly string[] {
  // deepEqual via JSON.stringify
  const enumCheck = Array.isArray(schema.enum)
    ? `if(!${JSON.stringify(schema.enum)}.some((e)=>JSON.stringify(e)===JSON.stringify(val))){${report.issue(issueObj(messageFor(schema, 'enum')))}}`
    : undefined
  const constCheck =
    schema.const !== undefined
      ? `if(JSON.stringify(${JSON.stringify(schema.const)})!==JSON.stringify(val)){${report.issue(issueObj(messageFor(schema, 'const')))}}`
      : undefined
  // JSON Schema 2020-12 §10.2.1.1: allOf applicator; message overrides via x-allOf-message.
  const allOfMessage = messageFor(schema, 'allOf')
  const allOfMessageField =
    allOfMessage !== undefined ? `,message:${issueMessage(allOfMessage, 'issue')}` : ''
  const allOfChecks = Array.isArray(schema.allOf)
    ? schema.allOf.map(
        (sub: Schema) =>
          `{const Schema=${recurse(sub)};const result=${parse('Schema', 'val')};if(!result.success){for(const issue of result.error.issues){${report.forward(allOfMessageField)}}}}`,
      )
    : []
  // Precedence: x-implication-message > x-anyOf-message > x-error-message.
  const anyOfMessage =
    pickMessage(schema, 'x-implication-message') ??
    pickMessage(schema, 'x-anyOf-message') ??
    pickMessage(schema, 'x-error-message')
  const anyOfCheck =
    Array.isArray(schema.anyOf) && schema.anyOf.length > 0
      ? `if(!(${schema.anyOf.map((sub: Schema) => `${parse(recurse(sub), 'val')}.success`).join('||')})){${report.issue(issueObj(anyOfMessage))}}`
      : undefined
  const oneOfMessage = messageFor(schema, 'oneOf')
  const oneOfCheck =
    Array.isArray(schema.oneOf) && schema.oneOf.length > 0
      ? `if((${schema.oneOf.map((sub: Schema) => `(${parse(recurse(sub), 'val')}.success?1:0)`).join('+')})!==1){${report.issue(issueObj(oneOfMessage))}}`
      : undefined
  const notCheck = schema.not
    ? `if(${parse(recurse(schema.not), 'val')}.success){${report.issue(issueObj(messageFor(schema, 'not')))}}`
    : undefined
  const ifCheck = makeConditionalStmt(schema, recurse, report, parse)

  return [enumCheck, constCheck, ...allOfChecks, anyOfCheck, oneOfCheck, notCheck, ifCheck].filter(
    (s): s is string => s !== undefined,
  )
}

// The keywords of a schema as statements on `val`, each kind guarded by the type of value
// it applies to: a keyword says nothing of a value of another type (JSON Schema 2020-12).
function typelessBlocks(
  schema: Schema,
  recurse: (s: Schema) => string,
  report: Report,
  parse: Parse = parseSync,
): readonly string[] {
  const objectChecks = makeObjectChecks(schema, recurse, report, parse)
  const arrayChecks = makeArrayChecks(schema, recurse, report, parse)
  const stringChecks = makeStringChecks(schema, report)
  const numberChecks = makeNumberChecks(schema, report)
  const genericChecks = makeGenericChecks(schema, recurse, report, parse)
  return [
    objectChecks.length > 0
      ? `if(typeof val==='object'&&val!==null&&!Array.isArray(val)){${objectChecks.join(';')}}`
      : undefined,
    arrayChecks.length > 0 ? `if(Array.isArray(val)){${arrayChecks.join(';')}}` : undefined,
    stringChecks.length > 0 ? `if(typeof val==='string'){${stringChecks.join(';')}}` : undefined,
    numberChecks.length > 0 ? `if(typeof val==='number'){${numberChecks.join(';')}}` : undefined,
    genericChecks.length > 0 ? genericChecks.join(';') : undefined,
  ].filter((s): s is string => s !== undefined)
}

export function emitTypelessRefine(schema: Schema, recurse: (s: Schema) => string) {
  const blocks = typelessBlocks(schema, recurse, REFINE_REPORT)
  if (blocks.length === 0) {
    return 'z.any()'
  }
  return `z.unknown().superRefine((val,ctx)=>{${blocks.join(';')}})`
}

/**
 * The validation keywords written beside a combinator (`maxLength` beside `anyOf`, `minimum`
 * beside `oneOf`, `if` beside `allOf`), as a check on the raw input (#598). JSON Schema ANDs
 * sibling keywords, and the combinator paths emit the combinator alone. What those paths
 * handle themselves is left out: the combinators, the sibling shape (`properties` /
 * `required`), `additionalProperties` and the `unevaluated*` keywords, whose meaning depends
 * on what the members evaluate. `undefined` when no keyword is left.
 *
 * Beside a `not` alone (`isNotAlone`) only the `not` is left out: it is emitted as a refine
 * on `z.any()`, which reads no shape and has no member that evaluates anything (#647).
 */
export function makeSiblingKeywordCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
  isNotAlone = false,
): RawCheck | undefined {
  const keywords = (() => {
    const { allOf: _allOf, anyOf: _anyOf, oneOf: _oneOf, not: _not, ...beside } = schema
    if (isNotAlone) return beside
    const {
      properties: _properties,
      required: _required,
      additionalProperties: _additionalProperties,
      unevaluatedProperties: _unevaluatedProperties,
      unevaluatedItems: _unevaluatedItems,
      ...rest
    } = beside
    return rest
  })()
  if (typelessBlocks(keywords, recurse, RAW_REPORT).length === 0) return undefined
  return bothParses(
    (parse) =>
      `(ctx)=>{const val=ctx.value;${typelessBlocks(keywords, recurse, RAW_REPORT, parse).join(';')}}`,
  )
}

/**
 * `if` / `then` / `else` on a schema whose type is not an object (#598): the string, number,
 * integer, boolean and array emitters do not read them. `undefined` when there is no `if`,
 * or neither `then` nor `else`.
 *
 * A check on the raw input (`(ctx)=>`), or with `onOutput` a refinement of what the schema
 * hands out (`(val,ctx)=>`): where the emitter converts its input itself (`x-coerce`), the
 * raw input is the text, which no number keyword applies to (#646). A bigint is compared as
 * the number it was read from.
 */
export function makeConditionalCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
  onOutput = false,
): RawCheck | undefined {
  if (makeConditionalStmt(schema, recurse, RAW_REPORT) === undefined) return undefined
  const isBigint =
    schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint'
  return bothParses((parse) => {
    if (!onOutput) {
      return `(ctx)=>{const val=ctx.value;${makeConditionalStmt(schema, recurse, RAW_REPORT, parse)}}`
    }
    const stmt = makeConditionalStmt(schema, recurse, REFINE_REPORT, parse)
    return isBigint
      ? `(output,ctx)=>{const val=typeof output==='bigint'?Number(output):output;${stmt}}`
      : `(val,ctx)=>{${stmt}}`
  })
}

// Whether a schema accepts only object values (plus `null`, which the outer
// `nullable` / `type` handling re-allows): a declared type settles it; a
// `$ref` is followed; `allOf` is object-only when some member is (the
// intersection accepts a non-object only when every member does);
// `anyOf` / `oneOf` when every branch is; an untyped schema with only object
// keywords is read as an object by the emitter. Anything else — `not`,
// `enum` / `const`, a foreign keyword beside `properties` — is conservatively
// not object-only: the guarded refine is always correct there, it only loses
// the type merge and the property paths an intersection would have given.
export function requiresObject(
  schema: Schema | boolean,
  schemas?: Schemas,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return !schema
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return false
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined ? false : requiresObject(target, schemas, [...seen, schema.$ref])
  }
  const types = normalizeTypes(schema.type)
  if (types.length > 0) {
    return types.includes('object') && types.every((type) => type === 'object' || type === 'null')
  }
  if (schema.allOf !== undefined) {
    return schema.allOf.some((member) => requiresObject(member, schemas, seen))
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    return union.length > 0 && union.every((branch) => requiresObject(branch, schemas, seen))
  }
  return isUntypedObject(schema)
}

// The JSON types a declared `type` names, without `null`: what the outer
// `nullable` / `type` handling re-allows is not part of what a combinator
// beside the type has to be narrowed to.
type DeclaredType = Exclude<ReturnType<typeof normalizeTypes>[number], 'null'>

function declaredTypes(schema: Schema): readonly DeclaredType[] {
  return normalizeTypes(schema.type).filter((type): type is DeclaredType => type !== 'null')
}

function isValueOfType(value: unknown, type: DeclaredType): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number'
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value)
    case 'boolean':
      return typeof value === 'boolean'
    case 'array':
      return Array.isArray(value)
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value)
    // `date` is not a JSON type: no `enum` / `const` value is one.
    case 'date':
      return false
    default:
      return false
  }
}

/**
 * Whether a `const` is a value the declared `type` rules out: `type: string` beside
 * `const: 0` accepts nothing (#604). No declared type rules nothing out, `null` is the outer
 * handling's, and `date` is not a JSON type.
 */
export function isConstOutsideType(schema: Schema): boolean {
  const declared = declaredTypes(schema)
  if (schema.const === null || declared.length === 0 || declared.includes('date')) return false
  return !declared.some((type) => isValueOfType(schema.const, type))
}

// Whether a schema accepts only values of the declared types (plus `null`,
// as in `requiresObject`): the generalisation of `requiresObject` to any
// declared type (#468). A member's own type settles it (`integer` is a
// `number`); `enum` / `const` when every value is of a declared type; an
// untyped schema the emitter reads as `z.object(...)` when `object` is
// declared; `allOf` when some member does, `anyOf` / `oneOf` when every
// branch does. A `$ref` that cannot be resolved, or that comes back to
// itself, is taken as conforming: `type: object` beside `allOf: [$ref]` is
// how most documents write inheritance, and what it names is emitted as it is.
function admitsOnlyTypes(
  schema: Schema,
  declared: readonly DeclaredType[],
  schemas?: Schemas,
  seen: readonly string[] = [],
): boolean {
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return true
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? true
      : admitsOnlyTypes(target, declared, schemas, [...seen, schema.$ref])
  }
  const types = declaredTypes(schema)
  if (types.length > 0) {
    return types.every(
      (type) => declared.includes(type) || (type === 'integer' && declared.includes('number')),
    )
  }
  // `type: 'null'` alone: `null` is the outer handling's, as in `requiresObject`.
  if (normalizeTypes(schema.type).length > 0) return true
  const values = Array.isArray(schema.enum)
    ? schema.enum
    : schema.const !== undefined
      ? [schema.const]
      : undefined
  if (values !== undefined) {
    return values.every(
      (value) => value === null || declared.some((type) => isValueOfType(value, type)),
    )
  }
  if (schema.allOf !== undefined) {
    return schema.allOf.some((member) => admitsOnlyTypes(member, declared, schemas, seen))
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    return (
      union.length > 0 && union.every((branch) => admitsOnlyTypes(branch, declared, schemas, seen))
    )
  }
  return declared.includes('object') && isUntypedObject(schema)
}

// The keywords that constrain values of one type alone. A typeless member of
// these (and annotations, messages) beside a declared type is that type with
// the keywords on it — `type: string` beside `allOf: [{ minLength: 1 }]` is
// `z.string().min(1)`. `object` has none on purpose (only a member of
// annotations alone takes it): a typed object emits its shape from
// `properties`, so `required` alone would be dropped by the typed emitter
// where the guarded refine checks it.
const KEYWORDS_OF_TYPE: { readonly [k: string]: ReadonlySet<string> } = {
  string: new Set(['minLength', 'maxLength', 'pattern']),
  number: new Set(['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf']),
  integer: new Set(['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf']),
  boolean: new Set(),
  object: new Set(),
  array: new Set(['minItems', 'maxItems', 'items']),
}

// Whether the declared type can be written on the member itself: the member
// has no type of its own, and either carries only keywords of the declared
// type, or is itself a combinator / `not` — the type beside those is narrowed
// by this same rule when the member is emitted.
function canTakeType(member: Schema, type: DeclaredType): boolean {
  if (
    member.type !== undefined ||
    member.$ref !== undefined ||
    member.enum !== undefined ||
    member.const !== undefined
  ) {
    return false
  }
  const keys = Object.keys(member).filter(
    (key) => !ANNOTATION_KEYWORDS.has(key) && !/^x-.+-message$/u.test(key),
  )
  const combinators = new Set(['allOf', 'anyOf', 'oneOf', 'not'])
  if (keys.length > 0 && keys.every((key) => combinators.has(key))) return true
  const own = KEYWORDS_OF_TYPE[type]
  return own !== undefined && keys.every((key) => own.has(key))
}

// Whether a schema carries its own wrapping (`.nullable()`, `.default()`,
// `.prefault()`, `.catch()`) on itself. `canAdmitNullOrUndefined` follows a
// `$ref` to its target and never sees the wrapping on the branch itself,
// so a `$ref` branch with its own wrapping needs this check beside it.
export function hasOwnWrapping(branch: Schema): boolean {
  return (
    branch.nullable === true ||
    normalizeTypes(branch.type).includes('null') ||
    branch.default !== undefined ||
    branch['x-prefault'] !== undefined ||
    branch['x-catch'] !== undefined
  )
}

// Whether the `properties` beside an `allOf` are emitted as one more member of the
// intersection (`X.and(z.object({ ... }))`), which is what puts them in the inferred type.
// They are when the intersection already rejects every non-object: a declared object
// type, or a member that only accepts objects.
//
// A shape member after the whole intersection would reject the `null`
// the intersection admits when the parent type allows it, every member
// admits it, and the parent does not re-admit it: the shape is distributed
// into the members instead (#471), which now carry it inside their own
// wrapping. A declared parent type without `null` already rejects it, so
// the member path stays correct there. A member admits it through its own
// wrapping as well as through its target: a `$ref` member with its own
// `.nullable()` / `.default()` is not seen by `canAdmitNullOrUndefined`,
// which follows the `$ref`. The shape member itself is never an
// annotation-only nullable member, so it cannot change the re-admission.
export function isShapeMember(schema: Schema, schemas?: Schemas): boolean {
  if (schema.allOf === undefined || schema.properties === undefined) return false
  const types = normalizeTypes(schema.type)
  // `type: 'null'` alone also satisfies the `every` below, but it accepts no
  // object: require 'object' too, as `requiresObject` does.
  const objectOnly =
    types.includes('object') && types.every((type) => type === 'object' || type === 'null')
  const membersRequireObject = schema.allOf.some((member) => requiresObject(member, schemas))
  if (!(objectOnly || membersRequireObject)) return false
  const intersectionAdmitsNullOrUndefined =
    (schema.type === undefined || types.includes('null')) &&
    schema.allOf.length > 0 &&
    schema.allOf.every(
      (member) => canAdmitNullOrUndefined(member, schemas) || hasOwnWrapping(member),
    )
  const parentReAdmitsNull =
    schema.nullable === true ||
    types.includes('null') ||
    schema.allOf.some((s) => s.type === 'null' || (s.nullable === true && isAnnotationOnly(s)))
  return !(intersectionAdmitsNullOrUndefined && !parentReAdmitsNull)
}

// A declared `type` beside `allOf` / `anyOf` / `oneOf` constrains the value as
// a sibling of the combinator (JSON Schema 2020-12: sibling keywords are
// ANDed). The combinator paths emit only the combinator, so the type is
// written into the members here (#468), which is exact: `T ∧ (A ∨ B)` is
// `(T ∧ A) ∨ (T ∧ B)`, "exactly one of `T ∧ Aᵢ`" is `T` and exactly one
// `Aᵢ`, and `T ∧ A ∧ B` needs `T` on one member only.
//
// - A member that already accepts only the declared type is left as it is.
// - A typeless member of the declared type's own keywords takes the type, so
//   it is emitted as the typed schema (`z.string().min(1)`) instead of a
//   guarded refine on `z.unknown()` — that is what narrows the inferred type.
// - Any other union branch becomes `allOf: [{ type }, branch]`, the typed
//   schema intersected with the branch. An `allOf` gets `{ type }` as a member
//   of its own when no member settles the type.
//
// Returns the schema itself when nothing has to change — no declared type,
// no combinator, or the type is already settled — so the caller can tell by
// identity, and a rewritten schema comes back unchanged.
export function narrowToDeclaredType(schema: Schema, schemas?: Schemas): Schema {
  const declared = declaredTypes(schema)
  const [single, ...others] = declared
  if (single === undefined) return schema
  const typeSchema: Schema = { type: others.length === 0 ? single : [single, ...others] }
  const settled = (member: Schema) => admitsOnlyTypes(member, declared, schemas)
  const takes = (member: Schema) => others.length === 0 && canTakeType(member, single)
  // `type: object` with a sibling shape: the combinator paths intersect the
  // combinator with the shape's own `z.object(...)` (#461), which settles the
  // type already.
  const objectOnly = others.length === 0 && single === 'object'
  const hasShape =
    (schema.properties !== undefined && Object.keys(schema.properties).length > 0) ||
    (Array.isArray(schema.required) && schema.required.length > 0)
  if (schema.allOf !== undefined) {
    if (objectOnly && schema.properties !== undefined) return schema
    // An annotation-only member describes the intersection and is not emitted
    // as a member (#420): it is left alone.
    const members = schema.allOf.map((member) =>
      !settled(member) && !isAnnotationOnly(member) && takes(member)
        ? { ...member, type: single }
        : member,
    )
    if (members.some(settled)) {
      return members.every((member, index) => member === schema.allOf?.[index])
        ? schema
        : { ...schema, allOf: members }
    }
    return { ...schema, allOf: [typeSchema, ...members] }
  }
  const key =
    schema.anyOf !== undefined ? 'anyOf' : schema.oneOf !== undefined ? 'oneOf' : undefined
  if (key === undefined) return schema
  const branches = schema[key] ?? []
  if (branches.length === 0) return schema
  if (
    objectOnly &&
    hasShape &&
    !(
      normalizeTypes(schema.type).includes('null') &&
      branches.some(
        (branch) =>
          canAdmitNullOrUndefined(branch, schemas) ||
          branch.nullable === true ||
          normalizeTypes(branch.type).includes('null') ||
          branch.default !== undefined ||
          branch['x-prefault'] !== undefined ||
          branch['x-catch'] !== undefined,
      )
    )
  ) {
    return schema
  }
  if (branches.every(settled)) return schema
  const typed = (branch: Schema): Schema =>
    takes(branch) ? { ...branch, ...typeSchema } : { allOf: [typeSchema, branch] }
  return {
    ...schema,
    [key]: branches.map((branch) => (settled(branch) ? branch : typed(branch))),
  }
}

// Whether a schema CAN accept an object value: the dual of `requiresObject`,
// used to decide where a sibling shape (#461) has to be enforced. Conservative
// in the permissive direction — an over-approximation only adds a check that
// turns out vacuous, while an under-approximation would leave an object value
// unchecked. A declared type settles it; `enum` / `const` without an object
// member do too; an untyped schema accepts everything, so it may accept an
// object as well.
export function canAcceptObject(
  schema: Schema | boolean,
  schemas?: Schemas,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return schema
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return true
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined ? true : canAcceptObject(target, schemas, [...seen, schema.$ref])
  }
  if (Array.isArray(schema.enum)) {
    return schema.enum.some(
      (member) => typeof member === 'object' && member !== null && !Array.isArray(member),
    )
  }
  if (schema.const !== undefined) {
    return typeof schema.const === 'object' && schema.const !== null && !Array.isArray(schema.const)
  }
  const types = normalizeTypes(schema.type)
  if (types.length > 0) {
    return types.includes('object')
  }
  if (schema.allOf !== undefined) {
    // An empty `allOf` is a vacuous intersection: it accepts everything,
    // including objects — `some` would say it accepts nothing.
    return (
      schema.allOf.length === 0 ||
      schema.allOf.some((member) => canAcceptObject(member, schemas, seen))
    )
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    return union.some((branch) => canAcceptObject(branch, schemas, seen))
  }
  return true
}

// Whether the emitted schema can answer `null`, or substitute a value for
// `undefined`: the two ways a branch's wrapping admits a value its core
// rejects. An intersection member (`.and(shapeZ)`, #461) passes the RAW input
// to both sides, so a shape member that is a plain `z.object` rejects the very
// values the wrapping exists to admit: `.nullable()` admits `null`,
// `.default()` / `.prefault()` substitute on `undefined`, `.catch()` answers
// every failure with its fallback, and a user chain (`x-preprocess` /
// `x-transform` / `x-pipe` / `x-codec`) replaces the chain wholesale, so its
// admission is unknowable. Conservative in the permissive direction —
// over-approximating only falls back to the check-pipe, which is always
// correct. A declared type settles null; `enum` / `const` without a null
// member do too; an untyped schema accepts everything, so it may admit both.
// An empty `allOf` accepts everything; a non-empty one admits a value only
// when every member does, a union when some branch does.
export function canAdmitNullOrUndefined(
  schema: Schema | boolean,
  schemas?: Schemas,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return schema
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return true
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? true
      : canAdmitNullOrUndefined(target, schemas, [...seen, schema.$ref])
  }
  if (
    schema.default !== undefined ||
    schema['x-prefault'] !== undefined ||
    schema['x-catch'] !== undefined ||
    schema['x-preprocess'] !== undefined ||
    schema['x-transform'] !== undefined ||
    schema['x-pipe'] !== undefined ||
    schema['x-codec'] !== undefined
  ) {
    return true
  }
  if (schema.nullable === true) return true
  if (Array.isArray(schema.enum)) {
    return schema.enum.some((member) => member === null)
  }
  if (schema.const !== undefined) {
    return schema.const === null
  }
  const types = normalizeTypes(schema.type)
  if (types.length > 0) {
    return types.includes('null')
  }
  if (schema.allOf !== undefined) {
    return schema.allOf.every((member) => canAdmitNullOrUndefined(member, schemas, seen))
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    return union.some((branch) => canAdmitNullOrUndefined(branch, schemas, seen))
  }
  // A schema the emitter reads as `z.object(...)` (#385: no `type`, but
  // `properties` / `additionalProperties` and only object keywords) admits
  // neither `null` nor `undefined` — the final `return true` below is for
  // genuinely unconstrained schemas. Without this, `distribute` falls back
  // to the check-pipe for untyped object branches, dropping sibling keys
  // from the output and the shape from the document (#467 review).
  if (isUntypedObject(schema)) return false
  return true
}

// Whether the emitted schema may silently drop an undeclared key from an
// object value it passes: only a plain `z.object(...)` does that. `z.looseObject`
// and `z.object(...).catchall(...)` / `z.record(...)` pass every key through, and
// `z.strictObject` rejects an object with an undeclared key outright instead of
// stripping it — so for the question "would a refine on this output still see
// the key", those do not strip. A union strips when some branch does (the
// winning branch's output is used); an intersection strips only when every
// member does (the output is the merge of the members' outputs).
function isStrippingObject(schema: Schema): boolean {
  return (
    Object.keys(schema.properties ?? {}).length > 0 &&
    schema.additionalProperties === undefined &&
    schema.patternProperties === undefined &&
    schema.propertyNames === undefined &&
    schema.unevaluatedProperties === undefined
  )
}

export function emitsStrippingObject(
  schema: Schema | boolean,
  schemas?: Schemas,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return false
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return true
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? true
      : emitsStrippingObject(target, schemas, [...seen, schema.$ref])
  }
  const types = normalizeTypes(schema.type)
  if (types.length > 0) {
    return types.includes('object') && isStrippingObject(schema)
  }
  if (schema.allOf !== undefined) {
    return (
      schema.allOf.length > 0 &&
      schema.allOf.every((member) => emitsStrippingObject(member, schemas, seen))
    )
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    return union.some((branch) => emitsStrippingObject(branch, schemas, seen))
  }
  return isUntypedObject(schema) && isStrippingObject(schema)
}

// An operand of an intersection, read through the references it names. A reference is
// emitted as the component, with only what `wrap` adds around it taken from what is written
// beside the `$ref`: a keyword beside it (`properties`, `additionalProperties`) is not
// emitted, so it says nothing about the keys the operand declares. `undefined` for a
// reference that cannot be resolved or that comes back to itself, and for one whose own
// wrapping reports nothing — a user chain replaces the emission, a catch answers the failure.
function resolveOperand(
  schema: Schema,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): Schema | undefined {
  if (schema.$ref === undefined) return schema
  if (seen.includes(schema.$ref)) return undefined
  if (!hasNoUserChain(schema) || schema['x-catch'] !== undefined) return undefined
  const target = resolveSchemaRef(schema.$ref, schemas)
  return target === undefined ? undefined : resolveOperand(target, schemas, [...seen, schema.$ref])
}

// Whether a schema is emitted as an object that reports the keys it does not declare as
// `unrecognized_keys`: `additionalProperties: false` on what the emitter reads as an object
// (`z.strictObject`, or the loose object beside `patternProperties`, #447). A user chain
// replaces the emission, and a catch answers the failure, so neither reports anything.
function emitsStrictObject(schema: Schema): boolean {
  return (
    schema.additionalProperties === false &&
    hasNoUserChain(schema) &&
    schema['x-catch'] === undefined &&
    schema.allOf === undefined &&
    schema.anyOf === undefined &&
    schema.oneOf === undefined &&
    schema.enum === undefined &&
    schema.const === undefined &&
    (normalizeTypes(schema.type).includes('object') || isUntypedObject(schema))
  )
}

// Whether what a schema is emitted as can fail on undeclared keys alone, with the
// `unrecognized_keys` issue of a strict object reaching whatever it is an operand of: the
// strict object itself, a `z.union` or a `z.discriminatedUnion` with such a branch (a union
// hands on the issues of the one branch that failed on nothing else; `z.xor` does not), and
// an `allOf` of one member, which is emitted as the member. An `allOf` of several members
// is an intersection that checks its own operands (see `makeStrictOperandCheck`).
function leaksUnrecognizedKeys(
  schema: Schema,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): boolean {
  if (!hasNoUserChain(schema) || schema['x-catch'] !== undefined) return false
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return false
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? false
      : leaksUnrecognizedKeys(target, schemas, [...seen, schema.$ref])
  }
  if (schema.allOf !== undefined) {
    const members = schema.allOf.filter(
      (member) => member.type !== 'null' && !isAnnotationOnly(member),
    )
    const [only, ...others] = members
    return only !== undefined && others.length === 0
      ? leaksUnrecognizedKeys(only, schemas, seen)
      : false
  }
  if (schema.anyOf !== undefined) {
    return schema.anyOf.some((branch) => leaksUnrecognizedKeys(branch, schemas, seen))
  }
  if (schema.oneOf !== undefined) {
    return (
      discriminatedBranches(schema, schemas) !== undefined &&
      schema.oneOf.some((branch) => leaksUnrecognizedKeys(branch, schemas, seen))
    )
  }
  return emitsStrictObject(schema)
}

// The statement that reports each key of `o` the listed keys and patterns do not declare:
// a `custom` issue under the key, like the `unevaluatedProperties` check.
function undeclaredKeysStmt(schema: Schema) {
  const ownKeys = Object.keys(schema.properties ?? {})
  const patterns = Object.keys(schema.patternProperties ?? {})
  const undeclared = [
    ...(ownKeys.length > 0 ? [`!${JSON.stringify(ownKeys)}.includes(k)`] : []),
    ...(patterns.length > 0
      ? [`!${JSON.stringify(patterns)}.some((p)=>new RegExp(p).test(k))`]
      : []),
  ]
  const message = pickMessage(schema, 'x-additionalProperties-message')
  const report = `ctx.issues.push({code:"custom",path:[k],input:o${message === undefined ? '' : `,message:${issueMessage(message, "{code:'custom',path:[k],input:o}")}`}})`
  return `for(const k of Object.keys(o)){${undeclared.length === 0 ? report : `if(${undeclared.join('&&')}){${report}}`}}`
}

// Whether a schema is a strict object whose undeclared keys can be told from the schema
// alone: one type, the object.
function isStrictObjectOperand(schema: Schema) {
  return emitsStrictObject(schema) && declaredTypes(schema).length <= 1
}

// A discriminated union whose strict branches can be told from the discriminator alone:
// the statement that looks up the keys of the branch the value is routed to, and reports
// the others. `undefined` when the union is not discriminated, when no branch is strict, or
// when a strict branch needs more than its key list (a pattern, a message, a wrapping).
function discriminatedKeysStmt(schema: Schema, schemas: Schemas | undefined) {
  const discriminator = schema.discriminator?.propertyName
  const branches = discriminatedBranches(schema, schemas)
  if (discriminator === undefined || branches === undefined) return undefined
  const strict = branches.filter(({ branch }) => leaksUnrecognizedKeys(branch, schemas))
  if (strict.length === 0) return undefined
  const isPlain = strict.every(
    ({ branch }) =>
      isStrictObjectOperand(branch) &&
      branch.patternProperties === undefined &&
      branch['x-additionalProperties-message'] === undefined,
  )
  if (!isPlain) return undefined
  const keysByValue = Object.fromEntries(
    strict.flatMap(({ branch }) => {
      const property = branch.properties?.[discriminator]
      const values =
        typeof property?.const === 'string'
          ? [property.const]
          : (property?.enum ?? []).filter((value) => typeof value === 'string')
      return values.map((value) => [value, Object.keys(branch.properties ?? {})] as const)
    }),
  )
  return `{const own:{readonly [k:string]:readonly string[]}=${JSON.stringify(keysByValue)};const d=String(Reflect.get(o,${JSON.stringify(discriminator)}));const keys=Object.hasOwn(own,d)?own[d]:undefined;if(keys!==undefined){for(const k of Object.keys(o)){if(!keys.includes(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}`
}

// What the check has to do for one operand of an intersection: nothing, report keys the
// schema alone tells (`statement`), or ask the operand itself (`ask`).
function strictOperandKind(
  schema: Schema,
  schemas: Schemas | undefined,
):
  | { readonly kind: 'none' }
  | { readonly kind: 'statement'; readonly statement: string }
  | { readonly kind: 'ask' } {
  const resolved = resolveOperand(schema, schemas)
  if (resolved === undefined) return { kind: 'none' }
  if (isStrictObjectOperand(resolved)) {
    return { kind: 'statement', statement: undeclaredKeysStmt(resolved) }
  }
  if (!leaksUnrecognizedKeys(schema, schemas)) return { kind: 'none' }
  const discriminated = hasNoUserChain(resolved)
    ? discriminatedKeysStmt(resolved, schemas)
    : undefined
  return discriminated === undefined
    ? { kind: 'ask' }
    : { kind: 'statement', statement: discriminated }
}

// Whether the check of an intersection operand parses the operand itself (see
// `makeStrictOperandCheck`). The emitter then declares the operand once and hands its name
// to both the intersection and the check, instead of building the schema again on every
// parse.
export function isAskedOperand(schema: Schema, schemas?: Schemas) {
  return strictOperandKind(schema, schemas).kind === 'ask'
}

// `additionalProperties: false` on an operand of an intersection, as a check on the raw
// input (#470). Zod's intersection reconciles `unrecognized_keys` across its two sides and
// reports a key only when BOTH reject it, so a strict object beside a plain one — which
// strips the key instead of rejecting it — reports nothing at all. In JSON Schema the
// keyword applies to its own member alone (2020-12 §10.3.2.3): the member does not see what
// the other members declare, so a key it does not declare fails it, and the `allOf` with it.
//
// - An operand that is a strict object reports each key it neither declares nor matches
//   with a pattern, like the `unevaluatedProperties` check: a `custom` issue under the
//   key, which no enclosing intersection reconciles away.
// - A discriminated union with strict branches hands on the issue of the branch it routes
//   to. The branch is told by the discriminator, so its keys are looked up and reported the
//   same way, without parsing anything.
// - Any other operand that can only hand the issue on (a union with a strict branch) is
//   asked on its own: when it fails on undeclared keys and nothing else, that is the
//   failure the intersection would drop, and its keys are reported. This is the one case
//   that parses the operand a second time.
//
// Returns `undefined` when no operand needs it, so an intersection without a strict member
// emits exactly what it did.
export function makeStrictOperandCheck(
  operands: readonly { readonly schema: Schema; readonly zod: string }[],
  schemas?: Schemas,
): RawCheck | undefined {
  const kinds = operands.map(({ schema, zod }) => ({ zod, ...strictOperandKind(schema, schemas) }))
  const stmts = (parse: Parse) =>
    kinds.flatMap((operand) => {
      if (operand.kind === 'none') return []
      if (operand.kind === 'statement') return [operand.statement]
      return [
        `{const result=${parse(operand.zod, 'o')};if(!result.success&&result.error.issues.every((issue)=>issue.code==='unrecognized_keys'&&issue.path.length===0)){for(const issue of result.error.issues){if(issue.code==='unrecognized_keys'){for(const k of issue.keys){ctx.issues.push({code:"custom",path:[k],input:o,message:issue.message})}}}}}`,
      ]
    })
  const sync = stmts(parseSync)
  if (sync.length === 0) return undefined
  const guard = `const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;`
  return {
    sync: `(ctx)=>{${guard}${sync.join(';')}}`,
    ...(kinds.some((operand) => operand.kind === 'ask')
      ? { async: `async(ctx)=>{${guard}${stmts(parseAsync).join(';')}}` }
      : {}),
  }
}

// `additionalProperties` written beside a combinator, as a check on the raw input.
// The keyword applies to the keys its own schema neither declares in `properties` nor
// matches with `patternProperties` (JSON Schema 2020-12 §10.3.2.3): it does not see what
// the members of an `allOf` or the branches of a union declare, so a key only they declare
// fails `false`, and has to be a value of a schema (#647). The combinator paths emit the
// combinator and the sibling shape, neither of which reads the keyword, so the keys are
// checked around them. The issues of a schema are reported under the key, with
// `x-additionalProperties-message` as their message when it is given.
export function makeParentStrictCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
): RawCheck | undefined {
  const additional = schema.additionalProperties
  const guard = `const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;`
  if (additional === false) return { sync: `(ctx)=>{${guard}${undeclaredKeysStmt(schema)}}` }
  if (!isSchemaObject(additional)) return undefined
  const ownKeys = Object.keys(schema.properties ?? {})
  const patterns = Object.keys(schema.patternProperties ?? {})
  const declared = [
    ...(ownKeys.length > 0 ? [`${JSON.stringify(ownKeys)}.includes(k)`] : []),
    ...(patterns.length > 0
      ? [`${JSON.stringify(patterns)}.some((p)=>new RegExp(p).test(k))`]
      : []),
  ]
  const skip = declared.length === 0 ? '' : `if(${declared.join('||')}){continue}`
  const message = pickMessage(schema, 'x-additionalProperties-message')
  const messageField = message === undefined ? '' : `,message:${issueMessage(message, 'issue')}`
  const forwarding = makeIssueForwarding(
    `{...issue,path:[k,...issue.path],input:issue.input${messageField}}`,
  )
  return bothParses(
    (parse) =>
      `(ctx)=>{${guard}const Schema=${recurse(additional)};for(const k of Object.keys(o)){${skip}const result=${parse('Schema', 'Reflect.get(o,k)')};if(!result.success){for(const issue of result.error.issues){${forwarding}}}}}`,
  )
}

// The statements that raise `n`, the number of leading elements of the array `a` a schema
// evaluates: those `prefixItems` names, and every one beside `items` or an
// `unevaluatedItems` of its own; what each member of an `allOf` evaluates, each branch of
// an `anyOf` / `oneOf` that matches, and the `if` / `then` / `else` the condition selects
// (JSON Schema 2020-12 §11.2). A reference evaluates what the component it names does.
// The matches of the top-level branches are counted into `mA` and `mO`.
function evaluatedItemsStmts(
  schema: Schema,
  recurse: (s: Schema) => string,
  schemas: Schemas | undefined,
  parse: Parse,
  isTop: boolean,
  reading: ReadonlySet<string> = new Set(),
): readonly string[] {
  if (schema.$ref !== undefined) {
    const target = reading.has(schema.$ref) ? undefined : resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? []
      : evaluatedItemsStmts(
          target,
          recurse,
          schemas,
          parse,
          false,
          new Set([...reading, schema.$ref]),
        )
  }
  const nested = (sub: Schema) => evaluatedItemsStmts(sub, recurse, schemas, parse, false, reading)
  const own =
    isRestEvaluated(schema) || (!isTop && schema.unevaluatedItems !== undefined)
      ? ['n=Infinity']
      : Array.isArray(schema.prefixItems) && schema.prefixItems.length > 0
        ? [`n=Math.max(n,${schema.prefixItems.length})`]
        : []
  const branches = (list: readonly Schema[] | undefined, counter: string) =>
    (list ?? []).flatMap((branch) => {
      const body = nested(branch)
      const stmts = isTop ? [`${counter}++`, ...body] : body
      return stmts.length === 0
        ? []
        : [`if(${parse(recurse(branch), 'a')}.success){${stmts.join(';')}}`]
    })
  const conditional = (() => {
    if (schema.if === undefined) return []
    const whenOk = [...nested(schema.if), ...(schema.then === undefined ? [] : nested(schema.then))]
    const whenNot = schema.else === undefined ? [] : nested(schema.else)
    return whenOk.length === 0 && whenNot.length === 0
      ? []
      : [
          `if(${parse(recurse(schema.if), 'a')}.success){${whenOk.join(';')}}${whenNot.length === 0 ? '' : `else{${whenNot.join(';')}}`}`,
        ]
  })()
  return [
    ...own,
    ...(schema.allOf ?? []).flatMap(nested),
    ...branches(schema.anyOf, 'mA'),
    ...branches(schema.oneOf, 'mO'),
    ...conditional,
  ]
}

/**
 * `unevaluatedItems` written beside a combinator, as a check on the raw input (#647): it
 * applies to the elements neither the schema itself nor a member that holds evaluates, and
 * the combinator paths emit the combinator alone. `false` reports each such element, a
 * schema is what each of them has to be a value of. Like the `unevaluatedProperties` check,
 * it reports only when the unions beside it have a match (`mA`, `mO`): what no branch
 * accepts is their failure. `undefined` when the keyword is absent, `true`, or has nothing
 * left to apply to beside `items`.
 */
export function makeUnevaluatedItemsCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
  schemas?: Schemas,
): RawCheck | undefined {
  const unevaluated = schema.unevaluatedItems
  if (unevaluated === undefined || unevaluated === true || isRestEvaluated(schema)) {
    return undefined
  }
  const message = messageFor(schema, 'unevaluatedItems')
  const hasAnyOf = (schema.anyOf ?? []).length > 0
  const hasOneOf = (schema.oneOf ?? []).length > 0
  const gate = [...(hasAnyOf ? ['mA>0'] : []), ...(hasOneOf ? ['mO===1'] : [])].join('&&')
  return bothParses((parse) => {
    const report =
      unevaluated === false
        ? `for(let i=n;i<a.length;i++){ctx.issues.push({code:"custom",path:[i],input:a${message === undefined ? '' : `,message:${issueMessage(message, "{code:'custom',path:[i],input:a}")}`}})}`
        : `const Schema=${recurse(unevaluated)};for(let i=n;i<a.length;i++){const result=${parse('Schema', 'a[i]')};if(!result.success){for(const issue of result.error.issues){${makeIssueForwarding(`{...issue,path:[i,...issue.path],input:issue.input${message === undefined ? '' : `,message:${issueMessage(message, 'issue')}`}}`)}}}}`
    const stmts = [
      `let n=0${hasAnyOf ? ',mA=0' : ''}${hasOneOf ? ',mO=0' : ''}`,
      ...evaluatedItemsStmts(schema, recurse, schemas, parse, true),
      gate === '' ? report : `if(${gate}){${report}}`,
    ]
    return `(ctx)=>{const a=ctx.value;if(!Array.isArray(a))return;${stmts.join(';')}}`
  })
}

// The statement that reports the failure of a combinator checked on the raw input: one
// `custom` issue, with a fixed text as its message or what an arrow function answers for it.
function reportSibling(message: string | undefined) {
  const field =
    message === undefined
      ? ''
      : `,message:${issueMessage(message, "{code:'custom',path:[],input:val}")}`
  return `ctx.issues.push({code:"custom",input:val${field}})`
}

// The combinators written beside the one a schema is emitted as, as a check on the raw
// input (#469). JSON Schema ANDs sibling keywords, so `allOf` / `anyOf` / `oneOf` / `not`
// at the same level all have to hold, and the emitter's paths each emit one of them.
// The others are asked about the value as it arrives: intersected with what is emitted
// (`A.and(z.union([...]))`) they would hand out a value of their own, which Zod cannot
// merge with one the other side has transformed (a bigint, a trimmed string) and which
// brings back the keys the other side stripped; and a refinement would see the parsed
// output, from which a stripping object has dropped the very keys a `not` may be about.
// Each failure is one `custom` issue, with the message of its own keyword
// (`x-anyOf-message`, `x-oneOf-message`, `x-not-message`) or `x-error-message`.
export function makeSiblingCombinatorCheck(
  schema: Schema,
  keys: readonly ('anyOf' | 'oneOf' | 'not')[],
  recurse: (s: Schema) => string,
): RawCheck | undefined {
  const errorMessage = schema['x-error-message']
  const stmts = (parse: Parse) =>
    keys.flatMap((key) => {
      if (key === 'anyOf') {
        const branches = (schema.anyOf ?? []).map((sub) => `${parse(recurse(sub), 'val')}.success`)
        const message = schema['x-implication-message'] ?? schema['x-anyOf-message'] ?? errorMessage
        return branches.length === 0
          ? []
          : [`if(!(${branches.join('||')})){${reportSibling(message)}}`]
      }
      if (key === 'oneOf') {
        const branches = (schema.oneOf ?? []).map(
          (sub) => `(${parse(recurse(sub), 'val')}.success?1:0)`,
        )
        return branches.length === 0
          ? []
          : [
              `if((${branches.join('+')})!==1){${reportSibling(schema['x-oneOf-message'] ?? errorMessage)}}`,
            ]
      }
      return schema.not === undefined
        ? []
        : [
            `if(${parse(recurse(schema.not), 'val')}.success){${reportSibling(schema['x-not-message'] ?? errorMessage)}}`,
          ]
    })
  const sync = stmts(parseSync)
  if (sync.length === 0) return undefined
  return {
    sync: `(ctx)=>{const val=ctx.value;${sync.join(';')}}`,
    async: `async(ctx)=>{const val=ctx.value;${stmts(parseAsync).join(';')}}`,
  }
}

// The object keywords of a shape as a guarded refine: `properties` / `required` only
// apply to object values in JSON Schema, so a value of another type passes them as is
// (2020-12 §6.5). The checks are the typeless path's object block, guarded by the same
// `typeof val === 'object'` test, so a combinator beside `properties` (#461) constrains
// only the object values its branches accept, instead of intersecting with `z.object()`.
// Same checks as `emitObjectShapeRefine`, but for `.check()` on `z.unknown()`,
// which runs on the RAW input. A `.superRefine` on a combinator result sees the
// parsed output instead: a stripping object branch (`z.object(...)`, any `$ref`
// to a component) drops undeclared keys before the refine runs, so a wrong-typed
// sibling passes and a present sibling reads as missing under `required` (#461).
// Piped after the check, the combinator still produces the output.
// The pushed issue carries `input: val`: a raw issue without `input` does not
// typecheck under `tsc --strict` (`$ZodRawIssue` requires it), and the generated
// code is typechecked per case.
export function emitObjectShapeCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
): RawCheck | undefined {
  if (makeObjectChecks(schema, recurse, RAW_REPORT).length === 0) return undefined
  return bothParses(
    (parse) =>
      `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){${makeObjectChecks(schema, recurse, RAW_REPORT, parse).join(';')}}}`,
  )
}

export function emitObjectShapeRefine(
  schema: Schema,
  recurse: (s: Schema) => string,
): string | undefined {
  const checks = makeObjectChecks(schema, recurse)
  if (checks.length === 0) return undefined
  return `(val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){${checks.join(';')}}}`
}

// `.refine()` for `unevaluatedProperties` per JSON Schema 2020-12 §11.2.
// Precedence: x-unevaluatedProperties-message > messageOverride > Zod default.
function makeOwnPropsStmt(sub: Schema) {
  const keys = sub.properties ? Object.keys(sub.properties) : []
  return keys.length > 0 ? `for(const k of ${JSON.stringify(keys)}){e.add(k)}` : undefined
}

function makePatternPropsStmt(sub: Schema) {
  if (!sub.patternProperties) {
    return undefined
  }
  const patterns = Object.keys(sub.patternProperties)
  return `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)}){if(new RegExp(p).test(k)){e.add(k)}}}`
}

// The keys `additionalProperties` applies to, as evaluated (#462): every key that
// neither `properties` nor `patternProperties` of the same schema declares. A schema
// or `true` evaluates them; `false` evaluates nothing (those keys already fail
// against `additionalProperties` itself).
function makeAdditionalPropsStmt(sub: Schema) {
  if (sub.additionalProperties !== true && !isSchemaObject(sub.additionalProperties)) {
    return undefined
  }
  const ownKeys = sub.properties ? Object.keys(sub.properties) : []
  const patterns = sub.patternProperties ? Object.keys(sub.patternProperties) : []
  const guards = [
    ...(ownKeys.length > 0 ? [`!${JSON.stringify(ownKeys)}.includes(k)`] : []),
    ...(patterns.length > 0
      ? [`!${JSON.stringify(patterns)}.some((p)=>new RegExp(p).test(k))`]
      : []),
  ]
  return guards.length === 0
    ? `for(const k of Object.keys(o)){e.add(k)}`
    : `for(const k of Object.keys(o)){if(${guards.join('&&')}){e.add(k)}}`
}

// The keys an `allOf` member evaluates: its own properties, pattern properties and
// additional properties, and those of its own `allOf`. A member that is a reference
// evaluates the keys of the component it names (#405), read once however often it is
// reached.
function collectAllOfStmts(
  list: readonly Schema[],
  schemas: Schemas | undefined,
  reading: ReadonlySet<string> = new Set(),
): readonly string[] {
  return list.flatMap((sub) => {
    if (sub.$ref !== undefined) {
      const target = reading.has(sub.$ref) ? undefined : resolveSchemaRef(sub.$ref, schemas)
      return target === undefined
        ? []
        : collectAllOfStmts([target], schemas, new Set([...reading, sub.$ref]))
    }
    return [
      makeOwnPropsStmt(sub),
      makePatternPropsStmt(sub),
      makeAdditionalPropsStmt(sub),
      ...(sub.allOf ? collectAllOfStmts(sub.allOf, schemas, reading) : []),
    ].filter((s): s is string => s !== undefined)
  })
}

// The evaluated-key statements for one subschema, gated on `cond` when given.
function makeGatedStmts(sub: Schema | undefined, cond: string | undefined) {
  if (sub === undefined) return undefined
  const body = [makeOwnPropsStmt(sub), makePatternPropsStmt(sub), makeAdditionalPropsStmt(sub)]
    .filter((s): s is string => s !== undefined)
    .join(';')
  if (!body) return undefined
  return cond === undefined ? body : `if(${cond}){${body}}`
}

function makeIfStmts(schema: Schema, recurse: (s: Schema) => string) {
  const ifSchema = schema.if
  if (!ifSchema) return []
  return [
    `const ifOk=${recurse(ifSchema)}.safeParse(o).success`,
    makeGatedStmts(ifSchema, 'ifOk'),
    makeGatedStmts(schema.then, 'ifOk'),
    makeGatedStmts(schema.else, '!ifOk'),
  ].filter((s): s is string => s !== undefined)
}

function makeDepSchemaStmts(schema: Schema) {
  if (!schema.dependentSchemas) return []
  return Object.entries(schema.dependentSchemas)
    .map(([key, sub]) => makeGatedStmts(sub, `${JSON.stringify(key)} in o`))
    .filter((s): s is string => s !== undefined)
}

// The statements that collect, into `e`, every key one branch evaluates —
// without the `if (branch matches)` guard around them. A branch that only
// names a component evaluates the keys of the component it names (#405 for
// `allOf` members; same rule here), a branch with `allOf` evaluates its
// members' keys, and a branch with a nested `anyOf` / `oneOf` evaluates the
// keys of the nested branch that matches. Without this, a `$ref`, nested
// combinator or `allOf` branch contributed no keys at all, so the check
// rejected every key the branch evaluates (#466: the union path made the
// gap visible for the most common branch shapes).
function collectBranchBody(
  sub: Schema,
  recurse: (s: Schema) => string,
  schemas: Schemas | undefined,
  reading: ReadonlySet<string> = new Set(),
): string | undefined {
  if (sub.$ref !== undefined) {
    const target = reading.has(sub.$ref) ? undefined : resolveSchemaRef(sub.$ref, schemas)
    if (target === undefined) return undefined
    return collectBranchBody(target, recurse, schemas, new Set([...reading, sub.$ref]))
  }
  const branchStmts = (branches: readonly Schema[] | undefined) =>
    branches
      ? branches
          .map((branch) => conditionalBranchStmt(branch, recurse, schemas, reading))
          .filter((s): s is string => s !== undefined)
      : []
  const body = [
    makeOwnPropsStmt(sub),
    makePatternPropsStmt(sub),
    makeAdditionalPropsStmt(sub),
    ...(sub.allOf ? collectAllOfStmts(sub.allOf, schemas, reading) : []),
    ...branchStmts(sub.anyOf),
    ...branchStmts(sub.oneOf),
    ...makeIfStmts(sub, recurse),
    ...makeDepSchemaStmts(sub),
  ]
    .filter((s): s is string => s !== undefined)
    .join(';')
  return body || undefined
}

function conditionalBranchStmt(
  sub: Schema,
  recurse: (s: Schema) => string,
  schemas: Schemas | undefined,
  reading: ReadonlySet<string> = new Set(),
  // When given, the branch-match also counts the match into this variable:
  // a branch that matches but evaluates no keys (an empty schema) still
  // counts, so the count is the number of matching branches, not the number
  // of branches that contributed keys. Only the top-level branches of the
  // `unevaluatedProperties` check pass it (see `makeUnevaluatedEvaluationStmts`).
  countVar?: string,
) {
  const body = collectBranchBody(sub, recurse, schemas, reading)
  if (body === undefined && countVar === undefined) return undefined
  const counted = countVar === undefined ? '' : `${countVar}++;`
  return `if(${recurse(sub)}.safeParse(o).success){${counted}${body ?? ''}}`
}

// The statements that collect, into `e`, every key the schema evaluates: its own
// properties, pattern properties and additional properties, those of every `allOf`
// member, those of each `anyOf` and `oneOf` branch that matches, the `if` / `then` /
// `else` properties the condition selects, and those of each `dependentSchemas`
// entry whose key is present.
// `track` counts only the top-level branch matches into the given variables
// (nested branches do not count: a nested match does not mean the top-level
// union succeeded). Only `makeUnevaluatedPropertiesCheck` passes it, to gate
// the final statement on the union succeeding (#480); the `.superRefine`
// variant runs after a successful parse already, so it passes nothing and
// its output is unchanged.
function makeUnevaluatedEvaluationStmts(
  schema: Schema,
  recurse: (s: Schema) => string,
  schemas: Schemas | undefined,
  track?: { readonly anyOf?: string; readonly oneOf?: string },
) {
  const branchStmts = (branches: readonly Schema[] | undefined, countVar?: string) =>
    branches
      ? branches
          .map((sub) => conditionalBranchStmt(sub, recurse, schemas, undefined, countVar))
          .filter((s): s is string => s !== undefined)
      : []
  return [
    'const e=new Set()',
    makeOwnPropsStmt(schema),
    makePatternPropsStmt(schema),
    makeAdditionalPropsStmt(schema),
    ...(schema.allOf ? collectAllOfStmts(schema.allOf, schemas) : []),
    ...branchStmts(schema.anyOf, track?.anyOf),
    ...branchStmts(schema.oneOf, track?.oneOf),
    ...makeIfStmts(schema, recurse),
    ...makeDepSchemaStmts(schema),
  ].filter((s): s is string => s !== undefined)
}

// The `message` field of an unevaluated-property issue, comma included, or nothing.
// Precedence: slot-message > caller override > undefined (omitted so that Zod uses its
// default). The literal uses double-quoted `"custom"` to match the quoting convention of
// the statements here; emitTypelessRefine uses single quotes (see `issueObj`).
function makeUnevaluatedMessageField(schema: Schema, messageOverride: string | undefined) {
  const finalMessage = messageFor(schema, 'unevaluatedProperties') ?? messageOverride
  return finalMessage !== undefined
    ? `,message:${issueMessage(finalMessage, "{code:'custom',path:[k],input:o}")}`
    : ''
}

export function makeUnevaluatedProperties(
  schema: Schema,
  recurse: (s: Schema) => string,
  messageOverride?: string,
  schemas?: Schemas,
) {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) {
    return ''
  }
  const messageField = makeUnevaluatedMessageField(schema, messageOverride)
  const finalStmt =
    up === false
      ? `for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]${messageField}})}}`
      : `const Schema=${recurse(up)};for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}`
  return `.superRefine((o,ctx)=>{${[...makeUnevaluatedEvaluationStmts(schema, recurse, schemas), finalStmt].join(';')}})`
}

// The codes of the issues a schema raises (`$ZodIssueCode`). An issue of `safeParse` is
// pushed into `ctx.issues` as the raw issue of its own code: spread as one of the union, its
// `input` is `unknown` and the push does not type-check (#405), so each code is narrowed.
const ISSUE_CODES = [
  'invalid_type',
  'too_big',
  'too_small',
  'invalid_format',
  'not_multiple_of',
  'unrecognized_keys',
  'invalid_union',
  'invalid_key',
  'invalid_element',
  'invalid_value',
  'custom',
] as const

/**
 * The statement that forwards `issue` into `ctx.issues`, narrowed by its code. `pushArg` is
 * the raw issue as source, built from `issue` (`{...issue,input:issue.input,path:[...]}`).
 */
export function makeIssueForwarding(pushArg: string) {
  return ISSUE_CODES.map(
    (code, i) => `${i === 0 ? '' : 'else '}if(issue.code==='${code}'){ctx.issues.push(${pushArg})}`,
  ).join('')
}

// Variant for `z.unknown().check((ctx)=>{...})` (operates on `ctx.value`).
// Needed for `ZodIntersection` where strip mode removes excess keys before
// `superRefine` sees them.
export function makeUnevaluatedPropertiesCheck(
  schema: Schema,
  recurse: (s: Schema) => string,
  messageOverride?: string,
  schemas?: Schemas,
  // Which combinator the union this check wraps is: the final statement is
  // gated on that union succeeding. Defaults to whichever lists the schema
  // carries; the `anyOf` / `oneOf` paths pass just their own, because a
  // schema carrying both emits only the `anyOf` union (the `oneOf` is
  // dropped by the emitter), so gating on both would be wrong there.
  guard?: { readonly anyOf?: boolean; readonly oneOf?: boolean },
) {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) {
    return ''
  }
  const messageField = makeUnevaluatedMessageField(schema, messageOverride)
  const finalStmt =
    up === false
      ? `for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o${messageField}})}}`
      : `const Schema=${recurse(up)};for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){${makeIssueForwarding('{...issue,path:[k,...issue.path],input:issue.input}')}}}}`
  // The final statement must only report when the union the check belongs to
  // would have succeeded (#472: a wrong-typed declared key must not also be
  // reported as unevaluated, since no branch matched to evaluate it). That
  // used to be a separate `Schema.safeParse` gate in the `z.preprocess`
  // wrapper — a full extra parse, which on a recursive schema made every
  // level pay gate + pipe + branch-match, i.e. ~3^depth (#480). The
  // branch-match `safeParse` calls above already decide whether each branch
  // matched, so count them instead (`mA`: anyOf matches, `mO`: oneOf
  // matches) and gate the final statement on the union succeeding — anyOf:
  // at least one branch; oneOf: exactly one. No extra parse is needed, and
  // a schema without a combinator (the `allOf` check-pipe) emits exactly
  // what it did: no counters, no guard.
  const hasAnyOf =
    guard !== undefined
      ? guard.anyOf === true
      : schema.anyOf !== undefined && schema.anyOf.length > 0
  const hasOneOf =
    guard !== undefined
      ? guard.oneOf === true
      : schema.oneOf !== undefined && schema.oneOf.length > 0
  const counters = `${hasAnyOf ? 'let mA=0;' : ''}${hasOneOf ? 'let mO=0;' : ''}`
  const evalStmts = makeUnevaluatedEvaluationStmts(schema, recurse, schemas, {
    ...(hasAnyOf ? { anyOf: 'mA' } : {}),
    ...(hasOneOf ? { oneOf: 'mO' } : {}),
  })
  const guardedFinal =
    !hasAnyOf && !hasOneOf
      ? finalStmt
      : `if(${[...(hasAnyOf ? ['mA>0'] : []), ...(hasOneOf ? ['mO===1'] : [])].join('&&')}){${finalStmt}}`
  return `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;${counters}${[...evalStmts, guardedFinal].join(';')}}`
}

// The error arguments of a numeric bound, as Zod v4 `{error:"..."}` parameters: for the
// bound and for its exclusive form, each alone (`.positive(arg)`) and after a value
// (`.min(5,arg)`). Precedence: `x-<bound>-message` > `x-error-message` > none.
export function makeBoundErrorArgs(
  schema: Schema,
  bound: 'minimum' | 'maximum',
  errorMessage: string | undefined,
) {
  const message = schema[`x-${bound}-message`] ?? errorMessage
  const exclusiveMessage =
    schema[bound === 'minimum' ? 'x-exclusiveMinimum-message' : 'x-exclusiveMaximum-message'] ??
    errorMessage
  const arg = message ? error(message) : ''
  const exclusiveArg = exclusiveMessage ? error(exclusiveMessage) : ''
  return {
    arg,
    part: arg ? `,${arg}` : '',
    exclusiveArg,
    exclusivePart: exclusiveArg ? `,${exclusiveArg}` : '',
  } as const
}
