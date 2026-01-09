import { createRoute, z } from '@hono/zod-openapi'

type RecursiveCType = { value?: boolean; refA?: RecursiveAType }

type RecursiveBType = { value?: number; refC?: RecursiveCType }

type RecursiveAType = { value?: string; refB?: RecursiveBType }

const ConstrainedTreeSchema: z.ZodType<ConstrainedTreeType> = z
  .lazy(() =>
    z
      .object({
        value: z.string().min(1).max(100),
        children: z.array(ConstrainedTreeSchema).max(10).exactOptional(),
        parent: ConstrainedTreeSchema.exactOptional(),
        siblings: z.array(ConstrainedTreeSchema).exactOptional(),
      })
      .openapi({ required: ['value'] }),
  )
  .openapi('ConstrainedTree')

type RecursiveNightmaresType = {
  mutuallyRecursive?: RecursiveAType
  constrainedRecursive?: z.infer<typeof ConstrainedTreeSchema>
  recursiveInAllOf?: { value?: string } & { child?: RecursiveNightmaresType }
  recursiveInOneOf?: string | { nested?: RecursiveNightmaresType }
  recursiveMap?: { [key: string]: RecursiveNightmaresType }
  recursiveArray?: RecursiveNightmaresType[][]
}

type ConstrainedTreeType = {
  value: string
  children?: ConstrainedTreeType[]
  parent?: ConstrainedTreeType
  siblings?: ConstrainedTreeType[]
}

const ContradictionsSchema = z
  .object({
    impossibleLength: z.string().min(100).max(10).exactOptional(),
    impossibleRange: z.number().min(100).max(10).exactOptional(),
    noValidInteger: z.int().gt(5).lt(6).exactOptional(),
    impossibleArray: z.array(z.string()).min(10).max(5).exactOptional(),
    impossibleObject: z.object({}).exactOptional().openapi({ minProperties: 10, maxProperties: 5 }),
    missingRequired: z
      .object({ existingProperty: z.string().exactOptional() })
      .exactOptional()
      .openapi({ required: ['nonExistentProperty'] }),
    constEnumConflict: z.literal('fixed').exactOptional(),
    typeConflictAllOf: z.string().and(z.number()).exactOptional(),
    formatTypeMismatch: z.int().exactOptional(),
    multipleConst: z.literal('value1').and(z.literal('value2')).exactOptional(),
  })
  .openapi('Contradictions')

const ImpossibleSchemasSchema = z
  .object({
    alwaysFalse: z.any().exactOptional().openapi({ not: {} }),
    emptyOneOf: z.any().exactOptional(),
    emptyAnyOf: z.any().exactOptional(),
    impossibleAllOf: z
      .string()
      .and(z.array(z.any()))
      .and(z.object({}))
      .and(z.number())
      .exactOptional(),
    emptyEnum: z.any().exactOptional(),
    impossiblePattern: z.string().regex(/^$/).min(1).exactOptional(),
    integerDecimal: z.int().gt(0).lt(0.5).multipleOf(0.1).exactOptional(),
    closedEmpty: z.strictObject({}).exactOptional().openapi({ minProperties: 1 }),
  })
  .openapi('ImpossibleSchemas')

const AmbiguousSchemasSchema = z
  .object({
    noType: z.any().exactOptional().openapi({ description: 'Schema with no type constraint' }),
    empty: z.any().exactOptional(),
    justFalse: z.any().exactOptional(),
    justTrue: z.any().exactOptional(),
    deepAny: z.union([z.union([z.union([z.union([z.any()])])])]).exactOptional(),
    overlappingOneOf: z
      .xor([
        z.object({ a: z.string().exactOptional() }),
        z.object({ a: z.string().exactOptional(), b: z.string().exactOptional() }),
        z.looseObject({}),
      ])
      .exactOptional(),
    ambiguousAnyOf: z
      .union([
        z.number(),
        z.int(),
        z.union([z.literal(1), z.literal(2), z.literal(3)]),
        z.literal(2),
      ])
      .exactOptional(),
    ambiguousDiscriminator: z
      .discriminatedUnion('type', [
        z.object({ type: z.enum(['a', 'b']).exactOptional() }),
        z.object({ type: z.enum(['b', 'c']).exactOptional() }),
      ])
      .exactOptional()
      .openapi({ discriminator: { propertyName: 'type' } }),
  })
  .openapi('AmbiguousSchemas')

const EdgeCasesSchema = z
  .object({
    deepNesting: z
      .object({
        l1: z
          .object({
            l2: z
              .object({
                l3: z
                  .object({
                    l4: z
                      .object({
                        l5: z
                          .object({
                            l6: z
                              .object({
                                l7: z
                                  .object({
                                    l8: z
                                      .object({
                                        l9: z
                                          .object({ l10: z.string().exactOptional() })
                                          .exactOptional(),
                                      })
                                      .exactOptional(),
                                  })
                                  .exactOptional(),
                              })
                              .exactOptional(),
                          })
                          .exactOptional(),
                      })
                      .exactOptional(),
                  })
                  .exactOptional(),
              })
              .exactOptional(),
          })
          .exactOptional(),
      })
      .exactOptional(),
    wideObject: z
      .object({
        p001: z.string().exactOptional(),
        p002: z.string().exactOptional(),
        p003: z.string().exactOptional(),
        p004: z.string().exactOptional(),
        p005: z.string().exactOptional(),
        p006: z.string().exactOptional(),
        p007: z.string().exactOptional(),
        p008: z.string().exactOptional(),
        p009: z.string().exactOptional(),
        p010: z.string().exactOptional(),
        p011: z.string().exactOptional(),
        p012: z.string().exactOptional(),
        p013: z.string().exactOptional(),
        p014: z.string().exactOptional(),
        p015: z.string().exactOptional(),
        p016: z.string().exactOptional(),
        p017: z.string().exactOptional(),
        p018: z.string().exactOptional(),
        p019: z.string().exactOptional(),
        p020: z.string().exactOptional(),
        p021: z.string().exactOptional(),
        p022: z.string().exactOptional(),
        p023: z.string().exactOptional(),
        p024: z.string().exactOptional(),
        p025: z.string().exactOptional(),
        p026: z.string().exactOptional(),
        p027: z.string().exactOptional(),
        p028: z.string().exactOptional(),
        p029: z.string().exactOptional(),
        p030: z.string().exactOptional(),
        p031: z.string().exactOptional(),
        p032: z.string().exactOptional(),
        p033: z.string().exactOptional(),
        p034: z.string().exactOptional(),
        p035: z.string().exactOptional(),
        p036: z.string().exactOptional(),
        p037: z.string().exactOptional(),
        p038: z.string().exactOptional(),
        p039: z.string().exactOptional(),
        p040: z.string().exactOptional(),
        p041: z.string().exactOptional(),
        p042: z.string().exactOptional(),
        p043: z.string().exactOptional(),
        p044: z.string().exactOptional(),
        p045: z.string().exactOptional(),
        p046: z.string().exactOptional(),
        p047: z.string().exactOptional(),
        p048: z.string().exactOptional(),
        p049: z.string().exactOptional(),
        p050: z.string().exactOptional(),
      })
      .exactOptional(),
    manyRequired: z
      .object({
        r01: z.string(),
        r02: z.string(),
        r03: z.string(),
        r04: z.string(),
        r05: z.string(),
        r06: z.string(),
        r07: z.string(),
        r08: z.string(),
        r09: z.string(),
        r10: z.string(),
        r11: z.string(),
        r12: z.string(),
        r13: z.string(),
        r14: z.string(),
        r15: z.string(),
        r16: z.string(),
        r17: z.string(),
        r18: z.string(),
        r19: z.string(),
        r20: z.string(),
      })
      .exactOptional()
      .openapi({
        required: [
          'r01',
          'r02',
          'r03',
          'r04',
          'r05',
          'r06',
          'r07',
          'r08',
          'r09',
          'r10',
          'r11',
          'r12',
          'r13',
          'r14',
          'r15',
          'r16',
          'r17',
          'r18',
          'r19',
          'r20',
        ],
      }),
    onlyFalse: z.literal(false).exactOptional(),
    onlyTrue: z.literal(true).exactOptional(),
    onlyNull: z.null().nullable().exactOptional(),
    exactlyOne: z
      .record(z.string(), z.string())
      .exactOptional()
      .openapi({ minProperties: 1, maxProperties: 1 }),
    exactlyOneItem: z
      .array(z.object({ id: z.string() }).openapi({ required: ['id'] }))
      .length(1)
      .exactOptional(),
  })
  .openapi('EdgeCases')

const RecursiveNightmaresSchema: z.ZodType<RecursiveNightmaresType> = z
  .lazy(() =>
    z.object({
      mutuallyRecursive: RecursiveASchema.exactOptional(),
      constrainedRecursive: ConstrainedTreeSchema.exactOptional(),
      recursiveInAllOf: z
        .object({ value: z.string().exactOptional() })
        .and(z.object({ child: z.lazy(() => RecursiveNightmaresSchema).exactOptional() }))
        .exactOptional(),
      recursiveInOneOf: z
        .xor([
          z.string(),
          z.object({ nested: z.lazy(() => RecursiveNightmaresSchema).exactOptional() }),
        ])
        .exactOptional(),
      recursiveMap: z
        .record(
          z.string(),
          z.lazy(() => RecursiveNightmaresSchema),
        )
        .exactOptional(),
      recursiveArray: z.array(z.array(z.lazy(() => RecursiveNightmaresSchema))).exactOptional(),
    }),
  )
  .openapi('RecursiveNightmares')

const DiscrimASchema = z
  .object({ kind: z.literal('typeA'), valueA: z.string().exactOptional() })
  .openapi({ required: ['kind'] })
  .openapi('DiscrimA')

const DiscrimBSchema = z
  .object({ kind: z.literal('typeB'), valueB: z.number().exactOptional() })
  .openapi({ required: ['kind'] })
  .openapi('DiscrimB')

const DiscrimCSchema = z
  .object({ kind: z.literal('typeC'), valueC: z.boolean().exactOptional() })
  .openapi({ required: ['kind'] })
  .openapi('DiscrimC')

const CompositionHellSchema = z
  .object({
    nestedAllOf: z
      .object({ a: z.string().exactOptional() })
      .and(z.object({ b: z.string().exactOptional() }))
      .and(z.object({ c: z.string().exactOptional() }))
      .and(z.object({ d: z.string().exactOptional() }))
      .exactOptional(),
    nestedOneOf: z
      .xor([z.xor([z.literal('deep1'), z.literal('deep2')]), z.xor([z.literal(1), z.literal(2)])])
      .exactOptional(),
    nestedAnyOf: z
      .union([z.union([z.string(), z.number()]), z.union([z.boolean(), z.null().nullable()])])
      .exactOptional(),
    allMixed: z
      .xor([z.union([z.string(), z.number()]), z.union([z.boolean(), z.null().nullable()])])
      .and(
        z
          .any()
          .refine((v) => v !== null)
          .openapi({ not: { const: null } }),
      )
      .exactOptional(),
    conditionalInAllOf: z.object({ type: z.string().exactOptional() }).and(z.any()).exactOptional(),
    multiDiscriminator: z
      .xor([DiscrimASchema, DiscrimBSchema, DiscrimCSchema])
      .exactOptional()
      .openapi({
        discriminator: {
          propertyName: 'kind',
          mapping: {
            typeA: '#/components/schemas/DiscrimA',
            typeB: '#/components/schemas/DiscrimB',
            typeC: '#/components/schemas/DiscrimC',
          },
        },
      }),
    conflictingRequired: z
      .object({ fieldA: z.string() })
      .openapi({ required: ['fieldA'] })
      .and(z.object({ fieldB: z.string() }).openapi({ required: ['fieldB'] }))
      .and(z.object({ fieldC: z.string() }).openapi({ required: ['fieldC'] }))
      .and(z.strictObject({}))
      .exactOptional(),
    overlappingSchemas: z
      .xor([
        z.object({ a: z.string(), b: z.string() }).openapi({ required: ['a', 'b'] }),
        z.object({ a: z.string(), c: z.string() }).openapi({ required: ['a', 'c'] }),
        z.object({ b: z.string(), c: z.string() }).openapi({ required: ['b', 'c'] }),
      ])
      .exactOptional(),
  })
  .openapi('CompositionHell')

const PathologicalRootSchema = z
  .object({
    contradictions: ContradictionsSchema.exactOptional(),
    impossible: ImpossibleSchemasSchema.exactOptional(),
    ambiguous: AmbiguousSchemasSchema.exactOptional(),
    edgeCases: EdgeCasesSchema.exactOptional(),
    recursive: RecursiveNightmaresSchema.exactOptional(),
    composition: CompositionHellSchema.exactOptional(),
  })
  .openapi('PathologicalRoot')

const RecursiveASchema: z.ZodType<RecursiveAType> = z
  .lazy(() =>
    z.object({ value: z.string().exactOptional(), refB: RecursiveBSchema.exactOptional() }),
  )
  .openapi('RecursiveA')

const RecursiveBSchema: z.ZodType<RecursiveBType> = z
  .lazy(() =>
    z.object({ value: z.number().exactOptional(), refC: RecursiveCSchema.exactOptional() }),
  )
  .openapi('RecursiveB')

const RecursiveCSchema: z.ZodType<RecursiveCType> = z
  .lazy(() =>
    z.object({ value: z.boolean().exactOptional(), refA: RecursiveASchema.exactOptional() }),
  )
  .openapi('RecursiveC')

export const postPathologicalRoute = createRoute({
  method: 'post',
  path: '/pathological',
  operationId: 'testPathological',
  request: { body: { content: { 'application/json': { schema: PathologicalRootSchema } } } },
  responses: { 200: { description: 'OK' } },
})
