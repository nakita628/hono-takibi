import { isSchemaArray, isSchemaObject } from '../guard/index.js'
import type { Schema, Type } from '../openapi/index.js'
import {
  makeSafeKey,
  makeStringLiteral,
  normalizeTypes,
  toIdentifierPascalCase,
} from '../utils/index.js'

const FORMAT_TO_FAKER: { [k: string]: string } = {
  date: 'faker.date.past().toISOString().slice(0, 10)',
  'date-time': 'faker.date.past().toISOString()',
  time: 'faker.date.past().toISOString().slice(11, 19)',
  uri: 'faker.internet.url()',
  url: 'faker.internet.url()',
  email: 'faker.internet.email()',
  ipv4: 'faker.internet.ipv4()',
  ipv6: 'faker.internet.ipv6()',
  hostname: 'faker.internet.domainName()',
  uuid: 'faker.string.uuid()',
  password: 'faker.internet.password()',
  city: 'faker.location.city()',
  country: 'faker.location.country()',
  streetName: 'faker.location.street()',
  zipCode: 'faker.location.zipCode()',
  firstName: 'faker.person.firstName()',
  lastName: 'faker.person.lastName()',
  userName: 'faker.internet.username()',
  phoneNumber: 'faker.phone.number()',
  jobTitle: 'faker.person.jobTitle()',
  gender: 'faker.person.gender()',
  bic: 'faker.finance.bic()',
  iban: 'faker.finance.iban()',
  binary: 'new File([faker.string.alphanumeric(100)], faker.system.fileName())',
  byte: 'btoa(faker.string.alphanumeric(10))',
  int32: 'faker.number.int({ min: -2147483648, max: 2147483647 })',
  int64: 'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
  uint32: 'faker.number.int({ min: 0, max: 4294967295 })',
  uint64: 'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
  bigint: 'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
  float: 'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
  double: 'faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })',
  // The string formats the zod generator validates (`generator/zod-to-openapi/z/string.ts`),
  // so a mocked value passes the route's own `z.<format>()` check.
  uuidv4: 'faker.string.uuid({ version: 4 })',
  uuidv6: 'faker.string.uuid({ version: 6 })',
  uuidv7: 'faker.string.uuid({ version: 7 })',
  guid: 'faker.string.uuid()',
  ulid: 'faker.string.ulid()',
  nanoid: 'faker.string.nanoid()',
  // oxlint-disable-next-line no-template-curly-in-string -- the placeholder belongs to the emitted template literal
  cuid: "`c${faker.string.alphanumeric({ length: 24, casing: 'lower' })}`",
  cuid2: "faker.string.alphanumeric({ length: 24, casing: 'lower' })",
  jwt: 'faker.internet.jwt()',
  emoji: 'faker.internet.emoji()',
  mac: 'faker.internet.mac()',
  hex: "faker.string.hexadecimal({ length: 16, prefix: '' })",
  base64: 'btoa(faker.string.alphanumeric(12))',
  base64url: 'faker.string.alphanumeric(16)',
  // oxlint-disable-next-line no-template-curly-in-string -- the placeholder belongs to the emitted template literal
  cidrv4: '`${faker.internet.ipv4()}/${faker.number.int({ min: 0, max: 32 })}`',
  // oxlint-disable-next-line no-template-curly-in-string -- the placeholder belongs to the emitted template literal
  cidrv6: '`${faker.internet.ipv6()}/${faker.number.int({ min: 0, max: 128 })}`',
  // oxlint-disable-next-line no-template-curly-in-string -- the placeholder belongs to the emitted template literal
  duration: '`P${faker.number.int({ min: 1, max: 30 })}D`',
  e164: "faker.phone.number({ style: 'international' })",
  httpUrl: 'faker.internet.url()',
  creditCard: 'faker.finance.creditCardNumber()',
  // `faker.finance.currencyCode()` draws from a wider list than `z.currencyCode()` accepts.
  currencyCode: "faker.helpers.arrayElement(['USD', 'EUR', 'JPY', 'GBP'])",
  ksuid: 'faker.string.alphanumeric(27)',
  xid: "faker.string.fromCharacters('0123456789abcdefghijklmnopqrstuv', 20)",
  'uri-reference': 'faker.internet.url()',
  iri: 'faker.internet.url()',
  'iri-reference': 'faker.internet.url()',
  'idn-email': 'faker.internet.email()',
  'idn-hostname': 'faker.internet.domainName()',
  decimal: 'faker.commerce.price()',
}

const TYPE_TO_FAKER: { [k: string]: string } = {
  string: 'faker.string.alpha({ length: { min: 5, max: 20 } })',
  number: 'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
  integer: 'faker.number.int({ min: 1, max: 1000 })',
  boolean: 'faker.datatype.boolean()',
  null: 'null',
}

const PROPERTY_NAME_TO_FAKER: { [k: string]: string } = {
  id: 'faker.number.int({ min: 1, max: 99999 })',
  uuid: 'faker.string.uuid()',
  email: 'faker.internet.email()',
  name: 'faker.person.fullName()',
  firstName: 'faker.person.firstName()',
  lastName: 'faker.person.lastName()',
  username: 'faker.internet.username()',
  password: 'faker.internet.password()',
  phone: 'faker.phone.number()',
  address: 'faker.location.streetAddress()',
  city: 'faker.location.city()',
  state: 'faker.location.state()',
  country: 'faker.location.country()',
  zip: 'faker.location.zipCode()',
  zipCode: 'faker.location.zipCode()',
  url: 'faker.internet.url()',
  website: 'faker.internet.url()',
  createdAt: 'faker.date.past().toISOString()',
  updatedAt: 'faker.date.recent().toISOString()',
  deletedAt: 'faker.date.past().toISOString()',
  title: 'faker.lorem.sentence()',
  description: 'faker.lorem.paragraph()',
  content: 'faker.lorem.paragraphs(2)',
  status: "faker.helpers.arrayElement(['active', 'inactive', 'pending'])",
  type: "faker.helpers.arrayElement(['A', 'B', 'C'])",
  price: 'faker.number.float({ min: 1, max: 10000, fractionDigits: 2 })',
  quantity: 'faker.number.int({ min: 1, max: 100 })',
  count: 'faker.number.int({ min: 0, max: 1000 })',
  age: 'faker.number.int({ min: 1, max: 120 })',
}

// `Object.hasOwn`: a document value such as `format: constructor` or a property
// named `toString` must not resolve to an `Object.prototype` member.
function lookup(table: { readonly [k: string]: string }, key: string) {
  return Object.hasOwn(table, key) ? table[key] : undefined
}

// The order the zod generator picks a member of a multi-type (`type: [...]`)
// schema in (`generator/zod-to-openapi/index.ts`), so the mock produces the
// type the route's own schema accepts.
const TYPE_PRIORITY = ['string', 'number', 'integer', 'boolean', 'array', 'object', 'date'] as const

// A format or property-name hint is only a guess, so it is used only when the
// value it produces fits the declared `type` — otherwise the mock contradicts
// the route's own response schema (a string `status` on an `integer` field).
// The value is read off the expression's head (a template literal starts with
// a backtick, so it stays a string). An untyped schema accepts any hint;
// `number` also accepts an integer, and `integer` a bigint (`z.int64()`).
function isHintCompatible(type: Type | undefined, expr: string) {
  if (type === undefined) return true
  const isInt = expr.startsWith('faker.number.int(')
  if (type === 'integer') return isInt || expr.startsWith('faker.number.bigInt(')
  if (type === 'number') return isInt || expr.startsWith('faker.number.float(')
  if (type === 'string') return !expr.startsWith('faker.number.')
  return false
}

// Also tried in camelCase, so `created_at` and `first-name` hit `createdAt` and `firstName`.
function propertyNameHint(propertyName: string) {
  return (
    lookup(PROPERTY_NAME_TO_FAKER, propertyName) ??
    lookup(
      PROPERTY_NAME_TO_FAKER,
      propertyName.replaceAll(/[_-]+([a-zA-Z0-9])/gu, (_: string, c: string) => c.toUpperCase()),
    )
  )
}

/**
 * The name of the generated mock factory for a component schema. Kept as
 * `mock<Name>` (dots dropped) whenever that is already an identifier, so
 * existing output is unchanged; any other name (`User-Profile`) goes through
 * the same sanitizer as the schema consts (`toIdentifierPascalCase`), since
 * OpenAPI component names may contain `-`.
 */
export function mockFunctionName(refName: string) {
  const stripped = refName.replaceAll('.', '')
  return /^[A-Za-z0-9_$]+$/u.test(stripped)
    ? `mock${stripped}`
    : `mock${toIdentifierPascalCase(refName)}`
}

/**
 * Rewrites a `pattern` into the string `faker.helpers.fromRegExp` samples.
 *
 * faker reads a `RegExp` argument through `.source`, where `/` is always
 * escaped as `\/`, and copies that backslash into the value — so a regex
 * literal can never produce a value containing `/` that matches the pattern.
 * Passing a string avoids it, but faker only strips `^`/`$` from a `RegExp`,
 * so the anchors (and the no-op `\/` escape) are removed here instead. The
 * result is emitted as an escaped string literal, never as regex-literal code.
 */
function scanPattern(
  source: string,
  visit: (char: string, index: number, depth: number) => boolean,
) {
  let depth = 0
  let inClass = false
  for (let i = 0; i < source.length; i += 1) {
    const char = source.charAt(i)
    if (char === '\\') {
      i += 1
    } else if (inClass) {
      inClass = char !== ']'
    } else if (char === '[') {
      inClass = true
    } else {
      if (char === ')') depth -= 1
      if (visit(char, i, depth)) return i
      if (char === '(') depth += 1
    }
  }
  return -1
}

function firstAlternative(source: string) {
  const bar = scanPattern(source, (char, _, depth) => char === '|' && depth === 0)
  return bar === -1 ? source : source.slice(0, bar)
}

function expandGroups(source: string): string {
  let open = -1
  const close = scanPattern(source, (char, index) => {
    if (char === '(') open = index
    return char === ')' && open !== -1
  })
  if (close === -1) return firstAlternative(source)
  const inner = source.slice(open + 1, close)
  const isLookaround = /^\?(?:[=!]|<[=!])/u.test(inner)
  const body = firstAlternative(inner.replace(/^\?(?::|<[A-Za-z]\w*>)/u, ''))
  const rest = source.slice(close + 1)
  const quantifier = /^(?:[?*+]|\{(\d+)(?:,\d*)?\})\??/u.exec(rest)
  const symbol = quantifier?.[0].charAt(0)
  const count = isLookaround
    ? 0
    : symbol === undefined || symbol === '+'
      ? 1
      : symbol === '{'
        ? Number(quantifier?.[1])
        : 0
  return expandGroups(
    source.slice(0, open) + body.repeat(count) + rest.slice(quantifier?.[0].length ?? 0),
  )
}

function fakerPattern(pattern: string) {
  return expandGroups(pattern)
    .replace(/^\^+/u, '')
    .replace(/(?<!\\)(?:\\\\)*\$+$/u, (anchor) => anchor.replaceAll('$', ''))
    .replaceAll(
      /\[(?:\\[\s\S]|[^\]\\])*\]|\\([\s\S])/gu,
      (match: string, escaped: string | undefined) => {
        if (escaped === undefined) return match
        if (escaped === '/' || escaped === '-') return escaped
        return '.+*?()$|{}'.includes(escaped) ? `[${escaped}]` : match
      },
    )
}

function boundedPattern(
  pattern: string,
  minLength: number | undefined,
  maxLength: number | undefined,
) {
  if (minLength === undefined && maxLength === undefined) return pattern
  const repeated = /^((?:\[(?:\\.|[^\]\\])+\]|\\[dws]|\.))([+*])$/u.exec(pattern)
  if (!repeated) return pattern
  const [, atom = '', quantifier] = repeated
  const min = minLength ?? Math.min(quantifier === '+' ? 1 : 0, maxLength ?? 0)
  const max = maxLength ?? Math.max(min, 20)
  return `${atom}{${min},${max}}`
}

const BOUNDED_FORMATS: {
  readonly [k: string]: readonly { readonly head: string; readonly tail: string }[]
} = {
  email: [
    { head: '', tail: '@example.com' },
    { head: '', tail: '@a.io' },
  ],
  'idn-email': [
    { head: '', tail: '@example.com' },
    { head: '', tail: '@a.io' },
  ],
  uri: [
    { head: 'https://example.com/', tail: '' },
    { head: 'http://a.io/', tail: '' },
  ],
  url: [
    { head: 'https://example.com/', tail: '' },
    { head: 'http://a.io/', tail: '' },
  ],
  httpUrl: [
    { head: 'https://example.com/', tail: '' },
    { head: 'http://a.io/', tail: '' },
  ],
  hostname: [
    { head: '', tail: '.example.com' },
    { head: '', tail: '.io' },
  ],
  'idn-hostname': [
    { head: '', tail: '.example.com' },
    { head: '', tail: '.io' },
  ],
}

function boundedFormat(schema: Schema) {
  const { format, minLength, maxLength } = schema
  if (format === undefined || (minLength === undefined && maxLength === undefined)) {
    return undefined
  }
  if (format === 'password') {
    const min = minLength ?? Math.min(8, maxLength ?? 8)
    const max = maxLength ?? Math.max(min, 20)
    return `faker.internet.password({ length: faker.number.int({ min: ${min}, max: ${max} }) })`
  }
  const frame = (lookupFrames(format) ?? []).find(
    ({ head, tail }) => maxLength === undefined || maxLength - head.length - tail.length >= 1,
  )
  if (frame === undefined) return undefined
  const fixed = frame.head.length + frame.tail.length
  const min = Math.max(1, (minLength ?? 0) - fixed)
  const max = maxLength === undefined ? Math.max(min, 20) : maxLength - fixed
  return `\`${frame.head}\${faker.string.alpha({ length: { min: ${min}, max: ${max} }, casing: 'lower' })}${frame.tail}\``
}

function lookupFrames(format: string) {
  return Object.hasOwn(BOUNDED_FORMATS, format) ? BOUNDED_FORMATS[format] : undefined
}

// Reads a schema's own example: `example` (OpenAPI 3.0), else the first entry
// of JSON Schema's `examples` array (OpenAPI 3.1).
function schemaExample(schema: Schema): unknown {
  if (schema.example !== undefined) return schema.example
  return Array.isArray(schema.examples) ? schema.examples[0] : undefined
}

// Renders a scalar example as code, or `undefined` when it cannot stand in for
// the schema's type. Object and array examples are not used as a whole: their
// literal would widen enum members to `string` and cannot express `bigint`, so
// they are built from their members instead (whose own examples still apply).
function exampleLiteral(schema: Schema) {
  const example = schemaExample(schema)
  if (example === undefined) return undefined
  const types = normalizeTypes(schema.type)
  // Without a declared type (a `$ref` or combinator sibling) the literal's type
  // cannot be checked against the target, so the generated value is kept.
  if (schema.$ref !== undefined || (types.length === 0 && !schema.enum)) return undefined
  const isAccepted = (type: Type) => types.length === 0 || types.includes(type)
  if (example === null) {
    return types.includes('null') || schema.nullable === true ? 'null' : undefined
  }
  if (schema.enum && !schema.enum.some((member) => member === example)) return undefined
  // An enum member must keep its literal type to satisfy the route's `z.enum`.
  const asConst = schema.enum ? ' as const' : ''
  if (typeof example === 'string') {
    if (!isAccepted('string') || schema.format === 'binary') return undefined
    return `${JSON.stringify(example)}${asConst}`
  }
  if (typeof example === 'number') {
    const isBigint =
      types.includes('integer') &&
      (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint')
    if (isBigint) return Number.isInteger(example) ? `${BigInt(example)}n` : undefined
    if (!(isAccepted('number') || isAccepted('integer'))) return undefined
    if (!(isAccepted('number') || Number.isInteger(example))) return undefined
    return `${JSON.stringify(example)}${asConst}`
  }
  if (typeof example === 'boolean') {
    return isAccepted('boolean') ? `${example}${asConst}` : undefined
  }
  return undefined
}

function hasNumericConstraint(schema: Schema) {
  return (
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined
  )
}

// Normalize JSON Schema / OpenAPI numeric bounds into faker-compatible inclusive
// min/max. `exclusiveMinimum`/`exclusiveMaximum` are either a number (JSON Schema
// 2020-12 / OpenAPI 3.1) or a boolean paired with `minimum`/`maximum` (OpenAPI 3.0).
// faker only takes inclusive bounds, so integers shift by ±1 and floats approximate.
function shiftBound(bound: number, step: number) {
  return Number((bound + step).toFixed(12))
}

function numericRange(
  schema: {
    readonly minimum?: number
    readonly maximum?: number
    readonly exclusiveMinimum?: number | boolean
    readonly exclusiveMaximum?: number | boolean
    readonly multipleOf?: number
    readonly format?: string
  },
  integer: boolean,
) {
  const step = integer ? 1 : (schema.multipleOf ?? (schema.format === 'double' ? 0.0001 : 0.01))
  const exclusiveMin =
    typeof schema.exclusiveMinimum === 'number'
      ? schema.exclusiveMinimum
      : schema.exclusiveMinimum === true
        ? schema.minimum
        : undefined
  const exclusiveMax =
    typeof schema.exclusiveMaximum === 'number'
      ? schema.exclusiveMaximum
      : schema.exclusiveMaximum === true
        ? schema.maximum
        : undefined
  const shiftedMin = exclusiveMin === undefined ? schema.minimum : shiftBound(exclusiveMin, step)
  const shiftedMax = exclusiveMax === undefined ? schema.maximum : shiftBound(exclusiveMax, -step)
  const isInverted =
    !integer && shiftedMin !== undefined && shiftedMax !== undefined && shiftedMin > shiftedMax
  const min = isInverted ? (exclusiveMin ?? schema.minimum) : shiftedMin
  const max = isInverted ? (exclusiveMax ?? schema.maximum) : shiftedMax
  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(schema.multipleOf !== undefined ? { multipleOf: schema.multipleOf } : {}),
  }
}

// Build a faker numeric expression from a resolved range, filling each unset side
// with the format/type default. `faker.number.float` rejects `multipleOf` and
// `fractionDigits` together, so `multipleOf` drops `fractionDigits`.
const OPEN_RANGE_SPAN = 1000

function closedRange(
  range: { readonly min?: number; readonly max?: number },
  defaultMin: number,
  defaultMax: number,
) {
  const min =
    range.min ??
    (range.max === undefined || range.max > defaultMin
      ? defaultMin
      : range.max > 0
        ? 0
        : range.max - OPEN_RANGE_SPAN)
  const max = range.max ?? (min < defaultMax ? defaultMax : min + OPEN_RANGE_SPAN)
  return { min, max }
}

function numericFaker(
  schema: Schema,
  range: { readonly min?: number; readonly max?: number; readonly multipleOf?: number },
) {
  if (
    schema.type === 'integer' &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint')
  ) {
    const { min, max } = closedRange(
      {
        ...(range.min !== undefined ? { min: Math.ceil(range.min) } : {}),
        ...(range.max !== undefined ? { max: Math.floor(range.max) } : {}),
      },
      0,
      9_007_199_254_740_991,
    )
    return `faker.number.bigInt({ min: ${min}n, max: ${max}n })`
  }
  if (schema.type === 'integer') {
    const { min, max } = closedRange(
      range,
      schema.format === 'int32' ? -2_147_483_648 : 1,
      schema.format === 'int32' ? 2_147_483_647 : 1000,
    )
    const parts = [
      `min: ${min}`,
      `max: ${max}`,
      ...(range.multipleOf !== undefined ? [`multipleOf: ${range.multipleOf}`] : []),
    ]
    return `faker.number.int({ ${parts.join(', ')} })`
  }
  const { min, max } = closedRange(range, 1, schema.format === 'double' ? 1_000_000 : 1000)
  const fractionDigits = schema.format === 'double' ? 4 : 2
  const parts =
    range.multipleOf !== undefined
      ? [`min: ${min}`, `max: ${max}`, `multipleOf: ${range.multipleOf}`]
      : [`min: ${min}`, `max: ${max}`, `fractionDigits: ${fractionDigits}`]
  return `faker.number.float({ ${parts.join(', ')} })`
}

const MAX_RECURSION_DEPTH = 2
const MAX_REQUIRED_RECURSION_DEPTH = 16

function containsRecursion(value: string) {
  return value.includes('(depth + 1)')
}

function recursiveCall(schema: Schema, recursive: ReadonlySet<string> | undefined) {
  if (!(schema.$ref && recursive)) return undefined
  const refName = schema.$ref.split('/').at(-1)
  return refName !== undefined && recursive.has(refName)
    ? `${mockFunctionName(refName)}(depth + 1)`
    : undefined
}

export function mockFunctionSignature(refName: string, isRecursive: boolean) {
  return isRecursive
    ? `function ${mockFunctionName(refName)}(depth = 0): any`
    : `function ${mockFunctionName(refName)}()`
}

// Resolves a `$ref` against the component schema map. Returns the schema
// unchanged when it has no `$ref` or the target is unknown (so callers can
// treat unresolved refs conservatively).
function resolveRef(schema: Schema, schemas: { readonly [k: string]: Schema } | undefined): Schema {
  if (!schema.$ref) return schema
  const name = schema.$ref.split('/').at(-1)
  const resolved = name ? schemas?.[name] : undefined
  return resolved ?? schema
}

// Decides whether a schema mocks to a primitive (string/number/enum/const) as
// opposed to an object. Used by the `allOf` branch to tell a scalar refinement
// (e.g. a branded scalar or an enum alias, common in TypeSpec output) from an
// object composition. Anything unresolvable, object-shaped, array, or a union
// is treated as non-scalar so it stays on the object-spread path — this also
// keeps `$ref` members spreadable when no schema map is supplied (unit tests).
function isKnownScalar(
  schema: Schema,
  schemas: { readonly [k: string]: Schema } | undefined,
): boolean {
  const resolved = resolveRef(schema, schemas)
  const types = normalizeTypes(resolved.type)
  if (resolved.enum || resolved.const !== undefined) return true
  if (resolved.properties || types.includes('object')) return false
  if (resolved.allOf && resolved.allOf.length > 0) {
    return resolved.allOf.every((s) => isKnownScalar(s, schemas))
  }
  if (resolved.oneOf || resolved.anyOf || types.includes('array')) return false
  return types.length > 0
}

const HASH_BYTES: { readonly [k: string]: number } = {
  md5: 16,
  sha1: 20,
  sha256: 32,
  sha384: 48,
  sha512: 64,
}

function hashFaker(schema: Schema) {
  const bytes = lookupBytes(schema['x-hashAlg'])
  if (bytes === undefined) return undefined
  const enc = schema['x-hashEnc'] ?? 'hex'
  if (enc === 'hex') {
    return `faker.string.hexadecimal({ length: ${bytes * 2}, casing: 'lower', prefix: '' })`
  }
  const base64 = `btoa(String.fromCharCode(...Array.from({ length: ${bytes} }, () => faker.number.int({ min: 0, max: 255 }))))`
  return enc === 'base64'
    ? base64
    : `${base64}.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')`
}

function lookupBytes(alg: string | undefined) {
  return alg !== undefined && Object.hasOwn(HASH_BYTES, alg) ? HASH_BYTES[alg] : undefined
}

function vendorFormat(schema: Schema) {
  const hash = hashFaker(schema)
  if (hash !== undefined) return hash
  const { format } = schema
  if (schema['x-emailRegex'] !== undefined && format === 'email') {
    return `faker.helpers.fromRegExp(${makeStringLiteral(fakerPattern(schema['x-emailRegex']).replaceAll('.+', '[a-z]{5,10}').replaceAll('.*', '[a-z]{0,10}'))})`
  }
  const version = schema['x-uuidVersion']?.slice(1)
  if (version !== undefined && (format === 'uuid' || format === 'guid')) {
    return `faker.helpers.fromRegExp('[0-9a-f]{8}-[0-9a-f]{4}-${version}[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}')`
  }
  if (schema['x-macDelimiter'] !== undefined && format === 'mac') {
    return `faker.internet.mac().replaceAll(':', ${makeStringLiteral(schema['x-macDelimiter'])})`
  }
  if (schema['x-jwtAlg'] !== undefined && format === 'jwt') {
    return `faker.internet.jwt({ header: { alg: ${makeStringLiteral(schema['x-jwtAlg'])} } })`
  }
  const protocol = /^\^?(https?)\$?$/u.exec(schema['x-urlProtocol'] ?? '')?.[1]
  if (protocol !== undefined && (format === 'uri' || format === 'url')) {
    return `faker.internet.url({ protocol: '${protocol}' })`
  }
  if (format === 'date-time' && schema['x-isoLocal'] === true) {
    return 'faker.date.past().toISOString().slice(0, 19)'
  }
  return undefined
}

function withAffixes(schema: Schema, value: string) {
  const parts = [
    ...(schema['x-startsWith'] === undefined ? [] : [makeStringLiteral(schema['x-startsWith'])]),
    value,
    ...(schema['x-includes'] === undefined ? [] : [makeStringLiteral(schema['x-includes'])]),
    ...(schema['x-endsWith'] === undefined ? [] : [makeStringLiteral(schema['x-endsWith'])]),
  ]
  const joined = parts.length === 1 ? value : `[${parts.join(', ')}].join('')`
  if (schema['x-uppercase'] === true) return `${joined}.toUpperCase()`
  if (schema['x-lowercase'] === true) return `${joined}.toLowerCase()`
  return joined
}

type ObjectShape = {
  readonly required: ReadonlySet<string>
  readonly properties: ReadonlyMap<string, Schema>
  readonly isOpen: boolean
}

function objectShape(
  schema: Schema,
  schemas: { readonly [k: string]: Schema } | undefined,
  seen: ReadonlySet<string> = new Set(),
): ObjectShape | undefined {
  if (schema.$ref) {
    if (seen.has(schema.$ref)) return undefined
    const resolved = resolveRef(schema, schemas)
    return resolved === schema
      ? undefined
      : objectShape(resolved, schemas, new Set([...seen, schema.$ref]))
  }
  if (
    schema.oneOf ||
    schema.anyOf ||
    schema.not ||
    schema['x-refine'] ||
    schema['x-superRefine'] ||
    schema.minProperties !== undefined
  ) {
    return undefined
  }
  const types = normalizeTypes(schema.type)
  if (types.length > 0 && !(types.length === 1 && types[0] === 'object')) return undefined
  const members = (schema.allOf ?? []).map((member) => objectShape(member, schemas, seen))
  if (members.some((member) => member === undefined)) return undefined
  const shapes = members.filter((member) => member !== undefined)
  if (shapes.length === 0 && types.length === 0 && schema.properties === undefined) return undefined
  return {
    required: new Set([...shapes.flatMap((m) => [...m.required]), ...(schema.required ?? [])]),
    properties: new Map([
      ...shapes.flatMap((m) => [...m.properties]),
      ...Object.entries(schema.properties ?? {}),
    ]),
    isOpen: schema.additionalProperties !== false && shapes.every((m) => m.isOpen),
  }
}

function propertyType(
  schema: Schema | undefined,
  schemas: { readonly [k: string]: Schema } | undefined,
) {
  return schema ? normalizeTypes(resolveRef(schema, schemas).type).join(',') : ''
}

function alsoMatches(
  value: ObjectShape,
  other: ObjectShape,
  schemas: { readonly [k: string]: Schema } | undefined,
) {
  return (
    other.isOpen &&
    [...other.required].every(
      (key) =>
        value.required.has(key) &&
        propertyType(other.properties.get(key), schemas) ===
          propertyType(value.properties.get(key), schemas),
    )
  )
}

function exclusiveVariants(
  variants: readonly Schema[],
  schemas: { readonly [k: string]: Schema } | undefined,
) {
  const shapes = variants.map((variant) => objectShape(variant, schemas))
  const exclusive = variants.filter((_, index) => {
    const shape = shapes[index]
    return (
      shape === undefined ||
      shapes.every(
        (other, j) => j === index || other === undefined || !alsoMatches(shape, other, schemas),
      )
    )
  })
  return exclusive.length > 0 ? exclusive : variants
}

function conditionalRequired(schema: Schema) {
  return [...(schema.then?.required ?? []), ...(schema.else?.required ?? [])]
}

export function schemaToFaker(
  schema: Schema,
  propertyName?: string,
  options: {
    readonly arrayMin?: number
    readonly arrayMax?: number
    readonly useExamples?: boolean
    readonly schemas?: { readonly [k: string]: Schema }
    readonly recursive?: ReadonlySet<string>
  } = {},
): string {
  const value = schemaValue(schema, propertyName, options)
  const isGeneratedString =
    schema.type === 'string' &&
    schema.const === undefined &&
    schema.enum === undefined &&
    !value.startsWith('"')
  return isGeneratedString ? withAffixes(schema, value) : value
}

function schemaValue(
  schema: Schema,
  propertyName?: string,
  options: {
    readonly arrayMin?: number
    readonly arrayMax?: number
    readonly useExamples?: boolean
    readonly schemas?: { readonly [k: string]: Schema }
    readonly recursive?: ReadonlySet<string>
  } = {},
): string {
  if (schema.const !== undefined) {
    return `${JSON.stringify(schema.const)} as const`
  }
  if (options.useExamples) {
    const example = exampleLiteral(schema)
    if (example !== undefined) return example
  }
  if (schema.enum && schema.enum.length > 0) {
    const values = schema.enum.map((v) => JSON.stringify(v)).join(', ')
    return `faker.helpers.arrayElement([${values}] as const)`
  }
  if (schema.$ref) {
    const call = recursiveCall(schema, options.recursive)
    if (call !== undefined) return `(depth < ${MAX_REQUIRED_RECURSION_DEPTH} ? ${call} : undefined)`
    // oxlint-disable-next-line typescript/prefer-nullish-coalescing -- an empty trailing segment falls back too
    const refName = schema.$ref.split('/').pop() || 'unknown'
    return `${mockFunctionName(refName)}()`
  }
  // OpenAPI 3.1 / JSON Schema type array: mock the member the zod schema is
  // built from (`TYPE_PRIORITY`, `properties` meaning an object), and let a
  // `'null'` member yield `null` too — the same `.nullable()` zod applies.
  if (Array.isArray(schema.type)) {
    const types: readonly Type[] = schema.type
    const primary =
      schema.properties !== undefined && types.includes('object')
        ? 'object'
        : TYPE_PRIORITY.find((t) => types.includes(t))
    if (primary === undefined) return types.includes('null') ? 'null' : 'undefined'
    const value = schemaToFaker({ ...schema, type: primary }, propertyName, options)
    return types.includes('null') ? `faker.helpers.arrayElement([${value}, null])` : value
  }
  if (schema.type === 'array' && schema.prefixItems && schema.prefixItems.length > 0) {
    return `[${schema.prefixItems.map((item) => schemaToFaker(item, undefined, options)).join(', ')}]`
  }
  if (schema.type === 'array' && schema.items) {
    const itemSchema = isSchemaArray(schema.items) ? schema.items[0] : schema.items
    if (!isSchemaObject(itemSchema)) return '[]'
    const itemCall = recursiveCall(itemSchema, options.recursive)
    const itemFaker = itemCall ?? schemaToFaker(itemSchema, undefined, options)
    // A spec `minItems`/`maxItems` wins so the array satisfies the route's own
    // response schema (which enforces them); `arrayMin`/`arrayMax` then `1`/`10`
    // fill an unconstrained side, clamped against the spec side so a config
    // bound never inverts the range (`arrayMin: 5` with `maxItems: 3` → 3..3).
    // An inverted range written in the spec itself is passed through verbatim,
    // mirroring the numeric range.
    const min = schema.minItems ?? Math.min(options.arrayMin ?? 1, schema.maxItems ?? Infinity)
    const max = schema.maxItems ?? Math.max(options.arrayMax ?? 10, min)
    const length = `faker.number.int({ min: ${min}, max: ${max} })`
    const drawn =
      schema.uniqueItems === true
        ? `faker.helpers.uniqueArray(() => (${itemFaker}), ${length})`
        : `Array.from({ length: ${length} }, () => (${itemFaker}))`
    const contained = schema.contains
      ? Array.from({ length: schema.minContains ?? 1 }, () =>
          schemaToFaker(schema.contains ?? {}, undefined, options),
        )
      : []
    const items = contained.length > 0 ? `[...${drawn}, ${contained.join(', ')}]` : drawn
    const fewest =
      (schema.minItems ?? 0) > 0
        ? `Array.from({ length: ${schema.minItems} }, () => (${itemFaker}))`
        : '[]'
    return itemCall === undefined
      ? items
      : `(depth < ${MAX_RECURSION_DEPTH} ? ${items} : ${fewest})`
  }
  const renderProps = (
    properties: { readonly [k: string]: Schema },
    required: readonly string[] | undefined,
  ) => {
    const requiredSet = new Set(required)
    return Object.entries(properties)
      .map(([k, v]) => {
        const key = makeSafeKey(k)
        const value = schemaToFaker(v, k, options)
        // A `type: [..., 'null']` member already yields `null` from its own value.
        const isNullable = v.nullable === true || normalizeTypes(v.type).includes('null')
        // An optional property may be absent and a nullable one may be null, so
        // the mock exercises both — staying faithful to what the spec allows.
        if (value === 'undefined') {
          return requiredSet.has(k) ? `${key}: null` : `${key}: undefined`
        }
        if (!(requiredSet.has(k) || isNullable)) {
          const optional = `faker.helpers.arrayElement([${value}, undefined])`
          return containsRecursion(value)
            ? `${key}: depth < ${MAX_RECURSION_DEPTH} ? ${optional} : undefined`
            : `${key}: ${optional}`
        }
        if (v.nullable) {
          return `${key}: faker.helpers.arrayElement([${value}, null])`
        }
        return `${key}: ${value}`
      })
      .join(', ')
  }
  if (schema.type === 'object' && schema.properties) {
    const required = [...(schema.required ?? []), ...conditionalRequired(schema)]
    const optional = Object.keys(schema.properties).filter((k) => !required.includes(k))
    const missing = Math.max(0, (schema.minProperties ?? 0) - required.length)
    return `{ ${renderProps(schema.properties, [...required, ...optional.slice(0, missing)])} }`
  }
  if (schema.type === 'object' && !schema.properties && schema.additionalProperties) {
    // A map (`z.record(z.string(), X)`) gets a few entries so consumers see its
    // shape. `additionalProperties: true` says nothing about the values, and
    // `propertyNames`/`patternProperties` constrain keys a random key would
    // violate, so those stay `{}`.
    if (
      typeof schema.additionalProperties === 'boolean' ||
      schema.propertyNames !== undefined ||
      schema.patternProperties !== undefined
    ) {
      return '{}'
    }
    const value = schemaToFaker(schema.additionalProperties, undefined, options)
    const max = schema.maxProperties ?? Math.max(schema.minProperties ?? 1, 3)
    const min = schema.minProperties ?? Math.min(1, max)
    const map = `Object.fromEntries(Array.from({ length: faker.number.int({ min: ${min}, max: ${max} }) }, () => [faker.string.alpha(8), ${value}] satisfies [string, unknown]))`
    return containsRecursion(value) && min === 0
      ? `(depth < ${MAX_RECURSION_DEPTH} ? ${map} : {})`
      : map
  }
  if (schema.allOf && schema.allOf.length > 0) {
    // A scalar refinement (`allOf` of only scalar/enum members, no own
    // properties) is not an object composition — spreading its primitive value
    // would corrupt it (`{ ...'follow' }` → `{0:'f',...}`). A single member (the
    // common branded-scalar / enum-alias wrapper) is delegated without
    // spreading, so a `$ref` member stays `mockX()` (a primitive) and reuses its
    // generator. Multiple members (a constrained scalar split across `allOf`)
    // are merged into one synthetic scalar and recursed. Object members of a
    // mixed `allOf` are spread; scalar members there (a contradictory schema)
    // are dropped since they cannot spread into an object.
    if (!schema.properties && schema.allOf.every((s) => isKnownScalar(s, options.schemas))) {
      const [only] = schema.allOf
      if (schema.allOf.length === 1 && only) {
        return schemaToFaker(only, propertyName, options)
      }
      const mergedScalar = schema.allOf
        .map((s) => resolveRef(s, options.schemas))
        .reduce<Schema>((acc, s) => Object.assign(acc, s), {})
      return schemaToFaker(mergedScalar, propertyName, options)
    }
    const members = schema.allOf.filter((s) => !isKnownScalar(s, options.schemas))
    const spreads = members
      .map((s) => schemaToFaker(s, propertyName, options))
      .filter((member) => member !== 'undefined')
      .map((member) => `...${member}`)
    const resolvedMembers = members.map((s) => resolveRef(s, options.schemas))
    const required = [
      ...(schema.required ?? []),
      ...resolvedMembers.flatMap((member) => member.required ?? []),
    ]
    const promoted = resolvedMembers.flatMap((member) =>
      Object.entries(member.properties ?? {})
        .filter(([k]) => required.includes(k) && !(member.required ?? []).includes(k))
        .map(([k, v]) => renderProps({ [k]: v }, [k])),
    )
    const own = schema.properties ? [renderProps(schema.properties, required)] : []
    return `{ ${[...spreads, ...promoted, ...own].join(', ')} }`
  }
  const union =
    schema.oneOf && schema.oneOf.length > 0
      ? schema.discriminator
        ? schema.oneOf
        : exclusiveVariants(schema.oneOf, options.schemas)
      : schema.anyOf && schema.anyOf.length > 0
        ? schema.anyOf
        : undefined
  if (union) {
    const variants = union.map((s) => ({
      call: recursiveCall(s, options.recursive),
      value: schemaToFaker(s, propertyName, options),
    }))
    const terminal = variants.filter(({ call }) => call === undefined).map(({ value }) => value)
    if (terminal.length > 0 && terminal.length < variants.length) {
      const all = variants.map(({ call, value }) => call ?? value)
      return `(depth < ${MAX_RECURSION_DEPTH} ? faker.helpers.arrayElement([${all.join(', ')}]) : faker.helpers.arrayElement([${terminal.join(', ')}]))`
    }
    return `faker.helpers.arrayElement([${variants.map(({ value }) => value).join(', ')}])`
  }
  // Numeric constraints win over format/property-name defaults so generated
  // values satisfy the schema's bounds (minimum/maximum/exclusive*/multipleOf).
  // Type arrays were narrowed to a single member above.
  const type = typeof schema.type === 'string' ? schema.type : undefined
  if ((type === 'integer' || type === 'number') && hasNumericConstraint(schema)) {
    return numericFaker(schema, numericRange(schema, type === 'integer'))
  }
  if (type === 'string' && schema.contentEncoding === 'base64') {
    return schema.contentSchema
      ? `(btoa(JSON.stringify(${schemaToFaker(schema.contentSchema, undefined, options)})) as any)`
      : 'btoa(faker.string.alphanumeric(12))'
  }
  const boundedHint =
    type === 'string' || type === undefined
      ? (vendorFormat(schema) ?? boundedFormat(schema))
      : undefined
  const formatHint =
    boundedHint ?? (schema.format ? lookup(FORMAT_TO_FAKER, schema.format) : undefined)
  if (formatHint && isHintCompatible(type, formatHint)) {
    return formatHint
  }
  // A property-name hint is a guess; the declared `type` and explicit string
  // constraints are the schema's own contract. A hint that ignores them emits
  // values the response schema itself rejects (a string `status` on an
  // `integer`, or a `pattern`-violating string — 422 in the host app), so such
  // schemas fall through to the type/constraint-aware branches below.
  const nameHint = propertyName ? propertyNameHint(propertyName) : undefined
  if (nameHint && isHintCompatible(type, nameHint)) {
    const hasStringConstraint =
      schema.pattern !== undefined ||
      schema.minLength !== undefined ||
      schema.maxLength !== undefined
    if (!(type === 'string' && hasStringConstraint)) {
      return nameHint
    }
  }
  if (type === 'string') {
    if (schema.pattern) {
      const pattern = boundedPattern(
        fakerPattern(schema.pattern),
        schema.minLength,
        schema.maxLength,
      )
      return `faker.helpers.fromRegExp(${makeStringLiteral(pattern)})`
    }
    const min = schema.minLength ?? Math.min(5, schema.maxLength ?? 5)
    const max = schema.maxLength ?? Math.max(min, 20)
    return `faker.string.alpha({ length: { min: ${min}, max: ${max} } })`
  }
  if (type === 'integer' || type === 'number') {
    return numericFaker(schema, numericRange(schema, type === 'integer'))
  }
  // A free-form object (`type: object` with neither `properties` nor
  // `additionalProperties`) is `z.object({})`, which `{}` satisfies.
  if (type === 'object') return '{}'
  if (type === 'array') return '[]'
  return (type ? lookup(TYPE_TO_FAKER, type) : undefined) ?? 'undefined'
}

/**
 * Sentinel path-param value both the test generator (request path) and the mock
 * generator (404 guard) agree on. The pair forms a cross-generator contract:
 * a generated test requests this value and the generated mock answers 404.
 */
export function getNonExistentValue(schema?: Schema, schemas?: { readonly [k: string]: Schema }) {
  if (!schema) return '__non_existent__'
  const resolved =
    schema.$ref && schemas
      ? (schemas[schema.$ref.replace('#/components/schemas/', '')] ?? schema)
      : schema
  const types = normalizeTypes(resolved.type)
  const primary = TYPE_PRIORITY.find((t) => types.includes(t))
  if (primary === 'integer' || primary === 'number') return '-1'
  if (resolved.format === 'uuid') return '00000000-0000-0000-0000-000000000000'
  return '__non_existent__'
}
