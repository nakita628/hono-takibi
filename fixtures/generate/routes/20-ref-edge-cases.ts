import { createRoute, z } from '@hono/zod-openapi'

const Level2Schema: z.ZodType<Level2Type> = z
  .lazy(() =>
    z
      .object({
        data: Level3Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level3' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level2')

type Level1Type = { data?: z.infer<typeof Level2Schema>; meta?: string }

const Level1Schema: z.ZodType<Level1Type> = z
  .lazy(() =>
    z
      .object({
        data: Level2Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level2' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level1')

const Level3Schema: z.ZodType<Level3Type> = z
  .lazy(() =>
    z
      .object({
        data: Level4Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level4' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level3')

type Level2Type = { data?: z.infer<typeof Level3Schema>; meta?: string }

const Level4Schema: z.ZodType<Level4Type> = z
  .lazy(() =>
    z
      .object({
        data: Level5Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level5' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level4')

type Level3Type = { data?: z.infer<typeof Level4Schema>; meta?: string }

const Level5Schema: z.ZodType<Level5Type> = z
  .lazy(() =>
    z
      .object({
        data: Level6Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level6' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level5')

type Level4Type = { data?: z.infer<typeof Level5Schema>; meta?: string }

const Level6Schema: z.ZodType<Level6Type> = z
  .lazy(() =>
    z
      .object({
        data: Level7Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level7' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level6')

type Level5Type = { data?: z.infer<typeof Level6Schema>; meta?: string }

const Level7Schema: z.ZodType<Level7Type> = z
  .lazy(() =>
    z
      .object({
        data: Level8Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level8' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level7')

type Level6Type = { data?: z.infer<typeof Level7Schema>; meta?: string }

const Level8Schema: z.ZodType<Level8Type> = z
  .lazy(() =>
    z
      .object({
        data: Level9Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level9' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level8')

type Level7Type = { data?: z.infer<typeof Level8Schema>; meta?: string }

const Level9Schema: z.ZodType<Level9Type> = z
  .lazy(() =>
    z
      .object({
        data: Level10Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level10' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level9')

type Level8Type = { data?: z.infer<typeof Level9Schema>; meta?: string }

const Level10Schema: z.ZodType<Level10Type> = z
  .lazy(() =>
    z
      .object({
        data: Level11Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level11' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level10')

type Level9Type = { data?: z.infer<typeof Level10Schema>; meta?: string }

const Level11Schema: z.ZodType<Level11Type> = z
  .lazy(() =>
    z
      .object({
        data: Level12Schema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/Level12' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level11')

type Level10Type = { data?: z.infer<typeof Level11Schema>; meta?: string }

const Level12Schema: z.ZodType<Level12Type> = z
  .lazy(() =>
    z
      .object({
        data: FinalLevelSchema.exactOptional(),
        meta: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { data: { $ref: '#/components/schemas/FinalLevel' }, meta: { type: 'string' } },
      }),
  )
  .openapi('Level12')

type Level11Type = { data?: z.infer<typeof Level12Schema>; meta?: string }

const FinalLevelSchema: z.ZodType<FinalLevelType> = z
  .lazy(() =>
    z
      .object({
        value: z.string().openapi({ type: 'string' }),
        parent: Level1Schema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['value'],
        properties: { value: { type: 'string' }, parent: { $ref: '#/components/schemas/Level1' } },
      }),
  )
  .openapi('FinalLevel')

type Level12Type = { data?: z.infer<typeof FinalLevelSchema>; meta?: string }

type FinalLevelType = { value: string; parent?: z.infer<typeof Level1Schema> }

const EmptyObjectSchema = z.object({}).openapi({ type: 'object' }).openapi('EmptyObject')

const MinimalObjectSchema = z
  .object({ x: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { x: { type: 'string' } } })
  .openapi('MinimalObject')

const EmptyArraySchema = z
  .array(z.any())
  .openapi({ type: 'array', items: {} })
  .openapi('EmptyArray')

const AnyValueSchema = z.any().openapi('AnyValue')

const NullOnlySchema = z.null().nullable().openapi({ type: 'null' }).openapi('NullOnly')

type _______Type = { 名前?: string; 値?: number; 子要素?: _______Type[] }

const Schema = z
  .object({
    имя: z.string().exactOptional().openapi({ type: 'string' }),
    значение: z.number().exactOptional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    properties: { имя: { type: 'string' }, значение: { type: 'number' } },
  })
  .openapi('_____________')

const SchMaFranAisSchema = z
  .object({
    prénom: z.string().exactOptional().openapi({ type: 'string' }),
    nom: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({ type: 'object', properties: { prénom: { type: 'string' }, nom: { type: 'string' } } })
  .openapi('SchMaFranAis')

const SchemaWithUnderscoresSchema = z
  .object({
    field_one: z.string().exactOptional().openapi({ type: 'string' }),
    field_two: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: { field_one: { type: 'string' }, field_two: { type: 'string' } },
  })
  .openapi('SchemaWithUnderscores')

const _2FAConfigSchema = z
  .object({
    enabled: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    method: z
      .enum(['sms', 'email', 'authenticator'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['sms', 'email', 'authenticator'] }),
  })
  .openapi({
    type: 'object',
    properties: {
      enabled: { type: 'boolean' },
      method: { type: 'string', enum: ['sms', 'email', 'authenticator'] },
    },
  })
  .openapi('_2FAConfig')

const BaseSchema = z
  .object({ id: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { id: { type: 'string' } } })
  .openapi('Base')

const Extension1Schema = z
  .object({ ext1: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { ext1: { type: 'string' } } })
  .openapi('Extension1')

const Extension2Schema = z
  .object({ ext2: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { ext2: { type: 'string' } } })
  .openapi('Extension2')

const Extension3Schema = z
  .object({ ext3: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { ext3: { type: 'string' } } })
  .openapi('Extension3')

const Wrapper5Schema = z
  .object({
    content: z
      .object({ value: z.string().exactOptional().openapi({ type: 'string' }) })
      .exactOptional()
      .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
  })
  .openapi({
    type: 'object',
    properties: { content: { type: 'object', properties: { value: { type: 'string' } } } },
  })
  .openapi('Wrapper5')

const Wrapper4Schema = z
  .object({ wrapped: Wrapper5Schema.exactOptional() })
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper5' } } })
  .openapi('Wrapper4')

const Wrapper3Schema = z
  .object({ wrapped: Wrapper4Schema.exactOptional() })
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper4' } } })
  .openapi('Wrapper3')

const Wrapper2Schema = z
  .object({ wrapped: Wrapper3Schema.exactOptional() })
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper3' } } })
  .openapi('Wrapper2')

const Wrapper1Schema = z
  .object({ wrapped: Wrapper2Schema.exactOptional() })
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper2' } } })
  .openapi('Wrapper1')

const ItemSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    value: z.number().exactOptional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: { id: { type: 'string' }, name: { type: 'string' }, value: { type: 'number' } },
  })
  .openapi('Item')

const ItemRefSchema = z
  .object({ itemId: z.string().openapi({ type: 'string' }), item: ItemSchema.exactOptional() })
  .openapi({
    type: 'object',
    required: ['itemId'],
    properties: { itemId: { type: 'string' }, item: { $ref: '#/components/schemas/Item' } },
  })
  .openapi('ItemRef')

const ItemListSchema = z
  .object({
    items: z
      .array(ItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Item' } }),
    total: z.int().exactOptional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['items'],
    properties: {
      items: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
      total: { type: 'integer' },
    },
  })
  .openapi('ItemList')

const ItemMapSchema = z
  .record(z.string(), ItemSchema)
  .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/Item' } })
  .openapi('ItemMap')

type ItemTreeType = { item?: z.infer<typeof ItemSchema>; children?: ItemTreeType[] }

const ItemTreeSchema: z.ZodType<ItemTreeType> = z
  .lazy(() =>
    z
      .object({
        item: ItemSchema.exactOptional(),
        children: z
          .array(ItemTreeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ItemTree' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          item: { $ref: '#/components/schemas/Item' },
          children: { type: 'array', items: { $ref: '#/components/schemas/ItemTree' } },
        },
      }),
  )
  .openapi('ItemTree')

const SharedComponentSchema = z
  .object({
    shared: z.string().exactOptional().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    properties: { shared: { type: 'string' }, timestamp: { type: 'string', format: 'date-time' } },
  })
  .openapi('SharedComponent')

const PolyBaseSchema = z
  .object({
    polyType: z.string().openapi({ type: 'string' }),
    baseField: z.string().openapi({ type: 'string' }),
    sharedRef: SharedComponentSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['polyType', 'baseField'],
    properties: {
      polyType: { type: 'string' },
      baseField: { type: 'string' },
      sharedRef: { $ref: '#/components/schemas/SharedComponent' },
    },
  })
  .openapi('PolyBase')

const PolyTypeASchema = z
  .intersection(
    PolyBaseSchema,
    z
      .object({
        polyType: z.literal('typeA').exactOptional(),
        fieldA: z.string().exactOptional().openapi({ type: 'string' }),
        nestedRef: SharedComponentSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeA' },
          fieldA: { type: 'string' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/PolyBase' },
      {
        type: 'object',
        properties: {
          polyType: { const: 'typeA' },
          fieldA: { type: 'string' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      },
    ],
  })
  .openapi('PolyTypeA')

const PolyTypeBSchema = z
  .intersection(
    PolyBaseSchema,
    z
      .object({
        polyType: z.literal('typeB').exactOptional(),
        fieldB: z.number().exactOptional().openapi({ type: 'number' }),
        nestedRef: SharedComponentSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeB' },
          fieldB: { type: 'number' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/PolyBase' },
      {
        type: 'object',
        properties: {
          polyType: { const: 'typeB' },
          fieldB: { type: 'number' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      },
    ],
  })
  .openapi('PolyTypeB')

const PolyTypeCSchema = z
  .intersection(
    PolyBaseSchema,
    z
      .object({
        polyType: z.literal('typeC').exactOptional(),
        fieldC: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        nestedRef: SharedComponentSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeC' },
          fieldC: { type: 'boolean' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/PolyBase' },
      {
        type: 'object',
        properties: {
          polyType: { const: 'typeC' },
          fieldC: { type: 'boolean' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      },
    ],
  })
  .openapi('PolyTypeC')

const PolymorphicSchema = z
  .union([PolyTypeASchema, PolyTypeBSchema, PolyTypeCSchema])
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/PolyTypeA' },
      { $ref: '#/components/schemas/PolyTypeB' },
      { $ref: '#/components/schemas/PolyTypeC' },
    ],
    discriminator: { propertyName: 'polyType' },
  })
  .openapi('Polymorphic')

const ConfigBaseSchema = z
  .object({ key: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { key: { type: 'string' } } })
  .openapi('ConfigBase')

const ObjectWithRefDefaultSchema = z
  .object({
    config: ConfigBaseSchema.default({ key: 'defaultValue' })
      .exactOptional()
      .openapi({
        allOf: [{ $ref: '#/components/schemas/ConfigBase' }],
        default: { key: 'defaultValue' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      config: {
        allOf: [{ $ref: '#/components/schemas/ConfigBase' }],
        default: { key: 'defaultValue' },
      },
    },
  })
  .openapi('ObjectWithRefDefault')

const ArrayWithRefItemsSchema = z
  .array(
    z
      .intersection(
        ItemSchema,
        z
          .object({ arrayIndex: z.int().exactOptional().openapi({ type: 'integer' }) })
          .openapi({ type: 'object', properties: { arrayIndex: { type: 'integer' } } }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/Item' },
          { type: 'object', properties: { arrayIndex: { type: 'integer' } } },
        ],
      }),
  )
  .openapi({
    type: 'array',
    items: {
      allOf: [
        { $ref: '#/components/schemas/Item' },
        { type: 'object', properties: { arrayIndex: { type: 'integer' } } },
      ],
    },
  })
  .openapi('ArrayWithRefItems')

const MapWithRefValuesSchema = z
  .record(
    z.string(),
    z
      .intersection(
        ItemSchema,
        z
          .object({ mapKey: z.string().exactOptional().openapi({ type: 'string' }) })
          .openapi({ type: 'object', properties: { mapKey: { type: 'string' } } }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/Item' },
          { type: 'object', properties: { mapKey: { type: 'string' } } },
        ],
      }),
  )
  .openapi({
    type: 'object',
    additionalProperties: {
      allOf: [
        { $ref: '#/components/schemas/Item' },
        { type: 'object', properties: { mapKey: { type: 'string' } } },
      ],
    },
  })
  .openapi('MapWithRefValues')

const SimpleDataSchema = z
  .object({ value: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('SimpleData')

const ComplexDataSchema = z
  .object({
    values: z
      .array(SimpleDataSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SimpleData' } }),
    metadata: z
      .record(z.string(), SimpleDataSchema)
      .exactOptional()
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/SimpleData' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      values: { type: 'array', items: { $ref: '#/components/schemas/SimpleData' } },
      metadata: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/SimpleData' },
      },
    },
  })
  .openapi('ComplexData')

const ConditionalSchema = z
  .object({
    type: z
      .enum(['simple', 'complex'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['simple', 'complex'] }),
    data: z
      .union([SimpleDataSchema, ComplexDataSchema])
      .exactOptional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/SimpleData' },
          { $ref: '#/components/schemas/ComplexData' },
        ],
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['simple', 'complex'] },
      data: {
        oneOf: [
          { $ref: '#/components/schemas/SimpleData' },
          { $ref: '#/components/schemas/ComplexData' },
        ],
      },
    },
  })
  .openapi('ConditionalSchema')

const RecursiveBSchema: z.ZodType<RecursiveBType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        refToC: RecursiveCSchema.exactOptional(),
        refToA: RecursiveASchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          name: { type: 'string' },
          refToC: { $ref: '#/components/schemas/RecursiveC' },
          refToA: { $ref: '#/components/schemas/RecursiveA' },
        },
      }),
  )
  .openapi('RecursiveB')

type RecursiveAType = {
  name?: string
  refToB?: z.infer<typeof RecursiveBSchema>
  selfRef?: RecursiveAType
}

const RecursiveASchema: z.ZodType<RecursiveAType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        refToB: RecursiveBSchema.exactOptional(),
        selfRef: RecursiveASchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          name: { type: 'string' },
          refToB: { $ref: '#/components/schemas/RecursiveB' },
          selfRef: { $ref: '#/components/schemas/RecursiveA' },
        },
      }),
  )
  .openapi('RecursiveA')

const RecursiveCSchema: z.ZodType<RecursiveCType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        refToA: RecursiveASchema.exactOptional(),
        refToB: RecursiveBSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          name: { type: 'string' },
          refToA: { $ref: '#/components/schemas/RecursiveA' },
          refToB: { $ref: '#/components/schemas/RecursiveB' },
        },
      }),
  )
  .openapi('RecursiveC')

type RecursiveBType = {
  name?: string
  refToC?: z.infer<typeof RecursiveCSchema>
  refToA?: z.infer<typeof RecursiveASchema>
}

type RecursiveCType = {
  name?: string
  refToA?: z.infer<typeof RecursiveASchema>
  refToB?: z.infer<typeof RecursiveBSchema>
}

const NotExampleSchema = z
  .intersection(BaseSchema, z.any().openapi({ not: { $ref: '#/components/schemas/Forbidden' } }))
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Base' },
      { not: { $ref: '#/components/schemas/Forbidden' } },
    ],
  })
  .openapi('NotExample')

const ForbiddenSchema = z
  .object({ forbiddenField: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { forbiddenField: { type: 'string' } } })
  .openapi('Forbidden')

const MultiRefSchema = z
  .object({
    first: SharedComponentSchema.exactOptional(),
    second: SharedComponentSchema.exactOptional(),
    third: SharedComponentSchema.exactOptional(),
    nested: z
      .object({ inner: SharedComponentSchema.exactOptional() })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { inner: { $ref: '#/components/schemas/SharedComponent' } },
      }),
    array: z
      .array(SharedComponentSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SharedComponent' } }),
    map: z
      .record(z.string(), SharedComponentSchema)
      .exactOptional()
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/SharedComponent' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      first: { $ref: '#/components/schemas/SharedComponent' },
      second: { $ref: '#/components/schemas/SharedComponent' },
      third: { $ref: '#/components/schemas/SharedComponent' },
      nested: {
        type: 'object',
        properties: { inner: { $ref: '#/components/schemas/SharedComponent' } },
      },
      array: { type: 'array', items: { $ref: '#/components/schemas/SharedComponent' } },
      map: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/SharedComponent' },
      },
    },
  })
  .openapi('MultiRef')

const ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema =
  z
    .object({ field: z.string().exactOptional().openapi({ type: 'string' }) })
    .openapi({ type: 'object', properties: { field: { type: 'string' } } })
    .openapi(
      'ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
    )

const ShortRefSchema = z
  .object({
    longNameRef:
      ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      longNameRef: {
        $ref: '#/components/schemas/ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
      },
    },
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
      schema: z
        .object({
          error: z.string().exactOptional().openapi({ type: 'string' }),
          details: SharedComponentSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { $ref: '#/components/schemas/SharedComponent' },
          },
        }),
    },
  },
}

const RefHeader = ItemSchema.exactOptional()

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
    200: { description: 'OK', content: { 'application/json': { schema: _______Schema } } },
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
            .and(
              z
                .object({ inline: z.string().exactOptional().openapi({ type: 'string' }) })
                .openapi({ type: 'object', properties: { inline: { type: 'string' } } }),
            )
            .openapi({
              allOf: [
                { $ref: '#/components/schemas/Base' },
                { $ref: '#/components/schemas/Extension1' },
                { $ref: '#/components/schemas/Extension2' },
                { $ref: '#/components/schemas/Extension3' },
                { type: 'object', properties: { inline: { type: 'string' } } },
              ],
            }),
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
          schema: z
            .object({
              item: ItemSchema.exactOptional(),
              itemRef: ItemRefSchema.exactOptional(),
              itemList: ItemListSchema.exactOptional(),
              itemMap: ItemMapSchema.exactOptional(),
              itemTree: ItemTreeSchema.exactOptional(),
            })
            .openapi({
              type: 'object',
              properties: {
                item: { $ref: '#/components/schemas/Item' },
                itemRef: { $ref: '#/components/schemas/ItemRef' },
                itemList: { $ref: '#/components/schemas/ItemList' },
                itemMap: { $ref: '#/components/schemas/ItemMap' },
                itemTree: { $ref: '#/components/schemas/ItemTree' },
              },
            }),
        },
      },
    },
  },
})
