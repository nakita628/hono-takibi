import type { Schema } from '../../openapi/index.js'
import { escapeRegexLiteral } from '../../utils/index.js'

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
  binary: 'new Blob([faker.string.alphanumeric(100)])',
  byte: 'btoa(faker.string.alphanumeric(10))',
  int32: 'faker.number.int({ min: -2147483648, max: 2147483647 })',
  int64: 'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
  bigint: 'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
  float: 'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
  double: 'faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })',
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

const hasNumericConstraint = (schema: Schema) =>
  schema.minimum !== undefined ||
  schema.maximum !== undefined ||
  schema.exclusiveMinimum !== undefined ||
  schema.exclusiveMaximum !== undefined ||
  schema.multipleOf !== undefined

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
    return `faker.number.bigInt({ min: ${range.min ?? 0}n, max: ${range.max ?? 9007199254740991}n })`
  }
  if (schema.type === 'integer') {
    const defaultMin = schema.format === 'int32' ? -2147483648 : 1
    const defaultMax = schema.format === 'int32' ? 2147483647 : 1000
    const parts = [
      `min: ${range.min ?? defaultMin}`,
      `max: ${range.max ?? defaultMax}`,
      ...(range.multipleOf !== undefined ? [`multipleOf: ${range.multipleOf}`] : []),
    ]
    return `faker.number.int({ ${parts.join(', ')} })`
  }
  const defaultMax = schema.format === 'double' ? 1000000 : 1000
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

export function schemaToFaker(
  schema: Schema,
  propertyName?: string,
  options: {
    readonly useExamples?: boolean
    readonly schemas?: { readonly [k: string]: Schema }
  } = {},
): string {
  if (options.useExamples && schema.example !== undefined) {
    return JSON.stringify(schema.example)
  }
  if (schema.const !== undefined) {
    return `${JSON.stringify(schema.const)} as const`
  }
  if (schema.enum && schema.enum.length > 0) {
    const values = schema.enum.map((v) => JSON.stringify(v)).join(', ')
    return `faker.helpers.arrayElement([${values}] as const)`
  }
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() || 'unknown'
    return `mock${refName.replace(/\./g, '')}()`
  }
  if (schema.type === 'array' && schema.items) {
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (!itemSchema) return '[]'
    const itemFaker = schemaToFaker(itemSchema, undefined, options)
    return `Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (${itemFaker}))`
  }
  const renderProps = (
    properties: { readonly [k: string]: Schema },
    required: readonly string[] | undefined,
  ) => {
    const requiredSet = new Set(required || ([] as const))
    return Object.entries(properties)
      .map(([k, v]) => {
        const value = schemaToFaker(v, k, options)
        if (!(requiredSet.has(k) || v.nullable)) {
          return `${k}: faker.helpers.arrayElement([${value}, undefined])`
        }
        if (v.nullable) {
          return `${k}: faker.helpers.arrayElement([${value}, null])`
        }
        return `${k}: ${value}`
      })
      .join(', ')
  }
  if (schema.type === 'object' && schema.properties) {
    return `{ ${renderProps(schema.properties, schema.required)} }`
  }
  if (schema.type === 'object' && !schema.properties && schema.additionalProperties) {
    return '{}'
  }
  if (schema.allOf && schema.allOf.length > 0) {
    const merged = schema.allOf
      .map((s) => schemaToFaker(s, propertyName, options))
      .map((m) => `...${m}`)
      .join(', ')
    if (schema.properties) {
      return `{ ${merged}, ${renderProps(schema.properties, schema.required)} }`
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
  if ((schema.type === 'integer' || schema.type === 'number') && hasNumericConstraint(schema)) {
    return numericFaker(schema, numericRange(schema, schema.type === 'integer'))
  }
  if (schema.format && FORMAT_TO_FAKER[schema.format]) {
    return FORMAT_TO_FAKER[schema.format]
  }
  if (propertyName && PROPERTY_NAME_TO_FAKER[propertyName]) {
    const hint = PROPERTY_NAME_TO_FAKER[propertyName]
    const isNumberHint = hint.includes('faker.number.')
    if (!(isNumberHint && schema.type === 'string')) {
      return hint
    }
  }
  if (schema.type && typeof schema.type === 'string' && TYPE_TO_FAKER[schema.type]) {
    if (schema.type === 'string') {
      if (schema.pattern) {
        return `faker.helpers.fromRegExp(/${escapeRegexLiteral(schema.pattern)}/)`
      }
      const min = schema.minLength ?? 5
      const max = schema.maxLength ?? 20
      return `faker.string.alpha({ length: { min: ${min}, max: ${max} } })`
    }
    if (schema.type === 'integer' || schema.type === 'number') {
      return numericFaker(schema, numericRange(schema, schema.type === 'integer'))
    }
    return TYPE_TO_FAKER[schema.type]
  }
  return 'undefined'
}
