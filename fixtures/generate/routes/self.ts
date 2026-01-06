import { createRoute, z } from '@hono/zod-openapi'

type CategoryType = { id: string; name: string; parent?: CategoryType }

const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({ id: z.string(), name: z.string(), parent: CategorySchema.exactOptional() })
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('Category')

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
})
