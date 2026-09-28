import { isSchemaArray } from '../guard/index.js'
import type { Parameter, Schema } from '../openapi/index.js'
import { normalizeTypes } from '../utils/index.js'

/**
 * What a parameter value can turn into once it leaves the wire. A path, query, header or
 * cookie value always arrives as text, so the kind says which text is read as which type.
 */
// `truth` is a boolean a schema does not declare: a schema that names no type takes a
// boolean like any other value, and for it only `true` and `false` spell one. The words
// `z.stringbool()` adds (`1`, `yes`, `on`) are for a schema that asks for a boolean.
type WireKind = 'integer' | 'number' | 'bigint' | 'boolean' | 'truth' | 'string'

type Schemas = { readonly [k: string]: Schema }

const SCHEMA_REF_PREFIX = '#/components/schemas/'

// `z.coerce.number()` is `Number(input)`, which reads `""` and `" "` as 0, `"0x10"` as 16
// and `"0b11"` as 3. A decimal literal is what a parameter means, so the text is matched
// before it is converted, and text that does not match stays a string for the schema to
// reject. A number may leave out the digits on one side of its point (`.5`, `5.`) and carry
// an exponent; a sign other than `-`, whitespace and the other radixes are not part of it.
// An integer is read with the same grammar: JSON Schema calls a number with no fraction an
// integer, so `1.0` and `1e3` are integers, and it is the schema that says `1.5` is not.
// Both patterns are read by an attacker's input, so neither may backtrack: after `\d+` the
// fraction has to start with its point, which leaves one way to match a run of digits.
// `\d+\.?\d*` has as many ways as the run has digits, and takes seconds on a long one.
const INTEGER_TEXT = String.raw`/^-?\d+$/`
const NUMBER_TEXT = String.raw`/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/`
// An integer beyond 2^53 cannot be held by a number: `Number("9007199254740993")` is
// 9007199254740992. It is left as text, so the request is rejected instead of answered
// with a neighbouring value.
const IS_NUMBER = `${NUMBER_TEXT}.test(val)&&(!${INTEGER_TEXT}.test(val)||Number.isSafeInteger(Number(val)))`
// A bigint holds every digit of a run of digits. Any other spelling of a whole number
// (`1.0`, `1e3`) goes through a number, which holds it as long as it is a safe integer.
const READ_NUMBER = `(val)=>(typeof val==='string'&&${IS_NUMBER}?Number(val):val)`
const READ_BIGINT = `(val)=>{if(typeof val!=='string'||!${NUMBER_TEXT}.test(val))return val;if(${INTEGER_TEXT}.test(val))return BigInt(val);const num=Number(val);return Number.isSafeInteger(num)?BigInt(num):val}`
// What spells a boolean is Zod's to say: `z.stringbool()` reads it, built once and asked on
// every value. Text it does not read is handed on as it is.
const READ_TRUTH = "(val)=>(val==='true'?true:val==='false'?false:val)"
const READ_BOOLEAN =
  '((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool())'

const ALL_SCALARS: readonly WireKind[] = ['number', 'truth', 'string']

/**
 * Reads the text `null` as the value. OpenAPI gives `null` no spelling of its own in a
 * parameter, and JSON's is the one a client reaches for.
 */
export const WIRE_NULL = "(val)=>(val==='null'?null:val)"

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
    if (kind === 'boolean' && b.includes('truth')) return ['boolean']
    if (kind === 'truth' && b.includes('boolean')) return ['boolean']
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
    // object or a date has none. `null` alone is a scalar no text is read as, which leaves
    // a union it is a branch of with the readings of the others.
    if (typed.length > 0) return [...new Set(typed)]
    return types.every((type) => type === 'null') ? [] : undefined
  }
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
  const hasConstraint =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined ||
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined
  // A schema that names no type takes a value of any: a typeless `minimum` bounds a number
  // and says nothing about text, a typeless `minLength` the reverse. One that constrains
  // nothing takes the text as it is.
  return hasConstraint ? ALL_SCALARS : ['string']
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
 * The functions that read wire text as the kinds given, as source, in the order they are
 * tried: a number, a bigint, a boolean. Each hands on unchanged what it does not read —
 * text that is not of its kind, and anything that is not text, `undefined` included — so
 * the schema behind it reports a missing value as missing and a malformed one as malformed.
 */
function wireReaders(kinds: readonly WireKind[]): readonly string[] {
  return [
    ...(kinds.includes('number') || kinds.includes('integer') ? [READ_NUMBER] : []),
    ...(kinds.includes('bigint') ? [READ_BIGINT] : []),
    ...(kinds.includes('boolean') ? [READ_BOOLEAN] : kinds.includes('truth') ? [READ_TRUTH] : []),
  ]
}

/**
 * One function that reads wire text as the first of the kinds given that it spells, as
 * source, or `undefined` when there is nothing to convert. It is what reads an element of
 * a tuple, where a value is converted in place and cannot be tried a second way.
 *
 * `keep` lists the text that is a valid value as it stands (the string members of a mixed
 * `enum`), which is therefore never converted.
 */
export function wireConverter(
  kinds: readonly WireKind[],
  keep: readonly string[] = [],
): string | undefined {
  const readers = wireReaders(kinds)
  const [only] = readers
  if (only === undefined) return undefined
  if (readers.length === 1 && keep.length === 0) return only
  const guard = keep.length > 0 ? `if(${JSON.stringify(keep)}.includes(val))return val;` : ''
  return `((readers)=>(val:unknown)=>{${guard}for(const read of readers){const result=read(val);if(result!==val)return result}return val})([${readers.map((reader) => reader.replace('(val)=>', '(val:unknown)=>')).join(',')}])`
}

/**
 * Wraps a schema so that it reads wire text. Text that spells one kind of value is read
 * by a converter around the schema — by `z.stringbool()` itself for an inline schema that
 * only takes booleans. Text that may spell several — `1` is a number and a string, and in
 * `anyOf: [{ type: integer, minimum: 5 }, { type: string }]` only the string is valid — is
 * tried as each in turn, and the first reading the schema accepts is the value. The schema
 * is returned as it is when its kinds need no conversion.
 */
export function wrapWire(
  zod: string,
  kinds: readonly WireKind[],
  component = false,
  // The text `null` is tried as the value after every other reading.
  nullLast = false,
): string {
  const readers = wireReaders(kinds)
  const [only] = readers
  if (only === undefined) return zod
  if (readers.length === 1 && !kinds.includes('string')) {
    // `z.stringbool()` is a pipe of its own, and the document reads a pipe by its input: a
    // component behind it would be described as a string and left out of the definitions.
    // A component is therefore read inside a `z.preprocess`, which the document looks
    // through — by `z.stringbool()` still, asked from the converter.
    return only === READ_BOOLEAN && !component
      ? `z.stringbool().pipe(${zod})`
      : `z.preprocess(${only},${zod})`
  }
  const readings = [
    ...readers.map((reader) => `z.preprocess(${reader},schema)`),
    ...(kinds.includes('string') ? ['schema'] : []),
    ...(nullLast ? [`z.preprocess(${WIRE_NULL},schema)`] : []),
  ]
  return `((schema)=>z.union([${readings.join(',')}]))(${zod})`
}

/** Whether text of these kinds is tried as several readings, one after the other. */
export function hasSeveralReadings(kinds: readonly WireKind[]): boolean {
  return wireReaders(kinds).length + (kinds.includes('string') ? 1 : 0) > 1
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

/**
 * Reads a form-encoded parameter (`content: application/x-www-form-urlencoded`) before it
 * is validated: one value that holds `a=1&b=x`. A name sent several times is an array. The
 * object is built without a prototype, so a name such as `__proto__` stays a name.
 */
export const WIRE_FORM =
  "(val)=>{if(typeof val!=='string')return val;const fields:Record<string,unknown>=Object.create(null);for(const [name,item] of new URLSearchParams(val)){const held=fields[name];fields[name]=held===undefined?item:[...(Array.isArray(held)?held:[held]),item]}return fields}"

/** Reads a JSON-encoded parameter (`content: application/json`) before it is validated. */
export const WIRE_JSON =
  "(val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}}"

/**
 * The expression that takes the prefix of a style off `val`, as source. A `label` or
 * `matrix` value is the prefix and what follows, so text that does not start with it is not
 * a value of the parameter: it is read as `undefined`, which the schema rejects. `empty` is
 * how the style spells a value that holds nothing, `;id` beside `;id=5`.
 */
function unprefixed(prefix: string, empty?: string, separator?: string) {
  const held = `val.startsWith(${JSON.stringify(prefix)})?val.slice(${prefix.length}):undefined`
  const rest = empty === undefined ? held : `val===${JSON.stringify(empty)}?'':${held}`
  // An array is what is left, split on what stands between its elements.
  const read = separator === undefined ? rest : `(${rest})?.split(${JSON.stringify(separator)})`
  return `(val)=>(typeof val!=='string'?val:${read})`
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
    return unprefixed('.', undefined, isArray ? (explode ? '.' : ',') : undefined)
  }
  if (style === 'matrix') {
    const assigned = `;${parameter.name}=`
    return unprefixed(
      assigned,
      `;${parameter.name}`,
      isArray ? (explode ? assigned : ',') : undefined,
    )
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
 *
 * An object is `open` when it declares `additionalProperties`: it takes keys it does not
 * name.
 */
export type WireObject = {
  readonly name: string
  readonly how: 'deep' | 'spread' | 'value'
  readonly properties: readonly string[]
  readonly reader?: string
  readonly open?: true
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
 * The function that reads one value holding an object, as source. `separator` is what
 * stands between the parts. With `assignments` each part is `name=value`; without, names and values alternate.
 * A part with no `=` continues the value before it, which held the separator: a decimal
 * in an exploded `label`, `.a=1.5`. A value that does not come apart — a name left without
 * its value, no `=` in its first part — is handed on as the text it is, for the schema to
 * reject. `Object.fromEntries`
 * defines each key as a property of its own, so a name such as `__proto__` stays a name.
 */
function objectReader(
  separator: string,
  assignments: boolean,
  trim = false,
  // What the style puts before the object; text that does not start with it is not one.
  prefix = '',
) {
  const guard =
    prefix === '' ? '' : `if(!val.startsWith(${JSON.stringify(prefix)}))return undefined;`
  const text = prefix === '' ? 'val' : `val.slice(${prefix.length})`
  const parts = `${text}.split(${JSON.stringify(separator)})${trim ? '.map((part)=>part.trim())' : ''}`
  return assignments
    ? `(val)=>{if(typeof val!=='string')return val;${guard}const parts=${parts};const entries:[string,string][]=[];for(const part of parts){const at=part.indexOf('=');const last=entries.at(-1);if(at>=0){entries.push([part.slice(0,at),part.slice(at+1)])}else if(last===undefined){return val}else{last[1]+=${JSON.stringify(separator)}+part}}return Object.fromEntries(entries)}`
    : `(val)=>{if(typeof val!=='string')return val;${guard}const parts=${parts};if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`
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
  const open = object.additionalProperties !== undefined && object.additionalProperties !== false
  const spread = (): WireObject | undefined =>
    properties.length > 0 || open
      ? { name, how: 'spread', properties, ...(open ? { open: true as const } : {}) }
      : undefined
  if (parameter.in === 'query') {
    const style = parameter.style ?? 'form'
    if (style === 'deepObject') return { name, how: 'deep', properties }
    if (parameter.explode ?? style === 'form') return spread()
    const separator = style === 'pipeDelimited' ? '|' : style === 'spaceDelimited' ? ' ' : ','
    return value(objectReader(separator, false))
  }
  if (parameter.in === 'cookie') {
    return (parameter.explode ?? true) ? spread() : value(objectReader(',', false))
  }
  const explode = parameter.explode ?? false
  if (parameter.in === 'header') return value(objectReader(',', explode, true))
  const style = parameter.style ?? 'simple'
  if (style === 'label') {
    return value(objectReader(explode ? '.' : ',', explode, false, '.'))
  }
  if (style === 'matrix') {
    return explode
      ? value(objectReader(';', true, false, ';'))
      : value(objectReader(',', false, false, `;${name}=`))
  }
  return value(objectReader(',', explode))
}

// How deep a `deepObject` key may reach. A key is read by a function that calls itself
// once for each pair of brackets, and the key is the client's to write: one that reaches
// deeper than any schema does is left as a key of the query, which nothing declares.
const DEEP_OBJECT_DEPTH = 16

/**
 * The function that gathers the keys of a query, or of the cookies, into the object
 * parameters among them, as source, or `undefined` when none is spread over several keys.
 * `taken` are the names of the other parameters there: a key that is a parameter of its
 * own is never read as the property of an exploded object.
 *
 * - A `deepObject` key names a path into the object: `filter[name]`, a nested
 *   `filter[range][min]`, and an element of an array by an empty pair of brackets or by
 *   its index, `filter[tags][]` and `filter[tags][0]`. An element that is an object takes
 *   the keys written behind it, `filter[list][][x]`: a key goes to the first element that
 *   does not hold it yet, which is how the elements of a list written in order come apart.
 * - A key that several exploded objects declare is a property of each of them.
 * - A key that nothing declares is a property of every exploded object that is open.
 *
 * The objects are built without a prototype, so a key such as `__proto__` stays a key.
 */
export function wireGather(
  objects: readonly WireObject[],
  taken: readonly string[],
): string | undefined {
  const deep = objects.filter((object) => object.how === 'deep').map((object) => object.name)
  const exploded = objects.filter((object) => object.how === 'spread')
  const declared = [
    ...new Set(
      exploded.flatMap((object) =>
        object.properties.filter((property) => !taken.includes(property)),
      ),
    ),
  ]
  const spread = declared.map(
    (property) =>
      [
        property,
        exploded
          .filter((object) => object.properties.includes(property))
          .map((object) => object.name),
      ] as const,
  )
  const open = exploded.filter((object) => object.open === true).map((object) => object.name)
  if (deep.length === 0 && spread.length === 0 && open.length === 0) return undefined
  const steps = [
    'const rest:[string,unknown][]=[]',
    'const groups=new Map<string,Record<string,unknown>>()',
    'const group=(name:string)=>{const found=groups.get(name);if(found!==undefined)return found;const made:Record<string,unknown>=Object.create(null);groups.set(name,made);return made}',
    ...(deep.length > 0
      ? [
          "const isGroup=(item:unknown):item is Record<string,unknown>=>typeof item==='object'&&item!==null&&!Array.isArray(item)",
          'const lists=new WeakSet<object>()',
          String.raw`const isIndex=(part:string|undefined)=>part!==undefined&&/^\d*$/.test(part)`,
          'const child=(target:Record<string,unknown>,key:string,asList:boolean)=>{const held=target[key];if(isGroup(held))return held;const made:Record<string,unknown>=Object.create(null);if(asList)lists.add(made);target[key]=made;return made}',
          "const set=(target:Record<string,unknown>,path:readonly string[],item:unknown):void=>{const [head,...tail]=path;if(head===undefined)return;const [next]=tail;if(head===''){for(const one of Array.isArray(item)?item:[item]){const size=Object.keys(target).length;if(next===undefined){target[String(size)]=one;continue}const free=next===''?-1:Object.values(target).findIndex((held)=>isGroup(held)&&!(next in held));set(child(target,String(free<0?size:free),isIndex(next)),tail,one)}return}if(next===undefined){target[head]=item;return}set(child(target,head,isIndex(next)),tail,item)}",
          'const settle=(item:unknown):unknown=>{if(!isGroup(item))return item;const held=Object.entries(item).map(([key,inner])=>[key,settle(inner)] as const);return lists.has(item)?[...held].sort((a,b)=>Number(a[0])-Number(b[0])).map(([,inner])=>inner):Object.assign(Object.create(null),Object.fromEntries(held))}',
          `const deep:string[]=${JSON.stringify(deep)}`,
        ]
      : []),
    ...(spread.length > 0
      ? [`const spread=new Map<string,string[]>(${JSON.stringify(spread)})`]
      : []),
    ...(open.length > 0
      ? [
          `const open:string[]=${JSON.stringify(open)}`,
          `const taken:string[]=${JSON.stringify(taken)}`,
        ]
      : []),
    `for(const [key,item] of Object.entries(val)){${[
      ...(deep.length > 0
        ? [
            String.raw`const match=/^([^\[\]]+)((?:\[[^\[\]]*\])+)$/.exec(key);const name=match?.[1];const path=match?.[2];if(name!==undefined&&path!==undefined&&deep.includes(name)){const parts=path.slice(1,-1).split('][');if(parts.length<=${DEEP_OBJECT_DEPTH}){set(group(name),parts,item);continue}}`,
          ]
        : []),
      ...(spread.length > 0
        ? [
            'const owners=spread.get(key);if(owners!==undefined){for(const owner of owners){group(owner)[key]=item}continue}',
          ]
        : []),
      ...(open.length > 0
        ? ['if(!taken.includes(key)){for(const owner of open){group(owner)[key]=item}}']
        : []),
      'rest.push([key,item])',
    ].join(';')}}`,
    deep.length > 0
      ? 'return Object.fromEntries([...rest,...[...groups].map(([name,held])=>[name,settle(held)] as const)])'
      : 'return Object.fromEntries([...rest,...groups])',
  ]
  return `(val)=>{${steps.join(';')}}`
}

// Whether a schema may take `null`. A schema that names no type takes a value of any, so
// this errs towards yes: the text is then tried as `null`, and the schema says whether it is.
function mayTakeNull(
  schema: Schema | boolean,
  schemas: Schemas | undefined,
  seen: readonly string[] = [],
): boolean {
  if (typeof schema === 'boolean') return schema
  if (schema.nullable === true) return true
  const types = normalizeTypes(schema.type)
  if (types.length > 0) return types.includes('null')
  if (schema.$ref !== undefined) {
    if (seen.includes(schema.$ref)) return false
    const target = resolveSchemaRef(schema.$ref, schemas)
    return target !== undefined && mayTakeNull(target, schemas, [...seen, schema.$ref])
  }
  if (schema.const !== undefined) return schema.const === null
  if (schema.enum !== undefined) return schema.enum.includes(null)
  const union = [...(schema.anyOf ?? []), ...(schema.oneOf ?? [])]
  return (
    (union.length === 0 || union.some((branch) => mayTakeNull(branch, schemas, seen))) &&
    (schema.allOf ?? []).every((branch) => mayTakeNull(branch, schemas, seen))
  )
}

// Whether a schema takes any text as the string it is, which leaves nothing for a second
// reading of the text to be tried for.
function takesEveryText(schema: Schema | boolean): boolean {
  if (typeof schema === 'boolean') return schema
  return (
    normalizeTypes(schema.type).includes('string') &&
    Object.keys(schema).every((key) =>
      [
        'type',
        'nullable',
        'default',
        'description',
        'title',
        'example',
        'examples',
        'deprecated',
      ].includes(key),
    )
  )
}

/**
 * Where the text `null` is read as the value, or `undefined` when it is not: by a schema
 * that does not take `null`, and by one that takes every text, for which `null` is text
 * like any other.
 *
 * - `first`: the schema takes no string, so the text can mean nothing else.
 * - `last`: the schema takes strings, so the text is the value only when it is not valid as
 *   the string: `not: { type: string }`, a string `enum` beside `null`.
 */
export function nullReading(
  schema: Schema | boolean,
  schemas: Schemas | undefined,
): 'first' | 'last' | undefined {
  const kinds = wireKinds(schema, schemas)
  if (kinds === undefined) {
    // An array whose elements are no strings has no element the text `null` could be.
    if (typeof schema === 'boolean' || !normalizeTypes(schema.type).includes('array')) {
      return undefined
    }
    const items = schema.items
    if (items === undefined || typeof items === 'boolean' || isSchemaArray(items)) return undefined
    const elements = wireKinds(items, schemas)
    return elements !== undefined && !elements.includes('string') && mayTakeNull(schema, schemas)
      ? 'first'
      : undefined
  }
  if (!mayTakeNull(schema, schemas)) return undefined
  if (!kinds.includes('string')) return 'first'
  return takesEveryText(schema) ? undefined : 'last'
}

/**
 * A query, the headers and the cookies reach the schema as a plain object, and a plain
 * object answers to `constructor` and `toString` whether they were sent or not. A parameter
 * of such a name that was not sent is read as what the object inherits: a function, or for
 * `__proto__` the prototype itself. Nothing on the wire is either, so both are read as absent.
 */
export const WIRE_INHERITED =
  "(val)=>(typeof val==='function'||val===Object.prototype?undefined:val)"

/** Whether a parameter is named like something every object inherits. */
export function isInheritedName(parameter: Parameter): boolean {
  return parameter.in !== 'path' && parameter.name in Object.prototype
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
