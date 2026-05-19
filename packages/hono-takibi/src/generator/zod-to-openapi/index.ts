import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import {
  emitTypelessRefine,
  hasTypelessConstraint,
  makeUnevaluatedPropertiesCheck,
} from '../../helper/zod.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { error, normalizeTypes } from '../../utils/index.js'
import { _enum, integer, number, object, string } from './z/index.js'

export function zodToOpenAPI(
  schema: Schema | boolean,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
  options?: {
    /**
     * Path/query/header parameters arrive as strings on the wire. When true,
     * primitive number/integer emitters emit `z.coerce.X().pipe(z.Y()...)`
     * (or `z.coerce.bigint()` for `format: bigint`) directly. Boolean uses
     * `x-stringbool` for explicit opt-in; wire-implicit boolean coercion is
     * still handled by string-replace at the caller (out of scope). Not
     * propagated into object/array subschemas.
     */
    coerce?: boolean
    /** Append `.readonly()` to array/object schemas. */
    readonly?: boolean
    /**
     * @internal Set by `object` emitter on non-required properties; consumed
     * by `wrap` for `.exactOptional()` and stripped before recursing into
     * subschemas. Do not pass from external callers.
     */
    isOptional?: boolean
  },
): string {
  const readonly = options?.readonly
  // `isOptional` is consumed by `wrap` at this level only; strip before
  // recursing so siblings/children don't inherit the parent's optional-ness.
  const childOptions =
    options?.isOptional === undefined
      ? options
      : (() => {
          const { isOptional: _, ...rest } = options
          return rest
        })()
  // Local type guard — Array.isArray's predicate (arg is any[]) does not
  // narrow `readonly Schema[]` from a union, so define one inline. Boolean
  // schemas (JSON Schema 2020-12 §10.3.1.2) are screened out separately.
  const isSingleSchema = (items: Schema | readonly Schema[] | boolean): items is Schema =>
    typeof items === 'object' && !Array.isArray(items)

  // Boolean schemas (JSON Schema 2020-12 §4.3.2):
  //   true  ↔ matches any value (z.any())
  //   false ↔ matches no value  (z.never())
  if (schema === undefined) throw new Error('Schema is undefined')
  if (schema === true) return wrap('z.any()', {}, meta, options)
  if (schema === false) return wrap('z.never()', {}, meta, options)
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta, options)
  }
  const isNullType = (s: Schema) =>
    s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)
  const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1
  if (schema.allOf !== undefined) {
    const effectiveAllOf =
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
    if (!effectiveAllOf.length) return wrap('z.any()', schema, meta, options)
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(isNullType)
    const nonNull = effectiveAllOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta, options)
    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, undefined, childOptions),
    )
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return wrap(schemas[0], { ...schema, nullable }, meta, options)
    const z = schemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    //   x-allOf-message > x-error-message > undefined (Zod default per-issue)
    const allOfMessage = schema['x-allOf-message'] ?? schema['x-error-message']
    // JSON Schema 2020-12 §11.2: `unevaluatedProperties` operates on the keys
    // remaining after `allOf`/`anyOf`/`oneOf`/`if-then-else`/`dependentSchemas`
    // evaluation. ZodIntersection (from `.and(...)`) strips excess keys before
    // any inline refine sees them, so the check has to run on the raw input.
    // `makeUnevaluatedPropertiesCheck` returns a `(ctx)=>{...}` body that reads
    // from `ctx.value` directly; we splice it into the same `z.unknown().check`
    // wrapper used for `x-allOf-message` so a single pipe handles both.
    const unevalCheck = makeUnevaluatedPropertiesCheck(
      { ...schema, allOf: effectiveAllOf },
      (s) => zodToOpenAPI(s, undefined, childOptions),
      schema['x-error-message'],
    )
    if (allOfMessage || unevalCheck) {
      const safeParseBranches = (() => {
        if (!allOfMessage) {
          return 'const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){ctx.issues.push({...issue,input:issue.input})}}'
        }
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
        ] as const
        const branches = codes
          .map(
            (c, i) =>
              `${i === 0 ? '' : 'else '}if(issue.code==='${c}'){ctx.issues.push({...issue,input:issue.input,message:${msgExpr}})}`,
          )
          .join('')
        return `const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){${branches}}}`
      })()
      const unevalCall = unevalCheck ? `;(${unevalCheck})(ctx)` : ''
      const wrapped = `(()=>{const Schema=${z};return z.unknown().check((ctx)=>{${safeParseBranches}${unevalCall}}).pipe(Schema)})()`
      return wrap(wrapped, { ...schema, nullable }, meta, options)
    }
    return wrap(z, { ...schema, nullable }, meta, options)
  }
  if (schema.anyOf !== undefined) {
    if (schema.anyOf.length === 0) return wrap('z.any()', schema, meta, options)
    const anyOfSchemas = schema.anyOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, undefined, childOptions),
    )
    const anyOfMessage = schema['x-anyOf-message'] ?? schema['x-error-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    return wrap(`z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`, schema, meta, options)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return wrap('z.any()', schema, meta, options)
    // ZodIntersection (from allOf) is not compatible with discriminatedUnion, so
    // fall back to xor when oneOf contains a $ref or allOf member.
    const hasRefOrAllOf = schema.oneOf.some((s) => s.$ref !== undefined || s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, undefined, childOptions),
    )
    const discriminator = schema.discriminator?.propertyName
    const oneOfMessage = schema['x-oneOf-message'] ?? schema['x-error-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}]${oneOfErrorArg})`
        : `z.xor([${oneOfSchemas.join(',')}]${oneOfErrorArg})`
    return wrap(z, schema, meta, options)
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
        options,
      )
    }
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(val) => val !== ${value}`
      return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta, options)
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
          return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta, options)
        }
      }
      if (isPureMultiType && Array.isArray(not.type)) {
        const predicates = not.type.map((t) => typePredicates[t]).filter((v) => v !== undefined)
        if (predicates.length > 0) {
          const bodies = predicates.map((v) => `(${v.replace(/^\(val\) => /, '')})`)
          const combined = `(val) => ${bodies.join(' && ')}`
          return wrap(`z.any().refine(${combined}${notErrorArg})`, schema, meta, options)
        }
      }
      if (isPureEnum && Array.isArray(not.enum)) {
        const list = JSON.stringify(not.enum)
        const predicate = `(val) => !${list}.includes(val)`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta, options)
      }
      if (onlyKeys.length === 1 && onlyKeys[0] === 'const') {
        const value = JSON.stringify(not.const)
        const predicate = `(val) => val !== ${value}`
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta, options)
      }
      // Empty schema {} matches everything → not {} matches nothing.
      if (onlyKeys.length === 0) {
        return wrap(`z.never(${notErrorArg.slice(1)})`, schema, meta, options)
      }
      // Complex sub-schema: full safeParse-based check
      const zod = zodToOpenAPI(not, undefined, childOptions)
      return wrap(
        `z.any().refine((val) => !${zod}.safeParse(val).success${notErrorArg})`,
        schema,
        meta,
        options,
      )
    }
    return wrap('z.any()', schema, meta, options)
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
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
        schema,
        meta,
        options,
      )
    }
    const z = `z.literal(${JSON.stringify(value)}${errorArg})`
    return wrap(z, schema, meta, options)
  }
  // enum is keyword-independent. For type-less enum schemas
  // containing non-primitive (array/object) values, route through typeless-refine
  // for deep-equal comparison. Primitive-only enums keep using _enum to preserve
  // type inference AND x-error-message support.
  if (schema.enum !== undefined && schema.type === undefined) {
    const hasNonPrimitive = schema.enum.some((e) => typeof e === 'object' && e !== null)
    if (hasNonPrimitive) {
      return wrap(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
        schema,
        meta,
        options,
      )
    }
  }
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta, options)
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
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
      meta,
      options,
    )
  }
  if (schema.properties !== undefined)
    return wrap(object(schema, childOptions), schema, meta, options)
  const t = normalizeTypes(schema.type)
  if (t.includes('string')) return wrap(string(schema, childOptions), schema, meta, options)
  if (t.includes('number')) return wrap(number(schema, options), schema, meta, options)
  if (t.includes('integer')) return wrap(integer(schema, options), schema, meta, options)
  if (t.includes('boolean')) {
    const errorMessage = schema['x-error-message']
    const requiredMessage = schema['x-required-message']
    const xCoerce = schema['x-coerce'] === true
    const xStringbool = schema['x-stringbool']
    if (xCoerce && xStringbool !== undefined) {
      throw new Error(
        'x-coerce and x-stringbool are mutually exclusive on a boolean schema. Remove one.',
      )
    }
    const arg = (() => {
      if (requiredMessage === undefined && errorMessage === undefined) return ''
      if (requiredMessage === undefined && errorMessage !== undefined) return error(errorMessage)
      if (requiredMessage !== undefined && errorMessage === undefined)
        return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:undefined}`
      return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:${JSON.stringify(errorMessage)}}`
    })()
    if (xStringbool !== undefined) {
      const opts = xStringbool === true ? null : xStringbool
      const optsObj = opts
        ? {
            ...(opts.truthy !== undefined ? { truthy: opts.truthy } : {}),
            ...(opts.falsy !== undefined ? { falsy: opts.falsy } : {}),
            ...(opts.case !== undefined ? { case: opts.case } : {}),
          }
        : null
      /* Only serialize when there is at least one key to emit. An empty
       * `optsObj` would otherwise produce `'{}'`, and the subsequent merge
       * (`optsStr.slice(0,-1)` + `,` + `arg.slice(1)`) would inject a leading
       * comma — `z.stringbool({,error:"…"})` — breaking the generated TS. */
      const optsStr = optsObj && Object.keys(optsObj).length > 0 ? JSON.stringify(optsObj) : ''
      const combinedArg =
        optsStr && arg ? `${optsStr.slice(0, -1)},${arg.slice(1)}` : optsStr || arg
      const base = combinedArg ? `z.stringbool(${combinedArg})` : 'z.stringbool()'
      return wrap(base, schema, meta, options)
    }
    const baseFn = xCoerce ? 'z.coerce.boolean' : 'z.boolean'
    const base = arg ? `${baseFn}(${arg})` : `${baseFn}()`
    return wrap(base, schema, meta, options)
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
      const containsZod = c.$ref ? makeRef(c.$ref) : zodToOpenAPI(c, undefined, childOptions)
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
      const subZod = zodToOpenAPI(ui, undefined, childOptions)
      return `.superRefine((arr,ctx)=>{const Schema=${subZod};for(const [idx,val] of arr.slice(${prefixCount}).entries()){const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[${prefixCount}+idx,...issue.path]${unevalItemsMessageOverride}})}}}})`
    })()
    // Length / unique chains. Computed up front so both the prefixItems
    // branch and the plain array branch can apply them — previously the
    // prefixItems branch silently dropped minItems / maxItems / uniqueItems /
    // contains (JSON Schema 2020-12 explicitly permits all of them with
    // prefixItems; the spec's official test suite covers the combination).
    // Per-keyword precedence (openapi/index.ts): `x-<keyword>-message` >
    // `x-error-message` > Zod default. `arrayErrorArg` already covers the
    // invalid-type slot via `z.array(..., {error})`; chain methods need an
    // explicit fallback to honor the contract.
    const lengthMessage = schema['x-length-message'] ?? arrayErrorMessage
    const sizeErrorArg = lengthMessage ? `,${error(lengthMessage)}` : ''
    const minMessage = schema['x-minItems-message'] ?? arrayErrorMessage
    const minErrorArg = minMessage ? `,${error(minMessage)}` : ''
    const maxMessage = schema['x-maxItems-message'] ?? arrayErrorMessage
    const maxErrorArg = maxMessage ? `,${error(maxMessage)}` : ''
    const uniqueMessage = schema['x-uniqueItems-message'] ?? arrayErrorMessage
    const uniqueMsgPart = uniqueMessage ? `,message:${JSON.stringify(uniqueMessage)}` : ''
    const uniqueChain =
      schema.uniqueItems === true
        ? `.superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]${uniqueMsgPart}});else seen.set(key,i)}})`
        : ''
    const lengthChain = (() => {
      if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
        return schema.minItems === schema.maxItems
          ? `.length(${schema.minItems}${sizeErrorArg})`
          : `.min(${schema.minItems}${minErrorArg}).max(${schema.maxItems}${maxErrorArg})`
      }
      if (typeof schema.minItems === 'number') return `.min(${schema.minItems}${minErrorArg})`
      if (typeof schema.maxItems === 'number') return `.max(${schema.maxItems}${maxErrorArg})`
      return ''
    })()
    if (schema.prefixItems !== undefined && Array.isArray(schema.prefixItems)) {
      const prefixCodes = schema.prefixItems.map((item) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, undefined, childOptions),
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
          : zodToOpenAPI(restSchema, undefined, childOptions)
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
        ? `;const Rest=${restCode};for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]${restMessageOverride}})}}}`
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
      // Apply length / unique / contains AFTER the prefix superRefine so they
      // observe the validated tuple. unevaluatedItems is already handled inline
      // (restCheck/capCheck) so we do not append unevaluatedItemsChain here.
      return wrap(
        `${z}${lengthChain}${uniqueChain}${containsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    }
    // items: false (no prefixItems) → only empty array valid
    if (schema.items === false) {
      return wrap(`z.array(z.any()${arrayErrorArg}).length(0)${readonlyMod}`, schema, meta, options)
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
        : zodToOpenAPI(itemSchema, undefined, childOptions)
      : 'z.any()'
    const z = `z.array(${item}${arrayErrorArg})`
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? wrap(
            `${z}.length(${schema.minItems}${sizeErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
            meta,
            options,
          )
        : wrap(
            `${z}.min(${schema.minItems}${minErrorArg}).max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
            meta,
            options,
          )
    }
    if (typeof schema.minItems === 'number')
      return wrap(
        `${z}.min(${schema.minItems}${minErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    if (typeof schema.maxItems === 'number')
      return wrap(
        `${z}.max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    return wrap(
      `${z}${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
      schema,
      meta,
      options,
    )
  }
  if (t.includes('object')) return wrap(object(schema, childOptions), schema, meta, options)
  if (t.includes('date')) {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.date(${error(errorMessage)})` : 'z.date()'
    return wrap(base, schema, meta, options)
  }
  if (t.length === 1 && t[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return wrap(base, schema, meta, options)
  }
  // Hybrid emission for type-less schemas with constraints.
  // Instead of falling to z.any() (which silently passes everything), emit a
  // z.unknown().superRefine() that applies each keyword only when the runtime
  // value's type matches. Preserves JSON Schema's keyword-independent semantics.
  if (t.length === 0 && hasTypelessConstraint(schema)) {
    return wrap(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
      meta,
      options,
    )
  }
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta, options)
}
