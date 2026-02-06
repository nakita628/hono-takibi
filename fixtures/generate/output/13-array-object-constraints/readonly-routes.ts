import { createRoute, z } from '@hono/zod-openapi'

export const getTagsRoute = createRoute({
  method: 'get',
  path: '/tags',
  operationId: 'getTags',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              tags: z.array(z.string()).refine((items) => new Set(items).size === items.length),
              ids: z
                .array(z.int())
                .min(1)
                .max(100)
                .refine((items) => new Set(items).size === items.length),
              labels: z
                .array(z.string())
                .length(3)
                .refine((items) => new Set(items).size === items.length),
            })
            .openapi({ required: ['tags', 'ids', 'labels'] }),
        },
      },
    },
  },
} as const)

export const postTagsRoute = createRoute({
  method: 'post',
  path: '/tags',
  operationId: 'createTag',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              metadata: z
                .object({ key: z.string().exactOptional(), value: z.string().exactOptional() })
                .refine((o) => Object.keys(o).length >= 1)
                .refine((o) => Object.keys(o).length <= 10),
              config: z
                .object({ name: z.string().exactOptional() })
                .refine((o) => Object.keys(o).length >= 1)
                .exactOptional(),
              limited: z
                .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
                .refine((o) => Object.keys(o).length <= 5)
                .exactOptional(),
            })
            .openapi({ required: ['metadata'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)
