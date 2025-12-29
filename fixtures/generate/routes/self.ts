import { createRoute, z } from '@hono/zod-openapi'

type CategoryType = { id: string; name: string; parent?: CategoryType }

const CategorySchema: z.ZodType<CategoryType> = z.lazy(() =>
  z
    .object({
      id: z.string().openapi({ type: 'string' }),
      name: z.string().openapi({ type: 'string' }),
      parent: CategorySchema,
    })
    .openapi({
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        parent: { $ref: '#/components/schemas/Category' },
      },
    }),
)

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
})
