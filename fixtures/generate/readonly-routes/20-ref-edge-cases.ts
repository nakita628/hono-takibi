import { createRoute, z } from '@hono/zod-openapi'

const Level2Schema: z.ZodType<Level2Type> = z
  .lazy(() => z.object({ data: Level3Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level2')

type Level1Type = { readonly data?: z.infer<typeof Level2Schema>; readonly meta?: string }

const Level3Schema: z.ZodType<Level3Type> = z
  .lazy(() => z.object({ data: Level4Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level3')

type Level2Type = { readonly data?: z.infer<typeof Level3Schema>; readonly meta?: string }

const Level4Schema: z.ZodType<Level4Type> = z
  .lazy(() => z.object({ data: Level5Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level4')

type Level3Type = { readonly data?: z.infer<typeof Level4Schema>; readonly meta?: string }

const Level5Schema: z.ZodType<Level5Type> = z
  .lazy(() => z.object({ data: Level6Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level5')

type Level4Type = { readonly data?: z.infer<typeof Level5Schema>; readonly meta?: string }

const Level6Schema: z.ZodType<Level6Type> = z
  .lazy(() => z.object({ data: Level7Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level6')

type Level5Type = { readonly data?: z.infer<typeof Level6Schema>; readonly meta?: string }

const Level7Schema: z.ZodType<Level7Type> = z
  .lazy(() => z.object({ data: Level8Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level7')

type Level6Type = { readonly data?: z.infer<typeof Level7Schema>; readonly meta?: string }

const Level8Schema: z.ZodType<Level8Type> = z
  .lazy(() => z.object({ data: Level9Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level8')

type Level7Type = { readonly data?: z.infer<typeof Level8Schema>; readonly meta?: string }

const Level9Schema: z.ZodType<Level9Type> = z
  .lazy(() => z.object({ data: Level10Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level9')

type Level8Type = { readonly data?: z.infer<typeof Level9Schema>; readonly meta?: string }

const Level10Schema: z.ZodType<Level10Type> = z
  .lazy(() => z.object({ data: Level11Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level10')

type Level9Type = { readonly data?: z.infer<typeof Level10Schema>; readonly meta?: string }

const Level11Schema: z.ZodType<Level11Type> = z
  .lazy(() => z.object({ data: Level12Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level11')

type Level10Type = { readonly data?: z.infer<typeof Level11Schema>; readonly meta?: string }

const Level12Schema: z.ZodType<Level12Type> = z
  .lazy(() =>
    z.object({ data: FinalLevelSchema.exactOptional(), meta: z.string().exactOptional() }),
  )
  .readonly()
  .openapi('Level12')

type Level11Type = { readonly data?: z.infer<typeof Level12Schema>; readonly meta?: string }

const FinalLevelSchema: z.ZodType<FinalLevelType> = z
  .lazy(() =>
    z
      .object({ value: z.string(), parent: Level1Schema.exactOptional() })
      .openapi({ required: ['value'] }),
  )
  .readonly()
  .openapi('FinalLevel')

type Level12Type = { readonly data?: z.infer<typeof FinalLevelSchema>; readonly meta?: string }

const Level1Schema: z.ZodType<Level1Type> = z
  .lazy(() => z.object({ data: Level2Schema.exactOptional(), meta: z.string().exactOptional() }))
  .readonly()
  .openapi('Level1')

type FinalLevelType = { readonly value: string; readonly parent?: z.infer<typeof Level1Schema> }

type Unnamed137967Type = {
  readonly 名前?: string
  readonly 値?: number
  readonly 子要素?: readonly Unnamed137967Type[]
}

const ItemSchema = z
  .object({ id: z.string(), name: z.string(), value: z.number().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Item')

type ItemTreeType = {
  readonly item?: z.infer<typeof ItemSchema>
  readonly children?: readonly ItemTreeType[]
}

const RecursiveBSchema: z.ZodType<RecursiveBType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToC: RecursiveCSchema.exactOptional(),
      refToA: RecursiveASchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('RecursiveB')

type RecursiveAType = {
  readonly name?: string
  readonly refToB?: z.infer<typeof RecursiveBSchema>
  readonly selfRef?: RecursiveAType
}

const RecursiveCSchema: z.ZodType<RecursiveCType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToA: RecursiveASchema.exactOptional(),
      refToB: RecursiveBSchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('RecursiveC')

const RecursiveASchema: z.ZodType<RecursiveAType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      refToB: RecursiveBSchema.exactOptional(),
      selfRef: RecursiveASchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('RecursiveA')

type RecursiveBType = {
  readonly name?: string
  readonly refToC?: z.infer<typeof RecursiveCSchema>
  readonly refToA?: z.infer<typeof RecursiveASchema>
}

type RecursiveCType = {
  readonly name?: string
  readonly refToA?: z.infer<typeof RecursiveASchema>
  readonly refToB?: z.infer<typeof RecursiveBSchema>
}

const EmptyObjectSchema = z.object({}).readonly().openapi('EmptyObject')

const MinimalObjectSchema = z
  .object({ x: z.string().exactOptional() })
  .readonly()
  .openapi('MinimalObject')

const EmptyArraySchema = z.array(z.any()).readonly().openapi('EmptyArray')

const AnyValueSchema = z.any().readonly().openapi('AnyValue')

const NullOnlySchema = z.null().nullable().readonly().openapi('NullOnly')

const Schema138560: z.ZodType<Unnamed137967Type> = z
  .lazy(() =>
    z.object({
      名前: z.string().exactOptional(),
      値: z.number().exactOptional(),
      子要素: z.array(Schema138560).exactOptional(),
    }),
  )
  .readonly()
  .openapi('Unnamed137967')

const SchMaFranAisSchema2352 = z
  .object({ prénom: z.string().exactOptional(), nom: z.string().exactOptional() })
  .readonly()
  .openapi('SchMaFranAis1759')

const Schema13639 = z
  .object({ имя: z.string().exactOptional(), значение: z.number().exactOptional() })
  .readonly()
  .openapi('Unnamed13046')

const SchemaWithUnderscoresSchema = z
  .object({ field_one: z.string().exactOptional(), field_two: z.string().exactOptional() })
  .readonly()
  .openapi('SchemaWithUnderscores')

const _2FAConfigSchema = z
  .object({
    enabled: z.boolean().exactOptional(),
    method: z.enum(['sms', 'email', 'authenticator']).exactOptional(),
  })
  .readonly()
  .openapi('_2FAConfig')

const BaseSchema = z.object({ id: z.string().exactOptional() }).readonly().openapi('Base')

const Extension1Schema = z
  .object({ ext1: z.string().exactOptional() })
  .readonly()
  .openapi('Extension1')

const Extension2Schema = z
  .object({ ext2: z.string().exactOptional() })
  .readonly()
  .openapi('Extension2')

const Extension3Schema = z
  .object({ ext3: z.string().exactOptional() })
  .readonly()
  .openapi('Extension3')

const Wrapper5Schema = z
  .object({ content: z.object({ value: z.string().exactOptional() }).exactOptional() })
  .readonly()
  .openapi('Wrapper5')

const Wrapper4Schema = z
  .object({ wrapped: Wrapper5Schema.exactOptional() })
  .readonly()
  .openapi('Wrapper4')

const Wrapper3Schema = z
  .object({ wrapped: Wrapper4Schema.exactOptional() })
  .readonly()
  .openapi('Wrapper3')

const Wrapper2Schema = z
  .object({ wrapped: Wrapper3Schema.exactOptional() })
  .readonly()
  .openapi('Wrapper2')

const Wrapper1Schema = z
  .object({ wrapped: Wrapper2Schema.exactOptional() })
  .readonly()
  .openapi('Wrapper1')

const ItemRefSchema = z
  .object({ itemId: z.string(), item: ItemSchema.exactOptional() })
  .openapi({ required: ['itemId'] })
  .readonly()
  .openapi('ItemRef')

const ItemListSchema = z
  .object({ items: z.array(ItemSchema), total: z.int().exactOptional() })
  .openapi({ required: ['items'] })
  .readonly()
  .openapi('ItemList')

const ItemMapSchema = z.record(z.string(), ItemSchema).readonly().openapi('ItemMap')

const ItemTreeSchema: z.ZodType<ItemTreeType> = z
  .lazy(() =>
    z.object({
      item: ItemSchema.exactOptional(),
      children: z.array(ItemTreeSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('ItemTree')

const SharedComponentSchema = z
  .object({ shared: z.string().exactOptional(), timestamp: z.iso.datetime().exactOptional() })
  .readonly()
  .openapi('SharedComponent')

const PolyBaseSchema = z
  .object({
    polyType: z.string(),
    baseField: z.string(),
    sharedRef: SharedComponentSchema.exactOptional(),
  })
  .openapi({ required: ['polyType', 'baseField'] })
  .readonly()
  .openapi('PolyBase')

const PolyTypeASchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeA').exactOptional(),
    fieldA: z.string().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
)
  .readonly()
  .openapi('PolyTypeA')

const PolyTypeBSchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeB').exactOptional(),
    fieldB: z.number().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
)
  .readonly()
  .openapi('PolyTypeB')

const PolyTypeCSchema = PolyBaseSchema.and(
  z.object({
    polyType: z.literal('typeC').exactOptional(),
    fieldC: z.boolean().exactOptional(),
    nestedRef: SharedComponentSchema.exactOptional(),
  }),
)
  .readonly()
  .openapi('PolyTypeC')

const PolymorphicSchema = z
  .xor([PolyTypeASchema, PolyTypeBSchema, PolyTypeCSchema])
  .openapi({ discriminator: { propertyName: 'polyType' } })
  .readonly()
  .openapi('Polymorphic')

const ConfigBaseSchema = z
  .object({ key: z.string().exactOptional() })
  .readonly()
  .openapi('ConfigBase')

const ObjectWithRefDefaultSchema = z
  .object({ config: ConfigBaseSchema.default({ key: 'defaultValue' }).exactOptional() })
  .readonly()
  .openapi('ObjectWithRefDefault')

const ArrayWithRefItemsSchema = z
  .array(ItemSchema.and(z.object({ arrayIndex: z.int().exactOptional() })))
  .readonly()
  .openapi('ArrayWithRefItems')

const MapWithRefValuesSchema = z
  .record(z.string(), ItemSchema.and(z.object({ mapKey: z.string().exactOptional() })))
  .readonly()
  .openapi('MapWithRefValues')

const SimpleDataSchema = z
  .object({ value: z.string().exactOptional() })
  .readonly()
  .openapi('SimpleData')

const ComplexDataSchema = z
  .object({
    values: z.array(SimpleDataSchema).exactOptional(),
    metadata: z.record(z.string(), SimpleDataSchema).exactOptional(),
  })
  .readonly()
  .openapi('ComplexData')

const ConditionalSchema = z
  .object({
    type: z.enum(['simple', 'complex']).exactOptional(),
    data: z.xor([SimpleDataSchema, ComplexDataSchema]).exactOptional(),
  })
  .readonly()
  .openapi('ConditionalSchema')

const NotExampleSchema = BaseSchema.and(
  z.any().openapi({ not: { $ref: '#/components/schemas/Forbidden' } }),
)
  .readonly()
  .openapi('NotExample')

const ForbiddenSchema = z
  .object({ forbiddenField: z.string().exactOptional() })
  .readonly()
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
  .readonly()
  .openapi('MultiRef')

const ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema =
  z
    .object({ field: z.string().exactOptional() })
    .readonly()
    .openapi(
      'ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
    )

const ShortRefSchema = z
  .object({
    longNameRef:
      ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema.exactOptional(),
  })
  .readonly()
  .openapi('ShortRef')

const RefParamParamsSchema = ItemSchema.exactOptional()
  .openapi({
    param: { name: 'refParam', in: 'query', schema: { $ref: '#/components/schemas/Item' } },
  })
  .readonly()

const RefBodyRequestBody = { content: { 'application/json': { schema: ItemSchema } } } as const

const CreatedResponse = {
  description: 'Created',
  content: { 'application/json': { schema: ItemSchema } },
} as const

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
} as const

const RefHeaderHeaderSchema = ItemSchema.exactOptional().readonly()

const ItemExample = {
  summary: 'Item example',
  value: { id: '123', name: 'Example', value: 42 },
} as const

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
} as const)

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
} as const)

export const getUnicodeRefsRoute = createRoute({
  method: 'get',
  path: '/unicode-refs',
  operationId: 'getUnicodeRefs',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Schema138560 } } },
  },
} as const)

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
} as const)

export const getNumericStartRoute = createRoute({
  method: 'get',
  path: '/numeric-start',
  operationId: 'getNumericStart',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: _2FAConfigSchema } } },
  },
} as const)

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
} as const)

export const getDeeplyNestedRoute = createRoute({
  method: 'get',
  path: '/deeply-nested',
  operationId: 'getDeeplyNested',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Wrapper1Schema } } },
  },
} as const)

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
} as const)
