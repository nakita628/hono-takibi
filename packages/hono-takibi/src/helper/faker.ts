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
function fakerPattern(pattern: string) {
  return pattern
    .replace(/^\^+/u, '')
    .replace(/(?<!\\)(?:\\\\)*\$+$/u, (anchor) => anchor.replaceAll('$', ''))
    .replaceAll(/\\([\s\S])/gu, (match: string, escaped: string) => (escaped === '/' ? '/' : match))
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
      types.includes('integer') && (schema.format === 'int64' || schema.format === 'bigint')
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
function numericRange(
  schema: {
    readonly minimum?: number
    readonly maximum?: number
    readonly exclusiveMinimum?: number | boolean
    readonly exclusiveMaximum?: number | boolean
    readonly multipleOf?: number
  },
  integer: boolean,
) {
  const step = integer ? 1 : 0
  const min =
    typeof schema.exclusiveMinimum === 'number'
      ? schema.exclusiveMinimum + step
      : schema.exclusiveMinimum === true && schema.minimum !== undefined
        ? schema.minimum + step
        : schema.minimum
  const max =
    typeof schema.exclusiveMaximum === 'number'
      ? schema.exclusiveMaximum - step
      : schema.exclusiveMaximum === true && schema.maximum !== undefined
        ? schema.maximum - step
        : schema.maximum
  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(schema.multipleOf !== undefined ? { multipleOf: schema.multipleOf } : {}),
  }
}

// Build a faker numeric expression from a resolved range, filling each unset side
// with the format/type default. `faker.number.float` rejects `multipleOf` and
// `fractionDigits` together, so `multipleOf` drops `fractionDigits`.
function numericFaker(
  schema: Schema,
  range: { readonly min?: number; readonly max?: number; readonly multipleOf?: number },
) {
  if (schema.type === 'integer' && (schema.format === 'int64' || schema.format === 'bigint')) {
    return `faker.number.bigInt({ min: ${range.min ?? 0}n, max: ${range.max ?? 9_007_199_254_740_991}n })`
  }
  if (schema.type === 'integer') {
    const defaultMin = schema.format === 'int32' ? -2_147_483_648 : 1
    const defaultMax = schema.format === 'int32' ? 2_147_483_647 : 1000
    const parts = [
      `min: ${range.min ?? defaultMin}`,
      `max: ${range.max ?? defaultMax}`,
      ...(range.multipleOf !== undefined ? [`multipleOf: ${range.multipleOf}`] : []),
    ]
    return `faker.number.int({ ${parts.join(', ')} })`
  }
  const defaultMax = schema.format === 'double' ? 1_000_000 : 1000
  const fractionDigits = schema.format === 'double' ? 4 : 2
  const parts =
    range.multipleOf !== undefined
      ? [
          `min: ${range.min ?? 1}`,
          `max: ${range.max ?? defaultMax}`,
          `multipleOf: ${range.multipleOf}`,
        ]
      : [
          `min: ${range.min ?? 1}`,
          `max: ${range.max ?? defaultMax}`,
          `fractionDigits: ${fractionDigits}`,
        ]
  return `faker.number.float({ ${parts.join(', ')} })`
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

export function schemaToFaker(
  schema: Schema,
  propertyName?: string,
  options: {
    readonly arrayMin?: number
    readonly arrayMax?: number
    readonly useExamples?: boolean
    readonly schemas?: { readonly [k: string]: Schema }
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
  if (schema.type === 'array' && schema.items) {
    const itemSchema = isSchemaArray(schema.items) ? schema.items[0] : schema.items
    if (!isSchemaObject(itemSchema)) return '[]'
    const itemFaker = schemaToFaker(itemSchema, undefined, options)
    // A spec `minItems`/`maxItems` wins so the array satisfies the route's own
    // response schema (which enforces them); `arrayMin`/`arrayMax` then `1`/`10`
    // fill an unconstrained side, clamped against the spec side so a config
    // bound never inverts the range (`arrayMin: 5` with `maxItems: 3` → 3..3).
    // An inverted range written in the spec itself is passed through verbatim,
    // mirroring the numeric range.
    const min = schema.minItems ?? Math.min(options.arrayMin ?? 1, schema.maxItems ?? Infinity)
    const max = schema.maxItems ?? Math.max(options.arrayMax ?? 10, min)
    return `Array.from({ length: faker.number.int({ min: ${min}, max: ${max} }) }, () => (${itemFaker}))`
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
        if (!(requiredSet.has(k) || isNullable)) {
          return `${key}: faker.helpers.arrayElement([${value}, undefined])`
        }
        if (v.nullable) {
          return `${key}: faker.helpers.arrayElement([${value}, null])`
        }
        return `${key}: ${value}`
      })
      .join(', ')
  }
  if (schema.type === 'object' && schema.properties) {
    return `{ ${renderProps(schema.properties, schema.required)} }`
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
    return `Object.fromEntries(Array.from({ length: faker.number.int({ min: ${min}, max: ${max} }) }, () => [faker.string.alpha(8), ${value}] satisfies [string, unknown]))`
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
    const merged = schema.allOf
      .filter((s) => !isKnownScalar(s, options.schemas))
      .map((s) => `...${schemaToFaker(s, propertyName, options)}`)
      .join(', ')
    if (schema.properties) {
      const props = renderProps(schema.properties, schema.required)
      return merged.length > 0 ? `{ ${merged}, ${props} }` : `{ ${props} }`
    }
    return `{ ${merged} }`
  }
  const union =
    schema.oneOf && schema.oneOf.length > 0
      ? schema.oneOf
      : schema.anyOf && schema.anyOf.length > 0
        ? schema.anyOf
        : undefined
  if (union) {
    const variants = union.map((s) => schemaToFaker(s, propertyName, options)).join(', ')
    return `faker.helpers.arrayElement([${variants}])`
  }
  // Numeric constraints win over format/property-name defaults so generated
  // values satisfy the schema's bounds (minimum/maximum/exclusive*/multipleOf).
  // Type arrays were narrowed to a single member above.
  const type = typeof schema.type === 'string' ? schema.type : undefined
  if ((type === 'integer' || type === 'number') && hasNumericConstraint(schema)) {
    return numericFaker(schema, numericRange(schema, type === 'integer'))
  }
  const formatHint = schema.format ? lookup(FORMAT_TO_FAKER, schema.format) : undefined
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
      return `faker.helpers.fromRegExp(${makeStringLiteral(fakerPattern(schema.pattern))})`
    }
    const min = schema.minLength ?? 5
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
