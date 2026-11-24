import {
  hasMimeAlternatives,
  hasTypelessConstraint,
  isAnnotationOnly,
  isBinaryFile,
  isRecord,
  isRefOnly,
  isSchemaArray,
  isSingleSchema,
  isUntypedObject,
} from '../../guard/index.js'
import { discriminatedBranches, inheritedBase } from '../../helper/discriminator.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { makeRef } from '../../helper/openapi.js'
import {
  FORM_ARITY,
  JSON_BIGINT,
  WIRE_JSON,
  hasSeveralReadings,
  isDecoratedRef,
  nullReading,
  needsWireConversion,
  resolveSchemaRef,
  makeWireConverter,
  wireKeep,
  wireKinds,
  makeWrappedWire,
} from '../../helper/wire.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { conformDefault, schemaList, undecorated, valueLiteral, wrap } from '../../helper/wrap.js'
import {
  emitObjectShapeCheck,
  emitObjectShapeRefine,
  emitTypelessRefine,
  isRestEvaluated,
  narrowToDeclaredType,
  emitsStrippingObject,
  isAskedOperand,
  isConstOutsideType,
  makeConditionalCheck,
  makeIssueForwarding,
  makeSiblingKeywordCheck,
  makeParentStrictCheck,
  makeSiblingCombinatorCheck,
  makeStrictOperandCheck,
  makeUnevaluatedPropertiesCheck,
  canAcceptObject,
  canAdmitNullOrUndefined,
  hasOwnWrapping,
  isShapeMember,
  requiresObject,
} from '../../helper/zod.js'
import type { RawCheck } from '../../helper/zod.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import {
  baseError,
  error,
  issueMessage,
  makeStringLiteral,
  normalizeTypes,
} from '../../utils/index.js'
// oxlint-disable-next-line import/no-cycle -- the schema emitter and its per-type emitters recurse into each other
import { _enum, integer, number, object, string } from './z/index.js'

// Wrap an emission with a check on the raw input: the `unevaluatedProperties`
// check of a union (#466), the sibling shape that could not be distributed
// (#461), the message and `unevaluatedProperties` of an `allOf`, the
// `additionalProperties: false` of an intersection operand (#470), the
// combinators beside the emitted one (#469).
// `z.preprocess` runs on the raw input — a `.superRefine` on the schema would
// see the parsed output, from which a stripping object branch had already
// dropped the keys the check is about — and `@hono/zod-openapi` renders it by
// its output side, so the generated OpenAPI document keeps the schema (a
// `z.unknown().check(...).pipe(Schema)` renders by its input side, i.e. `{}`,
// #479). No issue forwarding is needed: the pipe stops once the preprocess
// callback adds an issue, and when the check adds none the schema runs and
// reports its own errors. Returns `zod` unchanged when the check is ''
// (nothing to check), so schemas without it emit exactly what they did.
// The `unevaluatedProperties` check itself only reports when the union
// succeeds — it counts the branch matches its own branch-match `safeParse`
// calls already decide (see `makeUnevaluatedPropertiesCheck`) — so no
// separate success-gate parse is needed for it: a gate would re-parse the
// whole value, and on a recursive schema each level would pay gate + pipe +
// branch-match, i.e. ~3^depth (#480).
// `val` is typed as the schema's input type (`z.input<typeof Schema>`) so
// `z.input` of the wrapped schema stays that type instead of degrading to
// `unknown` — an untyped callback would make RPC clients lose the request
// type. The output type is unchanged.
// A check that parses a schema of the document comes with an asynchronous form
// (`RawCheck.async`): `safeParse` throws when that schema has an asynchronous
// refinement, which a `safeParseAsync` of the whole schema would otherwise have
// handled. The check is then run again, awaited — what it had reported so far is
// taken back first — and the callback answers with a promise, which only an
// asynchronous parse reaches.
// `declarations` are statements put before `Schema`: an operand the check parses
// is declared once and named in both, instead of being built again on every parse.
function withRawCheck(
  zod: string,
  check: string | RawCheck | undefined,
  declarations: readonly string[] = [],
): string {
  const raw = typeof check === 'string' ? { sync: check } : check
  if (raw === undefined || raw.sync === '') return zod
  if (raw.async === undefined) {
    return withRawStatements(zod, `(${raw.sync})(ctx)`, declarations)
  }
  return `(()=>{${declarations.join('')}const Schema=${zod};return z.preprocess((val: z.input<typeof Schema>,ctx)=>{const reported=ctx.issues.length;try{(${raw.sync})(ctx)}catch(error){if(!(error instanceof z.core.$ZodAsyncError))throw error;ctx.issues.length=reported;return (${raw.async})(ctx).then(()=>val)}return val},Schema)})()`
}

// The same wrapper around statements that read `ctx` and `Schema` themselves:
// the `allOf` message, which parses the intersection to report its issues again.
function withRawStatements(
  zod: string,
  statements: string,
  declarations: readonly string[] = [],
): string {
  return `(()=>{${declarations.join('')}const Schema=${zod};return z.preprocess((val: z.input<typeof Schema>,ctx)=>{${statements};return val},Schema)})()`
}

/**
 * Whether a schema is a reference with nothing beside it that constrains a value: the
 * `$ref` alone, or with the annotations `title` and `description`.
 */
function isAnnotatedRef(schema: Schema): schema is Schema & { readonly $ref: string } {
  return (
    typeof schema.$ref === 'string' &&
    Object.keys(schema).every((key) => key === '$ref' || key === 'title' || key === 'description')
  )
}

/** Whether a value is an object or an array: one that `===` compares by reference. */
function isStructured(value: unknown) {
  return typeof value === 'object' && value !== null
}

// The keywords beside a combinator that the document states (#598): those of them a
// Schema Object has. The check on the raw input holds the others as well.
const STATED_SIBLING_KEYWORDS = new Set([
  'minLength',
  'maxLength',
  'pattern',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'multipleOf',
  'minItems',
  'maxItems',
  'uniqueItems',
  'items',
  'prefixItems',
  'minProperties',
  'maxProperties',
  'enum',
  'const',
])

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
    /** What the request object inherits is read as an absent value. @internal */
    inheritedAbsent?: boolean
    /** The references inlined on the way here, to stop at a cycle. @internal */
    wireRefs?: readonly string[]
    readonly?: boolean
    isOptional?: boolean
    schemas?: { readonly [k: string]: Schema }
  },
): string {
  if (schema === true) return wrap('z.any()', {}, meta, options)
  if (schema === false) return wrap('z.never()', {}, meta, options)
  // A scalar is read from text once, around the whole schema, and everything inside is
  // emitted as for a typed value. Converting per branch instead leaves the branches of an
  // `allOf` with different outputs ("10" and 10), which Zod cannot merge, and lets a
  // `oneOf` of integer and string match the same text twice.
  const nullRead =
    options?.coerce === true && options.json !== true
      ? nullReading(schema, options.schemas)
      : undefined
  const wire = (() => {
    if (options?.json === true) {
      return (zod: string, _component = false, _nullLast = false) =>
        `z.preprocess(${WIRE_JSON},${zod})`
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
    return makeWrappedWire('', kinds) === ''
      ? undefined
      : // `z.stringbool()` takes text alone: a `null` read before it is handed to a converter.
        (zod: string, component = false, nullLast = false) =>
          makeWrappedWire(zod, kinds, component || form || nullRead !== undefined, nullLast)
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
    effective?.emptyAbsent === undefined &&
    effective?.inheritedAbsent === undefined
      ? effective
      : (() => {
          const {
            isOptional: _,
            readers: _readers,
            emptyAbsent: _emptyAbsent,
            inheritedAbsent: _inheritedAbsent,
            ...rest
          } = effective
          return rest
        })()
  // Whether what is emitted here takes its value from a JSON document: a body, a response,
  // a component — everything the wire reader above does not hand a value it has read.
  const isJson = wire === undefined || options?.json === true
  const isBigintFormat =
    normalizeTypes(schema.type).includes('integer') &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint') &&
    schema['x-coerce'] !== true
  // The file's `anyOf` of media types is not a combinator (see the `anyOf` path).
  const isMimeAnyOf = isBinaryFile(schema) && hasMimeAlternatives(schema)
  // The combinators beside the one the paths below emit (#469). Sibling
  // keywords are ANDed (JSON Schema 2020-12), so every one of them has to
  // hold, but each path emits one combinator: `allOf` first, then `anyOf`, then
  // `oneOf`, and `not` only when none of them is there. The others are checked
  // on the raw input, around what the path emits (see
  // `makeSiblingCombinatorCheck`), and the `anyOf` / `oneOf` among them are
  // stated in the document beside the emitted one, as the source has them.
  // Nothing is written beside a `$ref`: the component is emitted as it is.
  const hasAnyOf = schema.anyOf !== undefined && !isMimeAnyOf
  // The combinator the paths below emit; none beside a `$ref`, which is emitted alone.
  const emittedCombinator =
    schema.$ref !== undefined
      ? undefined
      : schema.allOf !== undefined
        ? 'allOf'
        : hasAnyOf
          ? 'anyOf'
          : schema.oneOf !== undefined
            ? 'oneOf'
            : undefined
  const siblings: readonly ('anyOf' | 'oneOf' | 'not')[] =
    emittedCombinator === undefined
      ? []
      : [
          ...(emittedCombinator === 'allOf' && hasAnyOf && (schema.anyOf ?? []).length > 0
            ? (['anyOf'] as const)
            : []),
          ...(emittedCombinator !== 'oneOf' && schema.oneOf !== undefined && schema.oneOf.length > 0
            ? (['oneOf'] as const)
            : []),
          ...(schema.not === undefined ? [] : (['not'] as const)),
        ]
  // `additionalProperties: false` beside a combinator applies to the keys the schema
  // itself declares, not to those of the members or the branches (JSON Schema
  // 2020-12): no path below emits it — the sibling shape is a plain object — so
  // the keys are checked on the raw input, and the keyword is stated in the
  // document (see `makeParentStrictCheck`).
  const parentStrict = emittedCombinator === undefined ? undefined : makeParentStrictCheck(schema)
  // The validation keywords beside a combinator (`maxLength` beside `anyOf`, #598): no
  // path below reads them — each emits the combinator alone — so they are checked on the
  // raw input, and stated in the document (see `makeSiblingKeywordCheck`). A `not` with no
  // declared type is emitted on `z.any()`, which reads none of them either. Beside a
  // declared type that is not an object, `if` / `then` / `else` is the one keyword the
  // typed emitters do not read (see `makeConditionalCheck`); a `not` or several types hand
  // the keywords on to the schemas they emit, which check it themselves.
  const declared = normalizeTypes(schema.type).filter((type) => type !== 'null')
  const besideCombinator =
    emittedCombinator !== undefined ||
    (schema.$ref === undefined && schema.not !== undefined && declared.length === 0)
  const keywordCheck =
    schema.$ref !== undefined
      ? undefined
      : besideCombinator
        ? makeSiblingKeywordCheck(schema, (s) => zodToOpenAPI(s, undefined, childOptions))
        : schema.not === undefined && declared.length === 1 && declared[0] !== 'object'
          ? makeConditionalCheck(schema, (s) => zodToOpenAPI(s, undefined, childOptions))
          : undefined
  const isWrapped = siblings.length > 0 || parentStrict !== undefined || keywordCheck !== undefined
  const withSiblings = (zod: string) => {
    if (!isWrapped) return zod
    const checked = withRawCheck(
      withRawCheck(
        withRawCheck(
          zod,
          makeSiblingCombinatorCheck(schema, siblings, (s) =>
            zodToOpenAPI(s, undefined, childOptions),
          ),
        ),
        parentStrict,
      ),
      keywordCheck,
    )
    // The keywords the check holds, as the document states them: `wrap` leaves them out of
    // `.openapi()` as said by the schema, and here nothing in the schema says them.
    const statedKeywords = (() => {
      if (!besideCombinator || keywordCheck === undefined) return []
      const literal = schemaList(
        [
          Object.fromEntries(
            Object.entries(schema).filter(([key]) => STATED_SIBLING_KEYWORDS.has(key)),
          ),
        ],
        childOptions?.schemas,
      )
      // `[{...}]`: the fields of the one schema in the list.
      const fields = literal?.slice(2, -2) ?? ''
      return fields === '' ? [] : [fields]
    })()
    // A sibling list that only repeats a reference the emitted combinator has says nothing
    // the emitted schema does not: `oneOf: [{ $ref: X }]` beside `allOf: [{ $ref: X }]`
    // (NestJS Swagger). It is not stated: every reference in a stated list is written out
    // as the component it names, a copy for each reference at each level, which doubles
    // the literal with every level (#510). Nor is a list that copies too much out of the
    // components (`schemaList`). Either is still checked on the raw input.
    const emittedRefs = new Set(
      (emittedCombinator === undefined ? [] : (schema[emittedCombinator] ?? [])).flatMap((sub) =>
        isAnnotatedRef(sub) ? [sub.$ref] : [],
      ),
    )
    const repeatsEmitted = (key: 'anyOf' | 'oneOf' | 'not', list: readonly Schema[]) =>
      emittedCombinator === 'allOf' &&
      (key === 'oneOf' ? list.length === 1 : true) &&
      list.some((sub) => isAnnotatedRef(sub) && emittedRefs.has(sub.$ref))
    const stated = [
      ...siblings.flatMap((key) => {
        const list = key === 'not' ? undefined : schema[key]
        if (list === undefined || repeatsEmitted(key, list)) return []
        const literal = schemaList(list, childOptions?.schemas)
        return literal === undefined ? [] : [`${key}:${literal}`]
      }),
      ...(parentStrict === undefined ? [] : ['additionalProperties:false']),
      ...statedKeywords,
    ]
    return stated.length === 0 ? checked : `${checked}.openapi({${stated.join(',')}})`
  }
  const done = (emittedZod: string, emitted: Schema, isNamed = false) => {
    const zod = withSiblings(emittedZod)
    const named = isNamed && !isWrapped
    const component = named && !isTriedSeveralWays
    const isFormArray = effective?.form === true && normalizeTypes(emitted.type).includes('array')
    // Text tried as several readings is tried as `null` among them, the last of all. That is
    // inside `.nullable()`, so a schema that declares `null` is handed it from outside.
    const nullInside =
      nullRead === 'last' &&
      wire !== undefined &&
      emitted.nullable !== true &&
      !normalizeTypes(emitted.type).includes('null')
    const around =
      wire !== undefined
        ? (core: string) => wire(core, component, nullInside)
        : isFormArray
          ? (core: string) => `z.preprocess(${FORM_ARITY},${core})`
          : undefined
    return wrap(zod, emitted, meta, {
      ...(options?.isOptional === undefined ? {} : { isOptional: options.isOptional }),
      ...(around === undefined ? {} : { around }),
      ...(component ? { component } : {}),
      ...(options?.readers === undefined ? {} : { readers: options.readers }),
      ...(options?.emptyAbsent === true ? { emptyAbsent: true } : {}),
      ...(options?.inheritedAbsent === true ? { inheritedAbsent: true } : {}),
      ...(nullRead === undefined || nullInside ? {} : { nullRead }),
      ...(options?.schemas === undefined ? {} : { schemas: options.schemas }),
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
  // A branch intersected with the sibling shape. A branch that is a strict
  // object would no longer reject the keys it does not declare — the shape
  // beside it strips them, and the intersection reports a key only when both
  // sides reject it — so its `additionalProperties: false` is checked on the
  // raw input, around the intersection (#470, see `makeStrictOperandCheck`).
  const intersected = (branch: Schema, shapeZ: string) => {
    const branchZ = child(branch)
    // A branch the check has to parse is declared once, for the check and the
    // intersection both.
    const isAsked = isAskedOperand(branch, childOptions?.schemas)
    const operand = isAsked ? 'Operand' : branchZ
    return withRawCheck(
      `${operand}.and(${shapeZ})`,
      makeStrictOperandCheck([{ schema: branch, zod: operand }], childOptions?.schemas),
      isAsked ? [`const Operand=${branchZ};`] : [],
    )
  }
  // Distribute a sibling shape (#461) into a combinator branch, as the maintainer
  // asked: a branch that only accepts objects gets the shape as an intersection
  // member (`.and(shapeZ)`) — that merges the sibling properties into the
  // inferred type, keeps them in the parsed output, and keeps the branch in the
  // document. A branch that also accepts other values gets the shape as a guarded
  // refine on the branch itself, which is safe only when the branch passes objects
  // through unchanged: a stripping object branch would have dropped the sibling
  // keys before the refine runs. Returns null when the shape cannot be distributed
  // into the branch — an opaque `$ref` to a stripping union, or a multi-type whose
  // object alternative cannot be reached without rebuilding it: the caller falls
  // back to the check-pipe for the whole combinator, which is always correct
  // (the document just loses the structure for that rare shape).
  // A `default` / `prefault` value read against the MERGED shape (the branch
  // core intersected with the sibling shape): it has to be a value of both,
  // each read by its own schema — `conformDefault` on the `allOf` of the two
  // would drop the keys the other declares, so the two readings are merged
  // key-wise instead. Not-ok when the value is not a value of the merged
  // shape (a required key missing, a wrong-typed property); a key the two
  // readings coerce differently is a contradictory schema, not a value of it.
  const conformMerged = (
    coreSchema: Schema,
    shapeSchema: Schema,
    value: unknown,
  ): { readonly ok: true; readonly value: unknown } | { readonly ok: false } => {
    const core = conformDefault(coreSchema, value, childOptions?.schemas)
    const shape = conformDefault(shapeSchema, value, childOptions?.schemas)
    if (!core.ok || !shape.ok) return { ok: false }
    // The two readings must agree on the value: records merge key-wise, and
    // a key coerced differently by both sides is a contradictory schema, not
    // a value of it. Anything else that disagrees is not a value of the
    // merged shape either — returning one reading unchecked would write a
    // `default` / `prefault` / `catch` the merged schema rejects.
    if (JSON.stringify(core.value) !== JSON.stringify(shape.value)) {
      if (isRecord(core.value) && isRecord(shape.value)) {
        for (const key of Object.keys(core.value)) {
          if (
            Object.hasOwn(shape.value, key) &&
            JSON.stringify(core.value[key]) !== JSON.stringify(shape.value[key])
          ) {
            return { ok: false }
          }
        }
        return { ok: true, value: { ...core.value, ...shape.value } }
      }
      return { ok: false }
    }
    return core
  }
  // Distribute the shape into a branch whose own wrapping admits `null` or
  // substitutes on `undefined` (#471): the shape goes INSIDE the wrapping,
  // `core.and(shape).nullable()` / `.default(...)`, so the sibling keys stay
  // in the output and the document while `null` / the default is still
  // admitted. Only the wrappings the issue names are re-applied around the
  // distributed core. A user chain replaces the chain wholesale, a refine /
  // brand / readonly is written against the branch's own output (a refine
  // moved inside would run on different values), and an `x-catch` branch
  // keeps the raw-input check like a user chain: the catch would swallow
  // violations of the parent's sibling properties. Branches whose CORE
  // admits `null` or `undefined` itself (a `$ref` to a nullable component, a
  // `null` enum member) also keep the raw-input check: that admission cannot
  // be re-applied around the intersection.
  // A `default` / `prefault` that is not a value of the merged shape is
  // dropped — the way `wrap` already drops a default that is not a value of
  // its schema — instead of being written as `.default()` on the merged
  // shape, which would not type-check.
  const distributeAdmitting = (
    branch: Schema,
    shapeZ: string,
    shapeRefine: string,
    shapeHasProperties: boolean,
    shapeSchema: Schema,
  ): string | null => {
    if (
      branch['x-preprocess'] !== undefined ||
      branch['x-transform'] !== undefined ||
      branch['x-pipe'] !== undefined ||
      branch['x-codec'] !== undefined ||
      branch['x-refine'] !== undefined ||
      branch['x-superRefine'] !== undefined ||
      branch['x-brand'] !== undefined ||
      branch['x-readonly'] === true ||
      branch['x-catch'] !== undefined
    ) {
      return null
    }
    // The branch without its own wrapping: the wrapping keys are omitted
    // (rest destructuring, as `conformDefault` omits `$ref` / `default`),
    // and `null` is stripped from the type.
    const {
      nullable: _nullable,
      default: _default,
      'x-prefault': _prefault,
      'x-catch': _catch,
      type: branchType,
      ...coreRest
    } = branch
    // The branch's type without `null`: a conditional spread would type
    // `type` as possibly `undefined`, which `exactOptionalPropertyTypes`
    // rejects — build each branch whole. Splitting the filtered list keeps
    // the value typed as `Type | [Type, ...Type[]]`, so no assertion is
    // needed; a single remaining type stays a scalar, several stay a list.
    const [first, ...rest] = normalizeTypes(branchType).filter((type) => type !== 'null')
    const coreSchema: Schema =
      first === undefined
        ? { ...coreRest }
        : { ...coreRest, type: rest.length === 0 ? first : [first, ...rest] }
    if (canAdmitNullOrUndefined(coreSchema, childOptions?.schemas)) return null
    const andZ = intersected(coreSchema, shapeZ)
    const distributed = shapeHasProperties ? andZ : `${andZ}.superRefine(${shapeRefine})`
    const mergedDefault =
      branch.default === undefined
        ? undefined
        : conformMerged(coreSchema, shapeSchema, branch.default)
    const mergedPrefault =
      branch['x-prefault'] === undefined
        ? undefined
        : conformMerged(coreSchema, shapeSchema, branch['x-prefault'])
    // `.nullable()` must precede `.default(null)` so `.default(null)` validates.
    const defaultIsNull =
      mergedDefault !== undefined && mergedDefault.ok && mergedDefault.value === null
    const nullable =
      branch.nullable === true || normalizeTypes(branch.type).includes('null') || defaultIsNull
    // The value is written as the literal of the merged shape, member by
    // member (#491). A bigint among them cannot be serialised, so the document
    // is told the JSON value it reads its `default` from instead.
    const literalOf = (value: unknown) =>
      valueLiteral({ allOf: [coreSchema, shapeSchema] }, value, childOptions?.schemas)
    let out = distributed
    if (nullable) out = `${out}.nullable()`
    if (mergedDefault?.ok) {
      const literal = literalOf(mergedDefault.value)
      out = `${out}.default(${literal.code})`
      if (literal.bigint) out = `${out}.openapi({default:${JSON.stringify(mergedDefault.value)}})`
    }
    if (mergedPrefault?.ok) {
      const literal = literalOf(mergedPrefault.value)
      out = `${out}.prefault(${literal.code})`
      if (literal.bigint && !mergedDefault?.ok) {
        out = `${out}.openapi({default:${JSON.stringify(mergedPrefault.value)}})`
      }
    }
    return out
  }
  const distribute = (
    branch: Schema,
    shapeZ: string,
    shapeRefine: string | undefined,
    shapeHasProperties: boolean,
    shapeSchema: Schema,
  ): string | null => {
    if (shapeRefine === undefined) return child(branch)
    if (requiresObject(branch, childOptions?.schemas)) {
      // The intersection passes the RAW input to both sides, so a branch whose
      // wrapping admits `null` or substitutes on `undefined` (`.nullable()`,
      // `.default()`, `.prefault()`, `.catch()`, a user chain, or a `$ref` to
      // one of those) would reject the very values the wrapping exists to
      // admit: the shape member is a plain `z.object`. A branch wrapped only
      // in what #471 names is distributed inside the wrapping instead
      // (see `distributeAdmitting`); anything else falls back to the
      // check-pipe, which is always correct there. The wrapping is the
      // branch's own as well as what its target admits: without the
      // `hasOwnWrapping` arm a `$ref` branch with its own `.nullable()` /
      // `.default()` would take the plain `.and()` below, with the wrapping
      // inside it (`ObjSchema.nullable().and(shape)`), rejecting the `null`
      // the wrapping admits.
      if (canAdmitNullOrUndefined(branch, childOptions?.schemas) || hasOwnWrapping(branch)) {
        return distributeAdmitting(branch, shapeZ, shapeRefine, shapeHasProperties, shapeSchema)
      }
      const andZ = intersected(branch, shapeZ)
      // A shape with `required` but no `properties` emits as a loose object,
      // which enforces nothing — the required key has no property to be required
      // through. The refine on the intersection enforces it: the loose object
      // passes every key through, so the merged output still has the key for
      // the refine to see (a stripping object branch alone would have dropped it).
      return shapeHasProperties ? andZ : `${andZ}.superRefine(${shapeRefine})`
    }
    if (!canAcceptObject(branch, childOptions?.schemas)) return child(branch)
    if (branch.allOf !== undefined) {
      // An intersection hands out the merge of its members' outputs: a key
      // survives when any member preserves it. When the intersection cannot
      // strip, the refine sees the raw input; otherwise the shape cannot be
      // distributed here.
      return emitsStrippingObject(branch, childOptions?.schemas)
        ? null
        : `${child(branch)}.superRefine(${shapeRefine})`
    }
    if (branch.anyOf !== undefined && !(isBinaryFile(branch) && hasMimeAlternatives(branch))) {
      if (branch.anyOf.length === 0) return child(branch)
      const parts = branch.anyOf.map((b) =>
        distribute(b, shapeZ, shapeRefine, shapeHasProperties, shapeSchema),
      )
      if (parts.some((part) => part === null)) return null
      const message =
        branch['x-implication-message'] ?? branch['x-anyOf-message'] ?? branch['x-error-message']
      // `wrap` re-applies what the branch's own `done()` would have added
      // (`.nullable()`, `.openapi()` metadata, a default): the rebuilt union
      // replaces the emission `child(branch)` would have produced, so it has
      // to carry the same wrapping. The options are the nested call's — the
      // parent's `isOptional` / wire reading must not leak into the branch.
      // The branch's own `unevaluatedProperties` check (#466) is kept the
      // same way: rebuilding the union bypasses the branch's anyOf path,
      // which is where the check is applied, so without this wrap the check
      // would be silently dropped whenever a shape is distributed into a
      // nested combinator branch.
      const branchUnevalCheck = makeUnevaluatedPropertiesCheck(
        branch,
        (s) => zodToOpenAPI(s, undefined, childOptions),
        branch['x-error-message'],
        childOptions?.schemas,
        { anyOf: true },
      )
      return wrap(
        withRawCheck(
          `z.union([${parts.join(',')}]${message ? `,${error(message)}` : ''})`,
          branchUnevalCheck,
        ),
        branch,
        undefined,
        childOptions?.schemas === undefined ? {} : { schemas: childOptions.schemas },
      )
    }
    if (branch.oneOf !== undefined) {
      if (branch.oneOf.length === 0) return child(branch)
      const parts = branch.oneOf.map((b) =>
        distribute(b, shapeZ, shapeRefine, shapeHasProperties, shapeSchema),
      )
      if (parts.some((part) => part === null)) return null
      const message = branch['x-oneOf-message'] ?? branch['x-error-message']
      // A distributed branch is no longer a plain object, so `z.discriminatedUnion`
      // cannot take it; `z.xor` is provably equivalent (see the oneOf path).
      // The branch's own `unevaluatedProperties` check (#466) is kept, as in
      // the anyOf arm above: rebuilding the union bypasses the branch's oneOf
      // path, which is where the check is applied.
      const branchUnevalCheck = makeUnevaluatedPropertiesCheck(
        branch,
        (s) => zodToOpenAPI(s, undefined, childOptions),
        branch['x-error-message'],
        childOptions?.schemas,
        { oneOf: true },
      )
      return wrap(
        withRawCheck(
          `z.xor([${parts.join(',')}]${message ? `,${error(message)}` : ''})`,
          branchUnevalCheck,
        ),
        branch,
        undefined,
        childOptions?.schemas === undefined ? {} : { schemas: childOptions.schemas },
      )
    }
    if (normalizeTypes(branch.type).filter((type) => type !== 'null').length > 1) return null
    return emitsStrippingObject(branch, childOptions?.schemas)
      ? null
      : `${child(branch)}.superRefine(${shapeRefine})`
  }
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
  // A declared `type` beside a combinator is written into its members first
  // (#468, see `narrowToDeclaredType`): the paths below emit the combinator
  // alone. The file's `anyOf` of media types is not a combinator (see below).
  if (!isMimeAnyOf) {
    const narrowed = narrowToDeclaredType(schema, options?.schemas)
    if (narrowed !== schema) return zodToOpenAPI(narrowed, meta, options)
  }
  if (schema.allOf !== undefined) {
    // `properties` / `required` beside `allOf` constrain only object values (#461).
    // The shape stays a member of the intersection when the intersection already
    // rejects every non-object — a declared object type, or any member that only
    // accepts objects (e.g. a `$ref` to an object component): the member then
    // rejects nothing the rest accepts, and keeping it is what merges the sibling
    // properties into the inferred type (a mock for `allOf: [$ref BaseEntity] +
    // properties {label}` must typecheck against `{id, createdAt, label}`) and
    // what checks each property's type, with its path. Otherwise the shape is
    // distributed into the member that can take it (see `distribute`): an object
    // value has to pass every member, so enforcing the shape on one member
    // enforces it on the intersection — and the shape stays part of the output
    // and the document instead of a check piped around them. When no member
    // accepts an object at all the shape constrains nothing (row 2: `allOf:
    // [{type: string}]` accepts no object), so it is dropped. Only when no
    // member can take the shape does it fall back to a check on the raw input
    // piped into the intersection — a `.superRefine` on the intersection would
    // see the parsed output, and a stripping object member would have dropped
    // the sibling keys before the refine runs. The object member below is kept
    // for `unevaluatedProperties` either way: the keys `properties` declares
    // still count as evaluated.
    // A shape with `required` but no `properties` has no member to keep — an
    // empty object cannot check a key it has no property for — so it is
    // distributed, or checked, on top of the member when there is one.
    const hasShape =
      (schema.properties !== undefined && Object.keys(schema.properties).length > 0) ||
      (Array.isArray(schema.required) && schema.required.length > 0)
    const shapeSchema: Schema | undefined = hasShape
      ? {
          type: 'object',
          ...(schema.properties ? { properties: schema.properties } : {}),
          ...(schema.required ? { required: schema.required } : {}),
        }
      : undefined
    // Whether the shape is a member of the intersection: see `isShapeMember`, which the
    // type writer asks too, so that the type has the properties the output has (#634).
    const shapeMember = isShapeMember(schema, childOptions?.schemas)
    const shapeRefine =
      shapeSchema === undefined || shapeMember
        ? undefined
        : emitObjectShapeRefine(shapeSchema, child)
    // The refine form is only safe on `z.any()`, which passes the value through
    // unchanged; on a combinator result the shape must be a check on the raw
    // input, piped into the result (see `emitObjectShapeCheck`).
    const shapeCheck =
      shapeSchema === undefined || shapeMember
        ? undefined
        : emitObjectShapeCheck(shapeSchema, child)
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
    const memberAllOf = shapeMember ? effectiveAllOf : schema.allOf
    if (memberAllOf.length === 0) {
      return done(
        shapeRefine === undefined ? 'z.any()' : `z.any().superRefine(${shapeRefine})`,
        schema,
      )
    }
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      memberAllOf.some((s) => s.type === 'null' || (s.nullable === true && isAnnotationOnly(s)))
    const nonNull = memberAllOf
      .filter((s) => !(s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)))
      // A member that names the parent this schema is a branch of stands for the parent's
      // own properties: the parent as a whole would name this schema back (#402).
      .map((s) => inheritedBase(s, childOptions?.schemas) ?? s)
    // A member of annotations alone — `{ description }` beside a `$ref` (DeepL) — describes
    // the intersection and validates nothing: emitted, it would be `z.any()`, and
    // `X.and(z.any())` is `any` (#420). What it says is said of the whole instead, after
    // what the schema says of itself.
    const members = nonNull.filter((s) => !isAnnotationOnly(s))
    const said = nonNull
      .filter(isAnnotationOnly)
      .reduce<Schema>((acc, s) => Object.assign(acc, s), {})
    const emitted: Schema = { ...said, ...schema, nullable }
    if (members.length === 0) {
      return done(
        shapeRefine === undefined ? 'z.any()' : `z.any().superRefine(${shapeRefine})`,
        emitted,
      )
    }
    const schemas = members.map(child)
    const isBareRef =
      schemas.length === 1 &&
      members.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    const [only] = schemas
    if (isBareRef && only !== undefined) return done(only, emitted, true)
    // A member the strict check below has to parse is declared once, and named
    // in the intersection and in the check both (see `isAskedOperand`).
    const isAsked = members.map(
      (member) => schemas.length > 1 && isAskedOperand(member, childOptions?.schemas),
    )
    const operands = schemas.map((s, index) => (isAsked[index] === true ? `Member${index}` : s))
    const declarations = schemas.flatMap((s, index) =>
      isAsked[index] === true ? [`const Member${index}=${s};`] : [],
    )
    const z = operands.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    const shaped = (() => {
      if (shapeSchema === undefined || shapeMember) return z
      if (members.some((member) => !canAcceptObject(member, childOptions?.schemas))) return z
      const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
      for (let index = 0; index < members.length; index += 1) {
        const member = members[index]
        if (member === undefined) continue
        const distributed = distribute(
          member,
          shapeZ,
          shapeRefine,
          schema.properties !== undefined,
          shapeSchema,
        )
        if (distributed === null || distributed === schemas[index]) continue
        const distributedSchemas = operands.map((s, position) =>
          position === index ? distributed : s,
        )
        return distributedSchemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
      }
      return withRawCheck(z, shapeCheck)
    })()
    // A member that is a strict object rejects the keys it does not declare,
    // whatever the other members declare; the intersection alone would let
    // them through (#470, see `makeStrictOperandCheck`). It runs first, around
    // everything else: a key a member rejects is reported once, by this check.
    const strictCheck =
      schemas.length > 1
        ? makeStrictOperandCheck(
            members.map((member, index) => ({ schema: member, zod: operands[index] ?? '' })),
            childOptions?.schemas,
          )
        : undefined
    const allOfMessage = schema['x-allOf-message'] ?? schema['x-error-message']
    // No guard: this check runs in the `z.preprocess` below, after the
    // intersection's own issues are forwarded, not inside a union
    // wrapper — gating it on a combinator the intersection does not contain
    // would be wrong for a schema carrying `allOf` beside `anyOf` / `oneOf`.
    const unevalCheck = makeUnevaluatedPropertiesCheck(
      { ...schema, allOf: effectiveAllOf },
      (s) => zodToOpenAPI(s, undefined, childOptions),
      schema['x-error-message'],
      childOptions?.schemas,
      {},
    )
    if (allOfMessage || unevalCheck) {
      const safeParseBranches = (() => {
        const msgExpr = allOfMessage ? issueMessage(allOfMessage, 'issue') : undefined
        const pushArg = msgExpr
          ? `{...issue,input:issue.input,message:${msgExpr}}`
          : '{...issue,input:issue.input}'
        return `const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){${makeIssueForwarding(pushArg)}}}`
      })()
      const unevalCall = unevalCheck ? `;(${unevalCheck})(ctx)` : ''
      // A `z.preprocess`, not a check piped into the intersection: the
      // document renders it by the intersection, and `z.input` stays its
      // input type (#479, see `withRawCheck`).
      const wrapped = withRawStatements(shaped, `${safeParseBranches}${unevalCall}`)
      return done(withRawCheck(wrapped, strictCheck, declarations), emitted)
    }
    // One reference and nothing to intersect it with: what is emitted is the component.
    return done(
      withRawCheck(shaped, strictCheck, declarations),
      emitted,
      schemas.length === 1 && members.every(isRefOnly),
    )
  }
  // `z.toJSONSchema()` writes `z.file().mime([...])` as an `anyOf` of `contentMediaType`
  // members under the file: those are the types the file may have, which the string
  // emitter reads, not branches to choose between.
  if (schema.anyOf !== undefined && !isMimeAnyOf) {
    if (schema.anyOf.length === 0) return done('z.any()', schema)
    // `discriminator` is not consulted here on purpose. anyOf means "at least one
    // branch matches" (JSON Schema §10.2.1.2), and `z.union` already is exactly
    // that. A discriminator is only a routing hint for consumers (OpenAPI 3.1.1 /
    // 3.2: it MUST NOT change the validation outcome), so honoring it could only
    // make the validator stricter than the schema. It still reaches the output as
    // `.openapi({discriminator})` metadata via `done`.
    const anyOfSchemas = schema.anyOf.map(child)
    const anyOfMessage =
      schema['x-implication-message'] ?? schema['x-anyOf-message'] ?? schema['x-error-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    const unionZ = `z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`
    // `unevaluatedProperties` beside `anyOf` (#466): the union on its own drops
    // the check — a stripping object branch has already removed the unevaluated
    // keys before any refine on the union could see them — so the check runs on
    // the raw input, in a `z.preprocess` (see `withRawCheck`).
    // `makeUnevaluatedPropertiesCheck` returns '' when the keyword is absent
    // or `true`, so schemas without it emit exactly what they did.
    const unevalCheck = makeUnevaluatedPropertiesCheck(
      schema,
      (s) => zodToOpenAPI(s, undefined, childOptions),
      schema['x-error-message'],
      childOptions?.schemas,
      { anyOf: true },
    )
    const hasShape =
      (schema.properties !== undefined && Object.keys(schema.properties).length > 0) ||
      (Array.isArray(schema.required) && schema.required.length > 0)
    if (hasShape) {
      // `properties` / `required` beside `anyOf` constrain only object values (#461).
      // The shape stays an intersection with `z.object()` when the union already
      // rejects every non-object — a declared object type, or every branch only
      // accepting objects: that is what checks each property's type, with its
      // path, and what merges the sibling properties into the inferred type.
      // Otherwise the shape is distributed into the branches that accept objects
      // (see `distribute`): a branch that only accepts objects gets it as an
      // intersection member, so the sibling properties stay in the parsed output
      // and the inferred type and the union stays in the document — a check piped
      // around the union would hide both, and a `.superRefine` on the union would
      // see the parsed output, from which a stripping object branch had already
      // dropped the sibling keys. Only when the shape cannot be distributed into
      // some branch does it fall back to that check. A shape with `required` but
      // no `properties` cannot be checked by an empty object, so it is checked on
      // top of the intersection when there is one.
      const shapeSchema: Schema = {
        type: 'object',
        ...(schema.properties ? { properties: schema.properties } : {}),
        ...(schema.required ? { required: schema.required } : {}),
      }
      // See the allOf path: `type: 'null'` alone must not count as object-only.
      const objectOnly =
        normalizeTypes(schema.type).includes('object') &&
        normalizeTypes(schema.type).every((type) => type === 'object' || type === 'null')
      const branchesRequireObject = schema.anyOf.every((branch) =>
        requiresObject(branch, childOptions?.schemas),
      )
      // Same guard as `distribute`, but only when the parent itself allows
      // `null`: the member path puts the shape after the whole union, so it
      // rejects the `null` a nullable or defaulted branch admits — and a
      // declared object-only type already rejects `null` on its own. Skipping
      // the member path for an object-typed parent would be wrong in the other
      // direction: the shape's per-property type errors (with their paths) only
      // survive as the intersection member — a refine on each branch fails every
      // branch, so the union reports its own message (e.g. x-implication-message)
      // instead of the property's type error.
      const branchesAdmitNullOrUndefined =
        (schema.type === undefined || normalizeTypes(schema.type).includes('null')) &&
        schema.anyOf.some(
          (branch) =>
            canAdmitNullOrUndefined(branch, childOptions?.schemas) || hasOwnWrapping(branch),
        )
      if ((objectOnly || branchesRequireObject) && !branchesAdmitNullOrUndefined) {
        const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
        // A union hands on the `unrecognized_keys` of a strict branch that
        // failed on nothing else, and the intersection would drop it (#470).
        const union: Schema = { anyOf: schema.anyOf }
        const isAsked = isAskedOperand(union, childOptions?.schemas)
        const operand = isAsked ? 'Operand' : unionZ
        const andZ = withRawCheck(
          `${operand}.and(${shapeZ})`,
          makeStrictOperandCheck([{ schema: union, zod: operand }], childOptions?.schemas),
          isAsked ? [`const Operand=${unionZ};`] : [],
        )
        if (schema.properties === undefined) {
          const shapeCheck = emitObjectShapeCheck(shapeSchema, child)
          return done(withRawCheck(withRawCheck(andZ, shapeCheck), unevalCheck), schema)
        }
        return done(withRawCheck(andZ, unevalCheck), schema)
      }
      const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
      const shapeRefine = emitObjectShapeRefine(shapeSchema, child)
      const distributed = schema.anyOf.map((branch) =>
        distribute(branch, shapeZ, shapeRefine, schema.properties !== undefined, shapeSchema),
      )
      if (!distributed.some((part) => part === null)) {
        return done(
          withRawCheck(`z.union([${distributed.join(',')}]${anyOfErrorArg})`, unevalCheck),
          schema,
        )
      }
      const shapeCheck = emitObjectShapeCheck(shapeSchema, child)
      return done(withRawCheck(withRawCheck(unionZ, shapeCheck), unevalCheck), schema)
    }
    return done(withRawCheck(unionZ, unevalCheck), schema)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return done('z.any()', schema)
    const oneOfSchemas = schema.oneOf.map(child)
    const discriminator = schema.discriminator?.propertyName
    const oneOfMessage = schema['x-oneOf-message'] ?? schema['x-error-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    // Semantic contract. `oneOf` is JSON Schema: "exactly one branch matches"
    // (§10.2.1.3), which `z.xor` implements literally. `discriminator` is an
    // OpenAPI-only hint and MUST NOT change the validation outcome (3.1.1 §4.8.25 /
    // 3.2 §4.25). `z.discriminatedUnion` is therefore only an optimization, and it is
    // emitted solely when it is provably equivalent to the xor: every branch is a
    // plain object that `required`s the discriminator and pins it to string literals
    // (see `discriminatedBranches`), and no two branches share a literal. In that
    // case routing by key and "exactly one matches" accept and reject the same
    // payloads; only the issue shape differs. Anything else falls back to `z.xor`
    // so the meaning of the document is preserved rather than guessed.
    //
    // `discriminator.mapping` is deliberately not used for routing. Which branch
    // accepts a payload is decided by the branches' own `const`/`enum`, never by the
    // mapping table; the mapping (like `propertyName`) is passed through untouched
    // as `.openapi({discriminator})` metadata for documentation consumers.
    //
    // Consequence for OpenAPI 3.0-style documents that rely on the discriminator
    // alone (branches that never declare the discriminating property): under strict
    // oneOf every branch accepts the same payload, so "exactly one" never holds and
    // the generated `z.xor` rejects everything. That is the faithful reading of the
    // schema, not a bug: the fix is the author's (declare the literal per branch, or
    // switch to anyOf), and the document is taken as it is.
    const isDiscriminated =
      discriminator !== undefined && discriminatedBranches(schema, options?.schemas) !== undefined
    const z = isDiscriminated
      ? `z.discriminatedUnion(${makeStringLiteral(discriminator)},[${oneOfSchemas.join(',')}]${oneOfErrorArg})`
      : `z.xor([${oneOfSchemas.join(',')}]${oneOfErrorArg})`
    // `unevaluatedProperties` beside `oneOf` (#466): same `z.preprocess` as
    // the `anyOf` path above — the check runs on the raw input (see
    // `withRawCheck`), because a stripping object branch would have
    // removed the unevaluated keys before any refine could see them. Returns
    // '' when the keyword is absent or `true`, so schemas without it emit
    // exactly what they did.
    const unevalCheck = makeUnevaluatedPropertiesCheck(
      schema,
      (s) => zodToOpenAPI(s, undefined, childOptions),
      schema['x-error-message'],
      childOptions?.schemas,
      { oneOf: true },
    )
    // `properties` / `required` beside `oneOf` constrain only object values (#461),
    // the same class as beside `allOf` / `anyOf`: before this fix the shape was
    // dropped entirely, so an object with a wrong-typed property passed. Same rule
    // as `anyOf`: an intersection with `z.object()` when the branches already
    // reject every non-object, the shape distributed into the object-accepting
    // branches otherwise, and a check on the raw input piped into the union only
    // when the shape cannot be distributed into some branch — a `.superRefine`
    // on the union would see the parsed output, and a stripping object branch
    // would have dropped the sibling keys first.
    const hasShape =
      (schema.properties !== undefined && Object.keys(schema.properties).length > 0) ||
      (Array.isArray(schema.required) && schema.required.length > 0)
    if (hasShape) {
      const shapeSchema: Schema = {
        type: 'object',
        ...(schema.properties ? { properties: schema.properties } : {}),
        ...(schema.required ? { required: schema.required } : {}),
      }
      // See the allOf path: `type: 'null'` alone must not count as object-only.
      const objectOnly =
        normalizeTypes(schema.type).includes('object') &&
        normalizeTypes(schema.type).every((type) => type === 'object' || type === 'null')
      const branchesRequireObject = schema.oneOf.every((branch) =>
        requiresObject(branch, childOptions?.schemas),
      )
      // Same guard as `distribute`, but only when the parent itself allows
      // `null` (see the anyOf member path).
      const branchesAdmitNullOrUndefined =
        (schema.type === undefined || normalizeTypes(schema.type).includes('null')) &&
        schema.oneOf.some(
          (branch) =>
            canAdmitNullOrUndefined(branch, childOptions?.schemas) || hasOwnWrapping(branch),
        )
      if ((objectOnly || branchesRequireObject) && !branchesAdmitNullOrUndefined) {
        const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
        // A discriminated union hands on the issues of the branch it routes
        // to, a strict branch's `unrecognized_keys` among them (#470).
        const union: Schema = {
          oneOf: schema.oneOf,
          ...(schema.discriminator === undefined ? {} : { discriminator: schema.discriminator }),
        }
        const isAsked = isAskedOperand(union, childOptions?.schemas)
        const operand = isAsked ? 'Operand' : z
        const andZ = withRawCheck(
          `${operand}.and(${shapeZ})`,
          makeStrictOperandCheck([{ schema: union, zod: operand }], childOptions?.schemas),
          isAsked ? [`const Operand=${z};`] : [],
        )
        if (schema.properties === undefined) {
          const shapeCheck = emitObjectShapeCheck(shapeSchema, child)
          return done(withRawCheck(withRawCheck(andZ, shapeCheck), unevalCheck), schema)
        }
        return done(withRawCheck(andZ, unevalCheck), schema)
      }
      const shapeZ = zodToOpenAPI(shapeSchema, undefined, childOptions)
      const shapeRefine = emitObjectShapeRefine(shapeSchema, child)
      const distributed = schema.oneOf.map((branch) =>
        distribute(branch, shapeZ, shapeRefine, schema.properties !== undefined, shapeSchema),
      )
      if (!distributed.some((part) => part === null)) {
        // Never `z.discriminatedUnion` here: a distributed branch is no longer
        // a plain object, and `z.xor` is provably equivalent (see above).
        return done(
          withRawCheck(`z.xor([${distributed.join(',')}]${oneOfErrorArg})`, unevalCheck),
          schema,
        )
      }
      const shapeCheck = emitObjectShapeCheck(shapeSchema, child)
      return done(withRawCheck(withRawCheck(z, shapeCheck), unevalCheck), schema)
    }
    return done(withRawCheck(z, unevalCheck), schema)
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
    // The refine sees what the base schema hands out. An int64 / uint64 / bigint integer
    // hands out a bigint (with or without `x-coerce`), so the values `not` excludes are
    // written as bigint literals: `[0].includes(val)` is a type error on a bigint, and
    // `0n` is not `0` at runtime either, so a number literal lets the excluded value pass.
    const notIsBigint =
      normalizeTypes(schema.type).includes('integer') &&
      (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint')
    const notLiteral = (value: unknown): string =>
      typeof value === 'number' && notIsBigint && Number.isInteger(value)
        ? schema.format === 'bigint'
          ? `BigInt(${value})`
          : `${value}n`
        : JSON.stringify(value)
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
    const not = schema.not
    if (isRecord(not)) {
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
        const predicates = not.type
          .map((typeName) => typePredicates[typeName])
          .filter((v) => v !== undefined)
        if (predicates.length > 0) {
          const bodies = predicates.map((v) => `(${v.replace(/^\(val\) => /u, '')})`)
          const combined = `(val) => ${bodies.join(' && ')}`
          return done(`${notBase}.refine(${combined}${notErrorArg})`, schema)
        }
      }
      if (isPureEnum && Array.isArray(not.enum)) {
        // A bigint is never a fraction, so a fractional member cannot exclude anything and
        // would only be a number literal beside the bigint ones.
        // Nor is a bigint an object or an array.
        const members = notIsBigint
          ? not.enum.filter(
              (member) =>
                !isStructured(member) && (typeof member !== 'number' || Number.isInteger(member)),
            )
          : not.enum
        if (members.length === 0) return done(notBase, schema)
        // `includes` compares an object by reference, which no value equals: beside an
        // object or an array the members are compared as JSON (#604).
        if (members.some(isStructured)) {
          const jsons = JSON.stringify(members.map((member) => JSON.stringify(member)))
          return done(
            `${notBase}.refine((val) => !${jsons}.includes(JSON.stringify(val))${notErrorArg})`,
            schema,
          )
        }
        const list = `[${members.map(notLiteral).join(',')}]`
        const predicate = `(val) => !${list}.includes(val)`
        return done(`${notBase}.refine(${predicate}${notErrorArg})`, schema)
      }
      if (onlyKeys.length === 1 && onlyKeys[0] === 'const') {
        // An object or an array is compared as JSON: `val !== { a: 1 }` is always true (#604).
        // A bigint is never one, so there the `not` excludes nothing.
        if (isStructured(not.const)) {
          const json = JSON.stringify(JSON.stringify(not.const))
          return done(
            notIsBigint
              ? notBase
              : `${notBase}.refine((val) => JSON.stringify(val) !== ${json}${notErrorArg})`,
            schema,
          )
        }
        const value = notLiteral(not.const)
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
    // `type: string` beside `const: 0`: no value is both (#604).
    if (isConstOutsideType(schema)) return done(`z.never(${errorArg.slice(1)})`, schema)
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
  // A schema with no `type` that has `properties` is an object (#385), unless a keyword of
  // another kind stands beside them: then the value may be of any type, and each keyword
  // checks a value of its own kind.
  if (schema.properties !== undefined && schema.type === undefined && !isUntypedObject(schema)) {
    return done(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
    )
  }
  const types = normalizeTypes(schema.type)
  // `type: [integer, string]` accepts a value of either type, so it is a union of what each
  // type emits. The keywords are handed to every branch, which reads the ones of its type.
  // A multi-type that includes `object` goes here too (#461): the object branch below
  // would drop the other types, so the shape applies to the object branch only. `required`
  // is handed to the object branch as well: `undecorated` drops it, and without it the
  // object branch would read a required key as optional. The other branches must not
  // get it: a string branch would carry `.openapi({required: [...]})` into the document
  // for a key it can never have.
  const alternatives = types.filter((type) => type !== 'null')
  if (alternatives.length > 1) {
    const { type: _type, ...rest } = undecorated(schema)
    const branches = alternatives.map((type) =>
      zodToOpenAPI(
        {
          ...rest,
          ...(type === 'object' && schema.required !== undefined
            ? { required: schema.required }
            : {}),
          type,
        },
        undefined,
        childOptions,
      ),
    )
    return done(`z.union([${branches.join(',')}])`, schema)
  }
  // `properties` and `required` only apply to object values in JSON Schema, so a declared
  // type that is not an object is not contradicted by them: `type: string` beside
  // `properties` is a string schema, and its default is a string default (#444). The
  // object branch is entered only when the type includes `object`, or the schema is an
  // untyped object.
  if (
    (schema.properties !== undefined && normalizeTypes(schema.type).includes('object')) ||
    isUntypedObject(schema)
  ) {
    // An optional property is `.exactOptional()`, which fails the `safeParse(undefined)` probe
    // the document derives `required` from, so an object that omits `required` states the
    // default, `required: []`. That holds whatever `additionalProperties` is: beside a
    // schema-valued one the object is a catchall or a loose object, probed the same way.
    const needsDefaultRequired =
      schema.required === undefined &&
      Object.keys(schema.properties ?? {}).length > 0 &&
      schema.anyOf === undefined
    return done(
      object(schema, childOptions),
      needsDefaultRequired ? { ...schema, required: [] } : schema,
    )
  }
  if (types.includes('string')) return done(string(schema, childOptions), schema)
  if (types.includes('number')) return done(number(schema), schema)
  if (types.includes('integer')) return done(integer(schema, { json: isJson }), schema)
  if (types.includes('boolean')) {
    const errorMessage = schema['x-error-message']
    const requiredMessage = schema['x-required-message']
    const xStringbool = schema['x-stringbool']
    // `z.stringbool()` reads the text itself, which is all `x-coerce` would ask for: beside
    // it, `x-coerce` has nothing left to do, so the more specific extension is what counts.
    if (xStringbool !== undefined) {
      const arg = baseError(errorMessage, requiredMessage)
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
    const xCoerce = schema['x-coerce'] === true
    // `z.coerce.boolean()` reads nothing as `false`, so a required message would never show.
    const arg = baseError(errorMessage, xCoerce ? undefined : requiredMessage)
    const baseFn = xCoerce ? 'z.coerce.boolean' : effective?.coerce ? 'z.stringbool' : 'z.boolean'
    const base = arg ? `${baseFn}(${arg})` : `${baseFn}()`
    return done(base, schema)
  }
  if (types.includes('array')) {
    const readonlyMod = readonly ? '.readonly()' : ''
    const arrayErrorMessage = schema['x-error-message']
    const arrayErrorArg = arrayErrorMessage ? `,${error(arrayErrorMessage)}` : ''
    const containsChain = (() => {
      if (!schema.contains) return ''
      const containsZod = referenced(schema.contains)
      const fallback = schema['x-contains-message'] ?? arrayErrorMessage
      if (schema.minContains === undefined && schema.maxContains === undefined) {
        const messagePart = fallback
          ? `,message:${issueMessage(fallback, "{code:'custom',path:[],input:arr}")}`
          : ''
        return `.superRefine((arr,ctx)=>{const Schema=${containsZod};const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom"${messagePart}})}})`
      }
      // minContains defaults to 1; explicit 0 skips the lower-bound check.
      const effectiveMin = schema.minContains ?? 1
      const minContainsMessage = schema['x-minContains-message'] ?? fallback
      const minStmt =
        effectiveMin > 0
          ? (() => {
              const messagePart = minContainsMessage
                ? `,message:${issueMessage(minContainsMessage, "{code:'custom',path:[],input:arr}")}`
                : ''
              return `if(matched<${effectiveMin}){ctx.addIssue({code:"custom"${messagePart}})}`
            })()
          : undefined
      const maxContainsMessage = schema['x-maxContains-message'] ?? fallback
      const maxStmt =
        schema.maxContains !== undefined
          ? (() => {
              const messagePart = maxContainsMessage
                ? `,message:${issueMessage(maxContainsMessage, "{code:'custom',path:[],input:arr}")}`
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
      ? `,message:${issueMessage(prefixItemsMessage, 'issue')}`
      : ''
    const itemsMessage = schema['x-items-message'] ?? arrayErrorMessage
    const itemsMessageOverride = itemsMessage
      ? `,message:${issueMessage(itemsMessage, 'issue')}`
      : ''
    const unevaluatedItemsMessage = schema['x-unevaluatedItems-message'] ?? arrayErrorMessage
    const unevaluatedItemsMessageOverride = unevaluatedItemsMessage
      ? `,message:${issueMessage(unevaluatedItemsMessage, 'issue')}`
      : ''
    const unevaluatedItemsChain = (() => {
      const ui = schema.unevaluatedItems
      if (ui === undefined || ui === true) return ''
      // `items` evaluates every element after the prefix, so none is left unevaluated.
      if (isRestEvaluated(schema)) return ''
      const prefixCount = Array.isArray(schema.prefixItems) ? schema.prefixItems.length : 0
      if (ui === false) {
        const slot = unevaluatedItemsMessage ?? arrayErrorMessage
        const messagePart = slot
          ? `,message:${issueMessage(slot, "{code:'custom',path:[i],input:arr}")}`
          : ''
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
    const uniqueMessagePart = uniqueMessage
      ? `,message:${issueMessage(uniqueMessage, "{code:'custom',path:[i],input:items}")}`
      : ''
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
          const converter = makeWireConverter(kinds, wireKeep(s, childOptions.schemas))
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
      // `items` evaluates every element after the prefix, so `unevaluatedItems` sees none.
      const ui = isRestEvaluated(schema) ? undefined : schema.unevaluatedItems
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
      const capMessagePart = capSlot
        ? `,message:${issueMessage(capSlot, "{code:'custom',path:[i],input:arr}")}`
        : ''
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
  if (types.includes('object')) return done(object(schema, childOptions), schema)
  if (types.includes('date')) {
    const errorMessage = schema['x-error-message']
    const dateFn = effective?.coerce ? 'z.coerce.date' : 'z.date'
    const base = errorMessage ? `${dateFn}(${error(errorMessage)})` : `${dateFn}()`
    return done(base, schema)
  }
  if (types.length === 1 && types[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return done(base, schema)
  }
  if (types.length === 0 && hasTypelessConstraint(schema)) {
    return done(
      emitTypelessRefine(schema, (s) => zodToOpenAPI(s, undefined, childOptions)),
      schema,
    )
  }
  return done('z.any()', schema)
}
