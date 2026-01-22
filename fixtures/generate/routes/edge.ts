import { createRoute, z } from '@hono/zod-openapi'

const AnimalSchema = z
  .object({ type: z.string() })
  .openapi({ required: ['type'], discriminator: { propertyName: 'type' } })
  .openapi('Animal')

const CatSchema = AnimalSchema.and(
  z.object({ livesLeft: z.int().min(0).max(9).exactOptional() }),
).openapi('Cat')

const DogSchema = AnimalSchema.and(
  z.object({ barkLevel: z.enum(['quiet', 'normal', 'loud']).exactOptional() }),
).openapi('Dog')

const BaseSchema = z
  .object({ id: z.uuid(), metadata: z.record(z.string(), z.string()).nullable().exactOptional() })
  .openapi({ required: ['id'] })
  .openapi('Base')

export const postPolymorphicRoute = createRoute({
  method: 'post',
  path: '/polymorphic',
  summary: 'Polymorphic object with discriminator',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .xor([CatSchema, DogSchema])
            .openapi({
              discriminator: {
                propertyName: 'type',
                mapping: { cat: '#/components/schemas/Cat', dog: '#/components/schemas/Dog' },
              },
            }),
        },
      },
      required: true,
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
      q: z
        .string()
        .openapi({ param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } } }),
      filter: z
        .union([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'filter',
                in: 'query',
                schema: {
                  anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                },
              },
            }),
          z
            .array(
              z
                .string()
                .exactOptional()
                .openapi({
                  param: {
                    name: 'filter',
                    in: 'query',
                    schema: {
                      anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                    },
                  },
                }),
            )
            .exactOptional()
            .openapi({
              param: {
                name: 'filter',
                in: 'query',
                schema: {
                  anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                },
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
          },
        }),
      exclude: z
        .any()
        .refine((v) => typeof v !== 'number')
        .exactOptional()
        .openapi({
          param: { name: 'exclude', in: 'query', schema: { not: { type: 'number' } } },
          not: { type: 'number' },
        }),
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
      content: {
        'application/json': {
          schema: BaseSchema.and(z.object({ step: z.int().min(1).max(3).exactOptional() })),
        },
      },
    },
  },
  responses: { 204: { description: 'No Content' } },
})
