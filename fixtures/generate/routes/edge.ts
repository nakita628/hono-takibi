import { createRoute, z } from '@hono/zod-openapi'

const AnimalSchema = z
  .object({ type: z.string().optional().openapi({ type: 'string' }) })
  .optional()
  .openapi({ type: 'object', properties: { type: { type: 'string' } } })
  .openapi('Animal')

const CatSchema = z
  .intersection(
    AnimalSchema,
    z
      .object({
        livesLeft: z.int().min(0).max(9).openapi({ type: 'integer', minimum: 0, maximum: 9 }),
      })
      .partial()
      .optional()
      .openapi({
        type: 'object',
        properties: { livesLeft: { type: 'integer', minimum: 0, maximum: 9 } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Animal' },
      { type: 'object', properties: { livesLeft: { type: 'integer', minimum: 0, maximum: 9 } } },
    ],
  })
  .openapi('Cat')

const DogSchema = z
  .intersection(
    AnimalSchema,
    z
      .object({
        barkLevel: z
          .enum(['quiet', 'normal', 'loud'])
          .openapi({ type: 'string', enum: ['quiet', 'normal', 'loud'] }),
      })
      .partial()
      .optional()
      .openapi({
        type: 'object',
        properties: { barkLevel: { type: 'string', enum: ['quiet', 'normal', 'loud'] } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Animal' },
      {
        type: 'object',
        properties: { barkLevel: { type: 'string', enum: ['quiet', 'normal', 'loud'] } },
      },
    ],
  })
  .openapi('Dog')

const BaseSchema = z
  .object({
    id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    metadata: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .nullable()
      .optional()
      .openapi({ type: 'object' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      metadata: { type: 'object', nullable: true, additionalProperties: { type: 'string' } },
    },
  })
  .openapi('Base')

export const postPolymorphicRoute = createRoute({
  method: 'post',
  path: '/polymorphic',
  summary: 'Polymorphic object with discriminator',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z
            .union([CatSchema, DogSchema])
            .optional()
            .openapi({
              oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
            }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  summary: 'Search with complex query',
  request: {
    query: z.object({
      q: z.string().openapi({ param: { name: 'q', in: 'query', required: true }, type: 'string' }),
      filter: z
        .union([
          z
            .string()
            .optional()
            .openapi({ param: { name: 'filter', in: 'query' }, type: 'string' }),
          z
            .array(
              z
                .string()
                .optional()
                .openapi({ param: { name: 'filter', in: 'query' }, type: 'string' }),
            )
            .optional()
            .openapi({
              param: { name: 'filter', in: 'query' },
              type: 'array',
              items: { type: 'string' },
            }),
        ])
        .optional()
        .openapi({
          param: { name: 'filter', in: 'query' },
          anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
        }),
      exclude: z
        .any()
        .refine((v) => typeof v !== 'number')
        .optional()
        .openapi({ param: { name: 'exclude', in: 'query' }, not: { type: 'number' } }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const putMultiStepRoute = createRoute({
  method: 'put',
  path: '/multi-step',
  summary: 'Multi-step object definition using allOf',
  request: {
    body: {
      required: false,
      content: {
        'application/json': {
          schema: z
            .intersection(
              BaseSchema,
              z
                .object({
                  step: z.int().min(1).max(3).openapi({ type: 'integer', minimum: 1, maximum: 3 }),
                })
                .partial()
                .optional()
                .openapi({
                  type: 'object',
                  properties: { step: { type: 'integer', minimum: 1, maximum: 3 } },
                }),
            )
            .optional()
            .openapi({
              allOf: [
                { $ref: '#/components/schemas/Base' },
                {
                  type: 'object',
                  properties: { step: { type: 'integer', minimum: 1, maximum: 3 } },
                },
              ],
            }),
        },
      },
    },
  },
  responses: { 204: { description: 'No Content' } },
})
