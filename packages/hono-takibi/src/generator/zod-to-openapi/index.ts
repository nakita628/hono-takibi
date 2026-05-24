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
    /** Emit `z.coerce.X().pipe(z.Y()...)` for path/query/header primitives. */
    coerce?: boolean
    /** Append `.readonly()` to array/object schemas. */
    readonly?: boolean
    /** @internal Consumed by `wrap` for `.exactOptional()`; stripped before recursing. */
    isOptional?: boolean
  },
): string {
  const readonly = options?.readonly
  // `isOptional` is consumed at this level only.
  const childOptions =
    options?.isOptional === undefined
      ? options
      : (() => {
          const { isOptional: _, ...rest } = options
          return rest
        })()
  const isSingleSchema = (items: Schema | readonly Schema[] | boolean): items is Schema =>
    typeof items === 'object' && !Array.isArray(items)

  // JSON Schema 2020-12 §4.3.2: boolean schemas (true→z.any(), false→z.never()).
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
    // Precedence: x-allOf-message > x-error-message > Zod default.
    const allOfMessage = schema['x-allOf-message'] ?? schema['x-error-message']
    // JSON Schema 2020-12 §11.2: unevaluatedProperties runs on the raw input;
    // ZodIntersection strips excess keys before inline refines see them, so we
    // splice the check into a `z.unknown().check` wrapper that reads ctx.value.
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
        // Per-issue.code dispatch required: ctx.issues is a discriminated union.
        const isArrow = /^\s*\(.*?\)\s*=>/.test(allOfMessage)
        const msgExpr = isArrow ? `(${allOfMessage})(issue)` : JSON.stringify(allOfMessage)
        // Issue code order from Zod v4 source (zod/v4/core/errors.d.ts).
        // `satisfies` couples to `$ZodIssueCode` so renames break compile here.
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
    // Precedence: x-implication-message > x-anyOf-message > x-error-message.
    const anyOfMessage =
      schema['x-implication-message'] ?? schema['x-anyOf-message'] ?? schema['x-error-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    const unionZ = `z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`
    // JSON Schema 2020-12 §10: keywords combine via AND. Intersect with type-shape
    // when `properties`/`required` accompany `anyOf` so they aren't dropped.
    const hasShape =
      (schema.properties !== undefined && Object.keys(schema.properties).length > 0) ||
      (Array.isArray(schema.required) && schema.required.length > 0)
    if (hasShape) {
      const shapeSchema: Schema = {
        type: 'object',
        ...(schema.properties ? { properties: schema.properties } : {}),
        ...(schema.required ? { required: schema.required } : {}),
      }
      const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
      return wrap(`${unionZ}.and(${shapeZ})`, schema, meta, options)
    }
    return wrap(unionZ, schema, meta, options)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return wrap('z.any()', schema, meta, options)
    // ZodIntersection (allOf) incompatible with discriminatedUnion → fall back to xor.
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
    // Pure type-check → predicate; otherwise full Zod safeParse.
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
    // Non-primitive const → typeless-refine (deep-equal); z.custom<>() only checks type.
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
  // Typeless enum with non-primitive values → typeless-refine (deep-equal).
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
  // JSON Schema 2020-12 §6.5: `properties` w/o `type:object` only applies when value IS object.
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
      // Skip serialization of empty `{}` — would corrupt the subsequent comma-merge.
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
    // Per-mode messages: x-contains/min/maxContains-message; fall back to x-error-message.
    // minContains:0 makes lower-bound vacuous; path stays [] (cardinality, not element).
    const containsChain = (() => {
      if (!schema.contains) return ''
      const containsZod = schema.contains.$ref
        ? makeRef(schema.contains.$ref)
        : zodToOpenAPI(schema.contains, undefined, childOptions)
      // const minC = schema.minContains
      const fallback = schema['x-contains-message'] ?? arrayErrorMessage
      if (schema.minContains === undefined && schema.maxContains === undefined) {
        const messagePart = fallback ? `,message:${JSON.stringify(fallback)}` : ''
        return `.superRefine((arr,ctx)=>{const Schema=${containsZod};const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom"${messagePart}})}})`
      }
      // minContains defaults to 1; explicit 0 skips the lower-bound check.
      const effectiveMin = schema.minContains ?? 1
      const minContainsMessage = schema['x-minContains-message'] ?? fallback
      const minStmt =
        effectiveMin > 0
          ? (() => {
              const messagePart = minContainsMessage
                ? `,message:${JSON.stringify(minContainsMessage)}`
                : ''
              return `if(matched<${effectiveMin}){ctx.addIssue({code:"custom"${messagePart}})}`
            })()
          : undefined
      const maxContainsMessage = schema['x-maxContains-message'] ?? fallback
      const maxStmt =
        schema.maxContains !== undefined
          ? (() => {
              const messagePart = maxContainsMessage
                ? `,message:${JSON.stringify(maxContainsMessage)}`
                : ''
              return `if(matched>${schema.maxContains}){ctx.addIssue({code:"custom"${messagePart}})}`
            })()
          : undefined
      const stmts = [minStmt, maxStmt].filter((v): v is string => v !== undefined)
      if (stmts.length === 0) return ''
      return `.superRefine((arr,ctx)=>{const Schema=${containsZod};const matched=arr.filter((i)=>Schema.safeParse(i).success).length;${stmts.join(';')}})`
    })()
    // Per-slot message overrides preserve inner issue path/code/expected.
    // Length-cap forms (items:false / unevaluatedItems:false) use custom code.
    const prefixItemsMessage = schema['x-prefixItems-message'] ?? arrayErrorMessage
    const prefixItemsMessageOverride = prefixItemsMessage
      ? `,message:${JSON.stringify(prefixItemsMessage)}`
      : ''
    const itemsMessage = schema['x-items-message'] ?? arrayErrorMessage
    const itemsMessageOverride = itemsMessage ? `,message:${JSON.stringify(itemsMessage)}` : ''
    const unevaluatedItemsMessage = schema['x-unevaluatedItems-message'] ?? arrayErrorMessage
    const unevaluatedItemsMessageOverride = unevaluatedItemsMessage
      ? `,message:${JSON.stringify(unevaluatedItemsMessage)}`
      : ''
    const unevaluatedItemsChain = (() => {
      const ui = schema.unevaluatedItems
      if (ui === undefined || ui === true) return ''
      const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
      if (ui === false) {
        const slot = unevaluatedItemsMessage ?? arrayErrorMessage
        const messagePart = slot ? `,message:${JSON.stringify(slot)}` : ''
        return `.superRefine((arr,ctx)=>{for(let i=${prefixCount};i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]${messagePart}})}})`
      }
      const subZod = zodToOpenAPI(ui, undefined, childOptions)
      return `.superRefine((arr,ctx)=>{const Schema=${subZod};for(const [idx,val] of arr.slice(${prefixCount}).entries()){const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[${prefixCount}+idx,...issue.path]${unevaluatedItemsMessageOverride}})}}}})`
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
    const uniqueMessagePart = uniqueMessage ? `,message:${JSON.stringify(uniqueMessage)}` : ''
    const uniqueChain =
      schema.uniqueItems === true
        ? `.superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]${uniqueMessagePart}});else seen.set(key,i)}})`
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
      // JSON Schema 2020-12 §10.3.1.1 + §11.2: prefixItems does NOT constrain
      // length (incomplete prefixes pass); z.tuple requires fixed length so
      // we use z.array(z.unknown()).superRefine(...) instead. `unevaluatedItems`
      // wins over `items` per §11.2 when both are present.
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
      // Message slot tracks which keyword actually decided the cap/rest.
      const restFromUneval = uiSchema !== undefined
      const restMessageOverride = restFromUneval
        ? unevaluatedItemsMessageOverride
        : itemsMessageOverride
      const capFromUneval = ui === false
      const capSlotMessage = capFromUneval ? unevaluatedItemsMessage : itemsMessage
      const prefixCheck = `const Prefix=[${prefixCodes.join(',')}];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]${prefixItemsMessageOverride}})}}}`
      const restCheck = restCode
        ? `;const Rest=${restCode};for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]${restMessageOverride}})}}}`
        : ''
      const capSlot = capSlotMessage ?? arrayErrorMessage
      const capMessagePart = capSlot ? `,message:${JSON.stringify(capSlot)}` : ''
      const capCheck = lengthCapped
        ? `;for(let i=Prefix.length;i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]${capMessagePart}})}`
        : ''
      const arrayCtor = arrayErrorArg
        ? `z.array(z.unknown()${arrayErrorArg})`
        : 'z.array(z.unknown())'
      const z = `${arrayCtor}.superRefine((arr,ctx)=>{${prefixCheck}${restCheck}${capCheck}})`
      // length/unique/contains AFTER prefix superRefine; unevaluatedItems already inline.
      return wrap(
        `${z}${lengthChain}${uniqueChain}${containsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    }
    if (schema.items === false) {
      return wrap(`z.array(z.any()${arrayErrorArg}).length(0)${readonlyMod}`, schema, meta, options)
    }
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
