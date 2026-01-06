import { createRoute, z } from '@hono/zod-openapi'

type FinalLevelType = { value: string; parent?: Level1Type }

type Level12Type = { data?: FinalLevelType; meta?: string }

type Level11Type = { data?: Level12Type; meta?: string }

type Level10Type = { data?: Level11Type; meta?: string }

type Level9Type = { data?: Level10Type; meta?: string }

type Level8Type = { data?: Level9Type; meta?: string }

type Level7Type = { data?: Level8Type; meta?: string }

type Level6Type = { data?: Level7Type; meta?: string }

type Level5Type = { data?: Level6Type; meta?: string }

type Level4Type = { data?: Level5Type; meta?: string }

type Level3Type = { data?: Level4Type; meta?: string }

type Level2Type = { data?: Level3Type; meta?: string }

type Level1Type = { data?: Level2Type; meta?: string }

type Unnamed137967Type = { 名前?: string; 値?: number; 子要素?: Unnamed137967Type[] }

const ItemSchema = z
  .object({ id: z.string(), name: z.string(), value: z.number().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

type ItemTreeType = { item?: z.infer<typeof ItemSchema>; children?: ItemTreeType[] }

type RecursiveCType = { name?: string; refToA?: RecursiveAType; refToB?: RecursiveBType }

type RecursiveBType = { name?: string; refToC?: RecursiveCType; refToA?: RecursiveAType }

type RecursiveAType = { name?: string; refToB?: RecursiveBType; selfRef?: RecursiveAType }

const Level1Schema: z.ZodType<Level1Type> = z
  .lazy(() => z.object({ data: Level2Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level1')

const Level2Schema: z.ZodType<Level2Type> = z
  .lazy(() => z.object({ data: Level3Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level2')

const Level3Schema: z.ZodType<Level3Type> = z
  .lazy(() => z.object({ data: Level4Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level3')

const Level4Schema: z.ZodType<Level4Type> = z
  .lazy(() => z.object({ data: Level5Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level4')

const Level5Schema: z.ZodType<Level5Type> = z
  .lazy(() => z.object({ data: Level6Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level5')

const Level6Schema: z.ZodType<Level6Type> = z
  .lazy(() => z.object({ data: Level7Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level6')

const Level7Schema: z.ZodType<Level7Type> = z
  .lazy(() => z.object({ data: Level8Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level7')

const Level8Schema: z.ZodType<Level8Type> = z
  .lazy(() => z.object({ data: Level9Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level8')

const Level9Schema: z.ZodType<Level9Type> = z
  .lazy(() => z.object({ data: Level10Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level9')

const Level10Schema: z.ZodType<Level10Type> = z
  .lazy(() => z.object({ data: Level11Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level10')

const Level11Schema: z.ZodType<Level11Type> = z
  .lazy(() => z.object({ data: Level12Schema.exactOptional(), meta: z.string().exactOptional() }))
  .openapi('Level11')

const Level12Schema: z.ZodType<Level12Type> = z
  .lazy(() =>
    z.object({ data: FinalLevelSchema.exactOptional(), meta: z.string().exactOptional() }),
  )
  .openapi('Level12')

const FinalLevelSchema: z.ZodType<FinalLevelType> = z
  .lazy(() =>
    z
      .object({ value: z.string(), parent: Level1Schema.exactOptional() })
      .openapi({ required: ['value'] }),
  )
  .openapi('FinalLevel')

const EmptyObjectSchema = z.object({}).openapi('EmptyObject')

const MinimalObjectSchema = z.object({ x: z.string().exactOptional() }).openapi('MinimalObject')

const EmptyArraySchema = z.array(z.any()).openapi('EmptyArray')

const AnyValueSchema = z.any().openapi('AnyValue')

const NullOnlySchema = z.null().nullable().openapi('NullOnly')

const Schema138560: z.ZodType<Unnamed137967Type> = z
  .lazy(() =>
    z.object({
      名前: z.string().exactOptional(),
      値: z.number().exactOptional(),
      子要素: z.array(Schema138560).exactOptional(),
    }),
  )
  .openapi('Unnamed137967')

const SchMaFranAisSchema2352 = z
  .object({ prénom: z.string().exactOptional(), nom: z.string().exactOptional() })
  .openapi('SchMaFranAis1759')

const Schema13639 = z
  .object({ имя: z.string().exactOptional(), значение: z.number().exactOptional() })
  .openapi('Unnamed13046')

const SchemaWithUnderscoresSchema = z
  .object({ field_one: z.string().exactOptional(), field_two: z.string().exactOptional() })
  .openapi('SchemaWithUnderscores')

const _2FAConfigSchema = z
  .object({
    enabled: z.boolean().exactOptional(),
    method: z.enum(['sms', 'email', 'authenticator']).exactOptional(),
  })
  .openapi('_2FAConfig')

const BaseSchema = z.object({ id: z.string().exactOptional() }).openapi('Base')

const Extension1Schema = z.object({ ext1: z.string().exactOptional() }).openapi('Extension1')

const Extension2Schema = z.object({ ext2: z.string().exactOptional() }).openapi('Extension2')

const Extension3Schema = z.object({ ext3: z.string().exactOptional() }).openapi('Extension3')

const Wrapper5Schema = z
  .object({ content: z.object({ value: z.string().exactOptional() }).exactOptional() })
  .openapi('Wrapper5')

const Wrapper4Schema = z.object({ wrapped: Wrapper5Schema.exactOptional() }).openapi('Wrapper4')

const Wrapper3Schema = z.object({ wrapped: Wrapper4Schema.exactOptional() }).openapi('Wrapper3')

const Wrapper2Schema = z.object({ wrapped: Wrapper3Schema.exactOptional() }).openapi('Wrapper2')

const Wrapper1Schema = z.object({ wrapped: Wrapper2Schema.exactOptional() }).openapi('Wrapper1')

const ItemRefSchema = z
  .object({ itemId: z.string(), item: ItemSchema.exactOptional() })
  .openapi({ required: ['itemId'] })
  .openapi('ItemRef')

const ItemListSchema = z
  .object({ items: z.array(ItemSchema), total: z.int().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('ItemList')

const ItemMapSchema = z.record(z.string(), ItemSchema).openapi('ItemMap')

const ItemTreeSchema: z.ZodType<ItemTreeType> = z
  .lazy(() =>
    z.object({
      item: ItemSchema.exactOptional(),
      children: z.array(ItemTreeSchema).exactOptional(),
    }),
  )
  .openapi('ItemTree')

const SharedComponentSchema = z
  .object({ shared: z.string().exactOptional(), timestamp: z.iso.datetime().exactOptional() })
  .openapi('SharedComponent')

const PolyBaseSchema = z
  .object({
    polyType: z.string(),
    baseField: z.string(),
    sharedRef: SharedComponentSchema.exactOptional(),
  })
  .openapi({ required: ['polyType', 'baseField'] })
  .openapi('PolyBase')

const PolyTypeASchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeA').exactOptional(),
    fieldA: z.string().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
).openapi('PolyTypeA')

const PolyTypeBSchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeB').exactOptional(),
    fieldB: z.number().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
).openapi('PolyTypeB')

const PolyTypeCSchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeC').exactOptional(),
    fieldC: z.boolean().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
).openapi('PolyTypeC')

const PolymorphicSchema = z
  .xor([PolyTypeASchema, PolyTypeBSchema, PolyTypeCSchema])
  .openapi({ discriminator: { propertyName: 'polyType' } })
  .openapi('Polymorphic')

const ConfigBaseSchema = z.object({ key: z.string().exactOptional() }).openapi('ConfigBase')

const ObjectWithRefDefaultSchema = z
  .object({ config: ConfigBaseSchema.default({ key: 'defaultValue' }).exactOptional() })
  .openapi('ObjectWithRefDefault')

const ArrayWithRefItemsSchema = z
  .array(ItemSchema.and(z.object({ arrayIndex: z.int().exactOptional() })))
  .openapi('ArrayWithRefItems')

const MapWithRefValuesSchema = z
  .record(z.string(), ItemSchema.and(z.object({ mapKey: z.string().exactOptional() })))
  .openapi('MapWithRefValues')

const SimpleDataSchema = z.object({ value: z.string().exactOptional() }).openapi('SimpleData')

const ComplexDataSchema = z
  .object({
    values: z.array(SimpleDataSchema).exactOptional(),
    metadata: z.record(z.string(), SimpleDataSchema).exactOptional(),
  })
  .openapi('ComplexData')

const ConditionalSchema = z
  .object({
    type: z.enum(['simple', 'complex']).exactOptional(),
    data: z.xor([SimpleDataSchema, ComplexDataSchema]).exactOptional(),
  })
  .openapi('ConditionalSchema')

const RecursiveASchema: z.ZodType<RecursiveAType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToB: RecursiveBSchema.exactOptional(),
      selfRef: RecursiveASchema.exactOptional(),
    }),
  )
  .openapi('RecursiveA')

const RecursiveBSchema: z.ZodType<RecursiveBType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToC: RecursiveCSchema.exactOptional(),
      refToA: RecursiveASchema.exactOptional(),
    }),
  )
  .openapi('RecursiveB')

const RecursiveCSchema: z.ZodType<RecursiveCType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToA: RecursiveASchema.exactOptional(),
      refToB: RecursiveBSchema.exactOptional(),
    }),
  )
  .openapi('RecursiveC')

const NotExampleSchema = BaseSchema.and(
  z.any().openapi({ not: { $ref: '#/components/schemas/Forbidden' } }),
).openapi('NotExample')

const ForbiddenSchema = z
  .object({ forbiddenField: z.string().exactOptional() })
  .openapi('Forbidden')

const MultiRefSchema = z
  .object({
    first: SharedComponentSchema.exactOptional(),
    second: SharedComponentSchema.exactOptional(),
    third: SharedComponentSchema.exactOptional(),
    nested: z.object({ inner: SharedComponentSchema.exactOptional() }).exactOptional(),
    array: z.array(SharedComponentSchema).exactOptional(),
    map: z.record(z.string(), SharedComponentSchema).exactOptional(),
  })
  .openapi('MultiRef')

const ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema =
  z
    .object({ field: z.string().exactOptional() })
    .openapi(
      'ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
    )

const ShortRefSchema = z
  .object({
    longNameRef:
      ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema.exactOptional(),
  })
  .openapi('ShortRef')

const RefParamParamsSchema = ItemSchema.exactOptional().openapi({
  param: { name: 'refParam', in: 'query', schema: { $ref: '#/components/schemas/Item' } },
})

const RefBodyRequestBody = { content: { 'application/json': { schema: ItemSchema } } }

const CreatedResponse = {
  description: 'Created',
  content: { 'application/json': { schema: ItemSchema } },
}

const ErrorResponse = {
  description: 'Error response',
  content: {
    'application/json': {
      schema: z.object({
        error: z.string().exactOptional(),
        details: SharedComponentSchema.exactOptional(),
      }),
    },
  },
}

const RefHeaderHeaderSchema = ItemSchema.exactOptional()

const ItemExample = { summary: 'Item example', value: { id: '123', name: 'Example', value: 42 } }

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  operationId: 'testEndpoint',
  request: { query: z.object({ refParam: RefParamParamsSchema }) },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Level1Schema } } },
    201: CreatedResponse,
    400: ErrorResponse,
    401: ErrorResponse,
    403: ErrorResponse,
    404: ErrorResponse,
    500: ErrorResponse,
  },
})

export const getEmptyRefsRoute = createRoute({
  method: 'get',
  path: '/empty-refs',
  operationId: 'getEmptyRefs',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: EmptyObjectSchema },
        'application/xml': { schema: MinimalObjectSchema },
      },
    },
  },
})

export const getUnicodeRefsRoute = createRoute({
  method: 'get',
  path: '/unicode-refs',
  operationId: 'getUnicodeRefs',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Schema138560 } } },
  },
})

export const getSpecialCharsRoute = createRoute({
  method: 'get',
  path: '/special-chars',
  operationId: 'getSpecialChars',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaWithUnderscoresSchema } },
    },
  },
})

export const getNumericStartRoute = createRoute({
  method: 'get',
  path: '/numeric-start',
  operationId: 'getNumericStart',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: _2FAConfigSchema } } },
  },
})

export const getRefInAllofRoute = createRoute({
  method: 'get',
  path: '/ref-in-allof',
  operationId: 'getRefInAllOf',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: BaseSchema.and(Extension1Schema)
            .and(Extension2Schema)
            .and(Extension3Schema)
            .and(z.object({ inline: z.string().exactOptional() })),
        },
      },
    },
  },
})

export const getDeeplyNestedRoute = createRoute({
  method: 'get',
  path: '/deeply-nested',
  operationId: 'getDeeplyNested',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Wrapper1Schema } } },
  },
})

export const getSameNameDiffContextRoute = createRoute({
  method: 'get',
  path: '/same-name-diff-context',
  operationId: 'getSameNameDiffContext',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({
            item: ItemSchema.exactOptional(),
            itemRef: ItemRefSchema.exactOptional(),
            itemList: ItemListSchema.exactOptional(),
            itemMap: ItemMapSchema.exactOptional(),
            itemTree: ItemTreeSchema.exactOptional(),
          }),
        },
      },
    },
  },
})
