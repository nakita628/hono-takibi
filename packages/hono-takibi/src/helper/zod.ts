import type { Schema } from '../openapi/index.js'

/**
 * v3.0 Phase A: Hybrid emission for type-less JSON Schema schemas.
 *
 * JSON Schema 2020-12 allows schemas without a `type` field where keywords
 * apply only when the value's actual type matches. e.g.,
 *   { "required": ["x"] }  // applies only when value is a non-array object
 *   { "minimum": 0 }       // applies only when value is a number
 *
 * Zod's type-first design cannot express this directly. We emit
 * `z.unknown().superRefine((v, ctx) => { ... })` with value-type-aware checks
 * so each keyword applies only when relevant — preserving JSON Schema's
 * keyword-independent semantics while staying inside Zod.
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

// After the `typeof v === 'object' && v !== null && !Array.isArray(v)` guard
// in emitTypelessRefine, `v` narrows to `object`. `Object.hasOwn(v, k)`,
// `Object.keys(v)`, `Object.entries(v)` all accept that type. Indexed access
// (`v[k]`) doesn't — for that we use `Reflect.get(v, k)`, which is valid JS
// and avoids a TS `as` cast. The `any` it returns is immediately consumed by
// `Schema.safeParse(unknown)` so it never escapes into a typed variable.
function buildObjectChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  const ownKeysJson = JSON.stringify(Object.keys(schema.properties ?? {}))
  const patternsJson = JSON.stringify(Object.keys(schema.patternProperties ?? {}))

  const requiredChecks = Array.isArray(schema.required)
    ? schema.required.map(
        (key) =>
          // Use Object.hasOwn to honor JSON Schema's "own property" semantics —
          // `in` would also count inherited keys (__proto__/toString/constructor).
          `if(!Object.hasOwn(v,${JSON.stringify(key)}))ctx.addIssue({code:'custom',message:'missing required: ${JSON.stringify(key).slice(1, -1)}'})`,
      )
    : []
  const minPropsCheck =
    typeof schema.minProperties === 'number'
      ? `if(Object.keys(v).length<${schema.minProperties})ctx.addIssue({code:'custom',message:'too few properties'})`
      : undefined
  const maxPropsCheck =
    typeof schema.maxProperties === 'number'
      ? `if(Object.keys(v).length>${schema.maxProperties})ctx.addIssue({code:'custom',message:'too many properties'})`
      : undefined
  const propertyChecks = schema.properties
    ? Object.entries(schema.properties).map(
        ([key, sub]) =>
          `if(Object.hasOwn(v,${JSON.stringify(key)})){const Schema=${recurse(sub)};if(!Schema.safeParse(Reflect.get(v,${JSON.stringify(key)})).success)ctx.addIssue({code:'custom',message:'invalid property'})}`,
      )
    : []
  const additionalPropsCheck = (() => {
    if (schema.additionalProperties === false) {
      return `for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue({code:'custom',message:'additional property not allowed: '+k})}}`
    }
    if (typeof schema.additionalProperties === 'object' && schema.additionalProperties !== null) {
      const subZod = recurse(schema.additionalProperties as Schema)
      return `{const Schema=${subZod};for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){if(!Schema.safeParse(Reflect.get(v,k)).success)ctx.addIssue({code:'custom',message:'invalid additional property: '+k})}}}`
    }
    return undefined
  })()
  const patternPropChecks = schema.patternProperties
    ? Object.entries(schema.patternProperties).map(
        ([pattern, sub]) =>
          `{const Schema=${recurse(sub)};for(const k of Object.keys(v)){if(new RegExp(${JSON.stringify(pattern)}).test(k)){if(!Schema.safeParse(Reflect.get(v,k)).success)ctx.addIssue({code:'custom',message:'pattern property invalid: '+k})}}}`,
      )
    : []
  const propNamesCheck = schema.propertyNames?.pattern
    ? `for(const k of Object.keys(v)){if(!new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))ctx.addIssue({code:'custom',message:'invalid property name: '+k})}`
    : undefined
  const depRequiredChecks = schema.dependentRequired
    ? Object.entries(schema.dependentRequired)
        .map(([key, deps]) => {
          const depsCheck = deps.map((d) => `Object.hasOwn(v,${JSON.stringify(d)})`).join('&&')
          return depsCheck
            ? `if(Object.hasOwn(v,${JSON.stringify(key)})){if(!(${depsCheck}))ctx.addIssue({code:'custom',message:'dependentRequired'})}`
            : undefined
        })
        .filter((v): v is string => v !== undefined)
    : []
  const depSchemasChecks = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas).map(
        ([key, sub]) =>
          `if(Object.hasOwn(v,${JSON.stringify(key)})){const Schema=${recurse(sub)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'dependentSchemas'})}`,
      )
    : []
  const unevaluatedPropsCheck =
    schema.unevaluatedProperties === false
      ? `for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue({code:'custom',message:'unevaluated property: '+k})}}`
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
  ].filter((v): v is string => v !== undefined)
}

function buildArrayChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  // Local type guard — Array.isArray's predicate (arg is any[]) does not
  // narrow `readonly Schema[]` from a union, so define one inline.
  const isSingleSchema = (items: Schema | readonly Schema[]): items is Schema =>
    !Array.isArray(items)

  const minItemsCheck =
    typeof schema.minItems === 'number'
      ? `if(v.length<${schema.minItems})ctx.addIssue({code:'custom',message:'too few items'})`
      : undefined
  const maxItemsCheck =
    typeof schema.maxItems === 'number'
      ? `if(v.length>${schema.maxItems})ctx.addIssue({code:'custom',message:'too many items'})`
      : undefined
  const uniqueCheck =
    schema.uniqueItems === true
      ? `{const seen=new Set();for(const item of v){const key=JSON.stringify(item);if(seen.has(key)){ctx.addIssue({code:'custom',message:'duplicate items'});break}seen.add(key)}}`
      : undefined
  const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
  const prefixChecks = schema.prefixItems
    ? schema.prefixItems.map(
        (sub, idx) =>
          `if(v.length>${idx}){const Schema=${recurse(sub)};if(!Schema.safeParse(v[${idx}]).success)ctx.addIssue({code:'custom',message:'invalid prefix item ${idx}'})}`,
      )
    : []
  // v3.0 Phase C: items as boolean schemas
  // items: false → trailing items not allowed (length must be <= prefixCount)
  // items: true → trailing items unconstrained (no-op)
  const itemsCheck = (() => {
    const items = schema.items
    if ((items as unknown) === false) {
      return `if(v.length>${prefixCount})ctx.addIssue({code:'custom',message:'no items allowed beyond prefixItems'})`
    }
    if (items === undefined || !isSingleSchema(items)) return undefined
    return `{const Schema=${recurse(items)};for(let i=${prefixCount};i<v.length;i++){if(!Schema.safeParse(v[i]).success)ctx.addIssue({code:'custom',message:'invalid item at '+i})}}`
  })()
  const containsCheck = schema.contains
    ? (() => {
        const subZod = recurse(schema.contains)
        const minC = schema.minContains ?? 1
        const maxC = schema.maxContains
        const minCheck = `if(m<${minC})ctx.addIssue({code:'custom',message:'contains min not met'})`
        const maxCheck =
          maxC !== undefined
            ? `;if(m>${maxC})ctx.addIssue({code:'custom',message:'contains max exceeded'})`
            : ''
        return `{const m=v.filter((i)=>${subZod}.safeParse(i).success).length;${minCheck}${maxCheck}}`
      })()
    : undefined
  const unevaluatedItemsCheck =
    schema.unevaluatedItems === false
      ? `if(v.length>${prefixCount})ctx.addIssue({code:'custom',message:'unevaluated items'})`
      : undefined

  return [
    minItemsCheck,
    maxItemsCheck,
    uniqueCheck,
    ...prefixChecks,
    itemsCheck,
    containsCheck,
    unevaluatedItemsCheck,
  ].filter((v): v is string => v !== undefined)
}

function buildStringChecks(schema: Schema): readonly string[] {
  const minCheck =
    typeof schema.minLength === 'number'
      ? `if([...v].length<${schema.minLength})ctx.addIssue({code:'custom',message:'too short'})`
      : undefined
  const maxCheck =
    typeof schema.maxLength === 'number'
      ? `if([...v].length>${schema.maxLength})ctx.addIssue({code:'custom',message:'too long'})`
      : undefined
  const patternCheck = schema.pattern
    ? `if(!new RegExp(${JSON.stringify(schema.pattern)}).test(v))ctx.addIssue({code:'custom',message:'pattern mismatch'})`
    : undefined
  return [minCheck, maxCheck, patternCheck].filter((v): v is string => v !== undefined)
}

function buildNumberChecks(schema: Schema): readonly string[] {
  // Draft 4: exclusiveMinimum: true folds the boundary into the minimum check
  // (use `<=` instead of `<`); exclusiveMinimum: number adds a separate check.
  const minimumIsExclusive = schema.exclusiveMinimum === true && typeof schema.minimum === 'number'
  const minCheck =
    typeof schema.minimum === 'number'
      ? minimumIsExclusive
        ? `if(v<=${schema.minimum})ctx.addIssue({code:'custom',message:'<= exclusiveMinimum'})`
        : `if(v<${schema.minimum})ctx.addIssue({code:'custom',message:'below minimum'})`
      : undefined
  const exMinCheck =
    typeof schema.exclusiveMinimum === 'number'
      ? `if(v<=${schema.exclusiveMinimum})ctx.addIssue({code:'custom',message:'<= exclusiveMinimum'})`
      : undefined
  const maximumIsExclusive = schema.exclusiveMaximum === true && typeof schema.maximum === 'number'
  const maxCheck =
    typeof schema.maximum === 'number'
      ? maximumIsExclusive
        ? `if(v>=${schema.maximum})ctx.addIssue({code:'custom',message:'>= exclusiveMaximum'})`
        : `if(v>${schema.maximum})ctx.addIssue({code:'custom',message:'above maximum'})`
      : undefined
  const exMaxCheck =
    typeof schema.exclusiveMaximum === 'number'
      ? `if(v>=${schema.exclusiveMaximum})ctx.addIssue({code:'custom',message:'>= exclusiveMaximum'})`
      : undefined
  const multipleOfCheck =
    typeof schema.multipleOf === 'number'
      ? `{const r=Math.abs(v/${schema.multipleOf}-Math.round(v/${schema.multipleOf}));if(r>1e-10)ctx.addIssue({code:'custom',message:'not multipleOf'})}`
      : undefined
  return [minCheck, exMinCheck, maxCheck, exMaxCheck, multipleOfCheck].filter(
    (v): v is string => v !== undefined,
  )
}

function buildGenericChecks(schema: Schema, recurse: (s: Schema) => string): readonly string[] {
  // deepEqual via JSON.stringify (handles primitives + null + arrays + objects)
  const enumCheck = Array.isArray(schema.enum)
    ? `if(!${JSON.stringify(schema.enum)}.some((e)=>JSON.stringify(e)===JSON.stringify(v)))ctx.addIssue({code:'custom',message:'not in enum'})`
    : undefined
  const constCheck =
    schema.const !== undefined
      ? `if(JSON.stringify(${JSON.stringify(schema.const)})!==JSON.stringify(v))ctx.addIssue({code:'custom',message:'const mismatch'})`
      : undefined
  const allOfChecks = Array.isArray(schema.allOf)
    ? schema.allOf.map(
        (sub) =>
          `{const Schema=${recurse(sub)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'allOf branch failed'})}`,
      )
    : []
  const anyOfCheck =
    Array.isArray(schema.anyOf) && schema.anyOf.length > 0
      ? `if(!(${schema.anyOf.map((sub) => `${recurse(sub)}.safeParse(v).success`).join('||')}))ctx.addIssue({code:'custom',message:'anyOf failed'})`
      : undefined
  const oneOfCheck =
    Array.isArray(schema.oneOf) && schema.oneOf.length > 0
      ? `if((${schema.oneOf.map((sub) => `(${recurse(sub)}.safeParse(v).success?1:0)`).join('+')})!==1)ctx.addIssue({code:'custom',message:'oneOf must match exactly one'})`
      : undefined
  const notCheck = schema.not
    ? `if(${recurse(schema.not)}.safeParse(v).success)ctx.addIssue({code:'custom',message:'not predicate matched'})`
    : undefined
  const ifSchema = schema.if
  const ifCheck = ifSchema
    ? (() => {
        const ifZod = recurse(ifSchema)
        const thenSchema = schema.then
        const elseSchema = schema.else
        const thenPart = thenSchema
          ? `if(ifOk){const Schema=${recurse(thenSchema)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'then failed'})}`
          : ''
        const elsePart = elseSchema
          ? `if(!ifOk){const Schema=${recurse(elseSchema)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'else failed'})}`
          : ''
        return thenPart || elsePart
          ? `{const ifOk=${ifZod}.safeParse(v).success;${thenPart};${elsePart}}`
          : undefined
      })()
    : undefined

  return [enumCheck, constCheck, ...allOfChecks, anyOfCheck, oneOfCheck, notCheck, ifCheck].filter(
    (v): v is string => v !== undefined,
  )
}

export function emitTypelessRefine(schema: Schema, recurse: (s: Schema) => string): string {
  const objectChecks = buildObjectChecks(schema, recurse)
  const arrayChecks = buildArrayChecks(schema, recurse)
  const stringChecks = buildStringChecks(schema)
  const numberChecks = buildNumberChecks(schema)
  const genericChecks = buildGenericChecks(schema, recurse)

  const blocks = [
    objectChecks.length > 0
      ? `if(typeof v==='object'&&v!==null&&!Array.isArray(v)){${objectChecks.join(';')}}`
      : undefined,
    arrayChecks.length > 0 ? `if(Array.isArray(v)){${arrayChecks.join(';')}}` : undefined,
    stringChecks.length > 0 ? `if(typeof v==='string'){${stringChecks.join(';')}}` : undefined,
    numberChecks.length > 0 ? `if(typeof v==='number'){${numberChecks.join(';')}}` : undefined,
    genericChecks.length > 0 ? genericChecks.join(';') : undefined,
  ].filter((v): v is string => v !== undefined)

  if (blocks.length === 0) return 'z.any()'
  return `z.unknown().superRefine((v,ctx)=>{${blocks.join(';')}})`
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
 */
function ownPropsStmt(sub: Schema): string | undefined {
  const keys = sub.properties ? Object.keys(sub.properties) : []
  return keys.length > 0 ? `for(const k of ${JSON.stringify(keys)})e.add(k)` : undefined
}

function patternPropsStmt(sub: Schema): string | undefined {
  if (!sub.patternProperties) return undefined
  const patterns = Object.keys(sub.patternProperties)
  return `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)})if(new RegExp(p).test(k))e.add(k)}`
}

function collectAllOfStmts(list: readonly Schema[]): readonly string[] {
  return list.flatMap((sub) =>
    [
      ownPropsStmt(sub),
      patternPropsStmt(sub),
      ...(sub.allOf ? collectAllOfStmts(sub.allOf) : []),
    ].filter((v): v is string => v !== undefined),
  )
}

function conditionalBranchStmt(sub: Schema, recurse: (s: Schema) => string): string | undefined {
  if (!sub.properties && !sub.patternProperties) return undefined
  const ifBody = [ownPropsStmt(sub), patternPropsStmt(sub)]
    .filter((v): v is string => v !== undefined)
    .join(';')
  return ifBody ? `if(${recurse(sub)}.safeParse(o).success){${ifBody}}` : undefined
}

export function buildUnevaluatedProperties(
  schema: Schema,
  _errorArg: string,
  recurse: (s: Schema) => string,
  messageOverride?: string,
): string {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) return ''

  const ownStmt = ownPropsStmt(schema)
  const patternStmt = patternPropsStmt(schema)
  const allOfStmts = schema.allOf ? collectAllOfStmts(schema.allOf) : []
  const anyOfStmts = schema.anyOf
    ? schema.anyOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((v): v is string => v !== undefined)
    : []
  const oneOfStmts = schema.oneOf
    ? schema.oneOf
        .map((sub) => conditionalBranchStmt(sub, recurse))
        .filter((v): v is string => v !== undefined)
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
            ? `if(ifOk)for(const k of ${JSON.stringify(ifKeys)})e.add(k)`
            : undefined,
          thenKeys.length > 0
            ? `if(ifOk)for(const k of ${JSON.stringify(thenKeys)})e.add(k)`
            : undefined,
          elseKeys.length > 0
            ? `if(!ifOk)for(const k of ${JSON.stringify(elseKeys)})e.add(k)`
            : undefined,
        ].filter((v): v is string => v !== undefined)
      })()
    : []
  const depSchemaStmts = schema.dependentSchemas
    ? Object.entries(schema.dependentSchemas)
        .map(([key, sub]) => {
          const keys = sub.properties ? Object.keys(sub.properties) : []
          return keys.length > 0
            ? `if(${JSON.stringify(key)} in o)for(const k of ${JSON.stringify(keys)})e.add(k)`
            : undefined
        })
        .filter((v): v is string => v !== undefined)
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
  ].filter((v): v is string => v !== undefined)
  // v3.2: superRefine emits per-key issues with `path: [k]` so the offending
  // property name surfaces as a JSON pointer in zod-openapi-hono's defaultHook
  // output (RFC 9457 Problem Details). messageOverride wins over the default
  // "Unknown property" wording.
  const defaultMsg = '"Unknown property: "+k'
  const msgExpr = messageOverride !== undefined ? JSON.stringify(messageOverride) : defaultMsg
  const finalStmt =
    up === false
      ? `for(const k of Object.keys(o)){if(!e.has(k))ctx.addIssue({code:"custom",path:[k],message:${msgExpr}})}`
      : (() => {
          const subZod = recurse(up)
          return `const Schema=${subZod};for(const [k,v] of Object.entries(o)){if(e.has(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]})}`
        })()

  return `.superRefine((o,ctx)=>{${[...evalStmts, finalStmt].join(';')}})`
}
