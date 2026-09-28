import {
  isDiscriminableBranch,
  isRefOnly,
  isSchemaArray,
  isSingleSchema,
} from '../../guard/index.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { makeRef } from '../../helper/openapi.js'
import {
  needsWireConversion,
  FORM_ARITY,
  hasSeveralReadings,
  JSON_BIGINT,
  isDecoratedRef,
  resolveSchemaRef,
  WIRE_JSON,
  wireConverter,
  wireKeep,
  wireKinds,
  wrapWire,
} from '../../helper/wire.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { undecorated, wrap } from '../../helper/wrap.js'
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
    /**
     * The value arrives as text (a path, query, header or cookie parameter), so whatever is
     * not a string is read from text before it is validated.
     */
    coerce?: boolean
    /** The value arrives as one JSON document (`content: application/json`). @internal */
    json?: boolean
    /**
     * The value is a field of a form body (`application/x-www-form-urlencoded`,
     * `multipart/form-data`), set together with `coerce`. Nothing describes a form body
     * but the schema itself, so what reads the text has to be something the document looks
     * through: a converter, where a parameter takes `z.stringbool()`. A field sent once
     * arrives as a bare string, so an array accepts both arities. @internal
     */
    form?: boolean
    /** What reads the parameter before its serialisation is undone. @internal */
    readers?: readonly string[]
    /** An empty value is read as an absent one (`allowEmptyValue: true`). @internal */
    emptyAbsent?: boolean
    /** The references inlined on the way here, to stop at a cycle. @internal */
    wireRefs?: readonly string[]
    readonly?: boolean
    isOptional?: boolean
    schemas?: { readonly [k: string]: Schema }
  },
): string {
  if (schema === undefined) throw new Error('Schema is undefined')
  if (schema === true) return wrap('z.any()', {}, meta, options)
  if (schema === false) return wrap('z.never()', {}, meta, options)
  // A scalar is read from text once, around the whole schema, and everything inside is
  // emitted as for a typed value. Converting per branch instead leaves the branches of an
  // `allOf` with different outputs ("10" and 10), which Zod cannot merge, and lets a
  // `oneOf` of integer and string match the same text twice.
  const wire = (() => {
    if (options?.json === true) {
      return (zod: string, _component = false) => `z.preprocess(${WIRE_JSON},${zod})`
    }
    if (options?.coerce !== true) return undefined
    const kinds = wireKinds(schema, options.schemas)
    if (kinds === undefined) return undefined
    const isBooleanLeaf =
      normalizeTypes(schema.type).includes('boolean') &&
      schema.enum === undefined &&
      schema.const === undefined &&
      schema.not === undefined
    const form = options.form === true
    // `z.stringbool()` is the boolean schema itself; it takes the text as it is.
    if (!form && isBooleanLeaf && kinds.length === 1 && kinds[0] === 'boolean') return undefined
    return wrapWire('', kinds) === ''
      ? undefined
      : (zod: string, component = false) => wrapWire(zod, kinds, component || form)
  })()
  // Tried as several readings, the component is handed to each of them: what describes the
  // parameter then belongs around them, not on the component.
  const isTriedSeveralWays =
    options?.coerce === true &&
    options.json !== true &&
    hasSeveralReadings(wireKinds(schema, options.schemas) ?? [])
  const effective: typeof options =
    wire === undefined || options === undefined
      ? options
      : (() => {
          const { coerce: _coerce, json: _json, form: _form, ...rest } = options
          return rest
        })()
  const readonly = effective?.readonly
  const childOptions: typeof options =
    effective?.isOptional === undefined &&
    effective?.readers === undefined &&
    effective?.emptyAbsent === undefined
      ? effective
      : (() => {
          const { isOptional: _, readers: _readers, emptyAbsent: _emptyAbsent, ...rest } = effective
          return rest
        })()
  // Whether what is emitted here takes its value from a JSON document: a body, a response,
  // a component — everything the wire reader above does not hand a value it has read.
  const isJson = wire === undefined || options?.json === true
  const isBigintFormat =
    normalizeTypes(schema.type).includes('integer') &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint') &&
    schema['x-coerce'] !== true
  const done = (zod: string, emitted: Schema, named = false) => {
    const component = named && !isTriedSeveralWays
    const isFormArray = effective?.form === true && normalizeTypes(emitted.type).includes('array')
    const around =
      wire !== undefined
        ? (core: string) => wire(core, component)
        : isFormArray
          ? (core: string) => `z.preprocess(${FORM_ARITY},${core})`
          : undefined
    return wrap(zod, emitted, meta, {
      ...(options?.isOptional === undefined ? {} : { isOptional: options.isOptional }),
      ...(around === undefined ? {} : { around }),
      ...(component ? { component } : {}),
      ...(options?.readers === undefined ? {} : { readers: options.readers }),
      ...(options?.emptyAbsent === true ? { emptyAbsent: true } : {}),
    })
  }
  // A bare reference is emitted as its identifier — except on the wire, where the
  // component it names was written for a typed value and has to be read from text first.
  const child = (s: Schema) =>
    childOptions?.coerce !== true && isRefOnly(s)
      ? makeRef(s.$ref ?? '')
      : zodToOpenAPI(s, undefined, childOptions)
  const referenced = (s: Schema) =>
    childOptions?.coerce !== true && s.$ref
      ? makeRef(s.$ref)
      : zodToOpenAPI(s, undefined, childOptions)
  if (schema.$ref !== undefined) {
    // A parameter that decorates the component it names — a default, `null` — is emitted as
    // the component written out, with the decoration beside it.
    if (meta?.parameters !== undefined && options?.coerce === true && isDecoratedRef(schema)) {
      const target = resolveSchemaRef(schema.$ref, options.schemas)
      const inlined = options.wireRefs ?? []
      if (target !== undefined && !inlined.includes(schema.$ref)) {
        const { $ref: _ref, ...beside } = schema
        return zodToOpenAPI({ ...target, ...beside }, meta, {
          ...options,
          wireRefs: [...inlined, schema.$ref],
        })
      }
    }
    // An array or an object behind a reference cannot be converted from outside, so the
    // component is emitted in place, reading text where it has to.
    if (wire === undefined && effective?.coerce === true) {
      const target = resolveSchemaRef(schema.$ref, effective.schemas)
      const inlined = effective.wireRefs ?? []
      if (
        target !== undefined &&
        !inlined.includes(schema.$ref) &&
        needsWireConversion(schema, effective.schemas)
      ) {
        return zodToOpenAPI(target, meta, { ...options, wireRefs: [...inlined, schema.$ref] })
      }
    }
    return done(makeRef(schema.$ref), schema, true)
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
    if (effectiveAllOf.length === 0) return done('z.any()', schema)
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(
        (s) => s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1),
      )
    const nonNull = effectiveAllOf.filter(
      (s) => !(s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)),
    )
    if (nonNull.length === 0) return done('z.any()', { ...schema, nullable })
    const schemas = nonNull.map(child)
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return done(schemas[0], { ...schema, nullable }, true)
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
      return done(wrapped, { ...schema, nullable })
    }
    // One reference and nothing to intersect it with: what is emitted is the component.
    return done(z, { ...schema, nullable }, schemas.length === 1 && nonNull.every(isRefOnly))
  }
  if (schema.anyOf !== undefined) {
    if (schema.anyOf.length === 0) return done('z.any()', schema)
    const anyOfSchemas = schema.anyOf.map(child)
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
      return done(`${unionZ}.and(${shapeZ})`, schema)
    }
    return done(unionZ, schema)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return done('z.any()', schema)
    const oneOfSchemas = schema.oneOf.map(child)
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
    return done(z, schema)
  }
  if (schema.not !== undefined) {
    const notMessage = schema['x-not-message'] ?? schema['x-error-message']
    const notErrorArg = notMessage ? `,${error(notMessage)}` : ''
    // `not` excludes values from what the rest of the schema accepts, so the keywords
    // beside it still apply: `type: integer, not: { const: 0 }` is an integer other than 0,
    // not anything other than 0. What `wrap` adds around a schema is left to the outer one.
    const notBase = (() => {
      const types = normalizeTypes(schema.type).filter((type) => type !== 'null')
      const [first, ...others] = types
      if (first === undefined) return 'z.any()'
      const { not: _not, ...rest } = undecorated(schema)
      return zodToOpenAPI(
        { ...rest, type: others.length === 0 ? first : [first, ...others] },
        undefined,
        childOptions,
      )
    })()
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
      return done(
        `${notBase}.refine((val) => !${refName}.safeParse(val).success${notErrorArg})`,
        schema,
      )
    }
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(val) => val !== ${value}`
      return done(`${notBase}.refine(${predicate}${notErrorArg})`, schema)
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
          return done(`${notBase}.refine(${predicate}${notErrorArg})`, schema)
        }
      }
      if (isPureMultiType && Array.isArray(not.type)) {
        const predicates = not.type.map((t) => typePredicates[t]).filter((v) => v !== undefined)
        if (predicates.length > 0) {
          const bodies = predicates.map((v) => `(${v.replace(/^\(val\) => /u, '')})`)
          const combined = `(val) => ${bodies.join(' && ')}`
          return done(`${notBase}.refine(${combined}${notErrorArg})`, schema)
        }
      }
      if (isPureEnum && Array.isArray(not.enum)) {
        const list = JSON.stringify(not.enum)
        const predicate = `(val) => !${list}.includes(val)`
        return done(`${notBase}.refine(${predicate}${notErrorArg})`, schema)
      }
      if (onlyKeys.length === 1 && onlyKeys[0] === 'const') {
        const value = JSON.stringify(not.const)
        const predicate = `(val) => val !== ${value}`
        return done(`${notBase}.refine(${predicate}${notErrorArg})`, schema)
      }
      // Empty schema {} matches everything → not {} matches nothing.
      if (onlyKeys.length === 0) {
        return done(`z.never(${notErrorArg.slice(1)})`, schema)
      }
      // Complex sub-schema: full safeParse-based check
      const zod = zodToOpenAPI(not, undefined, childOptions)
      return done(
        `${notBase}.refine((val) => !${zod}.safeParse(val).success${notErrorArg})`,
        schema,
      )
    }
    return done(notBase, schema)
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
      return done(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
        schema,
      )
    }
    const literal =
      typeof value === 'number' && isBigintFormat && Number.isInteger(value)
        ? `z.literal(${value}n${errorArg})`
        : `z.literal(${JSON.stringify(value)}${errorArg})`
    return done(
      isJson && isBigintFormat && typeof value === 'number'
        ? `z.preprocess(${JSON_BIGINT},${literal})`
        : literal,
      schema,
    )
  }
  if (schema.enum !== undefined && schema.type === undefined) {
    const hasNonPrimitive = schema.enum.some(
      (member) => typeof member === 'object' && member !== null,
    )
    if (hasNonPrimitive) {
      return done(
        emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
        schema,
      )
    }
  }
  if (schema.enum !== undefined) {
    const members = _enum(schema)
    return done(
      isJson && isBigintFormat && schema.enum.some((member) => typeof member === 'number')
        ? `z.preprocess(${JSON_BIGINT},${members})`
        : members,
      schema,
    )
  }
  if (
    schema.properties !== undefined &&
    schema.type === undefined &&
    hasTypelessConstraint(schema)
  ) {
    return done(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
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
    return done(
      object(schema, childOptions),
      needsDefaultRequired ? { ...schema, required: [] } : schema,
    )
  }
  const t = normalizeTypes(schema.type)
  // `type: [integer, string]` accepts a value of either type, so it is a union of what each
  // type emits. The keywords are handed to every branch, which reads the ones of its type.
  const alternatives = t.filter((type) => type !== 'null')
  if (alternatives.length > 1) {
    const { type: _type, ...rest } = undecorated(schema)
    const branches = alternatives.map((type) =>
      zodToOpenAPI({ ...rest, type }, undefined, childOptions),
    )
    return done(`z.union([${branches.join(',')}])`, schema)
  }
  if (t.includes('string')) return done(string(schema, childOptions), schema)
  if (t.includes('number')) return done(number(schema), schema)
  if (t.includes('integer')) return done(integer(schema, { json: isJson }), schema)
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
      return done(base, schema)
    }
    const baseFn = xCoerce ? 'z.coerce.boolean' : effective?.coerce ? 'z.stringbool' : 'z.boolean'
    const base = arg ? `${baseFn}(${arg})` : `${baseFn}()`
    return done(base, schema)
  }
  if (t.includes('array')) {
    const readonlyMod = readonly ? '.readonly()' : ''
    const arrayErrorMessage = schema['x-error-message']
    const arrayErrorArg = arrayErrorMessage ? `,${error(arrayErrorMessage)}` : ''
    const containsChain = (() => {
      if (!schema.contains) return ''
      const containsZod = referenced(schema.contains)
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
      // A tuple is validated element by element inside a refinement, which checks a value
      // without replacing it. On the wire each element is therefore read from text by its
      // position first, and the tuple is emitted as for typed values.
      const prefixWire = (() => {
        if (childOptions?.coerce !== true) return undefined
        const tail =
          schema.unevaluatedItems !== undefined && typeof schema.unevaluatedItems === 'object'
            ? schema.unevaluatedItems
            : schema.items !== undefined &&
                typeof schema.items !== 'boolean' &&
                isSingleSchema(schema.items)
              ? schema.items
              : undefined
        // Inside `z.preprocess` the parameter is typed by its position; in a list of
        // converters it is not, so it says what it is.
        const read = (s: Schema) => {
          const kinds = wireKinds(s, childOptions.schemas)
          if (kinds === undefined) return undefined
          const converter = wireConverter(kinds, wireKeep(s, childOptions.schemas))
          return converter === undefined
            ? '(val:unknown)=>val'
            : converter.replace('(val)=>', '(val:unknown)=>')
        }
        const heads = schema.prefixItems.map(read)
        const rest = tail === undefined ? '(val:unknown)=>val' : read(tail)
        if (rest === undefined || heads.includes(undefined)) return undefined
        return `(val)=>{if(!Array.isArray(val))return val;const prefix=[${heads.join(',')}];const rest=${rest};return val.map((item,i)=>(prefix[i]??rest)(item))}`
      })()
      const typed = (s: Schema) => {
        const { coerce: _coerce, form: _form, ...typedOptions } = childOptions ?? {}
        return s.$ref ? makeRef(s.$ref) : zodToOpenAPI(s, undefined, typedOptions)
      }
      const prefixCodes = schema.prefixItems.map((item: Schema) =>
        prefixWire === undefined ? referenced(item) : typed(item),
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
        ? prefixWire === undefined
          ? referenced(restSchema)
          : typed(restSchema)
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
      const tuple = `${z}${lengthChain}${uniqueChain}${containsChain}${readonlyMod}`
      return done(prefixWire === undefined ? tuple : `z.preprocess(${prefixWire},${tuple})`, schema)
    }
    if (schema.items === false) {
      return done(`z.array(z.any()${arrayErrorArg}).length(0)${readonlyMod}`, schema)
    }
    const itemSchema: Schema | undefined =
      schema.items === true
        ? undefined
        : isSchemaArray(schema.items)
          ? schema.items[0]
          : schema.items
    const item = itemSchema ? referenced(itemSchema) : 'z.any()'
    const z = `z.array(${item}${arrayErrorArg})`
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? done(
            `${z}.length(${schema.minItems}${sizeErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
          )
        : done(
            `${z}.min(${schema.minItems}${minErrorArg}).max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
            schema,
          )
    }
    if (typeof schema.minItems === 'number') {
      return done(
        `${z}.min(${schema.minItems}${minErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
      )
    }
    if (typeof schema.maxItems === 'number') {
      return done(
        `${z}.max(${schema.maxItems}${maxErrorArg})${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`,
        schema,
      )
    }
    return done(`${z}${uniqueChain}${containsChain}${unevaluatedItemsChain}${readonlyMod}`, schema)
  }
  if (t.includes('object')) return done(object(schema, childOptions), schema)
  if (t.includes('date')) {
    const errorMessage = schema['x-error-message']
    const dateFn = effective?.coerce ? 'z.coerce.date' : 'z.date'
    const base = errorMessage ? `${dateFn}(${error(errorMessage)})` : `${dateFn}()`
    return done(base, schema)
  }
  if (t.length === 1 && t[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return done(base, schema)
  }
  if (t.length === 0 && hasTypelessConstraint(schema)) {
    return done(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
    )
  }
  // oxlint-disable-next-line no-console -- warns the user that a schema fell back to z.any()
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return done('z.any()', schema)
}
