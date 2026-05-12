import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import { emitTypelessRefine, hasTypelessConstraint } from '../../helper/zod.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { error, normalizeTypes } from '../../utils/index.js'
import { _enum, integer, number, object, string } from './z/index.js'

export function zodToOpenAPI(
  rawSchema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
    /**
     * When set, the immediate object below this call is a `discriminatedUnion`
     * variant. The named property is the discriminator and must NOT be wrapped
     * in `.exactOptional()` even if absent from the OpenAPI `required` array,
     * because Zod's `discriminatedUnion` rejects absent/optional discriminators
     * at runtime ("No matching discriminator"). Consumed by `object()`.
     */
    discriminatorKey?: string
  },
  readonly?: boolean,
): string {
  // Local type guard — Array.isArray's predicate (arg is any[]) does not
  // narrow `readonly Schema[]` from a union, so define one inline.
  const isSingleSchema = (items: Schema | readonly Schema[]): items is Schema =>
    !Array.isArray(items)

  if (rawSchema === undefined) throw new Error('Schema is undefined')
  // v3.0 Phase B: Boolean schemas (JSON Schema 2020-12 §4.3.2):
  //   true  ↔ matches any value (z.any())
  //   false ↔ matches no value  (z.never())
  if ((rawSchema as unknown) === true) return wrap('z.any()', {} as Schema, meta)
  if ((rawSchema as unknown) === false) return wrap('z.never()', {} as Schema, meta)
  const schema = rawSchema
  // isOptional should only affect the outermost schema; strip for recursive calls.
  const innerMeta = meta?.isOptional
    ? (() => {
        const { isOptional: _, ...rest } = meta
        return rest
      })()
    : meta
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta)
  }
  const isNullType = (s: Schema) =>
    s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)
  const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1
  if (schema.allOf !== undefined) {
    const effectiveAllOf: readonly Schema[] =
      schema.properties !== undefined
        ? [
            ...schema.allOf,
            {
              type: 'object' as const,
              properties: schema.properties,
              ...(schema.required ? { required: schema.required } : {}),
            },
          ]
        : schema.allOf
    if (!effectiveAllOf.length) return wrap('z.any()', schema, meta)
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(isNullType)
    const nonNull = effectiveAllOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta)
    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return nullable ? `${schemas[0]}.nullable()` : schemas[0]
    const z = schemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    const allOfMessage = schema['x-allOf-message']
    if (allOfMessage) {
      // Per-issue.code dispatch is required: ctx.issues expects a discriminated
      // union where `code` narrows the issue shape. A generic spread loses the
      // discriminant and triggers TS errors at the call site.
      const isArrow = /^\s*\(.*?\)\s*=>/.test(allOfMessage)
      const msgExpr = isArrow ? `(${allOfMessage})(issue)` : JSON.stringify(allOfMessage)
      // Issue code order follows Zod v4's official source declaration order
      // (zod/v4/core/errors.d.ts).
      const codes = [
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
      const branches = codes
        .map(
          (c, i) =>
            `${i === 0 ? '' : 'else '}if(issue.code==='${c}'){ctx.issues.push({...issue,input:issue.input,message:${msgExpr}})}`,
        )
        .join('')
      const wrapped = `(()=>{const Schema=${z};return z.unknown().check((ctx)=>{const valid=Schema.safeParse(ctx.value);if(!valid.success){for(const issue of valid.error.issues){${branches}}}}).pipe(Schema)})()`
      return wrap(wrapped, { ...schema, nullable }, meta)
    }
    return wrap(z, { ...schema, nullable }, meta)
  }
  if (schema.anyOf !== undefined) {
    if (schema.anyOf.length === 0) return wrap('z.any()', schema, meta)
    const anyOfSchemas = schema.anyOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const anyOfMessage = schema['x-anyOf-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    return wrap(`z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`, schema, meta)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return wrap('z.any()', schema, meta)
    // ZodIntersection (from allOf) is not compatible with discriminatedUnion, so
    // fall back to xor when oneOf contains a $ref or allOf member.
    const hasRefOrAllOf = schema.oneOf.some((s) => s.$ref !== undefined || s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const discriminator = schema.discriminator?.propertyName
    const oneOfMessage = schema['x-oneOf-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}]${oneOfErrorArg})`
        : `z.xor([${oneOfSchemas.join(',')}]${oneOfErrorArg})`
    return wrap(z, schema, meta)
  }
  if (schema.not !== undefined) {
    const notMessage = schema['x-not-message']
    const notErrorArg = notMessage ? `,${error(notMessage)}` : ''
    const typePredicates: { readonly [k: string]: string } = {
      string: `(v) => typeof v !== 'string'`,
      number: `(v) => typeof v !== 'number'`,
      integer: `(v) => typeof v !== 'number' || !Number.isInteger(v)`,
      boolean: `(v) => typeof v !== 'boolean'`,
      array: '(v) => !Array.isArray(v)',
      object: `(v) => typeof v !== 'object' || v === null || Array.isArray(v)`,
      null: '(v) => v !== null',
    }
    if (typeof schema.not === 'object' && schema.not.$ref !== undefined) {
      const refName = makeRef(schema.not.$ref)
      return wrap(
        `z.any().refine((v) => !${refName}.safeParse(v).success${notErrorArg})`,
        schema,
        meta,
      )
    }
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(v) => v !== ${value}`
      return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
    }
    // v3.0 Phase B: Use predicate-only when sub-schema is JUST a type check
    // (no other constraints). Otherwise build full Zod schema and use safeParse.
    const not = schema.not
    if (typeof not === 'object' && not !== null) {
      const onlyKeys = Object.keys(not)
      const isPureType =
        onlyKeys.length === 1 && (onlyKeys[0] === 'type' || onlyKeys[0] === 'const')
      const isPureMultiType =
        onlyKeys.length === 1 && onlyKeys[0] === 'type' && Array.isArray(not.type)
      const isPureEnum = onlyKeys.length === 1 && onlyKeys[0] === 'enum'
      if (isPureType && typeof not.type === 'string') {
        const predicate = typePredicates[not.type]
        if (predicate) {
          return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
        }
      }
      if (isPureMultiType && Array.isArray(not.type)) {
        const predicates = not.type.map((t) => typePredicates[t]).filter((v) => v !== undefined)
        if (predicates.length > 0) {
          const bodies = predicates.map((v) => `(${v.replace(/^\(v\) => /, '')})`)
          const combined = `(v) => ${bodies.join(' && ')}`
          return wrap(`z.any().refine(${combined}${notErrorArg})`, schema, meta)
        }
      }
      if (isPureEnum && Array.isArray(not.enum)) {
        const list = JSON.stringify(not.enum)
        const predicate = `(v) => !${list}.includes(v)`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
      }
      if (onlyKeys.length === 1 && onlyKeys[0] === 'const') {
        const value = JSON.stringify(not.const)
        const predicate = `(v) => v !== ${value}`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
      }
      // Empty schema {} matches everything → not {} matches nothing.
      if (onlyKeys.length === 0) {
        return wrap(`z.never(${notErrorArg.slice(1)})`, schema, meta)
      }
      // Complex sub-schema: full safeParse-based check
      const zod = zodToOpenAPI(not, innerMeta, readonly)
      return wrap(`z.any().refine((v) => !${zod}.safeParse(v).success${notErrorArg})`, schema, meta)
    }
    return wrap('z.any()', schema, meta)
  }
  if (schema.const !== undefined) {
    const value = schema.const
    // v2.5: x-const-message overrides x-error-message for the literal mismatch
    const constMessage = schema['x-const-message'] ?? schema['x-error-message']
    const errorMessage = constMessage
    const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
    // v3.0 Phase B: For non-primitive const (objects/arrays), route through
    // typeless-refine for deep-equal validation. z.custom<>() doesn't validate
    // the actual value, just the type.
    const isPrimitive =
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    if (!isPrimitive) {
      return wrap(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, innerMeta, readonly)),
        schema,
        meta,
      )
    }
    const z = `z.literal(${JSON.stringify(value)}${errorArg})`
    return wrap(z, schema, meta)
  }
  // v3.0 Phase B: enum is keyword-independent. For type-less enum schemas
  // containing non-primitive (array/object) values, route through typeless-refine
  // for deep-equal comparison. Primitive-only enums keep using _enum to preserve
  // type inference AND x-error-message support.
  if (schema.enum !== undefined && schema.type === undefined) {
    const hasNonPrimitive = schema.enum.some((e) => typeof e === 'object' && e !== null)
    if (hasNonPrimitive) {
      return wrap(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, innerMeta, readonly)),
        schema,
        meta,
      )
    }
  }
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta)
  // v3.0 Phase B: properties without explicit `type: object` is spec-wise
  // applied only when value IS an object. Route through typeless-refine so
  // non-object values pass silently (per JSON Schema 2020-12 §6.5).
  // Existing unit tests are updated to match new spec-compliant output.
  if (
    schema.properties !== undefined &&
    schema.type === undefined &&
    hasTypelessConstraint(schema)
  ) {
    return wrap(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, innerMeta, readonly)),
      schema,
      meta,
    )
  }
  if (schema.properties !== undefined) return wrap(object(schema, readonly), schema, meta)
  const t = normalizeTypes(schema.type)
  if (t.includes('string')) return wrap(string(schema), schema, meta)
  if (t.includes('number')) return wrap(number(schema), schema, meta)
  if (t.includes('integer')) return wrap(integer(schema), schema, meta)
  if (t.includes('boolean')) {
    const errorMessage = schema['x-error-message']
    const requiredMessage = schema['x-required-message']
    const coerce = schema['x-coerce'] === true
    const baseFn = coerce ? 'z.coerce.boolean' : 'z.boolean'
    const arg = (() => {
      if (requiredMessage === undefined && errorMessage === undefined) return ''
      if (requiredMessage === undefined && errorMessage !== undefined) return error(errorMessage)
      if (requiredMessage !== undefined && errorMessage === undefined)
        return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:undefined}`
      return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:${JSON.stringify(errorMessage)}}`
    })()
    const base = arg ? `${baseFn}(${arg})` : `${baseFn}()`
    return wrap(base, schema, meta)
  }
  if (t.includes('array')) {
    const readonlyMod = readonly ? '.readonly()' : ''
    const arrayErrorMessage = schema['x-error-message']
    const arrayErrorArg = arrayErrorMessage ? `,${error(arrayErrorMessage)}` : ''
    // v3.0: contains / minContains / maxContains each emit a dedicated refine
    // so messages can differ per failure mode (silent-bug fix):
    //   - contains (no min/max): "at least 1 matching element" → x-contains-message
    //   - minContains explicit: "count below lower bound" → x-minContains-message
    //   - maxContains explicit: "count above upper bound" → x-maxContains-message
    // Falls back to x-contains-message → x-error-message for each.
    // minContains: 0 makes the lower-bound refine vacuous and is skipped.
    const containsChain = (() => {
      const c = schema.contains
      if (!c) return ''
      const containsZod = c.$ref ? makeRef(c.$ref) : zodToOpenAPI(c, innerMeta, readonly)
      const minC = schema.minContains
      const maxC = schema.maxContains
      const fallback = schema['x-contains-message'] ?? arrayErrorMessage
      // contains alone (no min/max): "at least 1 matches"
      if (minC === undefined && maxC === undefined) {
        const msgArg = fallback ? `,${error(fallback)}` : ''
        return `.refine((arr)=>{const Schema=${containsZod};return arr.some((i)=>Schema.safeParse(i).success)}${msgArg})`
      }
      // minContains refine (default 1 per spec); skipped when explicit 0.
      const effectiveMin = minC ?? 1
      const minRefine =
        effectiveMin > 0
          ? (() => {
              const minMsg = schema['x-minContains-message'] ?? fallback
              const minMsgArg = minMsg ? `,${error(minMsg)}` : ''
              return `.refine((arr)=>{const Schema=${containsZod};return arr.filter((i)=>Schema.safeParse(i).success).length>=${effectiveMin}}${minMsgArg})`
            })()
          : ''
      const maxRefine =
        maxC !== undefined
          ? (() => {
              const maxMsg = schema['x-maxContains-message'] ?? fallback
              const maxMsgArg = maxMsg ? `,${error(maxMsg)}` : ''
              return `.refine((arr)=>{const Schema=${containsZod};return arr.filter((i)=>Schema.safeParse(i).success).length<=${maxC}}${maxMsgArg})`
            })()
          : ''
      return `${minRefine}${maxRefine}`
    })()
    // v2.6: unevaluatedItems — items beyond prefixItems must satisfy the
    // schema (false → no extras allowed). Calculates the prefixItems length so
    // the refine knows where the "evaluated by prefix" boundary is.
    const unevaluatedItemsChain = (() => {
      const ui = schema.unevaluatedItems
      if (ui === undefined || ui === true) return ''
      const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
      if (ui === false) {
        return `.refine((arr)=>arr.length<=${prefixCount}${arrayErrorArg})`
      }
      const subZod = zodToOpenAPI(ui, innerMeta, readonly)
      return `.refine((arr)=>{const Schema=${subZod};return arr.slice(${prefixCount}).every((i)=>Schema.safeParse(i).success)}${arrayErrorArg})`
    })()
    if (schema.prefixItems !== undefined && Array.isArray(schema.prefixItems)) {
      const tupleItems = schema.prefixItems.map((item) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, innerMeta, readonly),
      )
      const z = `z.tuple([${tupleItems.join(',')}]${arrayErrorArg})`
      // v3.0 Phase C: items: false → length must be exactly prefixCount
      // items: <schema> → trailing items must match
      const prefCount = schema.prefixItems.length
      const itemsChain = ((items: Schema | readonly Schema[] | undefined): string => {
        if ((items as unknown) === false) {
          return `.refine((arr)=>arr.length<=${prefCount}${arrayErrorArg})`
        }
        if (items === undefined || !isSingleSchema(items)) return ''
        const subZod = zodToOpenAPI(items, innerMeta, readonly)
        return `.refine((arr)=>{const Schema=${subZod};return arr.slice(${prefCount}).every((i)=>Schema.safeParse(i).success)}${arrayErrorArg})`
      })(schema.items)
      return wrap(`${z}${itemsChain}${unevaluatedItemsChain}${readonlyMod}`, schema, meta)
    }
    // v3.0 Phase C: items: false (no prefixItems) → only empty array valid
    if ((schema.items as unknown) === false) {
      return wrap(`z.array(z.any()${arrayErrorArg}).length(0)${readonlyMod}`, schema, meta)
    }
    // items can be Schema or readonly Schema[] (Draft-04 tuple validation).
    // items: true → any items allowed (same as no items spec).
    const itemSchema: Schema | undefined =
      (schema.items as unknown) === true
        ? undefined
        : Array.isArray(schema.items)
          ? schema.items[0]
          : schema.items
    const item = itemSchema
      ? itemSchema.$ref
        ? makeRef(itemSchema.$ref)
        : zodToOpenAPI(itemSchema, innerMeta, readonly)
      : 'z.any()'
    const z = `z.array(${item}${arrayErrorArg})`
    const sizeMessage = schema['x-size-message']
    const sizeErrorArg = sizeMessage ? `,${error(sizeMessage)}` : ''
    // v3.0: array length uses x-minItems-message / x-maxItems-message (split
    // from the previous shared x-minimum-message / x-maximum-message umbrellas).
    const minMessage = schema['x-minItems-message']
    const minErrorArg = minMessage ? `,${error(minMessage)}` : ''
    const maxMessage = schema['x-maxItems-message']
    const maxErrorArg = maxMessage ? `,${error(maxMessage)}` : ''
    // v2.5: x-uniqueItems-message — independent message slot; used to fall back
    // to x-pattern-message which was a misnomer; default empty now.
    const uniqueMessage = schema['x-uniqueItems-message']
    const uniqueErrorArg = uniqueMessage ? `,${error(uniqueMessage)}` : ''
    const uniqueChain =
      schema.uniqueItems === true
        ? `.refine((items)=>new Set(items).size===items.length${uniqueErrorArg})`
        : ''
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? wrap(
            `${z}.length(${schema.minItems}${sizeErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
            meta,
          )
        : wrap(
            `${z}.min(${schema.minItems}${minErrorArg}).max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
            meta,
          )
    }
    if (typeof schema.minItems === 'number')
      return wrap(
        `${z}.min(${schema.minItems}${minErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
      )
    if (typeof schema.maxItems === 'number')
      return wrap(
        `${z}.max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
      )
    return wrap(
      `${z}${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
      schema,
      meta,
    )
  }
  if (t.includes('object')) return wrap(object(schema, readonly), schema, meta)
  if (t.includes('date')) {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.date(${error(errorMessage)})` : 'z.date()'
    return wrap(base, schema, meta)
  }
  if (t.length === 1 && t[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return wrap(base, schema, meta)
  }
  // v3.0 Phase A: Hybrid emission for type-less schemas with constraints.
  // Instead of falling to z.any() (which silently passes everything), emit a
  // z.unknown().superRefine() that applies each keyword only when the runtime
  // value's type matches. Preserves JSON Schema's keyword-independent semantics.
  if (t.length === 0 && hasTypelessConstraint(schema)) {
    return wrap(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, innerMeta, readonly)),
      schema,
      meta,
    )
  }
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta)
}
