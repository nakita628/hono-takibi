import type { Schema } from '../../openapi/index.js'

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
  int64: 'faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER })',
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
  ): string => {
    const requiredSet = new Set(required || [])
    return Object.entries(properties)
      .map(([key, prop]) => {
        const value = schemaToFaker(prop, key, options)
        if (!(requiredSet.has(key) || prop.nullable)) {
          return `${key}: faker.helpers.arrayElement([${value}, undefined])`
        }
        if (prop.nullable) {
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
        return `faker.helpers.fromRegExp(/${schema.pattern}/)`
      }
      const min = schema.minLength ?? 5
      const max = schema.maxLength ?? 20
      return `faker.string.alpha({ length: { min: ${min}, max: ${max} } })`
    }
    if (schema.type === 'integer' || schema.type === 'number') {
      const min = schema.minimum ?? 1
      const max = schema.maximum ?? 1000
      if (schema.type === 'integer') {
        return `faker.number.int({ min: ${min}, max: ${max} })`
      }
      return `faker.number.float({ min: ${min}, max: ${max}, fractionDigits: 2 })`
    }
    return TYPE_TO_FAKER[schema.type]
  }
  return 'undefined'
}
