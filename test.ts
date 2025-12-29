import { createRoute, z } from '@hono/zod-openapi'

const CategorySchema = z
  .lazy(() =>
    z
      .object({
        id: z.string().optional().openapi({ type: 'string' }),
        name: z.string().optional().openapi({ type: 'string' }),
        parent: CategorySchema,
      })
      .optional()
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          parent: { $ref: '#/components/schemas/Category' },
        },
      }),
  )
  .openapi('Category')

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
})
