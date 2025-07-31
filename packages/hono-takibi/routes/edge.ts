import { createRoute, z } from '@hono/zod-openapi'

const AnimalSchema = z.object({ type: z.string() }).openapi('Animal')

const BaseSchema = z
  .object({ id: z.uuid(), metadata: z.record(z.string(), z.string()).nullable().optional() })
  .openapi('Base')

const CatSchema = z
  .intersection(AnimalSchema, z.object({ livesLeft: z.int().min(0).max(9) }).partial())
  .openapi('Cat')

const DogSchema = z
  .intersection(
    AnimalSchema,
    z.object({ barkLevel: z.enum(['quiet', 'normal', 'loud']) }).partial(),
  )
  .openapi('Dog')

export const postPolymorphicRoute = createRoute({
  method: 'post',
  path: '/polymorphic',
  summary: 'Polymorphic object with discriminator',
  request: {
    body: {
      required: true,
      content: {
        'application/json': { schema: z.discriminatedUnion('type', [CatSchema, DogSchema]) },
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
      q: z.string().openapi({ param: { in: 'query', name: 'q', required: false } }),
      filter: z
        .union([z.string(), z.array(z.string())])
        .openapi({ param: { in: 'query', name: 'filter', required: false } })
        .optional(),
      exclude: z
        .any()
        .refine((v) => typeof v !== 'number')
        .openapi({ param: { in: 'query', name: 'exclude', required: false } })
        .optional(),
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
          schema: z.intersection(BaseSchema, z.object({ step: z.int().min(1).max(3) }).partial()),
        },
      },
    },
  },
  responses: { 204: { description: 'No Content' } },
})
