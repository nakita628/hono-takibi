import { isSchemaArray } from '../guard/index.js'
import type { Parameter, Schema } from '../openapi/index.js'
import { normalizeTypes } from '../utils/index.js'

/**
 * What a parameter value can turn into once it leaves the wire. A path, query, header or
 * cookie value always arrives as text, so the kind says which text is read as which type.
 */
type WireKind = 'integer' | 'number' | 'bigint' | 'boolean' | 'string'

type Schemas = { readonly [k: string]: Schema }

const SCHEMA_REF_PREFIX = '#/components/schemas/'

// `z.coerce.number()` is `Number(input)`, which reads `""` and `" "` as 0, `"0x10"` as 16
// and `"0b11"` as 3. A decimal literal is what a parameter means, so the text is matched
// before it is converted, and text that does not match stays a string for the schema to
// reject. A number may leave out the digits on one side of its point (`.5`, `5.`) and carry
// an exponent; a sign other than `-`, whitespace and the other radixes are not part of it.
// Both patterns are read by an attacker's input, so neither may backtrack: after `\d+` the
// fraction has to start with its point, which leaves one way to match a run of digits.
// `\d+\.?\d*` has as many ways as the run has digits, and takes seconds on a long one.
const INTEGER_TEXT = String.raw`/^-?\d+$/`
const NUMBER_TEXT = String.raw`/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/`
// An integer beyond 2^53 cannot be held by a number: `Number("9007199254740993")` is
// 9007199254740992. It is left as text, so the request is rejected instead of answered
// with a neighbouring value.
const IS_INTEGER = `${INTEGER_TEXT}.test(val)&&Number.isSafeInteger(Number(val))`
const IS_NUMBER = `${NUMBER_TEXT}.test(val)&&(!${INTEGER_TEXT}.test(val)||Number.isSafeInteger(Number(val)))`
const IS_BIGINT = `${INTEGER_TEXT}.test(val)`

const ALL_SCALARS: readonly WireKind[] = ['number', 'boolean', 'string']

/** Looks a `#/components/schemas/<name>` reference up; anything else is not resolved. */
export function resolveSchemaRef(ref: string, schemas: Schemas | undefined): Schema | undefined {
  if (!ref.startsWith(SCHEMA_REF_PREFIX)) return undefined
  const name = ref.slice(SCHEMA_REF_PREFIX.length)
  if (name.includes('/')) return undefined
  return schemas?.[decodeURIComponent(name)]
}

function primitiveKind(value: unknown): WireKind | undefined | null {
  if (value === null) return null
  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number'
  return undefined
}

function typeKind(type: string, format: string | undefined): WireKind | undefined | null {
  if (type === 'null') return null
  if (type === 'string') return 'string'
  if (type === 'boolean') return 'boolean'
  if (type === 'number') return 'number'
  if (type === 'integer') {
    return format === 'int64' || format === 'uint64' || format === 'bigint' ? 'bigint' : 'integer'
  }
  return undefined
}

// `allOf` has to satisfy every branch, so a value can only be of a kind every branch reads.
// An integer is a number, which makes `integer` the meet of the two.
function intersectKinds(a: readonly WireKind[], b: readonly WireKind[]): readonly WireKind[] {
  const narrowed = a.flatMap((kind): readonly WireKind[] => {
    if (b.includes(kind)) return [kind]
    if (kind === 'integer' && b.includes('number')) return ['integer']
    if (kind === 'number' && b.includes('integer')) return ['integer']
    return []
  })
  return [...new Set(narrowed)]
}

/**
 * The kinds a schema reads off the wire, or `undefined` when the schema is not a scalar
 * (an array, an object, an unresolved reference) or manages its own input (`x-coerce`,
 * `x-stringbool`, a user-supplied chain).
 */
export function wireKinds(
  schema: Schema | boolean,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): readonly WireKind[] | undefined {
  if (typeof schema === 'boolean') return undefined
  if (
    schema['x-coerce'] === true ||
    schema['x-stringbool'] !== undefined ||
    schema['x-preprocess'] !== undefined ||
    schema['x-transform'] !== undefined ||
    schema['x-pipe'] !== undefined ||
    schema['x-codec'] !== undefined
  ) {
    return undefined
  }
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return undefined
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined ? undefined : wireKinds(target, schemas, [...seen, schema.$ref])
  }
  if (schema.properties !== undefined) return undefined
  if (schema.allOf !== undefined) {
    if (schema.allOf.length === 0) return undefined
    const branches = schema.allOf.map((branch) => wireKinds(branch, schemas, seen))
    if (branches.some((kinds) => kinds === undefined)) return undefined
    const defined = branches.filter((kinds) => kinds !== undefined)
    const [first, ...rest] = defined
    if (first === undefined) return undefined
    const kinds = rest.reduce(intersectKinds, first)
    return kinds.length > 0 ? kinds : undefined
  }
  const union = schema.anyOf ?? schema.oneOf
  if (union !== undefined) {
    if (union.length === 0) return undefined
    const branches = union.map((branch) => wireKinds(branch, schemas, seen))
    if (branches.some((kinds) => kinds === undefined)) return undefined
    return [...new Set(branches.flatMap((kinds) => kinds ?? []))]
  }
  const types = normalizeTypes(schema.type)
  const typed = types
    .map((type) => typeKind(type, schema.format))
    .filter((kind) => kind !== undefined && kind !== null)
  if (schema.not !== undefined) return typed.length > 0 ? [...new Set(typed)] : ALL_SCALARS
  // `type: number, const: 2` is met by "2.0" as much as by "2": a whole number in a schema
  // declared as `number` is still read with the number grammar.
  // An int64 is a bigint in the generated schema, and so are the literals of its enum.
  const widen = (kind: WireKind): WireKind => {
    if (kind !== 'integer') return kind
    if (typed.includes('bigint')) return 'bigint'
    return typed.includes('number') ? 'number' : kind
  }
  if (schema.const !== undefined) {
    const kind = primitiveKind(schema.const)
    if (kind === undefined) return undefined
    return kind === null ? [] : [widen(kind)]
  }
  if (schema.enum !== undefined) {
    const members = schema.enum.map(primitiveKind)
    if (members.includes(undefined)) return undefined
    return [...new Set(members.filter((kind) => kind !== undefined && kind !== null).map(widen))]
  }
  if (types.length > 0) {
    // `type: [integer, array]` has a scalar reading; a type that is only an array, an
    // object or a date has none.
    return typed.length > 0 ? [...new Set(typed)] : undefined
  }
  const hasNumeric =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined
  const hasText =
    schema.minLength !== undefined || schema.maxLength !== undefined || schema.pattern !== undefined
  const hasComposite =
    schema.items !== undefined ||
    schema.prefixItems !== undefined ||
    schema.contains !== undefined ||
    schema.minItems !== undefined ||
    schema.maxItems !== undefined ||
    schema.uniqueItems !== undefined ||
    schema.additionalProperties !== undefined ||
    schema.patternProperties !== undefined ||
    schema.propertyNames !== undefined ||
    schema.required !== undefined
  if (hasComposite) return undefined
  // A typeless `minLength` measures the text that was sent, so the value stays text; a
  // typeless `minimum` only means something once numeric text is read as a number.
  return hasNumeric && !hasText ? ['number', 'string'] : ['string']
}

/**
 * Whether anything a schema accepts is not text, so that it has to be converted on
 * arrival. An unresolved or circular reference counts as text: it is left as it is.
 */
export function needsWireConversion(
  schema: Schema | boolean,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return false
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return false
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined
      ? false
      : needsWireConversion(target, schemas, [...seen, schema.$ref])
  }
  const kinds = wireKinds(schema, schemas, seen)
  if (kinds !== undefined) return kinds.some((kind) => kind !== 'string')
  const items = schema.items
  const children: readonly (Schema | boolean | undefined)[] = [
    ...(schema.allOf ?? []),
    ...(schema.anyOf ?? []),
    ...(schema.oneOf ?? []),
    ...Object.values(schema.properties ?? {}),
    ...(schema.prefixItems ?? []),
    ...(isSchemaArray(items) ? items : [items]),
    schema.additionalProperties,
    schema.contains,
  ]
  return children.some((child) => child !== undefined && needsWireConversion(child, schemas, seen))
}

/**
 * Whether a reference carries what `wrap` would put around the component: a default,
 * `null`, a refinement. On the component these would be written into its definition, for
 * every user of it; outside it they hide the component from the document. A decorated
 * reference is therefore written out in place, where the decoration belongs to it alone.
 */
export function isDecoratedRef(schema: Schema): boolean {
  return (
    schema.$ref !== undefined &&
    (schema.default !== undefined ||
      schema.nullable === true ||
      normalizeTypes(schema.type).includes('null') ||
      schema['x-prefault'] !== undefined ||
      schema['x-catch'] !== undefined ||
      schema['x-readonly'] === true ||
      schema['x-refine'] !== undefined ||
      schema['x-superRefine'] !== undefined ||
      schema['x-brand'] !== undefined)
  )
}

/**
 * A schema as the generated code spells it: a reference to an array or an object is
 * replaced by the component it names, wherever the emitter writes that component out in
 * place to read its elements from text. What a parameter documents has to be what it
 * emits — a `$ref` left in the document would name a component the emitted schema never
 * mentions, and the document would not define it.
 */
export function inlineWireRefs(
  schema: Schema,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): Schema {
  if (schema.$ref !== undefined) {
    const target = resolveSchemaRef(schema.$ref, schemas)
    // The schema of the parameter itself, decorated: the component is written out with
    // the decoration beside it.
    if (target !== undefined && seen.length === 0 && isDecoratedRef(schema)) {
      const { $ref: _ref, ...beside } = schema
      return { ...inlineWireRefs(target, schemas, [schema.$ref]), ...beside }
    }
    if (
      target === undefined ||
      seen.includes(schema.$ref) ||
      wireKinds(schema, schemas) !== undefined ||
      !needsWireConversion(schema, schemas)
    ) {
      return schema
    }
    return inlineWireRefs(target, schemas, [...seen, schema.$ref])
  }
  // A scalar is converted from outside, so every reference inside it stays a reference.
  if (wireKinds(schema, schemas) !== undefined) return schema
  const each = (children: readonly Schema[]) =>
    children.map((child) => inlineWireRefs(child, schemas, seen))
  const items = schema.items
  return {
    ...schema,
    ...(schema.allOf === undefined ? {} : { allOf: each(schema.allOf) }),
    ...(schema.anyOf === undefined ? {} : { anyOf: each(schema.anyOf) }),
    ...(schema.oneOf === undefined ? {} : { oneOf: each(schema.oneOf) }),
    ...(schema.prefixItems === undefined ? {} : { prefixItems: each(schema.prefixItems) }),
    ...(items === undefined || typeof items === 'boolean'
      ? {}
      : { items: isSchemaArray(items) ? each(items) : inlineWireRefs(items, schemas, seen) }),
    ...(schema.properties === undefined
      ? {}
      : {
          properties: Object.fromEntries(
            Object.entries(schema.properties).map(([key, property]) => [
              key,
              inlineWireRefs(property, schemas, seen),
            ]),
          ),
        }),
    ...(typeof schema.additionalProperties === 'object'
      ? { additionalProperties: inlineWireRefs(schema.additionalProperties, schemas, seen) }
      : {}),
  }
}

/**
 * The text a schema accepts as it stands: the string members of its `enum` and a string
 * `const`, through references and combinators. In `enum: [1, "2"]` the text "2" is a
 * member already, and reading it as the number 2 would turn a valid value into an invalid
 * one.
 */
export function wireKeep(
  schema: Schema | boolean,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): readonly string[] {
  if (typeof schema === 'boolean') return []
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return []
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined ? [] : wireKeep(target, schemas, [...seen, schema.$ref])
  }
  const own = [
    ...(schema.enum ?? []).filter((member) => typeof member === 'string'),
    ...(typeof schema.const === 'string' ? [schema.const] : []),
  ]
  const branches = [...(schema.allOf ?? []), ...(schema.anyOf ?? []), ...(schema.oneOf ?? [])]
  return [...new Set([...own, ...branches.flatMap((branch) => wireKeep(branch, schemas, seen))])]
}

/**
 * The function that reads wire text as the kinds given, as source. Text that is none of
 * them — and anything that is not text, `undefined` included — is handed on unchanged, so
 * the schema behind it reports a missing value as missing and a malformed one as malformed.
 *
 * `keep` lists the text that is a valid value as it stands (the string members of a mixed
 * `enum`), which is therefore never converted.
 *
 * Returns `undefined` when there is nothing to convert.
 */
export function wireConverter(
  kinds: readonly WireKind[],
  keep: readonly string[] = [],
): string | undefined {
  const has = (kind: WireKind) => kinds.includes(kind)
  const numeric = has('number')
    ? `if(${IS_NUMBER})return Number(val)`
    : has('integer')
      ? `if(${IS_INTEGER})return Number(val)`
      : has('bigint')
        ? `if(${IS_BIGINT})return BigInt(val)`
        : undefined
  if (numeric === undefined && !has('boolean')) return undefined
  if (keep.length === 0 && !has('boolean')) {
    if (has('number')) return `(val)=>(typeof val==='string'&&${IS_NUMBER}?Number(val):val)`
    if (has('integer')) return `(val)=>(typeof val==='string'&&${IS_INTEGER}?Number(val):val)`
    return `(val)=>(typeof val==='string'&&${IS_BIGINT}?BigInt(val):val)`
  }
  const guard =
    keep.length > 0
      ? `if(typeof val!=='string'||${JSON.stringify(keep)}.includes(val))return val`
      : numeric === undefined
        ? undefined
        : `if(typeof val!=='string')return val`
  if (!has('boolean')) {
    return `(val)=>{${[guard, numeric, 'return val'].filter((step) => step !== undefined).join(';')}}`
  }
  // What spells a boolean is Zod's to say: `z.stringbool()` reads it, built once and asked
  // on every value. Text it does not read is handed on as it is.
  const steps = [
    guard,
    numeric,
    'const result=read.safeParse(val)',
    'return result.success?result.data:val',
  ].filter((step) => step !== undefined)
  return `((read)=>(val:unknown)=>{${steps.join(';')}})(z.stringbool())`
}

/**
 * Wraps a schema so that it reads wire text: `z.stringbool()` for an inline schema that only
 * takes booleans, a converting `z.preprocess` for everything else. The schema is returned
 * as it is when its kinds need no conversion.
 */
export function wrapWire(
  zod: string,
  kinds: readonly WireKind[],
  keep: readonly string[] = [],
  component = false,
): string {
  // `z.stringbool()` is a pipe of its own, and the document reads a pipe by its input: a
  // component behind it would be described as a string and left out of the definitions.
  // A component is therefore read inside a `z.preprocess`, which the document looks
  // through — by `z.stringbool()` still, asked from the converter.
  if (kinds.length === 1 && kinds[0] === 'boolean' && !component) {
    return `z.stringbool().pipe(${zod})`
  }
  const converter = wireConverter(kinds, keep)
  return converter === undefined ? zod : `z.preprocess(${converter},${zod})`
}

/**
 * Reads an int64 out of a JSON document. JSON has no bigint: a client sends the value as a
 * number, or as a string of digits when the number would not hold it — which is how
 * `JSON.stringify` writes a bigint that has a `toJSON`. A number beyond 2^53 has lost digits
 * before it arrives, so it is handed on as it is, for the schema to reject.
 */
export const JSON_BIGINT = String.raw`(val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val)`

/**
 * A form field sent once arrives as a bare string and one sent several times as an array,
 * so an array field accepts both. An absent field stays `undefined`.
 */
export const FORM_ARITY = '(val)=>(val===undefined||Array.isArray(val)?val:[val])'

/** Reads a JSON-encoded parameter (`content: application/json`) before it is validated. */
export const WIRE_JSON =
  "(val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}}"

function escapeRegExp(text: string) {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`)
}

/** Splits one piece of text, or each piece of a repeated parameter, on a separator. */
function splitOn(separator: string, trim = false) {
  return `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(${JSON.stringify(separator)})${trim ? '.map((part)=>part.trim())' : ''}:[item])))`
}

/**
 * The function that undoes a parameter's serialisation `style`, as source, or `undefined`
 * when the value needs none undone.
 *
 * OpenAPI serialises an array in one of several ways, and only `form` + `explode: true`
 * (`?ids=1&ids=2`) reaches the handler as an array. Every other style arrives as one piece
 * of text that has to be split: `?ids=1,2`, `?ids=1|2`, `?ids=1%202`, a path segment
 * `1,2`, a header `1, 2`. A `label` or `matrix` path segment carries a prefix as well
 * (`.5`, `;id=5`), on a scalar as much as on an array.
 */
export function wireStyle(parameter: Parameter, isArray: boolean): string | undefined {
  // A `content` parameter is one encoded document, not a serialised list.
  if (parameter.content !== undefined) return undefined
  // A one-element array is serialised as a single `?ids=1`, which arrives as a bare string.
  const bothArities = '(val)=>(val===undefined||Array.isArray(val)?val:[val])'
  if (parameter.in === 'cookie') {
    // A cookie name appears once, so the only way a cookie carries several values is one
    // value holding them comma-separated, whatever `explode` says.
    return isArray ? splitOn(',') : undefined
  }
  if (parameter.in === 'query') {
    if (!isArray) return undefined
    const style = parameter.style ?? 'form'
    const explode = parameter.explode ?? style === 'form'
    if (explode) return bothArities
    if (style === 'pipeDelimited') return splitOn('|')
    if (style === 'spaceDelimited') return splitOn(' ')
    if (style === 'form') return splitOn(',')
    return bothArities
  }
  if (parameter.in === 'header') {
    // Optional whitespace may follow each comma, and a header sent several times reaches
    // the handler joined by ", ".
    return isArray ? splitOn(',', true) : undefined
  }
  const style = parameter.style ?? 'simple'
  const explode = parameter.explode ?? false
  if (style === 'label') {
    const strip = String.raw`val.replace(/^\./,'')`
    return isArray
      ? `(val)=>(typeof val==='string'?${strip}.split(${explode ? "'.'" : "','"}):val)`
      : `(val)=>(typeof val==='string'?${strip}:val)`
  }
  if (style === 'matrix') {
    const name = escapeRegExp(parameter.name).replaceAll('/', String.raw`\/`)
    const strip = `val.replace(/^;${name}=/,'')`
    return isArray
      ? `(val)=>(typeof val==='string'?${strip}.split(${explode ? JSON.stringify(`;${parameter.name}=`) : "','"}):val)`
      : `(val)=>(typeof val==='string'?${strip}:val)`
  }
  return isArray ? `(val)=>(typeof val==='string'?val.split(','):val)` : undefined
}

/**
 * How an object parameter is spread over the request, and the properties it declares.
 *
 * - `deep`: `style: deepObject`, one key per property, `filter[name]=bob&filter[age]=5`.
 * - `spread`: the properties are keys of the request themselves, `name=bob&age=5`: a
 *   `form` query parameter that explodes (the default), and a cookie that does.
 * - `value`: the parameter is one value that holds the object, read by `reader`:
 *   `filter=name,bob,age,5`, a path segment `name=bob,age=5`, a header `name,bob,age,5`.
 */
export type WireObject = {
  readonly name: string
  readonly how: 'deep' | 'spread' | 'value'
  readonly properties: readonly string[]
  readonly reader?: string
}

function resolveObject(
  schema: Schema,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): Schema | undefined {
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return undefined
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target === undefined ? undefined : resolveObject(target, schemas, [...seen, schema.$ref])
  }
  return normalizeTypes(schema.type).includes('object') || schema.properties !== undefined
    ? schema
    : undefined
}

/** Whether a parameter is an object, whatever its location and style. */
export function isObjectParameter(parameter: Parameter, schemas: Schemas | undefined): boolean {
  return parameter.schema !== undefined && resolveObject(parameter.schema, schemas) !== undefined
}

/**
 * The function that reads one value holding an object, as source. `strip` is the source of
 * what takes the prefix of the style off the text; `separator` is what stands between the
 * parts. With `assignments` each part is `name=value`; without, names and values alternate.
 * A value that does not come apart that way — a name left without its value, a part with no
 * `=` — is handed on as the text it is, for the schema to reject. `Object.fromEntries`
 * defines each key as a property of its own, so a name such as `__proto__` stays a name.
 */
function objectReader(strip: string, separator: string, assignments: boolean, trim = false) {
  const parts = `${strip}.split(${JSON.stringify(separator)})${trim ? '.map((part)=>part.trim())' : ''}`
  return assignments
    ? `(val)=>{if(typeof val!=='string')return val;const parts=${parts};const entries=parts.flatMap((part)=>{const at=part.indexOf('=');return at<0?[]:[[part.slice(0,at),part.slice(at+1)]]});if(entries.length!==parts.length)return val;return Object.fromEntries(entries)}`
    : `(val)=>{if(typeof val!=='string')return val;const parts=${parts};if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`
}

/**
 * The way a parameter that is an object is read, or `undefined` when the parameter is not
 * one or cannot be read: an object whose properties are keys of the request and which
 * declares none, so that its keys cannot be told from those of other parameters.
 */
export function wireObject(
  parameter: Parameter,
  schemas: Schemas | undefined,
): WireObject | undefined {
  if (parameter.schema === undefined) return undefined
  const object = resolveObject(parameter.schema, schemas)
  if (object === undefined) return undefined
  const properties = Object.keys(object.properties ?? {})
  const name = parameter.name
  const value = (reader: string): WireObject => ({ name, how: 'value', properties, reader })
  const spread = (): WireObject | undefined =>
    properties.length > 0 ? { name, how: 'spread', properties } : undefined
  if (parameter.in === 'query') {
    const style = parameter.style ?? 'form'
    if (style === 'deepObject') return { name, how: 'deep', properties }
    if (parameter.explode ?? style === 'form') return spread()
    const separator = style === 'pipeDelimited' ? '|' : style === 'spaceDelimited' ? ' ' : ','
    return value(objectReader('val', separator, false))
  }
  if (parameter.in === 'cookie') {
    return (parameter.explode ?? true) ? spread() : value(objectReader('val', ',', false))
  }
  const explode = parameter.explode ?? false
  if (parameter.in === 'header') return value(objectReader('val', ',', explode, true))
  const style = parameter.style ?? 'simple'
  if (style === 'label') {
    return value(objectReader(String.raw`val.replace(/^\./,'')`, explode ? '.' : ',', explode))
  }
  if (style === 'matrix') {
    const prefix = escapeRegExp(name).replaceAll('/', String.raw`\/`)
    return explode
      ? value(objectReader(`val.replace(/^;/,'')`, ';', true))
      : value(objectReader(`val.replace(/^;${prefix}=/,'')`, ',', false))
  }
  return value(objectReader('val', ',', explode))
}

/**
 * The function that gathers the keys of a query, or of the cookies, into the object
 * parameters among them, as source, or `undefined` when none is spread over several keys.
 * `taken` are the names of the other parameters there: a key that is a parameter of its
 * own is never read as the property of an exploded object.
 */
export function wireGather(
  objects: readonly WireObject[],
  taken: readonly string[],
): string | undefined {
  const deep = objects.filter((object) => object.how === 'deep').map((object) => object.name)
  const spread = objects
    .filter((object) => object.how === 'spread')
    .flatMap((object) =>
      object.properties
        .filter((property) => !taken.includes(property))
        .map((property) => [property, object.name] as const),
    )
  if (deep.length === 0 && spread.length === 0) return undefined
  const steps = [
    'const rest:[string,unknown][]=[]',
    'const groups=new Map<string,[string,unknown][]>()',
    'const put=(name:string,key:string,item:unknown)=>{groups.set(name,[...(groups.get(name)??[]),[key,item]])}',
    ...(deep.length > 0 ? [`const deep=${JSON.stringify(deep)}`] : []),
    ...(spread.length > 0
      ? [`const spread=new Map<string,string>(${JSON.stringify(spread)})`]
      : []),
    `for(const [key,item] of Object.entries(val)){${[
      ...(deep.length > 0
        ? [
            String.raw`const match=/^([^\[\]]+)\[([^\[\]]*)\]$/.exec(key);const name=match?.[1];const property=match?.[2];if(name!==undefined&&property!==undefined&&deep.includes(name)){put(name,property,item);continue}`,
          ]
        : []),
      ...(spread.length > 0
        ? ['const owner=spread.get(key);if(owner!==undefined){put(owner,key,item);continue}']
        : []),
      'rest.push([key,item])',
    ].join(';')}}`,
    'return Object.fromEntries([...rest,...[...groups].map(([name,group])=>[name,Object.fromEntries(group)])])',
  ]
  return `(val)=>{${steps.join(';')}}`
}

/**
 * `allowEmptyValue: true` lets a query parameter be sent with no value, `?page=`, to say
 * the same as leaving it out. Text that holds nothing is then read as absent, so that a
 * default applies and an optional parameter passes. A string is left alone: the empty
 * string is a value of its own.
 */
export const WIRE_EMPTY = "(val)=>(val===''?undefined:val)"

/** Whether an empty value of the parameter is read as absent. */
export function isEmptyAbsent(parameter: Parameter, schemas: Schemas | undefined): boolean {
  if (parameter.in !== 'query' || parameter.allowEmptyValue !== true) return false
  if (parameter.schema === undefined) return false
  const kinds = wireKinds(parameter.schema, schemas)
  return kinds === undefined || !kinds.includes('string')
}
