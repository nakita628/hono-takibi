/**
 * OpenAPI format/type to faker.js mapping
 *
 * This module provides mappings from OpenAPI schema types and formats
 * to faker.js method calls for generating mock test data.
 *
 * Reference: Orval's /packages/mock/src/faker/constants.ts
 *
 * @module generator/test/faker-mapping
 */

import type { Schema } from '../../openapi/index.js'

/**
 * OpenAPI format to faker method mapping
 */
export const FORMAT_TO_FAKER: Record<string, string> = {
  // Date/Time
  date: 'faker.date.past().toISOString().slice(0, 10)',
  'date-time': 'faker.date.past().toISOString()',
  time: 'faker.date.past().toISOString().slice(11, 19)',

  // Network
  uri: 'faker.internet.url()',
  url: 'faker.internet.url()',
  email: 'faker.internet.email()',
  ipv4: 'faker.internet.ipv4()',
  ipv6: 'faker.internet.ipv6()',
  hostname: 'faker.internet.domainName()',

  // Identity
  uuid: 'faker.string.uuid()',
  password: 'faker.internet.password()',

  // Location
  city: 'faker.location.city()',
  country: 'faker.location.country()',
  streetName: 'faker.location.street()',
  zipCode: 'faker.location.zipCode()',

  // Person
  firstName: 'faker.person.firstName()',
  lastName: 'faker.person.lastName()',
  userName: 'faker.internet.username()',
  phoneNumber: 'faker.phone.number()',
  jobTitle: 'faker.person.jobTitle()',
  gender: 'faker.person.gender()',

  // Finance
  bic: 'faker.finance.bic()',
  iban: 'faker.finance.iban()',

  // Binary
  binary: 'new Blob([faker.string.alphanumeric(100)])',
  byte: 'btoa(faker.string.alphanumeric(10))',

  // Number formats
  int32: 'faker.number.int({ min: -2147483648, max: 2147483647 })',
  int64: 'faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER })',
  float: 'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
  double: 'faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })',
}

/**
 * OpenAPI type to faker method mapping (fallback when no format specified)
 */
export const TYPE_TO_FAKER: Record<string, string> = {
  string: 'faker.string.alpha({ length: { min: 5, max: 20 } })',
  number: 'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
  integer: 'faker.number.int({ min: 1, max: 1000 })',
  boolean: 'faker.datatype.boolean()',
  null: 'null',
}

/**
 * Property name heuristics (when property name suggests a format)
 */
export const PROPERTY_NAME_TO_FAKER: Record<string, string> = {
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

export interface SchemaToFakerOptions {
  /**
   * Use example values from OpenAPI schema when available
   */
  useExamples?: boolean
  /**
   * Resolved schemas map for $ref resolution
   */
  schemas?: Record<string, Schema>
}

/**
 * Generate faker code string for a given OpenAPI schema
 *
 * @param schema - OpenAPI schema object
 * @param propertyName - Optional property name for heuristics
 * @param options - Generation options
 * @returns faker.js code string
 */
export function schemaToFaker(
  schema: Schema,
  propertyName?: string,
  options: SchemaToFakerOptions = {},
): string {
  // 1. If example is provided and useExamples is true
  if (options.useExamples && schema.example !== undefined) {
    return JSON.stringify(schema.example)
  }

  // 2. Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const enumValues = schema.enum.map((v) => JSON.stringify(v)).join(', ')
    return `faker.helpers.arrayElement([${enumValues}] as const)`
  }

  // 3. Handle $ref
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() || 'unknown'
    return `mock${refName}()`
  }

  // 4. Handle array
  if (schema.type === 'array' && schema.items) {
    // Handle tuple types (readonly Schema[]) - use first item
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (!itemSchema) return '[]'
    const itemFaker = schemaToFaker(itemSchema, undefined, options)
    return `Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (${itemFaker}))`
  }

  // 5. Handle object
  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required || [])
    const props = Object.entries(schema.properties)
      .map(([key, prop]) => {
        const value = schemaToFaker(prop, key, options)
        const isRequired = requiredSet.has(key)
        if (!(isRequired || prop.nullable)) {
          return `${key}: faker.helpers.arrayElement([${value}, undefined])`
        }
        if (prop.nullable) {
          return `${key}: faker.helpers.arrayElement([${value}, null])`
        }
        return `${key}: ${value}`
      })
      .join(',\n    ')
    return `{\n    ${props}\n  }`
  }

  // 6. Handle allOf (intersection)
  if (schema.allOf && schema.allOf.length > 0) {
    const merged = schema.allOf.map((s) => schemaToFaker(s, propertyName, options))
    return `{ ${merged.map((m) => `...${m}`).join(', ')} }`
  }

  // 7. Handle oneOf/anyOf (union - pick random)
  if ((schema.oneOf && schema.oneOf.length > 0) || (schema.anyOf && schema.anyOf.length > 0)) {
    const variants = (schema.oneOf || schema.anyOf || []).map((s) =>
      schemaToFaker(s, propertyName, options),
    )
    return `faker.helpers.arrayElement([${variants.join(', ')}])`
  }

  // 8. Check format mapping (prioritize over property name)
  if (schema.format && FORMAT_TO_FAKER[schema.format]) {
    return FORMAT_TO_FAKER[schema.format]
  }

  // 9. Check property name heuristics
  if (propertyName && PROPERTY_NAME_TO_FAKER[propertyName]) {
    return PROPERTY_NAME_TO_FAKER[propertyName]
  }

  // 10. Check type mapping
  if (schema.type && typeof schema.type === 'string' && TYPE_TO_FAKER[schema.type]) {
    // Handle string with constraints
    if (schema.type === 'string') {
      if (schema.pattern) {
        return `faker.helpers.fromRegExp(/${schema.pattern}/)`
      }
      const min = schema.minLength ?? 5
      const max = schema.maxLength ?? 20
      return `faker.string.alpha({ length: { min: ${min}, max: ${max} } })`
    }

    // Handle number/integer with constraints
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

  // 11. Default fallback
  return 'undefined'
}
