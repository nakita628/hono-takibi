import { createRoute, z } from '@hono/zod-openapi'

const FinalLevelSchema = z
  .object({
    value: z.string().openapi({ type: 'string' }),
    parent: Level1Schema.optional().openapi({ $ref: '#/components/schemas/Level1' }),
  })
  .openapi({
    type: 'object',
    required: ['value'],
    properties: { value: { type: 'string' }, parent: { $ref: '#/components/schemas/Level1' } },
  })
  .openapi('FinalLevel')

const Level12Schema = z
  .object({
    data: FinalLevelSchema.openapi({ $ref: '#/components/schemas/FinalLevel' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/FinalLevel' }, meta: { type: 'string' } },
  })
  .openapi('Level12')

const Level11Schema = z
  .object({
    data: Level12Schema.openapi({ $ref: '#/components/schemas/Level12' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level12' }, meta: { type: 'string' } },
  })
  .openapi('Level11')

const Level10Schema = z
  .object({
    data: Level11Schema.openapi({ $ref: '#/components/schemas/Level11' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level11' }, meta: { type: 'string' } },
  })
  .openapi('Level10')

const Level9Schema = z
  .object({
    data: Level10Schema.openapi({ $ref: '#/components/schemas/Level10' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level10' }, meta: { type: 'string' } },
  })
  .openapi('Level9')

const Level8Schema = z
  .object({
    data: Level9Schema.openapi({ $ref: '#/components/schemas/Level9' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level9' }, meta: { type: 'string' } },
  })
  .openapi('Level8')

const Level7Schema = z
  .object({
    data: Level8Schema.openapi({ $ref: '#/components/schemas/Level8' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level8' }, meta: { type: 'string' } },
  })
  .openapi('Level7')

const Level6Schema = z
  .object({
    data: Level7Schema.openapi({ $ref: '#/components/schemas/Level7' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level7' }, meta: { type: 'string' } },
  })
  .openapi('Level6')

const Level5Schema = z
  .object({
    data: Level6Schema.openapi({ $ref: '#/components/schemas/Level6' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level6' }, meta: { type: 'string' } },
  })
  .openapi('Level5')

const Level4Schema = z
  .object({
    data: Level5Schema.openapi({ $ref: '#/components/schemas/Level5' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level5' }, meta: { type: 'string' } },
  })
  .openapi('Level4')

const Level3Schema = z
  .object({
    data: Level4Schema.openapi({ $ref: '#/components/schemas/Level4' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level4' }, meta: { type: 'string' } },
  })
  .openapi('Level3')

const Level2Schema = z
  .object({
    data: Level3Schema.openapi({ $ref: '#/components/schemas/Level3' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level3' }, meta: { type: 'string' } },
  })
  .openapi('Level2')

const Level1Schema = z
  .object({
    data: Level2Schema.openapi({ $ref: '#/components/schemas/Level2' }),
    meta: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { data: { $ref: '#/components/schemas/Level2' }, meta: { type: 'string' } },
  })
  .openapi('Level1')

const EmptyObjectSchema = z.object({}).openapi({ type: 'object' }).openapi('EmptyObject')

const MinimalObjectSchema = z
  .object({ x: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { x: { type: 'string' } } })
  .openapi('MinimalObject')

const EmptyArraySchema = z
  .array(z.any().optional())
  .optional()
  .openapi({ type: 'array', items: {} })
  .openapi('EmptyArray')

const AnyValueSchema = z.any().optional().openapi('AnyValue')

const NullOnlySchema = z.null().nullable().optional().openapi({ type: 'null' }).openapi('NullOnly')

type _______Type = { 名前?: string; 値?: number; 子要素?: _______Type[] }

const Schema = z
  .object({
    имя: z.string().openapi({ type: 'string' }),
    значение: z.number().openapi({ type: 'number' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { имя: { type: 'string' }, значение: { type: 'number' } },
  })
  .openapi('_____________')

const SchMaFranAisSchema = z
  .object({
    prénom: z.string().openapi({ type: 'string' }),
    nom: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({ type: 'object', properties: { prénom: { type: 'string' }, nom: { type: 'string' } } })
  .openapi('SchMaFranAis')

const SchemaWithUnderscoresSchema = z
  .object({
    field_one: z.string().openapi({ type: 'string' }),
    field_two: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { field_one: { type: 'string' }, field_two: { type: 'string' } },
  })
  .openapi('SchemaWithUnderscores')

const _2FAConfigSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    method: z
      .enum(['sms', 'email', 'authenticator'])
      .openapi({ type: 'string', enum: ['sms', 'email', 'authenticator'] }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      enabled: { type: 'boolean' },
      method: { type: 'string', enum: ['sms', 'email', 'authenticator'] },
    },
  })
  .openapi('_2FAConfig')

const BaseSchema = z
  .object({ id: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { id: { type: 'string' } } })
  .openapi('Base')

const Extension1Schema = z
  .object({ ext1: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { ext1: { type: 'string' } } })
  .openapi('Extension1')

const Extension2Schema = z
  .object({ ext2: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { ext2: { type: 'string' } } })
  .openapi('Extension2')

const Extension3Schema = z
  .object({ ext3: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { ext3: { type: 'string' } } })
  .openapi('Extension3')

const Wrapper5Schema = z
  .object({
    content: z
      .object({ value: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
  })
  .openapi({
    type: 'object',
    properties: { content: { type: 'object', properties: { value: { type: 'string' } } } },
  })
  .openapi('Wrapper5')

const Wrapper4Schema = z
  .object({ wrapped: Wrapper5Schema.openapi({ $ref: '#/components/schemas/Wrapper5' }) })
  .partial()
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper5' } } })
  .openapi('Wrapper4')

const Wrapper3Schema = z
  .object({ wrapped: Wrapper4Schema.openapi({ $ref: '#/components/schemas/Wrapper4' }) })
  .partial()
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper4' } } })
  .openapi('Wrapper3')

const Wrapper2Schema = z
  .object({ wrapped: Wrapper3Schema.openapi({ $ref: '#/components/schemas/Wrapper3' }) })
  .partial()
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper3' } } })
  .openapi('Wrapper2')

const Wrapper1Schema = z
  .object({ wrapped: Wrapper2Schema.openapi({ $ref: '#/components/schemas/Wrapper2' }) })
  .partial()
  .openapi({ type: 'object', properties: { wrapped: { $ref: '#/components/schemas/Wrapper2' } } })
  .openapi('Wrapper1')

const ItemSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    value: z.number().optional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: { id: { type: 'string' }, name: { type: 'string' }, value: { type: 'number' } },
  })
  .openapi('Item')

const ItemRefSchema = z
  .object({
    itemId: z.string().openapi({ type: 'string' }),
    item: ItemSchema.optional().openapi({ $ref: '#/components/schemas/Item' }),
  })
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
    total: z.int().optional().openapi({ type: 'integer' }),
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
  .record(z.string(), ItemSchema.optional().openapi({ $ref: '#/components/schemas/Item' }))
  .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/Item' } })
  .openapi('ItemMap')

type ItemTreeType = { item?: z.infer<typeof ItemSchema>; children?: ItemTreeType[] }

const ItemTreeSchema: z.ZodType<ItemTreeType> = z
  .lazy(() =>
    z
      .object({
        item: ItemSchema.openapi({ $ref: '#/components/schemas/Item' }),
        children: z
          .array(ItemTreeSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ItemTree' } }),
      })
      .partial()
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
    shared: z.string().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { shared: { type: 'string' }, timestamp: { type: 'string', format: 'date-time' } },
  })
  .openapi('SharedComponent')

const PolyBaseSchema = z
  .object({
    polyType: z.string().openapi({ type: 'string' }),
    baseField: z.string().openapi({ type: 'string' }),
    sharedRef: SharedComponentSchema.optional().openapi({
      $ref: '#/components/schemas/SharedComponent',
    }),
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
        polyType: z.literal('typeA'),
        fieldA: z.string().openapi({ type: 'string' }),
        nestedRef: SharedComponentSchema.openapi({ $ref: '#/components/schemas/SharedComponent' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeA' },
          fieldA: { type: 'string' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .optional()
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
        polyType: z.literal('typeB'),
        fieldB: z.number().openapi({ type: 'number' }),
        nestedRef: SharedComponentSchema.openapi({ $ref: '#/components/schemas/SharedComponent' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeB' },
          fieldB: { type: 'number' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .optional()
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
        polyType: z.literal('typeC'),
        fieldC: z.boolean().openapi({ type: 'boolean' }),
        nestedRef: SharedComponentSchema.openapi({ $ref: '#/components/schemas/SharedComponent' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          polyType: { const: 'typeC' },
          fieldC: { type: 'boolean' },
          nestedRef: { $ref: '#/components/schemas/SharedComponent' },
        },
      }),
  )
  .optional()
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
  .optional()
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
  .object({ key: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { key: { type: 'string' } } })
  .openapi('ConfigBase')

const ObjectWithRefDefaultSchema = z
  .object({
    config: ConfigBaseSchema.default({ key: 'defaultValue' }).openapi({
      allOf: [{ $ref: '#/components/schemas/ConfigBase' }],
      default: { key: 'defaultValue' },
    }),
  })
  .partial()
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
          .object({ arrayIndex: z.int().openapi({ type: 'integer' }) })
          .partial()
          .openapi({ type: 'object', properties: { arrayIndex: { type: 'integer' } } }),
      )
      .optional()
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/Item' },
          { type: 'object', properties: { arrayIndex: { type: 'integer' } } },
        ],
      }),
  )
  .optional()
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
          .object({ mapKey: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { mapKey: { type: 'string' } } }),
      )
      .optional()
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
  .object({ value: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('SimpleData')

const ComplexDataSchema = z
  .object({
    values: z
      .array(SimpleDataSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SimpleData' } }),
    metadata: z
      .record(z.string(), SimpleDataSchema.openapi({ $ref: '#/components/schemas/SimpleData' }))
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/SimpleData' },
      }),
  })
  .partial()
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
    type: z.enum(['simple', 'complex']).openapi({ type: 'string', enum: ['simple', 'complex'] }),
    data: z
      .union([SimpleDataSchema, ComplexDataSchema])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/SimpleData' },
          { $ref: '#/components/schemas/ComplexData' },
        ],
      }),
  })
  .partial()
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

const RecursiveASchema: z.ZodType<RecursiveAType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().openapi({ type: 'string' }),
        refToB: RecursiveBSchema.openapi({ $ref: '#/components/schemas/RecursiveB' }),
        selfRef: RecursiveASchema.openapi({ $ref: '#/components/schemas/RecursiveA' }),
      })
      .partial()
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

const RecursiveCSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    refToA: RecursiveASchema.openapi({ $ref: '#/components/schemas/RecursiveA' }),
    refToB: RecursiveBSchema.openapi({ $ref: '#/components/schemas/RecursiveB' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      refToA: { $ref: '#/components/schemas/RecursiveA' },
      refToB: { $ref: '#/components/schemas/RecursiveB' },
    },
  })
  .openapi('RecursiveC')

const RecursiveBSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    refToC: RecursiveCSchema.openapi({ $ref: '#/components/schemas/RecursiveC' }),
    refToA: RecursiveASchema.openapi({ $ref: '#/components/schemas/RecursiveA' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      refToC: { $ref: '#/components/schemas/RecursiveC' },
      refToA: { $ref: '#/components/schemas/RecursiveA' },
    },
  })
  .openapi('RecursiveB')

type RecursiveAType = {
  name?: string
  refToB?: z.infer<typeof RecursiveBSchema>
  selfRef?: RecursiveAType
}

const NotExampleSchema = z
  .intersection(
    BaseSchema,
    z
      .any()
      .optional()
      .openapi({ not: { $ref: '#/components/schemas/Forbidden' } }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Base' },
      { not: { $ref: '#/components/schemas/Forbidden' } },
    ],
  })
  .openapi('NotExample')

const ForbiddenSchema = z
  .object({ forbiddenField: z.string().openapi({ type: 'string' }) })
  .partial()
  .openapi({ type: 'object', properties: { forbiddenField: { type: 'string' } } })
  .openapi('Forbidden')

const MultiRefSchema = z
  .object({
    first: SharedComponentSchema.optional().openapi({
      $ref: '#/components/schemas/SharedComponent',
    }),
    second: SharedComponentSchema.optional().openapi({
      $ref: '#/components/schemas/SharedComponent',
    }),
    third: SharedComponentSchema.optional().openapi({
      $ref: '#/components/schemas/SharedComponent',
    }),
    nested: z
      .object({
        inner: SharedComponentSchema.openapi({ $ref: '#/components/schemas/SharedComponent' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { inner: { $ref: '#/components/schemas/SharedComponent' } },
      }),
    array: z
      .array(SharedComponentSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SharedComponent' } }),
    map: z
      .record(
        z.string(),
        SharedComponentSchema.optional().openapi({ $ref: '#/components/schemas/SharedComponent' }),
      )
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
    .object({ field: z.string().openapi({ type: 'string' }) })
    .partial()
    .openapi({ type: 'object', properties: { field: { type: 'string' } } })
    .openapi(
      'ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
    )

const ShortRefSchema = z
  .object({
    longNameRef:
      ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGeneratorsSchema.openapi(
        {
          $ref: '#/components/schemas/ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
        },
      ),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      longNameRef: {
        $ref: '#/components/schemas/ThisIsAVeryLongSchemaNameThatExceedsNormalNamingConventionsAndMightCauseIssuesInSomeCodeGenerators',
      },
    },
  })
  .openapi('ShortRef')

const RefParamParamsSchema = ItemSchema.optional().openapi({
  param: { name: 'refParam', in: 'query', schema: { $ref: '#/components/schemas/Item' } },
  $ref: '#/components/schemas/Item',
})

const RefBodyRequestBody = {
  content: {
    'application/json': {
      schema: ItemSchema.optional().openapi({ $ref: '#/components/schemas/Item' }),
    },
  },
}

const CreatedResponse = {
  description: 'Created',
  content: {
    'application/json': {
      schema: ItemSchema.optional().openapi({ $ref: '#/components/schemas/Item' }),
    },
  },
}

const ErrorResponse = {
  description: 'Error response',
  content: {
    'application/json': {
      schema: z
        .object({
          error: z.string().openapi({ type: 'string' }),
          details: SharedComponentSchema.openapi({ $ref: '#/components/schemas/SharedComponent' }),
        })
        .partial()
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

const RefHeader = ItemSchema.optional().openapi({ $ref: '#/components/schemas/Item' })

const ItemExample = { summary: 'Item example', value: { id: '123', name: 'Example', value: 42 } }

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  operationId: 'testEndpoint',
  request: { query: z.object({ refParam: RefParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: Level1Schema.optional().openapi({ $ref: '#/components/schemas/Level1' }),
        },
      },
    },
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
  responses: { 200: { description: 'OK' } },
})

export const getUnicodeRefsRoute = createRoute({
  method: 'get',
  path: '/unicode-refs',
  operationId: 'getUnicodeRefs',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: _______Schema
            .optional()
            .openapi({
              $ref: '#/components/schemas/%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E',
            }),
        },
      },
    },
  },
})

export const getSpecialCharsRoute = createRoute({
  method: 'get',
  path: '/special-chars',
  operationId: 'getSpecialChars',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: SchemaWithUnderscoresSchema.optional().openapi({
            $ref: '#/components/schemas/Schema_With_Underscores',
          }),
        },
      },
    },
  },
})

export const getNumericStartRoute = createRoute({
  method: 'get',
  path: '/numeric-start',
  operationId: 'getNumericStart',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: _2FAConfigSchema.optional().openapi({ $ref: '#/components/schemas/2FAConfig' }),
        },
      },
    },
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
                .object({ inline: z.string().openapi({ type: 'string' }) })
                .partial()
                .openapi({ type: 'object', properties: { inline: { type: 'string' } } }),
            )
            .optional()
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
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: Wrapper1Schema.optional().openapi({ $ref: '#/components/schemas/Wrapper1' }),
        },
      },
    },
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
              item: ItemSchema.openapi({ $ref: '#/components/schemas/Item' }),
              itemRef: ItemRefSchema.openapi({ $ref: '#/components/schemas/ItemRef' }),
              itemList: ItemListSchema.openapi({ $ref: '#/components/schemas/ItemList' }),
              itemMap: ItemMapSchema.openapi({ $ref: '#/components/schemas/ItemMap' }),
              itemTree: ItemTreeSchema.openapi({ $ref: '#/components/schemas/ItemTree' }),
            })
            .partial()
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
