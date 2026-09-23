import {
  isDiscriminableBranch,
  isRefOnly,
  isSchemaArray,
  isSingleSchema,
} from '../../guard/index.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { makeRef } from '../../helper/openapi.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { wrap } from '../../helper/wrap.js'
import {
  emitTypelessRefine,
  hasTypelessConstraint,
  makeUnevaluatedPropertiesCheck,
} from '../../helper/zod.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { baseError, error, normalizeTypes } from '../../utils/index.js'
// oxlint-disable-next-line import/no-cycle -- the schema emitter and its per-type emitters recurse into each other
import { _enum, integer, number, object, string } from './z/index.js'

export function zodToOpenAPI(
  schema: Schema | boolean,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
  options?: {
    coerce?: boolean
    readonly?: boolean
    isOptional?: boolean
    schemas?: { readonly [k: string]: Schema }
  },
): string {
  const readonly = options?.readonly
  const childOptions =
    options?.isOptional === undefined
      ? options
      : (() => {
          const { isOptional: _, ...rest } = options
          return rest
        })()
  if (schema === undefined) throw new Error('Schema is undefined')
  if (schema === true) return wrap('z.any()', {}, meta, options)
  if (schema === false) return wrap('z.never()', {}, meta, options)
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta, options)
  }
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
    if (effectiveAllOf.length === 0) return wrap('z.any()', schema, meta, options)
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(
        (s) => s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1),
      )
    const nonNull = effectiveAllOf.filter(
      (s) => !(s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)),
    )
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
    const allOfMessage = schema['x-allOf-message'] ?? schema['x-error-message']
    const unevalCheck = makeUnevaluatedPropertiesCheck(
      { ...schema, allOf: effectiveAllOf },
      (s) => zodToOpenAPI(s, undefined, childOptions),
      schema['x-error-message'],
    )
    if (allOfMessage || unevalCheck) {
      const safeParseBranches = (() => {
        const isArrow = allOfMessage ? /^\s*\(.*?\)\s*=>/u.test(allOfMessage) : false
        const msgExpr = allOfMessage
          ? isArrow
            ? `(${allOfMessage})(issue)`
            : JSON.stringify(allOfMessage)
          : undefined
        const pushArg = msgExpr
          ? `{...issue,input:issue.input,message:${msgExpr}}`
          : '{...issue,input:issue.input}'
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
              `${i === 0 ? '' : 'else '}if(issue.code==='${c}'){ctx.issues.push(${pushArg})}`,
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
    const anyOfMessage =
      schema['x-implication-message'] ?? schema['x-anyOf-message'] ?? schema['x-error-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    const unionZ = `z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`
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
    const oneOfSchemas = schema.oneOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, undefined, childOptions),
    )
    const discriminator = schema.discriminator?.propertyName
    const oneOfMessage = schema['x-oneOf-message'] ?? schema['x-error-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    const branches = schema.oneOf.map((s) =>
      s.$ref === undefined
        ? s
        : isRefOnly(s) && s.$ref.startsWith('#/components/schemas/')
          ? options?.schemas?.[decodeURIComponent(s.$ref.slice('#/components/schemas/'.length))]
          : undefined,
    )
    const literalsPerBranch = branches.map((branch) => {
      if (discriminator === undefined || branch === undefined) return undefined
      if (!isDiscriminableBranch(branch, discriminator)) return undefined
      const property = branch.properties?.[discriminator]
      if (property === undefined || typeof property === 'boolean') return undefined
      return typeof property.const === 'string' ? [property.const] : (property.enum ?? [])
    })
    const literals = literalsPerBranch.flatMap((values) => values ?? [])
    const isDiscriminated =
      discriminator !== undefined &&
      branches.length >= 2 &&
      literalsPerBranch.every((values) => values !== undefined) &&
      new Set(literals).size === literals.length
    const alwaysMatching = branches.filter(
      (branch) =>
        branch !== undefined &&
        branch.allOf === undefined &&
        branch.anyOf === undefined &&
        branch.oneOf === undefined &&
        branch.not === undefined &&
        branch['x-refine'] === undefined &&
        branch['x-superRefine'] === undefined &&
        branch.type === 'object' &&
        !(Array.isArray(branch.required) && branch.required.length > 0) &&
        !(typeof branch.minProperties === 'number' && branch.minProperties > 0),
    )
    if (!isDiscriminated && alwaysMatching.length >= 2) {
      // oxlint-disable-next-line no-console -- the emitted validator would reject every payload
      console.warn(
        `oneOf rejects every payload: ${alwaysMatching.length} branches accept {}, so no input matches exactly one. Add a discriminator (a required literal property per branch plus \`discriminator\`), or use anyOf if the branches are meant to overlap.`,
      )
    }
    const z = isDiscriminated
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
          const bodies = predicates.map((v) => `(${v.replace(/^\(val\) => /u, '')})`)
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
    const literal = `z.literal(${JSON.stringify(value)}${errorArg})`
    const valueType = options?.coerce ? typeof value : undefined
    const z =
      valueType === 'number'
        ? `z.coerce.number().pipe(${literal})`
        : valueType === 'boolean'
          ? `z.stringbool().pipe(${literal})`
          : literal
    return wrap(z, schema, meta, options)
  }
  if (schema.enum !== undefined && schema.type === undefined) {
    const hasNonPrimitive = schema.enum.some(
      (member) => typeof member === 'object' && member !== null,
    )
    if (hasNonPrimitive) {
      return wrap(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
        schema,
        meta,
        options,
      )
    }
  }
  if (schema.enum !== undefined) {
    const enumZ = _enum(schema)
    const [first, ...rest] = schema.enum
    const memberType =
      options?.coerce && first !== undefined && rest.every((m) => typeof m === typeof first)
        ? typeof first
        : undefined
    const z =
      memberType === 'number'
        ? `z.coerce.number().pipe(${enumZ})`
        : memberType === 'boolean'
          ? `z.stringbool().pipe(${enumZ})`
          : enumZ
    return wrap(z, schema, meta, options)
  }
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
  if (schema.properties !== undefined) {
    const needsDefaultRequired =
      schema.required === undefined &&
      Object.keys(schema.properties).length > 0 &&
      typeof schema.additionalProperties !== 'object' &&
      schema.oneOf === undefined &&
      schema.anyOf === undefined &&
      schema.allOf === undefined &&
      schema.not === undefined
    return wrap(
      object(schema, childOptions),
      needsDefaultRequired ? { ...schema, required: [] } : schema,
      meta,
      options,
    )
  }
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
    const arg = baseError(errorMessage, xCoerce ? undefined : requiredMessage)
    if (xStringbool !== undefined) {
      const opts = xStringbool === true ? null : xStringbool
      const optsObj = opts
        ? {
            ...(opts.truthy !== undefined ? { truthy: opts.truthy } : {}),
            ...(opts.falsy !== undefined ? { falsy: opts.falsy } : {}),
            ...(opts.case !== undefined ? { case: opts.case } : {}),
          }
        : null
      const optsStr = optsObj && Object.keys(optsObj).length > 0 ? JSON.stringify(optsObj) : ''
      const combinedArg =
        optsStr && arg ? `${optsStr.slice(0, -1)},${arg.slice(1)}` : optsStr || arg
      const base = combinedArg ? `z.stringbool(${combinedArg})` : 'z.stringbool()'
      return wrap(base, schema, meta, options)
    }
    const baseFn = xCoerce ? 'z.coerce.boolean' : options?.coerce ? 'z.stringbool' : 'z.boolean'
    const base = arg ? `${baseFn}(${arg})` : `${baseFn}()`
    return wrap(base, schema, meta, options)
  }
  if (t.includes('array')) {
    const readonlyMod = readonly ? '.readonly()' : ''
    const arrayErrorMessage = schema['x-error-message']
    const arrayErrorArg = arrayErrorMessage ? `,${error(arrayErrorMessage)}` : ''
    const containsChain = (() => {
      if (!schema.contains) return ''
      const containsZod = schema.contains.$ref
        ? makeRef(schema.contains.$ref)
        : zodToOpenAPI(schema.contains, undefined, childOptions)
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
      const prefixCodes = schema.prefixItems.map((item: Schema) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, undefined, childOptions),
      )
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
        : isSchemaArray(schema.items)
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
    if (typeof schema.minItems === 'number') {
      return wrap(
        `${z}.min(${schema.minItems}${minErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    }
    if (typeof schema.maxItems === 'number') {
      return wrap(
        `${z}.max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
        meta,
        options,
      )
    }
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
    const dateFn = options?.coerce ? 'z.coerce.date' : 'z.date'
    const base = errorMessage ? `${dateFn}(${error(errorMessage)})` : `${dateFn}()`
    return wrap(base, schema, meta, options)
  }
  if (t.length === 1 && t[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return wrap(base, schema, meta, options)
  }
  if (t.length === 0 && hasTypelessConstraint(schema)) {
    return wrap(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
      meta,
      options,
    )
  }
  // oxlint-disable-next-line no-console -- warns the user that a schema fell back to z.any()
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta, options)
}
