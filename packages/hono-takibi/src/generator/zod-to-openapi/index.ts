import type { $ZodIssueCode } from 'zod/v4/core'
import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import { emitTypelessRefine, hasTypelessConstraint } from '../../helper/zod.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { error, normalizeTypes } from '../../utils/index.js'
import { _enum, integer, number, object, string } from './z/index.js'

export function zodToOpenAPI(
  rawSchema: Schema | boolean,
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
  // narrow `readonly Schema[]` from a union, so define one inline. Boolean
  // schemas (JSON Schema 2020-12 §10.3.1.2) are screened out separately.
  const isSingleSchema = (items: Schema | readonly Schema[] | boolean): items is Schema =>
    typeof items === 'object' && !Array.isArray(items)

  // Defensive runtime guard: callers may upcast `unknown` schemas; we keep
  // this check to surface clearer errors than property-access failures.
  if (rawSchema === undefined) throw new Error('Schema is undefined')
  // Boolean schemas (JSON Schema 2020-12 §4.3.2):
  //   true  ↔ matches any value (z.any())
  //   false ↔ matches no value  (z.never())
  // The function signature accepts `Schema | boolean` so callers don't need
  // to pre-screen — boolean inputs are normalised here.
  if (rawSchema === true) return wrap('z.any()', {}, meta)
  if (rawSchema === false) return wrap('z.never()', {}, meta)
  const schema: Schema = rawSchema
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
    //   x-allOf-message > x-error-message > undefined (Zod default per-issue)
    const allOfMessage = schema['x-allOf-message'] ?? schema['x-error-message']
    if (allOfMessage) {
      // Per-issue.code dispatch is required: ctx.issues expects a discriminated
      // union where `code` narrows the issue shape. A generic spread loses the
      // discriminant and triggers TS errors at the call site.
      const isArrow = /^\s*\(.*?\)\s*=>/.test(allOfMessage)
      const msgExpr = isArrow ? `(${allOfMessage})(issue)` : JSON.stringify(allOfMessage)
      // Issue code order follows Zod v4's official source declaration order
      // (zod/v4/core/errors.d.ts). `satisfies` ensures these literals stay in
      // sync with Zod's `$ZodIssueCode` union — a Zod major rename breaks the
      // build here instead of silently miscompiling user output.
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
      ] as const satisfies readonly $ZodIssueCode[]
      const branches = codes
        .map(
          (c, i) =>
            `${i === 0 ? '' : 'else '}if(issue.code==='${c}'){ctx.issues.push({...issue,input:issue.input,message:${msgExpr}})}`,
        )
        .join('')
      const wrapped = `(()=>{const Schema=${z};return z.unknown().check((ctx)=>{const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){${branches}}}}).pipe(Schema)})()`
      return wrap(wrapped, { ...schema, nullable }, meta)
    }
    return wrap(z, { ...schema, nullable }, meta)
  }
  if (schema.anyOf !== undefined) {
    if (schema.anyOf.length === 0) return wrap('z.any()', schema, meta)
    const anyOfSchemas = schema.anyOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const anyOfMessage = schema['x-anyOf-message'] ?? schema['x-error-message']
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
    const oneOfMessage = schema['x-oneOf-message'] ?? schema['x-error-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}]${oneOfErrorArg})`
        : `z.xor([${oneOfSchemas.join(',')}]${oneOfErrorArg})`
    return wrap(z, schema, meta)
  }
  if (schema.not !== undefined) {
    const notMessage = schema['x-not-message'] ?? schema['x-error-message']
    const notErrorArg = notMessage ? `,${error(notMessage)}` : ''
    const typePredicates: { readonly [k: string]: string } = {
      string: `(val) => typeof val !== 'string'`,
      number: `(val) => typeof val !== 'number'`,
      integer: `(val) => typeof val !== 'number' || !Number.isInteger(val)`,
      boolean: `(val) => typeof val !== 'boolean'`,
      array: '(val) => !Array.isArray(val)',
      object: `(val) => typeof val !== 'object' || val === null || Array.isArray(val)`,
      null: '(val) => val !== null',
    }
    if (typeof schema.not === 'object' && schema.not.$ref !== undefined) {
      const refName = makeRef(schema.not.$ref)
      return wrap(
        `z.any().refine((val) => !${refName}.safeParse(val).success${notErrorArg})`,
        schema,
        meta,
      )
    }
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(val) => val !== ${value}`
      return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
    }
    // Use predicate-only when sub-schema is JUST a type check
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
          const bodies = predicates.map((v) => `(${v.replace(/^\(val\) => /, '')})`)
          const combined = `(val) => ${bodies.join(' && ')}`
          return wrap(`z.any().refine(${combined}${notErrorArg})`, schema, meta)
        }
      }
      if (isPureEnum && Array.isArray(not.enum)) {
        const list = JSON.stringify(not.enum)
        const predicate = `(val) => !${list}.includes(val)`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
      }
      if (onlyKeys.length === 1 && onlyKeys[0] === 'const') {
        const value = JSON.stringify(not.const)
        const predicate = `(val) => val !== ${value}`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
      }
      // Empty schema {} matches everything → not {} matches nothing.
      if (onlyKeys.length === 0) {
        return wrap(`z.never(${notErrorArg.slice(1)})`, schema, meta)
      }
      // Complex sub-schema: full safeParse-based check
      const zod = zodToOpenAPI(not, innerMeta, readonly)
      return wrap(`z.any().refine((val) => !${zod}.safeParse(val).success${notErrorArg})`, schema, meta)
    }
    return wrap('z.any()', schema, meta)
  }
  if (schema.const !== undefined) {
    const value = schema.const
    const constMessage = schema['x-const-message'] ?? schema['x-error-message']
    const errorMessage = constMessage
    const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
    // For non-primitive const (objects/arrays), route through
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
  // enum is keyword-independent. For type-less enum schemas
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
  // properties without explicit `type: object` is spec-wise
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
    // so messages can differ per failure mode (silent-bug fix):
    //   - contains (no min/max): "at least 1 matching element" → x-contains-message
    //   - minContains explicit: "count below lower bound" → x-minContains-message
    //   - maxContains explicit: "count above upper bound" → x-maxContains-message
    // Falls back to x-contains-message → x-error-message for each.
    // minContains: 0 makes the lower-bound refine vacuous and is skipped.
    // path stays `[]` since the constraint is array-cardinality, not
    // per-element; consumers wanting per-element issues should use items.
    const containsChain = (() => {
      const c = schema.contains
      if (!c) return ''
      const containsZod = c.$ref ? makeRef(c.$ref) : zodToOpenAPI(c, innerMeta, readonly)
      const minC = schema.minContains
      const maxC = schema.maxContains
      const fallback = schema['x-contains-message'] ?? arrayErrorMessage
      // contains alone (no min/max): "at least 1 matches"
      if (minC === undefined && maxC === undefined) {
        const msgPart = fallback ? `,message:${JSON.stringify(fallback)}` : ''
        return `.superRefine((arr,ctx)=>{const Schema=${containsZod};const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom"${msgPart}})}})`
      }
      // minContains refine (default 1 per spec); skipped when explicit 0.
      const effectiveMin = minC ?? 1
      const minMsg = schema['x-minContains-message'] ?? fallback
      const minStmt =
        effectiveMin > 0
          ? (() => {
              const msgPart = minMsg ? `,message:${JSON.stringify(minMsg)}` : ''
              return `if(matched<${effectiveMin}){ctx.addIssue({code:"custom"${msgPart}})}`
            })()
          : undefined
      const maxMsg = schema['x-maxContains-message'] ?? fallback
      const maxStmt =
        maxC !== undefined
          ? (() => {
              const msgPart = maxMsg ? `,message:${JSON.stringify(maxMsg)}` : ''
              return `if(matched>${maxC}){ctx.addIssue({code:"custom"${msgPart}})}`
            })()
          : undefined
      const stmts = [minStmt, maxStmt].filter((v): v is string => v !== undefined)
      if (stmts.length === 0) return ''
      return `.superRefine((arr,ctx)=>{const Schema=${containsZod};const matched=arr.filter((i)=>Schema.safeParse(i).success).length;${stmts.join(';')}})`
    })()
    // per-slot message overrides for tuple-shaped
    // arrays. Each slot, when set, only replaces the inner issue's `message`
    // field — `path`, `code`, `expected` etc. are preserved verbatim (mirrors
    // `x-patternProperties-message` contract). length-cap forms (items: false /
    // unevaluatedItems: false) use a custom `code: 'custom'` issue, so the
    // slot wins over `x-error-message` and over the hardcoded default.
    // Priority for length caps: x-<slot>-message > x-error-message > default.
    //
    const prefixItemsMessage = schema['x-prefixItems-message'] ?? arrayErrorMessage
    const prefixItemsMessageOverride = prefixItemsMessage
      ? `,message:${JSON.stringify(prefixItemsMessage)}`
      : ''
    const itemsMessage = schema['x-items-message'] ?? arrayErrorMessage
    const itemsMessageOverride = itemsMessage ? `,message:${JSON.stringify(itemsMessage)}` : ''
    const unevalItemsMessage = schema['x-unevaluatedItems-message'] ?? arrayErrorMessage
    const unevalItemsMessageOverride = unevalItemsMessage
      ? `,message:${JSON.stringify(unevalItemsMessage)}`
      : ''
    // schema (false → no extras allowed). Calculates the prefixItems length so
    // the refine knows where the "evaluated by prefix" boundary is.
    // sub-issues (path/code/message) survive instead of collapsing into a
    // single `custom` issue at the parent path. The length-cap form (false)
    // stays as a refine — no inner issues to propagate.
    const unevaluatedItemsChain = (() => {
      const ui = schema.unevaluatedItems
      if (ui === undefined || ui === true) return ''
      const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
      if (ui === false) {
        // in the JSON pointer (RFC 9457). Priority for the cap message:
        // x-unevaluatedItems-message > x-error-message > Zod default.
        const slot = unevalItemsMessage ?? arrayErrorMessage
        const msgPart = slot ? `,message:${JSON.stringify(slot)}` : ''
        return `.superRefine((arr,ctx)=>{for(let i=${prefixCount};i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]${msgPart}})}})`
      }
      const subZod = zodToOpenAPI(ui, innerMeta, readonly)
      return `.superRefine((arr,ctx)=>{const Schema=${subZod};for(const [idx,v] of arr.slice(${prefixCount}).entries()){const result=Schema.safeParse(v);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[${prefixCount}+idx,...issue.path]${unevalItemsMessageOverride}})}}}})`
    })()
    if (schema.prefixItems !== undefined && Array.isArray(schema.prefixItems)) {
      const prefixCodes = schema.prefixItems.map((item) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, innerMeta, readonly),
      )
      // prefixItems is encoded as
      // `z.array(z.unknown()).superRefine(...)` — NOT `z.tuple([...], rest)`.
      //
      // Why not z.tuple:
      //   1. JSON Schema 2020-12 §10.3.1.1 says prefixItems "does not constrain
      //      the length of the array". The official test suite asserts that
      //      `[]` and `["a"]` are VALID against a 2-element prefixItems schema
      //      (incomplete-prefix arrays must pass).
      //   2. Zod's `z.tuple([A, B], Rest)` REQUIRES at least 2 elements (fixed
      //      prefix length is enforced as a minimum). `[]` and `["a"]` would
      //      both fail with "expected ... received undefined".
      //
      // Precedence (JSON Schema 2020-12 §11.2): `unevaluatedItems` is stricter
      // than `items` because it applies only to items not already "evaluated"
      // by prefixItems/items annotations. When both are present we honour
      // `unevaluatedItems` and ignore `items`.
      //
      //   unevaluatedItems: <Schema> → validate trailing items against schema
      //   unevaluatedItems: false    → trailing items not allowed (length cap)
      //   unevaluatedItems: undefined / true:
      //     items: <Schema>          → validate trailing items against schema
      //     items: false             → trailing items not allowed (length cap)
      //     items: absent / true     → trailing items allowed, untyped
      const ui = schema.unevaluatedItems
      const uiIsBool = typeof ui === 'boolean'
      const uiSchema: Schema | undefined =
        ui !== undefined && !uiIsBool && typeof ui === 'object' ? ui : undefined
      const itemsField = schema.items
      const itemsSchema: Schema | undefined =
        ui === undefined &&
        itemsField !== undefined &&
        typeof itemsField !== 'boolean' &&
        isSingleSchema(itemsField)
          ? itemsField
          : undefined
      const restSchema: Schema | undefined = uiSchema ?? itemsSchema
      const restCode = restSchema
        ? restSchema.$ref
          ? makeRef(restSchema.$ref)
          : zodToOpenAPI(restSchema, innerMeta, readonly)
        : ''
      const lengthCapped = ui === false || (ui === undefined && itemsField === false)
      // the rest/cap message slot tracks the
      // *source* keyword. When `unevaluatedItems` decides the trailing-item
      // behavior (precedence per JSON Schema 2020-12 §11.2), use
      // `x-unevaluatedItems-message`; when `items` decides it, use
      // `x-items-message`. This mirrors the keyword that the user actually
      // wrote in the OpenAPI document.
      const restFromUneval = uiSchema !== undefined
      const restMessageOverride = restFromUneval ? unevalItemsMessageOverride : itemsMessageOverride
      const capFromUneval = ui === false
      const capSlotMessage = capFromUneval ? unevalItemsMessage : itemsMessage
      const prefixCheck = `const Prefix=[${prefixCodes.join(',')}];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]${prefixItemsMessageOverride}})}}}`
      const restCheck = restCode
        ? `;const Rest=${restCode};for(const [i,v] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(v);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]${restMessageOverride}})}}}`
        : ''
      // appears in the JSON pointer (RFC 9457). Priority for the cap message:
      // x-<source>-message > x-error-message > Zod default
      // (source = unevaluatedItems if cap came from unevaluatedItems: false,
      //  else items).
      const capSlot = capSlotMessage ?? arrayErrorMessage
      const capMsgPart = capSlot ? `,message:${JSON.stringify(capSlot)}` : ''
      const capCheck = lengthCapped
        ? `;for(let i=Prefix.length;i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]${capMsgPart}})}`
        : ''
      const arrayCtor = arrayErrorArg
        ? `z.array(z.unknown()${arrayErrorArg})`
        : 'z.array(z.unknown())'
      const z = `${arrayCtor}.superRefine((arr,ctx)=>{${prefixCheck}${restCheck}${capCheck}})`
      return wrap(`${z}${readonlyMod}`, schema, meta)
    }
    // items: false (no prefixItems) → only empty array valid
    if (schema.items === false) {
      return wrap(`z.array(z.any()${arrayErrorArg}).length(0)${readonlyMod}`, schema, meta)
    }
    // items can be Schema or readonly Schema[] (Draft-04 tuple validation).
    // items: true → any items allowed (same as no items spec).
    const itemSchema: Schema | undefined =
      schema.items === true
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
    const lengthMessage = schema['x-length-message']
    const sizeErrorArg = lengthMessage ? `,${error(lengthMessage)}` : ''
    // from the previous shared x-minimum-message / x-maximum-message umbrellas).
    const minMessage = schema['x-minItems-message']
    const minErrorArg = minMessage ? `,${error(minMessage)}` : ''
    const maxMessage = schema['x-maxItems-message']
    const maxErrorArg = maxMessage ? `,${error(maxMessage)}` : ''
    const uniqueMessage = schema['x-uniqueItems-message']
    // `path: [duplicateIdx]` so frontends can highlight the offending row.
    // The first occurrence is recorded; subsequent duplicates can be located
    // via `seen.get(key)` from consumer-side hooks if needed.
    const uniqueMsgPart = uniqueMessage ? `,message:${JSON.stringify(uniqueMessage)}` : ''
    const uniqueChain =
      schema.uniqueItems === true
        ? `.superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]${uniqueMsgPart}});else seen.set(key,i)}})`
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
  // Hybrid emission for type-less schemas with constraints.
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
