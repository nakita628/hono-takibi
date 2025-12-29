import { createRoute, z } from '@hono/zod-openapi'

const DiscrimCSchema = z
  .object({ kind: z.literal('typeC'), valueC: z.boolean().optional().openapi({ type: 'boolean' }) })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: { kind: { const: 'typeC' }, valueC: { type: 'boolean' } },
  })

const DiscrimBSchema = z
  .object({ kind: z.literal('typeB'), valueB: z.number().optional().openapi({ type: 'number' }) })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: { kind: { const: 'typeB' }, valueB: { type: 'number' } },
  })

const DiscrimASchema = z
  .object({ kind: z.literal('typeA'), valueA: z.string().optional().openapi({ type: 'string' }) })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: { kind: { const: 'typeA' }, valueA: { type: 'string' } },
  })

const CompositionHellSchema = z
  .object({
    nestedAllOf: z
      .intersection(
        z
          .intersection(
            z
              .intersection(
                z
                  .object({ a: z.string().openapi({ type: 'string' }) })
                  .partial()
                  .openapi({ type: 'object', properties: { a: { type: 'string' } } }),
                z
                  .object({ b: z.string().openapi({ type: 'string' }) })
                  .partial()
                  .openapi({ type: 'object', properties: { b: { type: 'string' } } }),
              )
              .openapi({
                allOf: [
                  { type: 'object', properties: { a: { type: 'string' } } },
                  { type: 'object', properties: { b: { type: 'string' } } },
                ],
              }),
            z
              .object({ c: z.string().openapi({ type: 'string' }) })
              .partial()
              .openapi({ type: 'object', properties: { c: { type: 'string' } } }),
          )
          .optional()
          .openapi({
            allOf: [
              {
                allOf: [
                  { type: 'object', properties: { a: { type: 'string' } } },
                  { type: 'object', properties: { b: { type: 'string' } } },
                ],
              },
              { type: 'object', properties: { c: { type: 'string' } } },
            ],
          }),
        z
          .object({ d: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { d: { type: 'string' } } }),
      )
      .optional()
      .openapi({
        allOf: [
          {
            allOf: [
              {
                allOf: [
                  { type: 'object', properties: { a: { type: 'string' } } },
                  { type: 'object', properties: { b: { type: 'string' } } },
                ],
              },
              { type: 'object', properties: { c: { type: 'string' } } },
            ],
          },
          { type: 'object', properties: { d: { type: 'string' } } },
        ],
      }),
    nestedOneOf: z
      .union([
        z
          .union([
            z.literal('deep1').openapi({ type: 'string' }),
            z.literal('deep2').optional().openapi({ type: 'string' }),
          ])
          .optional()
          .openapi({
            oneOf: [
              { type: 'string', const: 'deep1' },
              { type: 'string', const: 'deep2' },
            ],
          }),
        z
          .union([
            z.literal(1).optional().openapi({ type: 'number' }),
            z.literal(2).optional().openapi({ type: 'number' }),
          ])
          .optional()
          .openapi({
            oneOf: [
              { type: 'number', const: 1 },
              { type: 'number', const: 2 },
            ],
          }),
      ])
      .optional()
      .openapi({
        oneOf: [
          {
            oneOf: [
              { type: 'string', const: 'deep1' },
              { type: 'string', const: 'deep2' },
            ],
          },
          {
            oneOf: [
              { type: 'number', const: 1 },
              { type: 'number', const: 2 },
            ],
          },
        ],
      }),
    nestedAnyOf: z
      .union([
        z
          .union([
            z.string().openapi({ type: 'string' }),
            z.number().optional().openapi({ type: 'number' }),
          ])
          .optional()
          .openapi({ anyOf: [{ type: 'string' }, { type: 'number' }] }),
        z
          .union([
            z.boolean().optional().openapi({ type: 'boolean' }),
            z.null().nullable().optional().openapi({ type: 'null' }),
          ])
          .optional()
          .openapi({ anyOf: [{ type: 'boolean' }, { type: 'null' }] }),
      ])
      .optional()
      .openapi({
        anyOf: [
          { anyOf: [{ type: 'string' }, { type: 'number' }] },
          { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
        ],
      }),
    allMixed: z
      .intersection(
        z
          .union([
            z
              .union([
                z.string().openapi({ type: 'string' }),
                z.number().optional().openapi({ type: 'number' }),
              ])
              .optional()
              .openapi({ anyOf: [{ type: 'string' }, { type: 'number' }] }),
            z
              .union([
                z.boolean().optional().openapi({ type: 'boolean' }),
                z.null().nullable().optional().openapi({ type: 'null' }),
              ])
              .optional()
              .openapi({ anyOf: [{ type: 'boolean' }, { type: 'null' }] }),
          ])
          .optional()
          .openapi({
            oneOf: [
              { anyOf: [{ type: 'string' }, { type: 'number' }] },
              { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
            ],
          }),
        z
          .any()
          .optional()
          .openapi({ not: { const: null } }),
      )
      .optional()
      .openapi({
        allOf: [
          {
            oneOf: [
              { anyOf: [{ type: 'string' }, { type: 'number' }] },
              { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
            ],
          },
          { not: { const: null } },
        ],
      }),
    conditionalInAllOf: z
      .intersection(
        z
          .object({ type: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { type: { type: 'string' } } }),
        z
          .any()
          .openapi({
            if: { properties: { type: { const: 'A' } } },
            then: { properties: { valueA: { type: 'string' } } },
            else: { properties: { valueOther: { type: 'number' } } },
          }),
      )
      .optional()
      .openapi({
        allOf: [
          { type: 'object', properties: { type: { type: 'string' } } },
          {
            if: { properties: { type: { const: 'A' } } },
            then: { properties: { valueA: { type: 'string' } } },
            else: { properties: { valueOther: { type: 'number' } } },
          },
        ],
      }),
    multiDiscriminator: z
      .union([DiscrimASchema, DiscrimBSchema, DiscrimCSchema])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/DiscrimA' },
          { $ref: '#/components/schemas/DiscrimB' },
          { $ref: '#/components/schemas/DiscrimC' },
        ],
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
      .intersection(
        z
          .object({ fieldA: z.string().openapi({ type: 'string' }) })
          .openapi({
            type: 'object',
            required: ['fieldA'],
            properties: { fieldA: { type: 'string' } },
          }),
        z
          .object({ fieldB: z.string().openapi({ type: 'string' }) })
          .openapi({
            type: 'object',
            required: ['fieldB'],
            properties: { fieldB: { type: 'string' } },
          }),
        z
          .object({ fieldC: z.string().openapi({ type: 'string' }) })
          .openapi({
            type: 'object',
            required: ['fieldC'],
            properties: { fieldC: { type: 'string' } },
          }),
        z.strictObject({}).openapi({ type: 'object', additionalProperties: false }),
      )
      .openapi({
        allOf: [
          { type: 'object', required: ['fieldA'], properties: { fieldA: { type: 'string' } } },
          { type: 'object', required: ['fieldB'], properties: { fieldB: { type: 'string' } } },
          { type: 'object', required: ['fieldC'], properties: { fieldC: { type: 'string' } } },
          { type: 'object', additionalProperties: false },
        ],
      }),
    overlappingSchemas: z
      .union([
        z
          .object({
            a: z.string().openapi({ type: 'string' }),
            b: z.string().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            required: ['a', 'b'],
            properties: { a: { type: 'string' }, b: { type: 'string' } },
          }),
        z
          .object({
            a: z.string().openapi({ type: 'string' }),
            c: z.string().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            required: ['a', 'c'],
            properties: { a: { type: 'string' }, c: { type: 'string' } },
          }),
        z
          .object({
            b: z.string().openapi({ type: 'string' }),
            c: z.string().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            required: ['b', 'c'],
            properties: { b: { type: 'string' }, c: { type: 'string' } },
          }),
      ])
      .openapi({
        oneOf: [
          {
            type: 'object',
            required: ['a', 'b'],
            properties: { a: { type: 'string' }, b: { type: 'string' } },
          },
          {
            type: 'object',
            required: ['a', 'c'],
            properties: { a: { type: 'string' }, c: { type: 'string' } },
          },
          {
            type: 'object',
            required: ['b', 'c'],
            properties: { b: { type: 'string' }, c: { type: 'string' } },
          },
        ],
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      nestedAllOf: {
        allOf: [
          {
            allOf: [
              {
                allOf: [
                  { type: 'object', properties: { a: { type: 'string' } } },
                  { type: 'object', properties: { b: { type: 'string' } } },
                ],
              },
              { type: 'object', properties: { c: { type: 'string' } } },
            ],
          },
          { type: 'object', properties: { d: { type: 'string' } } },
        ],
      },
      nestedOneOf: {
        oneOf: [
          {
            oneOf: [
              { type: 'string', const: 'deep1' },
              { type: 'string', const: 'deep2' },
            ],
          },
          {
            oneOf: [
              { type: 'number', const: 1 },
              { type: 'number', const: 2 },
            ],
          },
        ],
      },
      nestedAnyOf: {
        anyOf: [
          { anyOf: [{ type: 'string' }, { type: 'number' }] },
          { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
        ],
      },
      allMixed: {
        allOf: [
          {
            oneOf: [
              { anyOf: [{ type: 'string' }, { type: 'number' }] },
              { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
            ],
          },
          { not: { const: null } },
        ],
      },
      conditionalInAllOf: {
        allOf: [
          { type: 'object', properties: { type: { type: 'string' } } },
          {
            if: { properties: { type: { const: 'A' } } },
            then: { properties: { valueA: { type: 'string' } } },
            else: { properties: { valueOther: { type: 'number' } } },
          },
        ],
      },
      multiDiscriminator: {
        oneOf: [
          { $ref: '#/components/schemas/DiscrimA' },
          { $ref: '#/components/schemas/DiscrimB' },
          { $ref: '#/components/schemas/DiscrimC' },
        ],
        discriminator: {
          propertyName: 'kind',
          mapping: {
            typeA: '#/components/schemas/DiscrimA',
            typeB: '#/components/schemas/DiscrimB',
            typeC: '#/components/schemas/DiscrimC',
          },
        },
      },
      conflictingRequired: {
        allOf: [
          { type: 'object', required: ['fieldA'], properties: { fieldA: { type: 'string' } } },
          { type: 'object', required: ['fieldB'], properties: { fieldB: { type: 'string' } } },
          { type: 'object', required: ['fieldC'], properties: { fieldC: { type: 'string' } } },
          { type: 'object', additionalProperties: false },
        ],
      },
      overlappingSchemas: {
        oneOf: [
          {
            type: 'object',
            required: ['a', 'b'],
            properties: { a: { type: 'string' }, b: { type: 'string' } },
          },
          {
            type: 'object',
            required: ['a', 'c'],
            properties: { a: { type: 'string' }, c: { type: 'string' } },
          },
          {
            type: 'object',
            required: ['b', 'c'],
            properties: { b: { type: 'string' }, c: { type: 'string' } },
          },
        ],
      },
    },
  })

type ConstrainedTreeType = {
  value: string
  children?: unknown[]
  parent?: unknown
  siblings?: unknown[]
}

const ConstrainedTreeSchema: z.ZodType<ConstrainedTreeType> = z.lazy(() =>
  z
    .object({
      value: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
      children: z
        .array(ConstrainedTreeSchema)
        .max(10)
        .optional()
        .openapi({
          type: 'array',
          maxItems: 10,
          items: { $ref: '#/components/schemas/ConstrainedTree' },
        }),
      parent: ConstrainedTreeSchema,
      siblings: z
        .array(ConstrainedTreeSchema)
        .optional()
        .openapi({
          type: 'array',
          items: { $ref: '#/components/schemas/ConstrainedTree' },
          uniqueItems: true,
        }),
    })
    .openapi({
      type: 'object',
      required: ['value'],
      properties: {
        value: { type: 'string', minLength: 1, maxLength: 100 },
        children: {
          type: 'array',
          maxItems: 10,
          items: { $ref: '#/components/schemas/ConstrainedTree' },
        },
        parent: { $ref: '#/components/schemas/ConstrainedTree' },
        siblings: {
          type: 'array',
          items: { $ref: '#/components/schemas/ConstrainedTree' },
          uniqueItems: true,
        },
      },
    }),
)

const RecursiveCSchema = z
  .object({ value: z.boolean().optional().openapi({ type: 'boolean' }), refA: RecursiveASchema })
  .openapi({
    type: 'object',
    properties: { value: { type: 'boolean' }, refA: { $ref: '#/components/schemas/RecursiveA' } },
  })

const RecursiveBSchema = z
  .object({ value: z.number().optional().openapi({ type: 'number' }), refC: RecursiveCSchema })
  .openapi({
    type: 'object',
    properties: { value: { type: 'number' }, refC: { $ref: '#/components/schemas/RecursiveC' } },
  })

const RecursiveASchema = z
  .object({ value: z.string().optional().openapi({ type: 'string' }), refB: RecursiveBSchema })
  .openapi({
    type: 'object',
    properties: { value: { type: 'string' }, refB: { $ref: '#/components/schemas/RecursiveB' } },
  })

const RecursiveNightmaresSchema = z
  .object({
    mutuallyRecursive: RecursiveASchema,
    constrainedRecursive: ConstrainedTreeSchema,
    recursiveInAllOf: z
      .intersection(
        z
          .object({ value: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
        z
          .object({ child: recursiveInAllOfSchema })
          .openapi({
            type: 'object',
            properties: {
              child: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInAllOf',
              },
            },
          }),
      )
      .optional()
      .openapi({
        allOf: [
          { type: 'object', properties: { value: { type: 'string' } } },
          {
            type: 'object',
            properties: {
              child: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInAllOf',
              },
            },
          },
        ],
      }),
    recursiveInOneOf: z
      .union([
        z.string().optional().openapi({ type: 'string' }),
        z
          .object({ nested: recursiveInOneOfSchema })
          .openapi({
            type: 'object',
            properties: {
              nested: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInOneOf',
              },
            },
          }),
      ])
      .optional()
      .openapi({
        oneOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              nested: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInOneOf',
              },
            },
          },
        ],
      }),
    recursiveMap: z
      .record(z.string(), recursiveMapSchema)
      .openapi({
        type: 'object',
        additionalProperties: {
          $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveMap',
        },
      }),
    recursiveArray: z
      .array(
        z
          .array(recursiveArraySchema)
          .optional()
          .openapi({
            type: 'array',
            items: { $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveArray' },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveArray' },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      mutuallyRecursive: { $ref: '#/components/schemas/RecursiveA' },
      constrainedRecursive: { $ref: '#/components/schemas/ConstrainedTree' },
      recursiveInAllOf: {
        allOf: [
          { type: 'object', properties: { value: { type: 'string' } } },
          {
            type: 'object',
            properties: {
              child: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInAllOf',
              },
            },
          },
        ],
      },
      recursiveInOneOf: {
        oneOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              nested: {
                $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveInOneOf',
              },
            },
          },
        ],
      },
      recursiveMap: {
        type: 'object',
        additionalProperties: {
          $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveMap',
        },
      },
      recursiveArray: {
        type: 'array',
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/RecursiveNightmares/properties/recursiveArray' },
        },
      },
    },
  })

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
                                          .object({ l10: z.string().openapi({ type: 'string' }) })
                                          .partial()
                                          .openapi({
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          }),
                                      })
                                      .openapi({
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      }),
                                  })
                                  .openapi({
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  }),
                              })
                              .openapi({
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              }),
                          })
                          .openapi({
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          }),
                      })
                      .openapi({
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      }),
                  })
                  .openapi({
                    type: 'object',
                    properties: {
                      l4: {
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  }),
              })
              .openapi({
                type: 'object',
                properties: {
                  l3: {
                    type: 'object',
                    properties: {
                      l4: {
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              }),
          })
          .openapi({
            type: 'object',
            properties: {
              l2: {
                type: 'object',
                properties: {
                  l3: {
                    type: 'object',
                    properties: {
                      l4: {
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
      })
      .openapi({
        type: 'object',
        properties: {
          l1: {
            type: 'object',
            properties: {
              l2: {
                type: 'object',
                properties: {
                  l3: {
                    type: 'object',
                    properties: {
                      l4: {
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    wideObject: z
      .object({
        p001: z.string().openapi({ type: 'string' }),
        p002: z.string().openapi({ type: 'string' }),
        p003: z.string().openapi({ type: 'string' }),
        p004: z.string().openapi({ type: 'string' }),
        p005: z.string().openapi({ type: 'string' }),
        p006: z.string().openapi({ type: 'string' }),
        p007: z.string().openapi({ type: 'string' }),
        p008: z.string().openapi({ type: 'string' }),
        p009: z.string().openapi({ type: 'string' }),
        p010: z.string().openapi({ type: 'string' }),
        p011: z.string().openapi({ type: 'string' }),
        p012: z.string().openapi({ type: 'string' }),
        p013: z.string().openapi({ type: 'string' }),
        p014: z.string().openapi({ type: 'string' }),
        p015: z.string().openapi({ type: 'string' }),
        p016: z.string().openapi({ type: 'string' }),
        p017: z.string().openapi({ type: 'string' }),
        p018: z.string().openapi({ type: 'string' }),
        p019: z.string().openapi({ type: 'string' }),
        p020: z.string().openapi({ type: 'string' }),
        p021: z.string().openapi({ type: 'string' }),
        p022: z.string().openapi({ type: 'string' }),
        p023: z.string().openapi({ type: 'string' }),
        p024: z.string().openapi({ type: 'string' }),
        p025: z.string().openapi({ type: 'string' }),
        p026: z.string().openapi({ type: 'string' }),
        p027: z.string().openapi({ type: 'string' }),
        p028: z.string().openapi({ type: 'string' }),
        p029: z.string().openapi({ type: 'string' }),
        p030: z.string().openapi({ type: 'string' }),
        p031: z.string().openapi({ type: 'string' }),
        p032: z.string().openapi({ type: 'string' }),
        p033: z.string().openapi({ type: 'string' }),
        p034: z.string().openapi({ type: 'string' }),
        p035: z.string().openapi({ type: 'string' }),
        p036: z.string().openapi({ type: 'string' }),
        p037: z.string().openapi({ type: 'string' }),
        p038: z.string().openapi({ type: 'string' }),
        p039: z.string().openapi({ type: 'string' }),
        p040: z.string().openapi({ type: 'string' }),
        p041: z.string().openapi({ type: 'string' }),
        p042: z.string().openapi({ type: 'string' }),
        p043: z.string().openapi({ type: 'string' }),
        p044: z.string().openapi({ type: 'string' }),
        p045: z.string().openapi({ type: 'string' }),
        p046: z.string().openapi({ type: 'string' }),
        p047: z.string().openapi({ type: 'string' }),
        p048: z.string().openapi({ type: 'string' }),
        p049: z.string().openapi({ type: 'string' }),
        p050: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          p001: { type: 'string' },
          p002: { type: 'string' },
          p003: { type: 'string' },
          p004: { type: 'string' },
          p005: { type: 'string' },
          p006: { type: 'string' },
          p007: { type: 'string' },
          p008: { type: 'string' },
          p009: { type: 'string' },
          p010: { type: 'string' },
          p011: { type: 'string' },
          p012: { type: 'string' },
          p013: { type: 'string' },
          p014: { type: 'string' },
          p015: { type: 'string' },
          p016: { type: 'string' },
          p017: { type: 'string' },
          p018: { type: 'string' },
          p019: { type: 'string' },
          p020: { type: 'string' },
          p021: { type: 'string' },
          p022: { type: 'string' },
          p023: { type: 'string' },
          p024: { type: 'string' },
          p025: { type: 'string' },
          p026: { type: 'string' },
          p027: { type: 'string' },
          p028: { type: 'string' },
          p029: { type: 'string' },
          p030: { type: 'string' },
          p031: { type: 'string' },
          p032: { type: 'string' },
          p033: { type: 'string' },
          p034: { type: 'string' },
          p035: { type: 'string' },
          p036: { type: 'string' },
          p037: { type: 'string' },
          p038: { type: 'string' },
          p039: { type: 'string' },
          p040: { type: 'string' },
          p041: { type: 'string' },
          p042: { type: 'string' },
          p043: { type: 'string' },
          p044: { type: 'string' },
          p045: { type: 'string' },
          p046: { type: 'string' },
          p047: { type: 'string' },
          p048: { type: 'string' },
          p049: { type: 'string' },
          p050: { type: 'string' },
        },
      }),
    manyRequired: z
      .object({
        r01: z.string().openapi({ type: 'string' }),
        r02: z.string().openapi({ type: 'string' }),
        r03: z.string().openapi({ type: 'string' }),
        r04: z.string().openapi({ type: 'string' }),
        r05: z.string().openapi({ type: 'string' }),
        r06: z.string().openapi({ type: 'string' }),
        r07: z.string().openapi({ type: 'string' }),
        r08: z.string().openapi({ type: 'string' }),
        r09: z.string().openapi({ type: 'string' }),
        r10: z.string().openapi({ type: 'string' }),
        r11: z.string().openapi({ type: 'string' }),
        r12: z.string().openapi({ type: 'string' }),
        r13: z.string().openapi({ type: 'string' }),
        r14: z.string().openapi({ type: 'string' }),
        r15: z.string().openapi({ type: 'string' }),
        r16: z.string().openapi({ type: 'string' }),
        r17: z.string().openapi({ type: 'string' }),
        r18: z.string().openapi({ type: 'string' }),
        r19: z.string().openapi({ type: 'string' }),
        r20: z.string().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
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
        properties: {
          r01: { type: 'string' },
          r02: { type: 'string' },
          r03: { type: 'string' },
          r04: { type: 'string' },
          r05: { type: 'string' },
          r06: { type: 'string' },
          r07: { type: 'string' },
          r08: { type: 'string' },
          r09: { type: 'string' },
          r10: { type: 'string' },
          r11: { type: 'string' },
          r12: { type: 'string' },
          r13: { type: 'string' },
          r14: { type: 'string' },
          r15: { type: 'string' },
          r16: { type: 'string' },
          r17: { type: 'string' },
          r18: { type: 'string' },
          r19: { type: 'string' },
          r20: { type: 'string' },
        },
      }),
    onlyFalse: z.literal(false).optional().openapi({ type: 'boolean' }),
    onlyTrue: z.literal(true).optional().openapi({ type: 'boolean' }),
    onlyNull: z.null().nullable().optional().openapi({ type: 'null' }),
    exactlyOne: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({
        type: 'object',
        minProperties: 1,
        maxProperties: 1,
        additionalProperties: { type: 'string' },
      }),
    exactlyOneItem: z
      .array(
        z
          .object({ id: z.string().openapi({ type: 'string' }) })
          .openapi({ type: 'object', required: ['id'], properties: { id: { type: 'string' } } }),
      )
      .length(1)
      .optional()
      .openapi({
        type: 'array',
        items: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
        minItems: 1,
        maxItems: 1,
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      deepNesting: {
        type: 'object',
        properties: {
          l1: {
            type: 'object',
            properties: {
              l2: {
                type: 'object',
                properties: {
                  l3: {
                    type: 'object',
                    properties: {
                      l4: {
                        type: 'object',
                        properties: {
                          l5: {
                            type: 'object',
                            properties: {
                              l6: {
                                type: 'object',
                                properties: {
                                  l7: {
                                    type: 'object',
                                    properties: {
                                      l8: {
                                        type: 'object',
                                        properties: {
                                          l9: {
                                            type: 'object',
                                            properties: { l10: { type: 'string' } },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      wideObject: {
        type: 'object',
        properties: {
          p001: { type: 'string' },
          p002: { type: 'string' },
          p003: { type: 'string' },
          p004: { type: 'string' },
          p005: { type: 'string' },
          p006: { type: 'string' },
          p007: { type: 'string' },
          p008: { type: 'string' },
          p009: { type: 'string' },
          p010: { type: 'string' },
          p011: { type: 'string' },
          p012: { type: 'string' },
          p013: { type: 'string' },
          p014: { type: 'string' },
          p015: { type: 'string' },
          p016: { type: 'string' },
          p017: { type: 'string' },
          p018: { type: 'string' },
          p019: { type: 'string' },
          p020: { type: 'string' },
          p021: { type: 'string' },
          p022: { type: 'string' },
          p023: { type: 'string' },
          p024: { type: 'string' },
          p025: { type: 'string' },
          p026: { type: 'string' },
          p027: { type: 'string' },
          p028: { type: 'string' },
          p029: { type: 'string' },
          p030: { type: 'string' },
          p031: { type: 'string' },
          p032: { type: 'string' },
          p033: { type: 'string' },
          p034: { type: 'string' },
          p035: { type: 'string' },
          p036: { type: 'string' },
          p037: { type: 'string' },
          p038: { type: 'string' },
          p039: { type: 'string' },
          p040: { type: 'string' },
          p041: { type: 'string' },
          p042: { type: 'string' },
          p043: { type: 'string' },
          p044: { type: 'string' },
          p045: { type: 'string' },
          p046: { type: 'string' },
          p047: { type: 'string' },
          p048: { type: 'string' },
          p049: { type: 'string' },
          p050: { type: 'string' },
        },
      },
      manyRequired: {
        type: 'object',
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
        properties: {
          r01: { type: 'string' },
          r02: { type: 'string' },
          r03: { type: 'string' },
          r04: { type: 'string' },
          r05: { type: 'string' },
          r06: { type: 'string' },
          r07: { type: 'string' },
          r08: { type: 'string' },
          r09: { type: 'string' },
          r10: { type: 'string' },
          r11: { type: 'string' },
          r12: { type: 'string' },
          r13: { type: 'string' },
          r14: { type: 'string' },
          r15: { type: 'string' },
          r16: { type: 'string' },
          r17: { type: 'string' },
          r18: { type: 'string' },
          r19: { type: 'string' },
          r20: { type: 'string' },
        },
      },
      onlyFalse: { type: 'boolean', const: false },
      onlyTrue: { type: 'boolean', const: true },
      onlyNull: { type: 'null' },
      exactlyOne: {
        type: 'object',
        minProperties: 1,
        maxProperties: 1,
        additionalProperties: { type: 'string' },
      },
      exactlyOneItem: {
        type: 'array',
        items: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
        minItems: 1,
        maxItems: 1,
      },
    },
  })

const AmbiguousSchemasSchema = z
  .object({
    noType: z.any().openapi({ description: 'Schema with no type constraint' }),
    empty: z.any(),
    justFalse: z.any().openapi({ not: { not: false } }),
    justTrue: z.any().openapi({ not: { not: true } }),
    deepAny: z
      .union([
        z
          .union([
            z
              .union([
                z
                  .union([z.any()])
                  .optional()
                  .openapi({ anyOf: [{}] }),
              ])
              .optional()
              .openapi({ anyOf: [{ anyOf: [{}] }] }),
          ])
          .optional()
          .openapi({ anyOf: [{ anyOf: [{ anyOf: [{}] }] }] }),
      ])
      .optional()
      .openapi({ anyOf: [{ anyOf: [{ anyOf: [{ anyOf: [{}] }] }] }] }),
    overlappingOneOf: z
      .union([
        z
          .object({ a: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { a: { type: 'string' } } }),
        z
          .object({
            a: z.string().openapi({ type: 'string' }),
            b: z.string().openapi({ type: 'string' }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: { a: { type: 'string' }, b: { type: 'string' } },
          }),
        z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
      ])
      .openapi({
        oneOf: [
          { type: 'object', properties: { a: { type: 'string' } } },
          { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } } },
          { type: 'object', additionalProperties: true },
        ],
      }),
    ambiguousAnyOf: z
      .union([
        z.number().openapi({ type: 'number' }),
        z.int().optional().openapi({ type: 'integer' }),
        z
          .union([z.literal(1), z.literal(2), z.literal(3)])
          .optional()
          .openapi({ enum: [1, 2, 3] }),
        z.literal(2).optional(),
      ])
      .optional()
      .openapi({
        anyOf: [{ type: 'number' }, { type: 'integer' }, { enum: [1, 2, 3] }, { const: 2 }],
      }),
    ambiguousDiscriminator: z
      .union([
        z
          .object({ type: z.enum(['a', 'b']).openapi({ enum: ['a', 'b'] }) })
          .partial()
          .openapi({ type: 'object', properties: { type: { enum: ['a', 'b'] } } }),
        z
          .object({ type: z.enum(['b', 'c']).openapi({ enum: ['b', 'c'] }) })
          .partial()
          .openapi({ type: 'object', properties: { type: { enum: ['b', 'c'] } } }),
      ])
      .openapi({
        oneOf: [
          { type: 'object', properties: { type: { enum: ['a', 'b'] } } },
          { type: 'object', properties: { type: { enum: ['b', 'c'] } } },
        ],
        discriminator: { propertyName: 'type' },
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      noType: { description: 'Schema with no type constraint' },
      empty: {},
      justFalse: { not: { not: false } },
      justTrue: { not: { not: true } },
      deepAny: { anyOf: [{ anyOf: [{ anyOf: [{ anyOf: [{}] }] }] }] },
      overlappingOneOf: {
        oneOf: [
          { type: 'object', properties: { a: { type: 'string' } } },
          { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } } },
          { type: 'object', additionalProperties: true },
        ],
      },
      ambiguousAnyOf: {
        anyOf: [{ type: 'number' }, { type: 'integer' }, { enum: [1, 2, 3] }, { const: 2 }],
      },
      ambiguousDiscriminator: {
        oneOf: [
          { type: 'object', properties: { type: { enum: ['a', 'b'] } } },
          { type: 'object', properties: { type: { enum: ['b', 'c'] } } },
        ],
        discriminator: { propertyName: 'type' },
      },
    },
  })

const ImpossibleSchemasSchema = z
  .object({
    alwaysFalse: z.any().optional().openapi({ not: {} }),
    emptyOneOf: z.any().optional().openapi({ oneOf: [] }),
    emptyAnyOf: z.any().optional().openapi({ anyOf: [] }),
    impossibleAllOf: z
      .intersection(
        z.string().optional().openapi({ type: 'string' }),
        z.array(z.any()).optional().openapi({ type: 'array' }),
        z.object({}).openapi({ type: 'object' }),
        z.number().optional().openapi({ type: 'number' }),
      )
      .optional()
      .openapi({
        allOf: [{ type: 'string' }, { type: 'array' }, { type: 'object' }, { type: 'number' }],
      }),
    emptyEnum: z.any().optional().openapi({ type: 'string', enum: [] }),
    impossiblePattern: z
      .string()
      .regex(/^$/)
      .min(1)
      .optional()
      .openapi({ type: 'string', minLength: 1, pattern: '^$' }),
    integerDecimal: z
      .int()
      .gt(0)
      .lt(0.5)
      .multipleOf(0.1)
      .optional()
      .openapi({ type: 'integer', multipleOf: 0.1, exclusiveMinimum: 0, exclusiveMaximum: 0.5 }),
    closedEmpty: z
      .strictObject({})
      .openapi({ type: 'object', additionalProperties: false, minProperties: 1 }),
  })
  .openapi({
    type: 'object',
    properties: {
      alwaysFalse: { not: {} },
      emptyOneOf: { oneOf: [] },
      emptyAnyOf: { anyOf: [] },
      impossibleAllOf: {
        allOf: [{ type: 'string' }, { type: 'array' }, { type: 'object' }, { type: 'number' }],
      },
      emptyEnum: { type: 'string', enum: [] },
      impossiblePattern: { type: 'string', minLength: 1, pattern: '^$' },
      integerDecimal: {
        type: 'integer',
        multipleOf: 0.1,
        exclusiveMinimum: 0,
        exclusiveMaximum: 0.5,
      },
      closedEmpty: { type: 'object', additionalProperties: false, minProperties: 1 },
    },
  })

const ContradictionsSchema = z
  .object({
    impossibleLength: z
      .string()
      .min(100)
      .max(10)
      .optional()
      .openapi({ type: 'string', minLength: 100, maxLength: 10 }),
    impossibleRange: z
      .number()
      .min(100)
      .max(10)
      .optional()
      .openapi({ type: 'number', minimum: 100, maximum: 10 }),
    noValidInteger: z
      .int()
      .gt(5)
      .lt(6)
      .optional()
      .openapi({ type: 'integer', exclusiveMinimum: 5, exclusiveMaximum: 6 }),
    impossibleArray: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .min(10)
      .max(5)
      .optional()
      .openapi({ type: 'array', items: { type: 'string' }, minItems: 10, maxItems: 5 }),
    impossibleObject: z.object({}).openapi({ type: 'object', minProperties: 10, maxProperties: 5 }),
    missingRequired: z
      .object({ existingProperty: z.string().optional().openapi({ type: 'string' }) })
      .openapi({
        type: 'object',
        required: ['nonExistentProperty'],
        properties: { existingProperty: { type: 'string' } },
      }),
    constEnumConflict: z
      .literal('fixed')
      .optional()
      .openapi({ type: 'string', enum: ['other1', 'other2'] }),
    typeConflictAllOf: z
      .intersection(
        z.string().optional().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
      )
      .optional()
      .openapi({ allOf: [{ type: 'string' }, { type: 'number' }] }),
    formatTypeMismatch: z.int().optional().openapi({ type: 'integer', format: 'email' }),
    multipleConst: z
      .intersection(z.literal('value1').optional(), z.literal('value2').optional())
      .optional()
      .openapi({ allOf: [{ const: 'value1' }, { const: 'value2' }] }),
  })
  .openapi({
    type: 'object',
    properties: {
      impossibleLength: { type: 'string', minLength: 100, maxLength: 10 },
      impossibleRange: { type: 'number', minimum: 100, maximum: 10 },
      noValidInteger: { type: 'integer', exclusiveMinimum: 5, exclusiveMaximum: 6 },
      impossibleArray: { type: 'array', items: { type: 'string' }, minItems: 10, maxItems: 5 },
      impossibleObject: { type: 'object', minProperties: 10, maxProperties: 5 },
      missingRequired: {
        type: 'object',
        required: ['nonExistentProperty'],
        properties: { existingProperty: { type: 'string' } },
      },
      constEnumConflict: { type: 'string', const: 'fixed', enum: ['other1', 'other2'] },
      typeConflictAllOf: { allOf: [{ type: 'string' }, { type: 'number' }] },
      formatTypeMismatch: { type: 'integer', format: 'email' },
      multipleConst: { allOf: [{ const: 'value1' }, { const: 'value2' }] },
    },
  })

const PathologicalRootSchema = z
  .object({
    contradictions: ContradictionsSchema,
    impossible: ImpossibleSchemasSchema,
    ambiguous: AmbiguousSchemasSchema,
    edgeCases: EdgeCasesSchema,
    recursive: RecursiveNightmaresSchema,
    composition: CompositionHellSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      contradictions: { $ref: '#/components/schemas/Contradictions' },
      impossible: { $ref: '#/components/schemas/ImpossibleSchemas' },
      ambiguous: { $ref: '#/components/schemas/AmbiguousSchemas' },
      edgeCases: { $ref: '#/components/schemas/EdgeCases' },
      recursive: { $ref: '#/components/schemas/RecursiveNightmares' },
      composition: { $ref: '#/components/schemas/CompositionHell' },
    },
  })

export const postPathologicalRoute = createRoute({
  method: 'post',
  path: '/pathological',
  operationId: 'testPathological',
  request: { body: { content: { 'application/json': { schema: PathologicalRootSchema } } } },
  responses: { 200: { description: 'OK' } },
})
