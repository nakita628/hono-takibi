import { createRoute, z } from '@hono/zod-openapi'

type CategoryType = { readonly id: string; readonly name: string; readonly parent?: CategoryType }

const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({ id: z.string(), name: z.string(), parent: CategorySchema.exactOptional() })
      .openapi({ required: ['id', 'name'] }),
  )
  .readonly()
  .openapi('Category')

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
} as const)
