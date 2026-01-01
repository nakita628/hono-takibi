import { createRoute, z } from '@hono/zod-openapi'

const ExtremeStringsSchema = z
  .object({
    emptyOnly: z
      .string()
      .length(0)
      .optional()
      .openapi({ type: 'string', minLength: 0, maxLength: 0 }),
    singleChar: z
      .string()
      .length(1)
      .optional()
      .openapi({ type: 'string', minLength: 1, maxLength: 1 }),
    veryLong: z
      .string()
      .min(1000000)
      .max(10000000)
      .optional()
      .openapi({ type: 'string', minLength: 1000000, maxLength: 10000000 }),
    conflictingPatternFormat: z
      .email()
      .regex(/^[0-9]+$/)
      .optional()
      .openapi({ type: 'string', format: 'email', pattern: '^[0-9]+$' }),
    multiPattern: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .min(8)
      .max(128)
      .optional()
      .openapi({
        type: 'string',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        minLength: 8,
        maxLength: 128,
      }),
    unicodePattern: z
      .string()
      .regex(/^[\p{L}\p{N}]+$/)
      .optional()
      .openapi({ type: 'string', pattern: '^[\\p{L}\\p{N}]+$' }),
    complexRegex: z
      .string()
      .regex(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
      )
      .optional()
      .openapi({
        type: 'string',
        pattern:
          '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
      }),
    emptyPattern: z.string().optional().openapi({ type: 'string', pattern: '' }),
    impossiblePattern: z
      .string()
      .regex(/^(?!.*)$/)
      .optional()
      .openapi({ type: 'string', pattern: '^(?!.*)$' }),
    allFormats: z
      .object({
        dateTime: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
        date: z.iso.date().openapi({ type: 'string', format: 'date' }),
        time: z.iso.time().openapi({ type: 'string', format: 'time' }),
        duration: z.iso.duration().openapi({ type: 'string', format: 'duration' }),
        email: z.email().openapi({ type: 'string', format: 'email' }),
        idnEmail: z.string().openapi({ type: 'string', format: 'idn-email' }),
        hostname: z.string().openapi({ type: 'string', format: 'hostname' }),
        idnHostname: z.string().openapi({ type: 'string', format: 'idn-hostname' }),
        ipv4: z.ipv4().openapi({ type: 'string', format: 'ipv4' }),
        ipv6: z.ipv6().openapi({ type: 'string', format: 'ipv6' }),
        uri: z.url().openapi({ type: 'string', format: 'uri' }),
        uriReference: z.string().openapi({ type: 'string', format: 'uri-reference' }),
        iri: z.string().openapi({ type: 'string', format: 'iri' }),
        iriReference: z.string().openapi({ type: 'string', format: 'iri-reference' }),
        uriTemplate: z.string().openapi({ type: 'string', format: 'uri-template' }),
        jsonPointer: z.string().openapi({ type: 'string', format: 'json-pointer' }),
        relativeJsonPointer: z
          .string()
          .openapi({ type: 'string', format: 'relative-json-pointer' }),
        regex: z.string().openapi({ type: 'string', format: 'regex' }),
        uuid: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        byte: z.string().openapi({ type: 'string', format: 'byte' }),
        binary: z.file().openapi({ type: 'string', format: 'binary' }),
        password: z.string().openapi({ type: 'string', format: 'password' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          dateTime: { type: 'string', format: 'date-time' },
          date: { type: 'string', format: 'date' },
          time: { type: 'string', format: 'time' },
          duration: { type: 'string', format: 'duration' },
          email: { type: 'string', format: 'email' },
          idnEmail: { type: 'string', format: 'idn-email' },
          hostname: { type: 'string', format: 'hostname' },
          idnHostname: { type: 'string', format: 'idn-hostname' },
          ipv4: { type: 'string', format: 'ipv4' },
          ipv6: { type: 'string', format: 'ipv6' },
          uri: { type: 'string', format: 'uri' },
          uriReference: { type: 'string', format: 'uri-reference' },
          iri: { type: 'string', format: 'iri' },
          iriReference: { type: 'string', format: 'iri-reference' },
          uriTemplate: { type: 'string', format: 'uri-template' },
          jsonPointer: { type: 'string', format: 'json-pointer' },
          relativeJsonPointer: { type: 'string', format: 'relative-json-pointer' },
          regex: { type: 'string', format: 'regex' },
          uuid: { type: 'string', format: 'uuid' },
          byte: { type: 'string', format: 'byte' },
          binary: { type: 'string', format: 'binary' },
          password: { type: 'string', format: 'password' },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      emptyOnly: { type: 'string', minLength: 0, maxLength: 0 },
      singleChar: { type: 'string', minLength: 1, maxLength: 1 },
      veryLong: { type: 'string', minLength: 1000000, maxLength: 10000000 },
      conflictingPatternFormat: { type: 'string', format: 'email', pattern: '^[0-9]+$' },
      multiPattern: {
        type: 'string',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        minLength: 8,
        maxLength: 128,
      },
      unicodePattern: { type: 'string', pattern: '^[\\p{L}\\p{N}]+$' },
      complexRegex: {
        type: 'string',
        pattern:
          '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
      },
      emptyPattern: { type: 'string', pattern: '' },
      impossiblePattern: { type: 'string', pattern: '^(?!.*)$' },
      allFormats: {
        type: 'object',
        properties: {
          dateTime: { type: 'string', format: 'date-time' },
          date: { type: 'string', format: 'date' },
          time: { type: 'string', format: 'time' },
          duration: { type: 'string', format: 'duration' },
          email: { type: 'string', format: 'email' },
          idnEmail: { type: 'string', format: 'idn-email' },
          hostname: { type: 'string', format: 'hostname' },
          idnHostname: { type: 'string', format: 'idn-hostname' },
          ipv4: { type: 'string', format: 'ipv4' },
          ipv6: { type: 'string', format: 'ipv6' },
          uri: { type: 'string', format: 'uri' },
          uriReference: { type: 'string', format: 'uri-reference' },
          iri: { type: 'string', format: 'iri' },
          iriReference: { type: 'string', format: 'iri-reference' },
          uriTemplate: { type: 'string', format: 'uri-template' },
          jsonPointer: { type: 'string', format: 'json-pointer' },
          relativeJsonPointer: { type: 'string', format: 'relative-json-pointer' },
          regex: { type: 'string', format: 'regex' },
          uuid: { type: 'string', format: 'uuid' },
          byte: { type: 'string', format: 'byte' },
          binary: { type: 'string', format: 'binary' },
          password: { type: 'string', format: 'password' },
        },
      },
    },
  })
  .openapi('ExtremeStrings')

const ExtremeNumbersSchema = z
  .object({
    zeroOnly: z.number().min(0).max(0).openapi({ type: 'number', minimum: 0, maximum: 0 }),
    negativeZero: z.number().min(0).max(0).openapi({ type: 'number', minimum: 0, maximum: 0 }),
    tinyRange: z
      .number()
      .min(1e-7)
      .max(2e-7)
      .openapi({ type: 'number', minimum: 1e-7, maximum: 2e-7 }),
    hugePositive: z.number().min(1e308).openapi({ type: 'number', minimum: 1e308 }),
    hugeNegative: z.number().max(-1e308).openapi({ type: 'number', maximum: -1e308 }),
    preciseMultiple: z.number().multipleOf(1e-10).openapi({ type: 'number', multipleOf: 1e-10 }),
    conflictingMultiple: z
      .number()
      .min(1)
      .max(10)
      .multipleOf(7)
      .openapi({ type: 'number', minimum: 1, maximum: 10, multipleOf: 7 }),
    integerDecimalMultiple: z.int().multipleOf(0.5).openapi({ type: 'integer', multipleOf: 0.5 }),
    exclusiveEdge: z
      .number()
      .min(0)
      .max(100)
      .openapi({
        type: 'number',
        minimum: 0,
        exclusiveMinimum: 0,
        maximum: 100,
        exclusiveMaximum: 100,
      }),
    bothExclusive: z
      .number()
      .gt(0)
      .lt(1)
      .openapi({ type: 'number', exclusiveMinimum: 0, exclusiveMaximum: 1 }),
    int32Bounded: z
      .int32()
      .min(-2147483648)
      .max(2147483647)
      .openapi({ type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    int64Bounded: z
      .int64()
      .min(-9223372036854776000n)
      .max(9223372036854776000n)
      .openapi({
        type: 'integer',
        format: 'int64',
        minimum: -9223372036854776000,
        maximum: 9223372036854776000,
      }),
    floatEdge: z
      .float32()
      .min(1.17549435e-38)
      .max(3.40282347e38)
      .openapi({
        type: 'number',
        format: 'float',
        minimum: 1.17549435e-38,
        maximum: 3.40282347e38,
      }),
    doubleEdge: z
      .number()
      .min(2.2250738585072014e-308)
      .max(1.7976931348623157e308)
      .openapi({
        type: 'number',
        format: 'double',
        minimum: 2.2250738585072014e-308,
        maximum: 1.7976931348623157e308,
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      zeroOnly: { type: 'number', minimum: 0, maximum: 0 },
      negativeZero: { type: 'number', minimum: 0, maximum: 0 },
      tinyRange: { type: 'number', minimum: 1e-7, maximum: 2e-7 },
      hugePositive: { type: 'number', minimum: 1e308 },
      hugeNegative: { type: 'number', maximum: -1e308 },
      preciseMultiple: { type: 'number', multipleOf: 1e-10 },
      conflictingMultiple: { type: 'number', minimum: 1, maximum: 10, multipleOf: 7 },
      integerDecimalMultiple: { type: 'integer', multipleOf: 0.5 },
      exclusiveEdge: {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: 0,
        maximum: 100,
        exclusiveMaximum: 100,
      },
      bothExclusive: { type: 'number', exclusiveMinimum: 0, exclusiveMaximum: 1 },
      int32Bounded: { type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 },
      int64Bounded: {
        type: 'integer',
        format: 'int64',
        minimum: -9223372036854776000,
        maximum: 9223372036854776000,
      },
      floatEdge: {
        type: 'number',
        format: 'float',
        minimum: 1.17549435e-38,
        maximum: 3.40282347e38,
      },
      doubleEdge: {
        type: 'number',
        format: 'double',
        minimum: 2.2250738585072014e-308,
        maximum: 1.7976931348623157e308,
      },
    },
  })
  .openapi('ExtremeNumbers')

const ExtremeArraysSchema = z
  .object({
    emptyOnly: z
      .array(z.any())
      .length(0)
      .optional()
      .openapi({ type: 'array', items: {}, minItems: 0, maxItems: 0 }),
    singleOnly: z
      .array(z.string().openapi({ type: 'string' }))
      .length(1)
      .optional()
      .openapi({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 1 }),
    hugeArray: z
      .array(z.string().openapi({ type: 'string' }))
      .min(1000000)
      .max(10000000)
      .optional()
      .openapi({ type: 'array', items: { type: 'string' }, minItems: 1000000, maxItems: 10000000 }),
    uniqueBooleans: z
      .array(z.boolean().openapi({ type: 'boolean' }))
      .max(2)
      .optional()
      .openapi({ type: 'array', items: { type: 'boolean' }, uniqueItems: true, maxItems: 2 }),
    uniqueEnum: z
      .array(z.enum(['a', 'b', 'c']).openapi({ type: 'string', enum: ['a', 'b', 'c'] }))
      .length(3)
      .optional()
      .openapi({
        type: 'array',
        items: { type: 'string', enum: ['a', 'b', 'c'] },
        uniqueItems: true,
        minItems: 3,
        maxItems: 3,
      }),
    deeplyNested: z
      .array(
        z
          .array(
            z
              .array(
                z
                  .array(
                    z
                      .string()
                      .min(1)
                      .max(10)
                      .openapi({ type: 'string', minLength: 1, maxLength: 10 }),
                  )
                  .min(4)
                  .max(6)
                  .optional()
                  .openapi({
                    type: 'array',
                    minItems: 4,
                    maxItems: 6,
                    items: { type: 'string', minLength: 1, maxLength: 10 },
                  }),
              )
              .min(3)
              .max(5)
              .optional()
              .openapi({
                type: 'array',
                minItems: 3,
                maxItems: 5,
                items: {
                  type: 'array',
                  minItems: 4,
                  maxItems: 6,
                  items: { type: 'string', minLength: 1, maxLength: 10 },
                },
              }),
          )
          .min(2)
          .max(4)
          .optional()
          .openapi({
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: {
              type: 'array',
              minItems: 3,
              maxItems: 5,
              items: {
                type: 'array',
                minItems: 4,
                maxItems: 6,
                items: { type: 'string', minLength: 1, maxLength: 10 },
              },
            },
          }),
      )
      .min(1)
      .max(3)
      .optional()
      .openapi({
        type: 'array',
        minItems: 1,
        maxItems: 3,
        items: {
          type: 'array',
          minItems: 2,
          maxItems: 4,
          items: {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            items: {
              type: 'array',
              minItems: 4,
              maxItems: 6,
              items: { type: 'string', minLength: 1, maxLength: 10 },
            },
          },
        },
      }),
    uniqueNested: z
      .array(
        z
          .array(z.int().openapi({ type: 'integer' }))
          .optional()
          .openapi({ type: 'array', uniqueItems: true, items: { type: 'integer' } }),
      )
      .optional()
      .openapi({
        type: 'array',
        uniqueItems: true,
        items: { type: 'array', uniqueItems: true, items: { type: 'integer' } },
      }),
    largeTuple: z
      .array(z.any())
      .length(10)
      .openapi({
        type: 'array',
        prefixItems: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'integer' },
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'integer' },
          { type: 'string' },
          { type: 'number' },
        ],
        items: false,
        minItems: 10,
        maxItems: 10,
      }),
    tupleWithAdditional: z
      .array(z.boolean().openapi({ type: 'boolean' }))
      .min(5)
      .optional()
      .openapi({
        type: 'array',
        prefixItems: [{ type: 'string' }, { type: 'number' }],
        items: { type: 'boolean' },
        minItems: 5,
      }),
    containsConstraint: z
      .array(z.any())
      .min(10)
      .openapi({
        type: 'array',
        contains: {
          type: 'object',
          required: ['special'],
          properties: { special: { type: 'boolean', const: true } },
        },
        minContains: 2,
        maxContains: 5,
        minItems: 10,
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      emptyOnly: { type: 'array', items: {}, minItems: 0, maxItems: 0 },
      singleOnly: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 1 },
      hugeArray: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1000000,
        maxItems: 10000000,
      },
      uniqueBooleans: { type: 'array', items: { type: 'boolean' }, uniqueItems: true, maxItems: 2 },
      uniqueEnum: {
        type: 'array',
        items: { type: 'string', enum: ['a', 'b', 'c'] },
        uniqueItems: true,
        minItems: 3,
        maxItems: 3,
      },
      deeplyNested: {
        type: 'array',
        minItems: 1,
        maxItems: 3,
        items: {
          type: 'array',
          minItems: 2,
          maxItems: 4,
          items: {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            items: {
              type: 'array',
              minItems: 4,
              maxItems: 6,
              items: { type: 'string', minLength: 1, maxLength: 10 },
            },
          },
        },
      },
      uniqueNested: {
        type: 'array',
        uniqueItems: true,
        items: { type: 'array', uniqueItems: true, items: { type: 'integer' } },
      },
      largeTuple: {
        type: 'array',
        prefixItems: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'integer' },
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'integer' },
          { type: 'string' },
          { type: 'number' },
        ],
        items: false,
        minItems: 10,
        maxItems: 10,
      },
      tupleWithAdditional: {
        type: 'array',
        prefixItems: [{ type: 'string' }, { type: 'number' }],
        items: { type: 'boolean' },
        minItems: 5,
      },
      containsConstraint: {
        type: 'array',
        contains: {
          type: 'object',
          required: ['special'],
          properties: { special: { type: 'boolean', const: true } },
        },
        minContains: 2,
        maxContains: 5,
        minItems: 10,
      },
    },
  })
  .openapi('ExtremeArrays')

const ExtremeObjectsSchema = z
  .object({
    emptyOnly: z
      .strictObject({})
      .partial()
      .openapi({
        type: 'object',
        properties: {},
        additionalProperties: false,
        minProperties: 0,
        maxProperties: 0,
      }),
    singleProperty: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({
        type: 'object',
        minProperties: 1,
        maxProperties: 1,
        additionalProperties: { type: 'string' },
      }),
    manyRequired: z
      .object({
        prop1: z.string().openapi({ type: 'string' }),
        prop2: z.string().openapi({ type: 'string' }),
        prop3: z.string().openapi({ type: 'string' }),
        prop4: z.string().openapi({ type: 'string' }),
        prop5: z.string().openapi({ type: 'string' }),
        prop6: z.string().openapi({ type: 'string' }),
        prop7: z.string().openapi({ type: 'string' }),
        prop8: z.string().openapi({ type: 'string' }),
        prop9: z.string().openapi({ type: 'string' }),
        prop10: z.string().openapi({ type: 'string' }),
        prop11: z.string().openapi({ type: 'string' }),
        prop12: z.string().openapi({ type: 'string' }),
        prop13: z.string().openapi({ type: 'string' }),
        prop14: z.string().openapi({ type: 'string' }),
        prop15: z.string().openapi({ type: 'string' }),
        prop16: z.string().openapi({ type: 'string' }),
        prop17: z.string().openapi({ type: 'string' }),
        prop18: z.string().openapi({ type: 'string' }),
        prop19: z.string().openapi({ type: 'string' }),
        prop20: z.string().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        required: [
          'prop1',
          'prop2',
          'prop3',
          'prop4',
          'prop5',
          'prop6',
          'prop7',
          'prop8',
          'prop9',
          'prop10',
          'prop11',
          'prop12',
          'prop13',
          'prop14',
          'prop15',
          'prop16',
          'prop17',
          'prop18',
          'prop19',
          'prop20',
        ],
        properties: {
          prop1: { type: 'string' },
          prop2: { type: 'string' },
          prop3: { type: 'string' },
          prop4: { type: 'string' },
          prop5: { type: 'string' },
          prop6: { type: 'string' },
          prop7: { type: 'string' },
          prop8: { type: 'string' },
          prop9: { type: 'string' },
          prop10: { type: 'string' },
          prop11: { type: 'string' },
          prop12: { type: 'string' },
          prop13: { type: 'string' },
          prop14: { type: 'string' },
          prop15: { type: 'string' },
          prop16: { type: 'string' },
          prop17: { type: 'string' },
          prop18: { type: 'string' },
          prop19: { type: 'string' },
          prop20: { type: 'string' },
        },
      }),
    patternProperties: z
      .strictObject({})
      .openapi({
        type: 'object',
        patternProperties: {
          '^x-': { type: 'string' },
          '^[a-z]+$': { type: 'number' },
          '^[A-Z]+$': { type: 'boolean' },
          '^_': { type: 'integer' },
        },
        additionalProperties: false,
      }),
    dependentRequired: z
      .object({
        billing_address: z.string().openapi({ type: 'string' }),
        shipping_address: z.string().openapi({ type: 'string' }),
        use_same_address: z.boolean().openapi({ type: 'boolean' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          billing_address: { type: 'string' },
          shipping_address: { type: 'string' },
          use_same_address: { type: 'boolean' },
        },
        dependentRequired: {
          billing_address: ['shipping_address'],
          shipping_address: ['billing_address'],
        },
      }),
    dependentSchemas: z
      .object({
        credit_card: z.string().openapi({ type: 'string' }),
        billing_address: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { credit_card: { type: 'string' }, billing_address: { type: 'string' } },
        dependentSchemas: {
          credit_card: {
            properties: { billing_address: { type: 'string', minLength: 10 } },
            required: ['billing_address'],
          },
        },
      }),
    propertyNames: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({
        type: 'object',
        propertyNames: { pattern: '^[a-z][a-zA-Z0-9]*$', minLength: 2, maxLength: 20 },
        additionalProperties: { type: 'string' },
      }),
    unevaluatedProps: z
      .object({ known: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({
        type: 'object',
        properties: { known: { type: 'string' } },
        unevaluatedProperties: false,
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      emptyOnly: {
        type: 'object',
        properties: {},
        additionalProperties: false,
        minProperties: 0,
        maxProperties: 0,
      },
      singleProperty: {
        type: 'object',
        minProperties: 1,
        maxProperties: 1,
        additionalProperties: { type: 'string' },
      },
      manyRequired: {
        type: 'object',
        required: [
          'prop1',
          'prop2',
          'prop3',
          'prop4',
          'prop5',
          'prop6',
          'prop7',
          'prop8',
          'prop9',
          'prop10',
          'prop11',
          'prop12',
          'prop13',
          'prop14',
          'prop15',
          'prop16',
          'prop17',
          'prop18',
          'prop19',
          'prop20',
        ],
        properties: {
          prop1: { type: 'string' },
          prop2: { type: 'string' },
          prop3: { type: 'string' },
          prop4: { type: 'string' },
          prop5: { type: 'string' },
          prop6: { type: 'string' },
          prop7: { type: 'string' },
          prop8: { type: 'string' },
          prop9: { type: 'string' },
          prop10: { type: 'string' },
          prop11: { type: 'string' },
          prop12: { type: 'string' },
          prop13: { type: 'string' },
          prop14: { type: 'string' },
          prop15: { type: 'string' },
          prop16: { type: 'string' },
          prop17: { type: 'string' },
          prop18: { type: 'string' },
          prop19: { type: 'string' },
          prop20: { type: 'string' },
        },
      },
      patternProperties: {
        type: 'object',
        patternProperties: {
          '^x-': { type: 'string' },
          '^[a-z]+$': { type: 'number' },
          '^[A-Z]+$': { type: 'boolean' },
          '^_': { type: 'integer' },
        },
        additionalProperties: false,
      },
      dependentRequired: {
        type: 'object',
        properties: {
          billing_address: { type: 'string' },
          shipping_address: { type: 'string' },
          use_same_address: { type: 'boolean' },
        },
        dependentRequired: {
          billing_address: ['shipping_address'],
          shipping_address: ['billing_address'],
        },
      },
      dependentSchemas: {
        type: 'object',
        properties: { credit_card: { type: 'string' }, billing_address: { type: 'string' } },
        dependentSchemas: {
          credit_card: {
            properties: { billing_address: { type: 'string', minLength: 10 } },
            required: ['billing_address'],
          },
        },
      },
      propertyNames: {
        type: 'object',
        propertyNames: { pattern: '^[a-z][a-zA-Z0-9]*$', minLength: 2, maxLength: 20 },
        additionalProperties: { type: 'string' },
      },
      unevaluatedProps: {
        type: 'object',
        properties: { known: { type: 'string' } },
        unevaluatedProperties: false,
      },
    },
  })
  .openapi('ExtremeObjects')

const ExtremeCompositionsSchema = z
  .object({
    manyOneOf: z
      .union([
        z.literal('type1').optional().openapi({ type: 'string' }),
        z.literal('type2').optional().openapi({ type: 'string' }),
        z.literal('type3').optional().openapi({ type: 'string' }),
        z.literal('type4').optional().openapi({ type: 'string' }),
        z.literal('type5').optional().openapi({ type: 'string' }),
        z.literal('type6').optional().openapi({ type: 'string' }),
        z.literal('type7').optional().openapi({ type: 'string' }),
        z.literal('type8').optional().openapi({ type: 'string' }),
        z.literal('type9').optional().openapi({ type: 'string' }),
        z.literal('type10').optional().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
        z.boolean().optional().openapi({ type: 'boolean' }),
        z
          .array(z.string().optional().openapi({ type: 'string' }))
          .optional()
          .openapi({ type: 'array', items: { type: 'string' } }),
        z.object({}).openapi({ type: 'object' }),
        z.null().nullable().optional().openapi({ type: 'null' }),
      ])
      .optional()
      .openapi({
        oneOf: [
          { type: 'string', const: 'type1' },
          { type: 'string', const: 'type2' },
          { type: 'string', const: 'type3' },
          { type: 'string', const: 'type4' },
          { type: 'string', const: 'type5' },
          { type: 'string', const: 'type6' },
          { type: 'string', const: 'type7' },
          { type: 'string', const: 'type8' },
          { type: 'string', const: 'type9' },
          { type: 'string', const: 'type10' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'array', items: { type: 'string' } },
          { type: 'object' },
          { type: 'null' },
        ],
      }),
    deeplyNestedComposition: z
      .intersection(
        z
          .union([
            z
              .union([
                z
                  .intersection(
                    z
                      .object({ a: z.string().openapi({ type: 'string' }) })
                      .partial()
                      .openapi({ type: 'object', properties: { a: { type: 'string' } } }),
                    z
                      .object({ b: z.number().openapi({ type: 'number' }) })
                      .partial()
                      .openapi({ type: 'object', properties: { b: { type: 'number' } } }),
                  )
                  .optional()
                  .openapi({
                    allOf: [
                      { type: 'object', properties: { a: { type: 'string' } } },
                      { type: 'object', properties: { b: { type: 'number' } } },
                    ],
                  }),
                z
                  .object({ c: z.boolean().openapi({ type: 'boolean' }) })
                  .partial()
                  .openapi({ type: 'object', properties: { c: { type: 'boolean' } } }),
              ])
              .optional()
              .openapi({
                anyOf: [
                  {
                    allOf: [
                      { type: 'object', properties: { a: { type: 'string' } } },
                      { type: 'object', properties: { b: { type: 'number' } } },
                    ],
                  },
                  { type: 'object', properties: { c: { type: 'boolean' } } },
                ],
              }),
            z
              .object({ d: z.int().openapi({ type: 'integer' }) })
              .partial()
              .openapi({ type: 'object', properties: { d: { type: 'integer' } } }),
          ])
          .optional()
          .openapi({
            oneOf: [
              {
                anyOf: [
                  {
                    allOf: [
                      { type: 'object', properties: { a: { type: 'string' } } },
                      { type: 'object', properties: { b: { type: 'number' } } },
                    ],
                  },
                  { type: 'object', properties: { c: { type: 'boolean' } } },
                ],
              },
              { type: 'object', properties: { d: { type: 'integer' } } },
            ],
          }),
        z
          .object({ e: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { e: { type: 'string' } } }),
      )
      .optional()
      .openapi({
        allOf: [
          {
            oneOf: [
              {
                anyOf: [
                  {
                    allOf: [
                      { type: 'object', properties: { a: { type: 'string' } } },
                      { type: 'object', properties: { b: { type: 'number' } } },
                    ],
                  },
                  { type: 'object', properties: { c: { type: 'boolean' } } },
                ],
              },
              { type: 'object', properties: { d: { type: 'integer' } } },
            ],
          },
          { type: 'object', properties: { e: { type: 'string' } } },
        ],
      }),
    complexNot: z
      .intersection(
        z
          .object({ value: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
        z
          .any()
          .optional()
          .openapi({
            not: {
              anyOf: [
                { type: 'object', properties: { value: { const: 'forbidden1' } } },
                { type: 'object', properties: { value: { const: 'forbidden2' } } },
                { type: 'object', properties: { value: { pattern: '^bad' } } },
              ],
            },
          }),
      )
      .optional()
      .openapi({
        allOf: [
          { type: 'object', properties: { value: { type: 'string' } } },
          {
            not: {
              anyOf: [
                { type: 'object', properties: { value: { const: 'forbidden1' } } },
                { type: 'object', properties: { value: { const: 'forbidden2' } } },
                { type: 'object', properties: { value: { pattern: '^bad' } } },
              ],
            },
          },
        ],
      }),
    conditionalChain: z
      .object({})
      .openapi({
        type: 'object',
        if: { properties: { type: { const: 'A' } } },
        then: { properties: { valueA: { type: 'string' } }, required: ['valueA'] },
        else: {
          if: { properties: { type: { const: 'B' } } },
          then: { properties: { valueB: { type: 'number' } }, required: ['valueB'] },
          else: {
            if: { properties: { type: { const: 'C' } } },
            then: { properties: { valueC: { type: 'boolean' } }, required: ['valueC'] },
            else: { properties: { valueDefault: { type: 'object' } }, required: ['valueDefault'] },
          },
        },
      }),
    conflictingAllOf: z
      .object({ shared: z.string().min(5).openapi({ type: 'string', minLength: 5 }) })
      .partial()
      .openapi({ type: 'object', properties: { shared: { type: 'string', minLength: 5 } } })
      .and(
        z
          .object({ shared: z.string().max(10).openapi({ type: 'string', maxLength: 10 }) })
          .partial()
          .openapi({ type: 'object', properties: { shared: { type: 'string', maxLength: 10 } } }),
      )
      .and(
        z
          .object({
            shared: z
              .string()
              .regex(/^[a-z]+$/)
              .openapi({ type: 'string', pattern: '^[a-z]+$' }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: { shared: { type: 'string', pattern: '^[a-z]+$' } },
          }),
      )
      .optional()
      .openapi({
        allOf: [
          { type: 'object', properties: { shared: { type: 'string', minLength: 5 } } },
          { type: 'object', properties: { shared: { type: 'string', maxLength: 10 } } },
          { type: 'object', properties: { shared: { type: 'string', pattern: '^[a-z]+$' } } },
        ],
      }),
    recursiveConstrained: z
      .object({
        value: z.string().min(1).openapi({ type: 'string', minLength: 1 }),
        children: z
          .array(RecursiveConstrainedSchema)
          .max(5)
          .openapi({
            type: 'array',
            maxItems: 5,
            items: {
              $ref: '#/components/schemas/ExtremeCompositions/properties/recursiveConstrained',
            },
          }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          value: { type: 'string', minLength: 1 },
          children: {
            type: 'array',
            maxItems: 5,
            items: {
              $ref: '#/components/schemas/ExtremeCompositions/properties/recursiveConstrained',
            },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      manyOneOf: {
        oneOf: [
          { type: 'string', const: 'type1' },
          { type: 'string', const: 'type2' },
          { type: 'string', const: 'type3' },
          { type: 'string', const: 'type4' },
          { type: 'string', const: 'type5' },
          { type: 'string', const: 'type6' },
          { type: 'string', const: 'type7' },
          { type: 'string', const: 'type8' },
          { type: 'string', const: 'type9' },
          { type: 'string', const: 'type10' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'array', items: { type: 'string' } },
          { type: 'object' },
          { type: 'null' },
        ],
      },
      deeplyNestedComposition: {
        allOf: [
          {
            oneOf: [
              {
                anyOf: [
                  {
                    allOf: [
                      { type: 'object', properties: { a: { type: 'string' } } },
                      { type: 'object', properties: { b: { type: 'number' } } },
                    ],
                  },
                  { type: 'object', properties: { c: { type: 'boolean' } } },
                ],
              },
              { type: 'object', properties: { d: { type: 'integer' } } },
            ],
          },
          { type: 'object', properties: { e: { type: 'string' } } },
        ],
      },
      complexNot: {
        allOf: [
          { type: 'object', properties: { value: { type: 'string' } } },
          {
            not: {
              anyOf: [
                { type: 'object', properties: { value: { const: 'forbidden1' } } },
                { type: 'object', properties: { value: { const: 'forbidden2' } } },
                { type: 'object', properties: { value: { pattern: '^bad' } } },
              ],
            },
          },
        ],
      },
      conditionalChain: {
        type: 'object',
        if: { properties: { type: { const: 'A' } } },
        then: { properties: { valueA: { type: 'string' } }, required: ['valueA'] },
        else: {
          if: { properties: { type: { const: 'B' } } },
          then: { properties: { valueB: { type: 'number' } }, required: ['valueB'] },
          else: {
            if: { properties: { type: { const: 'C' } } },
            then: { properties: { valueC: { type: 'boolean' } }, required: ['valueC'] },
            else: { properties: { valueDefault: { type: 'object' } }, required: ['valueDefault'] },
          },
        },
      },
      conflictingAllOf: {
        allOf: [
          { type: 'object', properties: { shared: { type: 'string', minLength: 5 } } },
          { type: 'object', properties: { shared: { type: 'string', maxLength: 10 } } },
          { type: 'object', properties: { shared: { type: 'string', pattern: '^[a-z]+$' } } },
        ],
      },
      recursiveConstrained: {
        type: 'object',
        properties: {
          value: { type: 'string', minLength: 1 },
          children: {
            type: 'array',
            maxItems: 5,
            items: {
              $ref: '#/components/schemas/ExtremeCompositions/properties/recursiveConstrained',
            },
          },
        },
      },
    },
  })
  .openapi('ExtremeCompositions')

const ExtremeValidationSchema = z
  .object({
    extremeStrings: ExtremeStringsSchema,
    extremeNumbers: ExtremeNumbersSchema,
    extremeArrays: ExtremeArraysSchema,
    extremeObjects: ExtremeObjectsSchema,
    extremeCompositions: ExtremeCompositionsSchema,
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      extremeStrings: { $ref: '#/components/schemas/ExtremeStrings' },
      extremeNumbers: { $ref: '#/components/schemas/ExtremeNumbers' },
      extremeArrays: { $ref: '#/components/schemas/ExtremeArrays' },
      extremeObjects: { $ref: '#/components/schemas/ExtremeObjects' },
      extremeCompositions: { $ref: '#/components/schemas/ExtremeCompositions' },
    },
  })
  .openapi('ExtremeValidation')

const EnumEdgeCasesSchema = z
  .object({
    singleEnum: z.literal('only_value').openapi({ type: 'string', enum: ['only_value'] }),
    largeEnum: z
      .enum([
        'value001',
        'value002',
        'value003',
        'value004',
        'value005',
        'value006',
        'value007',
        'value008',
        'value009',
        'value010',
        'value011',
        'value012',
        'value013',
        'value014',
        'value015',
        'value016',
        'value017',
        'value018',
        'value019',
        'value020',
        'value021',
        'value022',
        'value023',
        'value024',
        'value025',
        'value026',
        'value027',
        'value028',
        'value029',
        'value030',
        'value031',
        'value032',
        'value033',
        'value034',
        'value035',
        'value036',
        'value037',
        'value038',
        'value039',
        'value040',
        'value041',
        'value042',
        'value043',
        'value044',
        'value045',
        'value046',
        'value047',
        'value048',
        'value049',
        'value050',
      ])
      .openapi({
        type: 'string',
        enum: [
          'value001',
          'value002',
          'value003',
          'value004',
          'value005',
          'value006',
          'value007',
          'value008',
          'value009',
          'value010',
          'value011',
          'value012',
          'value013',
          'value014',
          'value015',
          'value016',
          'value017',
          'value018',
          'value019',
          'value020',
          'value021',
          'value022',
          'value023',
          'value024',
          'value025',
          'value026',
          'value027',
          'value028',
          'value029',
          'value030',
          'value031',
          'value032',
          'value033',
          'value034',
          'value035',
          'value036',
          'value037',
          'value038',
          'value039',
          'value040',
          'value041',
          'value042',
          'value043',
          'value044',
          'value045',
          'value046',
          'value047',
          'value048',
          'value049',
          'value050',
        ],
      }),
    specialEnum: z
      .union([
        z.literal(''),
        z.literal(' '),
        z.literal('  '),
        z.literal(null),
        z.literal(true),
        z.literal(false),
        z.literal(0),
        z.literal(0),
        z.literal(1),
        z.literal(-1),
        z.literal(0),
        z.literal(1.5),
        z.literal(-1.5),
        z.literal(10000000000),
        z.literal([]),
        z.literal({}),
        z.literal([1, 2, 3]),
        z.literal({ key: 'value' }),
      ])
      .openapi({
        enum: [
          '',
          ' ',
          '  ',
          null,
          true,
          false,
          0,
          0,
          1,
          -1,
          0,
          1.5,
          -1.5,
          10000000000,
          [],
          {},
          [1, 2, 3],
          { key: 'value' },
        ],
      }),
    constNull: z.literal(null),
    constComplex: z.literal({ nested: { deeply: { value: 42 } }, array: [1, 2, 3] }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      singleEnum: { type: 'string', enum: ['only_value'] },
      largeEnum: {
        type: 'string',
        enum: [
          'value001',
          'value002',
          'value003',
          'value004',
          'value005',
          'value006',
          'value007',
          'value008',
          'value009',
          'value010',
          'value011',
          'value012',
          'value013',
          'value014',
          'value015',
          'value016',
          'value017',
          'value018',
          'value019',
          'value020',
          'value021',
          'value022',
          'value023',
          'value024',
          'value025',
          'value026',
          'value027',
          'value028',
          'value029',
          'value030',
          'value031',
          'value032',
          'value033',
          'value034',
          'value035',
          'value036',
          'value037',
          'value038',
          'value039',
          'value040',
          'value041',
          'value042',
          'value043',
          'value044',
          'value045',
          'value046',
          'value047',
          'value048',
          'value049',
          'value050',
        ],
      },
      specialEnum: {
        enum: [
          '',
          ' ',
          '  ',
          null,
          true,
          false,
          0,
          0,
          1,
          -1,
          0,
          1.5,
          -1.5,
          10000000000,
          [],
          {},
          [1, 2, 3],
          { key: 'value' },
        ],
      },
      constNull: { const: null },
      constComplex: { const: { nested: { deeply: { value: 42 } }, array: [1, 2, 3] } },
    },
  })
  .openapi('EnumEdgeCases')

export const postValidateRoute = createRoute({
  method: 'post',
  path: '/validate',
  operationId: 'validateExtreme',
  request: {
    body: { content: { 'application/json': { schema: ExtremeValidationSchema.optional() } } },
  },
  responses: { 200: { description: 'OK' } },
})
