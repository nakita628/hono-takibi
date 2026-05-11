/**
 * v3.0 Phase A: Hybrid emission for type-less JSON Schema schemas.
 *
 * JSON Schema 2020-12 allows schemas without a `type` field where keywords
 * apply only when the value's actual type matches. e.g.,
 *   { "required": ["x"] }  // applies only when value is a non-array object
 *   { "minimum": 0 }       // applies only when value is a number
 *
 * Zod's type-first design cannot express this directly. This module emits
 * `z.unknown().superRefine((v, ctx) => { ... })` with value-type-aware checks
 * so each keyword applies only when relevant — preserving JSON Schema's
 * keyword-independent semantics while staying inside Zod.
 */
import type { Schema } from '../../openapi/index.js'

type Recurse = (s: Schema) => string

// Array.isArray narrows to `any[]` and does not exclude `readonly Schema[]`
// from a union; this helper provides the missing narrowing.
function isSingleSchema(items: Schema | readonly Schema[]): items is Schema {
  return !Array.isArray(items)
}

function buildObjectChecks(schema: Schema, recurse: Recurse): readonly string[] {
  // After the `typeof v === 'object' && v !== null && !Array.isArray(v)` guard
  // in emitTypelessRefine, `v` narrows to `object`. `Object.hasOwn(v, k)`,
  // `Object.keys(v)`, `Object.entries(v)` all accept that type. Indexed access
  // (`v[k]`) doesn't — for that we use `Reflect.get(v, k)`, which is valid JS
  // and avoids a TS `as` cast.
  //
  // `Reflect.get` returns `any` per the TS lib, but it's immediately consumed
  // by `Schema.safeParse(unknown)` — the value never escapes into a typed
  // variable, so the `any` cannot leak (CLAUDE.md `any` 禁止 rule applies to
  // explicit annotations / variable types, not library-internal return types
  // contained in a single expression).
  const checks: string[] = []
  if (Array.isArray(schema.required)) {
    for (const key of schema.required) {
      // Use Object.hasOwn to honor JSON Schema's "own property" semantics —
      // `in` would also count inherited keys (__proto__/toString/constructor).
      checks.push(
        `if(!Object.hasOwn(v,${JSON.stringify(key)}))ctx.addIssue({code:'custom',message:'missing required: ${JSON.stringify(key).slice(1, -1)}'})`,
      )
    }
  }
  if (typeof schema.minProperties === 'number') {
    checks.push(
      `if(Object.keys(v).length<${schema.minProperties})ctx.addIssue({code:'custom',message:'too few properties'})`,
    )
  }
  if (typeof schema.maxProperties === 'number') {
    checks.push(
      `if(Object.keys(v).length>${schema.maxProperties})ctx.addIssue({code:'custom',message:'too many properties'})`,
    )
  }
  if (schema.properties) {
    for (const [key, sub] of Object.entries(schema.properties)) {
      const subZod = recurse(sub)
      checks.push(
        `if(Object.hasOwn(v,${JSON.stringify(key)})){const Schema=${subZod};if(!Schema.safeParse(Reflect.get(v,${JSON.stringify(key)})).success)ctx.addIssue({code:'custom',message:'invalid property'})}`,
      )
    }
  }
  const ownKeysJson = JSON.stringify(Object.keys(schema.properties ?? {}))
  const patternsJson = JSON.stringify(Object.keys(schema.patternProperties ?? {}))
  if (schema.additionalProperties === false) {
    checks.push(
      `for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue({code:'custom',message:'additional property not allowed: '+k})}}`,
    )
  } else if (
    typeof schema.additionalProperties === 'object' &&
    schema.additionalProperties !== null
  ) {
    const subZod = recurse(schema.additionalProperties as Schema)
    checks.push(
      `{const Schema=${subZod};for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){if(!Schema.safeParse(Reflect.get(v,k)).success)ctx.addIssue({code:'custom',message:'invalid additional property: '+k})}}}`,
    )
  }
  if (schema.patternProperties) {
    for (const [pattern, sub] of Object.entries(schema.patternProperties)) {
      const subZod = recurse(sub)
      checks.push(
        `{const Schema=${subZod};for(const k of Object.keys(v)){if(new RegExp(${JSON.stringify(pattern)}).test(k)){if(!Schema.safeParse(Reflect.get(v,k)).success)ctx.addIssue({code:'custom',message:'pattern property invalid: '+k})}}}`,
      )
    }
  }
  if (schema.propertyNames?.pattern) {
    checks.push(
      `for(const k of Object.keys(v)){if(!new RegExp(${JSON.stringify(schema.propertyNames.pattern)}).test(k))ctx.addIssue({code:'custom',message:'invalid property name: '+k})}`,
    )
  }
  if (schema.dependentRequired) {
    for (const [key, deps] of Object.entries(schema.dependentRequired)) {
      const depsCheck = deps.map((d) => `Object.hasOwn(v,${JSON.stringify(d)})`).join('&&')
      if (depsCheck) {
        checks.push(
          `if(Object.hasOwn(v,${JSON.stringify(key)})){if(!(${depsCheck}))ctx.addIssue({code:'custom',message:'dependentRequired'})}`,
        )
      }
    }
  }
  if (schema.dependentSchemas) {
    for (const [key, sub] of Object.entries(schema.dependentSchemas)) {
      const subZod = recurse(sub)
      checks.push(
        `if(Object.hasOwn(v,${JSON.stringify(key)})){const Schema=${subZod};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'dependentSchemas'})}`,
      )
    }
  }
  if (schema.unevaluatedProperties === false) {
    // Static evaluated keys (own + patternProperties handled by check above)
    checks.push(
      `for(const k of Object.keys(v)){if(!${ownKeysJson}.includes(k)&&!${patternsJson}.some((p)=>new RegExp(p).test(k))){ctx.addIssue({code:'custom',message:'unevaluated property: '+k})}}`,
    )
  }
  return checks
}

function buildArrayChecks(schema: Schema, recurse: Recurse): readonly string[] {
  const checks: string[] = []
  if (typeof schema.minItems === 'number') {
    checks.push(
      `if(v.length<${schema.minItems})ctx.addIssue({code:'custom',message:'too few items'})`,
    )
  }
  if (typeof schema.maxItems === 'number') {
    checks.push(
      `if(v.length>${schema.maxItems})ctx.addIssue({code:'custom',message:'too many items'})`,
    )
  }
  if (schema.uniqueItems === true) {
    checks.push(
      `{const seen=new Set();for(const item of v){const key=JSON.stringify(item);if(seen.has(key)){ctx.addIssue({code:'custom',message:'duplicate items'});break}seen.add(key)}}`,
    )
  }
  const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
  if (schema.prefixItems) {
    for (const [idx, sub] of schema.prefixItems.entries()) {
      const subZod = recurse(sub)
      checks.push(
        `if(v.length>${idx}){const Schema=${subZod};if(!Schema.safeParse(v[${idx}]).success)ctx.addIssue({code:'custom',message:'invalid prefix item ${idx}'})}`,
      )
    }
  }
  // v3.0 Phase C: items as boolean schemas
  // items: false → trailing items not allowed (length must be <= prefixCount)
  // items: true → trailing items unconstrained (no-op)
  if ((schema.items as unknown) === false) {
    checks.push(
      `if(v.length>${prefixCount})ctx.addIssue({code:'custom',message:'no items allowed beyond prefixItems'})`,
    )
  } else if (schema.items !== undefined && isSingleSchema(schema.items)) {
    const subZod = recurse(schema.items)
    checks.push(
      `{const Schema=${subZod};for(let i=${prefixCount};i<v.length;i++){if(!Schema.safeParse(v[i]).success)ctx.addIssue({code:'custom',message:'invalid item at '+i})}}`,
    )
  }
  if (schema.contains) {
    const subZod = recurse(schema.contains)
    const minC = schema.minContains ?? 1
    const maxC = schema.maxContains
    const minCheck = `if(m<${minC})ctx.addIssue({code:'custom',message:'contains min not met'})`
    const maxCheck =
      maxC !== undefined
        ? `;if(m>${maxC})ctx.addIssue({code:'custom',message:'contains max exceeded'})`
        : ''
    checks.push(
      `{const m=v.filter((i)=>${subZod}.safeParse(i).success).length;${minCheck}${maxCheck}}`,
    )
  }
  if (schema.unevaluatedItems === false) {
    checks.push(
      `if(v.length>${prefixCount})ctx.addIssue({code:'custom',message:'unevaluated items'})`,
    )
  }
  return checks
}

function buildStringChecks(schema: Schema): readonly string[] {
  const checks: string[] = []
  if (typeof schema.minLength === 'number') {
    checks.push(
      `if([...v].length<${schema.minLength})ctx.addIssue({code:'custom',message:'too short'})`,
    )
  }
  if (typeof schema.maxLength === 'number') {
    checks.push(
      `if([...v].length>${schema.maxLength})ctx.addIssue({code:'custom',message:'too long'})`,
    )
  }
  if (schema.pattern) {
    checks.push(
      `if(!new RegExp(${JSON.stringify(schema.pattern)}).test(v))ctx.addIssue({code:'custom',message:'pattern mismatch'})`,
    )
  }
  return checks
}

function buildNumberChecks(schema: Schema): readonly string[] {
  const checks: string[] = []
  if (typeof schema.minimum === 'number') {
    checks.push(`if(v<${schema.minimum})ctx.addIssue({code:'custom',message:'below minimum'})`)
  }
  if (typeof schema.exclusiveMinimum === 'number') {
    checks.push(
      `if(v<=${schema.exclusiveMinimum})ctx.addIssue({code:'custom',message:'<= exclusiveMinimum'})`,
    )
  } else if (schema.exclusiveMinimum === true && typeof schema.minimum === 'number') {
    // Draft 4: replace minimum check with exclusive
    checks.pop()
    checks.push(
      `if(v<=${schema.minimum})ctx.addIssue({code:'custom',message:'<= exclusiveMinimum'})`,
    )
  }
  if (typeof schema.maximum === 'number') {
    checks.push(`if(v>${schema.maximum})ctx.addIssue({code:'custom',message:'above maximum'})`)
  }
  if (typeof schema.exclusiveMaximum === 'number') {
    checks.push(
      `if(v>=${schema.exclusiveMaximum})ctx.addIssue({code:'custom',message:'>= exclusiveMaximum'})`,
    )
  } else if (schema.exclusiveMaximum === true && typeof schema.maximum === 'number') {
    checks.pop()
    checks.push(
      `if(v>=${schema.maximum})ctx.addIssue({code:'custom',message:'>= exclusiveMaximum'})`,
    )
  }
  if (typeof schema.multipleOf === 'number') {
    // Use BigInt-style modulo for floats: scale to integer
    checks.push(
      `{const r=Math.abs(v/${schema.multipleOf}-Math.round(v/${schema.multipleOf}));if(r>1e-10)ctx.addIssue({code:'custom',message:'not multipleOf'})}`,
    )
  }
  return checks
}

function buildGenericChecks(schema: Schema, recurse: Recurse): readonly string[] {
  const checks: string[] = []
  if (Array.isArray(schema.enum)) {
    // deepEqual via JSON.stringify (handles primitives + null + arrays + objects)
    checks.push(
      `if(!${JSON.stringify(schema.enum)}.some((e)=>JSON.stringify(e)===JSON.stringify(v)))ctx.addIssue({code:'custom',message:'not in enum'})`,
    )
  }
  if (schema.const !== undefined) {
    checks.push(
      `if(JSON.stringify(${JSON.stringify(schema.const)})!==JSON.stringify(v))ctx.addIssue({code:'custom',message:'const mismatch'})`,
    )
  }
  if (Array.isArray(schema.allOf)) {
    for (const sub of schema.allOf) {
      const subZod = recurse(sub)
      checks.push(
        `{const Schema=${subZod};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'allOf branch failed'})}`,
      )
    }
  }
  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    const conds = schema.anyOf.map((sub) => `${recurse(sub)}.safeParse(v).success`).join('||')
    checks.push(`if(!(${conds}))ctx.addIssue({code:'custom',message:'anyOf failed'})`)
  }
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    const sums = schema.oneOf.map((sub) => `(${recurse(sub)}.safeParse(v).success?1:0)`).join('+')
    checks.push(
      `if((${sums})!==1)ctx.addIssue({code:'custom',message:'oneOf must match exactly one'})`,
    )
  }
  if (schema.not) {
    const subZod = recurse(schema.not)
    checks.push(
      `if(${subZod}.safeParse(v).success)ctx.addIssue({code:'custom',message:'not predicate matched'})`,
    )
  }
  if (schema.if) {
    const ifZod = recurse(schema.if)
    const thenPart = schema.then
      ? `if(ifOk){const Schema=${recurse(schema.then)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'then failed'})}`
      : ''
    const elsePart = schema.else
      ? `if(!ifOk){const Schema=${recurse(schema.else)};if(!Schema.safeParse(v).success)ctx.addIssue({code:'custom',message:'else failed'})}`
      : ''
    if (thenPart || elsePart) {
      checks.push(`{const ifOk=${ifZod}.safeParse(v).success;${thenPart};${elsePart}}`)
    }
  }
  return checks
}

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

export function emitTypelessRefine(schema: Schema, recurse: Recurse): string {
  const blocks: string[] = []
  const objectChecks = buildObjectChecks(schema, recurse)
  if (objectChecks.length) {
    blocks.push(`if(typeof v==='object'&&v!==null&&!Array.isArray(v)){${objectChecks.join(';')}}`)
  }
  const arrayChecks = buildArrayChecks(schema, recurse)
  if (arrayChecks.length) {
    blocks.push(`if(Array.isArray(v)){${arrayChecks.join(';')}}`)
  }
  const stringChecks = buildStringChecks(schema)
  if (stringChecks.length) {
    blocks.push(`if(typeof v==='string'){${stringChecks.join(';')}}`)
  }
  const numberChecks = buildNumberChecks(schema)
  if (numberChecks.length) {
    blocks.push(`if(typeof v==='number'){${numberChecks.join(';')}}`)
  }
  const genericChecks = buildGenericChecks(schema, recurse)
  if (genericChecks.length) {
    blocks.push(genericChecks.join(';'))
  }
  if (!blocks.length) return 'z.any()'
  return `z.unknown().superRefine((v,ctx)=>{${blocks.join(';')}})`
}
