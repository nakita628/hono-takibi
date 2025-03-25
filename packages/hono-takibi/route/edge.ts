import { createRoute, z } from '@hono/zod-openapi'

const AnimalSchema = z.object({ type: z.string() }).openapi('Animal')

const CatSchema = z
  .intersection(AnimalSchema, z.object({ livesLeft: z.number().int().min(0).max(9) }).partial())
  .openapi('Cat')

const DogSchema = z
  .intersection(
    AnimalSchema,
    z.object({ barkLevel: z.enum(['quiet', 'normal', 'loud']) }).partial(),
  )
  .openapi('Dog')

const BaseSchema = z
  .object({ id: z.string().uuid(), metadata: z.record(z.string(), z.string()).optional() })
  .openapi('Base')

export const postPolymorphicRoute = createRoute({
  tags: [],
  method: 'post',
  path: '/polymorphic',
  summary: 'Polymorphic object with discriminator',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: z.union([CatSchema, DogSchema]) } },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getSearchRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/search',
  summary: 'Search with complex query',
  request: {
    query: z.object({
      q: z.string(),
      filter: z.union([z.string(), z.array(z.string())]).optional(),
      exclude: z.unknown().optional(),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const putMultiStepRoute = createRoute({
  tags: [],
  method: 'put',
  path: '/multi-step',
  summary: 'Multi-step object definition using allOf',
  request: {
    body: {
      required: false,
      content: {
        'application/json': {
          schema: z.intersection(
            BaseSchema,
            z.object({ step: z.number().int().min(1).max(3) }).partial(),
          ),
        },
      },
    },
  },
  responses: { 204: { description: 'No Content' } },
})
