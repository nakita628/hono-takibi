import { createRoute, z } from '@hono/zod-openapi'

type ExtremeCompositionsType = {
  manyOneOf?:
    | 'type1'
    | 'type2'
    | 'type3'
    | 'type4'
    | 'type5'
    | 'type6'
    | 'type7'
    | 'type8'
    | 'type9'
    | 'type10'
    | number
    | boolean
    | unknown[]
    | Record<string, unknown>
    | (Record<string, unknown> | null)
  deeplyNestedComposition?: (
    | (({ a?: string } & { b?: number }) | { c?: boolean })
    | { d?: number }
  ) & { e?: string }
  complexNot?: { value?: string } & Record<string, unknown>
  conditionalChain?: Record<string, unknown>
  conflictingAllOf?: { shared?: string } & { shared?: string } & { shared?: string }
  recursiveConstrained?: { value?: string; children?: ExtremeCompositionsType[] }
}

const ExtremeStringsSchema = z
  .object({
    emptyOnly: z.string().length(0).exactOptional(),
    singleChar: z.string().length(1).exactOptional(),
    veryLong: z.string().min(1000000).max(10000000).exactOptional(),
    conflictingPatternFormat: z
      .email()
      .regex(/^[0-9]+$/)
      .exactOptional(),
    multiPattern: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .min(8)
      .max(128)
      .exactOptional(),
    unicodePattern: z
      .string()
      .regex(/^[\p{L}\p{N}]+$/u)
      .exactOptional(),
    complexRegex: z
      .string()
      .regex(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
      )
      .exactOptional(),
    emptyPattern: z.string().exactOptional(),
    impossiblePattern: z
      .string()
      .regex(/^(?!.*)$/)
      .exactOptional(),
    allFormats: z
      .object({
        dateTime: z.iso.datetime().exactOptional(),
        date: z.iso.date().exactOptional(),
        time: z.iso.time().exactOptional(),
        duration: z.iso.duration().exactOptional(),
        email: z.email().exactOptional(),
        idnEmail: z.string().exactOptional(),
        hostname: z.string().exactOptional(),
        idnHostname: z.string().exactOptional(),
        ipv4: z.ipv4().exactOptional(),
        ipv6: z.ipv6().exactOptional(),
        uri: z.url().exactOptional(),
        uriReference: z.string().exactOptional(),
        iri: z.string().exactOptional(),
        iriReference: z.string().exactOptional(),
        uriTemplate: z.string().exactOptional(),
        jsonPointer: z.string().exactOptional(),
        relativeJsonPointer: z.string().exactOptional(),
        regex: z.string().exactOptional(),
        uuid: z.uuid().exactOptional(),
        byte: z.string().exactOptional(),
        binary: z.file().exactOptional(),
        password: z.string().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi('ExtremeStrings')

const ExtremeNumbersSchema = z
  .object({
    zeroOnly: z.number().min(0).max(0).exactOptional(),
    negativeZero: z.number().min(0).max(0).exactOptional(),
    tinyRange: z.number().min(1e-7).max(2e-7).exactOptional(),
    hugePositive: z.number().min(1e308).exactOptional(),
    hugeNegative: z.number().max(-1e308).exactOptional(),
    preciseMultiple: z.number().multipleOf(1e-10).exactOptional(),
    conflictingMultiple: z.number().min(1).max(10).multipleOf(7).exactOptional(),
    integerDecimalMultiple: z.int().multipleOf(0.5).exactOptional(),
    exclusiveEdge: z.number().min(0).max(100).exactOptional(),
    bothExclusive: z.number().gt(0).lt(1).exactOptional(),
    int32Bounded: z.int32().min(-2147483648).max(2147483647).exactOptional(),
    int64Bounded: z.int64().min(-9223372036854776000n).max(9223372036854776000n).exactOptional(),
    floatEdge: z.float32().min(1.17549435e-38).max(3.40282347e38).exactOptional(),
    doubleEdge: z.number().min(2.2250738585072014e-308).max(1.7976931348623157e308).exactOptional(),
  })
  .openapi('ExtremeNumbers')

const ExtremeArraysSchema = z
  .object({
    emptyOnly: z.array(z.any()).length(0).exactOptional().openapi({ minItems: 0, maxItems: 0 }),
    singleOnly: z.array(z.string()).length(1).exactOptional().openapi({ minItems: 1, maxItems: 1 }),
    hugeArray: z
      .array(z.string())
      .min(1000000)
      .max(10000000)
      .exactOptional()
      .openapi({ minItems: 1000000, maxItems: 10000000 }),
    uniqueBooleans: z.array(z.boolean()).max(2).exactOptional().openapi({ maxItems: 2 }),
    uniqueEnum: z
      .array(z.enum(['a', 'b', 'c']))
      .length(3)
      .exactOptional()
      .openapi({ minItems: 3, maxItems: 3 }),
    deeplyNested: z
      .array(
        z
          .array(
            z
              .array(
                z
                  .array(z.string().min(1).max(10))
                  .min(4)
                  .max(6)
                  .openapi({ minItems: 4, maxItems: 6 }),
              )
              .min(3)
              .max(5)
              .openapi({ minItems: 3, maxItems: 5 }),
          )
          .min(2)
          .max(4)
          .openapi({ minItems: 2, maxItems: 4 }),
      )
      .min(1)
      .max(3)
      .exactOptional()
      .openapi({ minItems: 1, maxItems: 3 }),
    uniqueNested: z.array(z.array(z.int())).exactOptional(),
    largeTuple: z.array(z.any()).length(10).exactOptional().openapi({ minItems: 10, maxItems: 10 }),
    tupleWithAdditional: z.array(z.boolean()).min(5).exactOptional().openapi({ minItems: 5 }),
    containsConstraint: z.array(z.any()).min(10).exactOptional().openapi({ minItems: 10 }),
  })
  .openapi('ExtremeArrays')

const ExtremeObjectsSchema = z
  .object({
    emptyOnly: z.strictObject({}).exactOptional().openapi({ minProperties: 0, maxProperties: 0 }),
    singleProperty: z
      .record(z.string(), z.string())
      .exactOptional()
      .openapi({ minProperties: 1, maxProperties: 1 }),
    manyRequired: z
      .object({
        prop1: z.string(),
        prop2: z.string(),
        prop3: z.string(),
        prop4: z.string(),
        prop5: z.string(),
        prop6: z.string(),
        prop7: z.string(),
        prop8: z.string(),
        prop9: z.string(),
        prop10: z.string(),
        prop11: z.string(),
        prop12: z.string(),
        prop13: z.string(),
        prop14: z.string(),
        prop15: z.string(),
        prop16: z.string(),
        prop17: z.string(),
        prop18: z.string(),
        prop19: z.string(),
        prop20: z.string(),
      })
      .exactOptional()
      .openapi({
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
      }),
    patternProperties: z.strictObject({}).exactOptional(),
    dependentRequired: z
      .object({
        billing_address: z.string().exactOptional(),
        shipping_address: z.string().exactOptional(),
        use_same_address: z.boolean().exactOptional(),
      })
      .exactOptional(),
    dependentSchemas: z
      .object({
        credit_card: z.string().exactOptional(),
        billing_address: z.string().exactOptional(),
      })
      .exactOptional(),
    propertyNames: z.record(z.string(), z.string()).exactOptional(),
    unevaluatedProps: z.object({ known: z.string().exactOptional() }).exactOptional(),
  })
  .openapi('ExtremeObjects')

const ExtremeCompositionsSchema: z.ZodType<ExtremeCompositionsType> = z
  .lazy(() =>
    z.object({
      manyOneOf: z
        .xor([
          z.literal('type1'),
          z.literal('type2'),
          z.literal('type3'),
          z.literal('type4'),
          z.literal('type5'),
          z.literal('type6'),
          z.literal('type7'),
          z.literal('type8'),
          z.literal('type9'),
          z.literal('type10'),
          z.number(),
          z.boolean(),
          z.array(z.string()),
          z.object({}),
          z.null().nullable(),
        ])
        .exactOptional(),
      deeplyNestedComposition: z
        .xor([
          z.union([
            z
              .object({ a: z.string().exactOptional() })
              .and(z.object({ b: z.number().exactOptional() })),
            z.object({ c: z.boolean().exactOptional() }),
          ]),
          z.object({ d: z.int().exactOptional() }),
        ])
        .and(z.object({ e: z.string().exactOptional() }))
        .exactOptional(),
      complexNot: z.object({ value: z.string().exactOptional() }).and(
        z
          .any()
          .exactOptional()
          .openapi({
            not: {
              anyOf: [
                { type: 'object', properties: { value: { const: 'forbidden1' } } },
                { type: 'object', properties: { value: { const: 'forbidden2' } } },
                { type: 'object', properties: { value: { pattern: '^bad' } } },
              ],
            },
          }),
      ),
      conditionalChain: z.object({}).exactOptional(),
      conflictingAllOf: z
        .object({ shared: z.string().min(5).exactOptional() })
        .and(z.object({ shared: z.string().max(10).exactOptional() }))
        .and(
          z.object({
            shared: z
              .string()
              .regex(/^[a-z]+$/)
              .exactOptional(),
          }),
        )
        .exactOptional(),
      recursiveConstrained: z.object({
        value: z.string().min(1).exactOptional(),
        children: z
          .array(z.lazy(() => ExtremeCompositionsSchema))
          .max(5)
          .exactOptional()
          .exactOptional()
          .openapi({ maxItems: 5 }),
      }),
    }),
  )
  .openapi('ExtremeCompositions')

const ExtremeValidationSchema = z
  .object({
    extremeStrings: ExtremeStringsSchema.exactOptional(),
    extremeNumbers: ExtremeNumbersSchema.exactOptional(),
    extremeArrays: ExtremeArraysSchema.exactOptional(),
    extremeObjects: ExtremeObjectsSchema.exactOptional(),
    extremeCompositions: ExtremeCompositionsSchema.exactOptional(),
  })
  .openapi('ExtremeValidation')

const EnumEdgeCasesSchema = z
  .object({
    singleEnum: z.literal('only_value').exactOptional(),
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
      .exactOptional(),
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
        z.custom<[]>(),
        z.custom<{}>(),
        z.custom<[1, 2, 3]>(),
        z.custom<{ key: 'value' }>(),
      ])
      .exactOptional(),
    constNull: z.literal(null).exactOptional(),
    constComplex: z
      .custom<{ nested: { deeply: { value: 42 } }; array: [1, 2, 3] }>()
      .exactOptional(),
  })
  .openapi('EnumEdgeCases')

export const postValidateRoute = createRoute({
  method: 'post',
  path: '/validate',
  operationId: 'validateExtreme',
  request: { body: { content: { 'application/json': { schema: ExtremeValidationSchema } } } },
  responses: { 200: { description: 'OK' } },
})
