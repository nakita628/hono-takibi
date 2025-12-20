import { createRoute, z } from '@hono/zod-openapi'

const CategorySchema: z.ZodType<{ id: string; name: string }> = z.lazy(() =>
  z
    .object({ id: z.string(), name: z.string(), parent: CategorySchema.optional() })
    .openapi('Category'),
)

type Category = z.infer<typeof CategorySchema>

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
})
