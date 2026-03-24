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
              tags: z
                .array(z.string())
                .refine((items) => new Set(items).size === items.length)
                .readonly(),
              ids: z
                .array(z.int())
                .min(1)
                .max(100)
                .refine((items) => new Set(items).size === items.length)
                .readonly(),
              labels: z
                .array(z.string())
                .length(3)
                .refine((items) => new Set(items).size === items.length)
                .readonly(),
            })
            .readonly()
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
                .refine((o) => Object.keys(o).length <= 10)
                .readonly(),
              config: z
                .object({ name: z.string().exactOptional() })
                .refine((o) => Object.keys(o).length >= 1)
                .readonly()
                .exactOptional(),
              limited: z
                .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
                .refine((o) => Object.keys(o).length <= 5)
                .readonly()
                .exactOptional(),
            })
            .readonly()
            .openapi({ required: ['metadata'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)

export const getSettingsRoute = createRoute({
  method: 'get',
  path: '/settings',
  operationId: 'getSettings',
  request: {
    query: z.object({
      filter: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'filter', in: 'query', allowReserved: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .record(z.string(), z.string())
            .refine((o) => Object.keys(o).every((k) => new RegExp('^[a-z_]+$').test(k)))
            .readonly(),
        },
      },
    },
  },
} as const)

export const putSettingsRoute = createRoute({
  method: 'put',
  path: '/settings',
  operationId: 'updateSettings',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ avatar: z.string() })
            .readonly()
            .openapi({ required: ['avatar'] }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const postConfigRoute = createRoute({
  method: 'post',
  path: '/config',
  operationId: 'createConfig',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              data: z
                .record(z.string(), z.string())
                .refine((o) =>
                  Object.entries(o).every(
                    ([k, v]) => !new RegExp('^x-').test(k) || z.string().safeParse(v).success,
                  ),
                )
                .readonly(),
              headers: z
                .looseObject({})
                .refine((o) =>
                  Object.entries(o).every(
                    ([k, v]) =>
                      !new RegExp('^X-Custom-').test(k) || z.string().safeParse(v).success,
                  ),
                )
                .readonly()
                .exactOptional(),
              keys: z
                .record(z.string(), z.string())
                .refine((o) => Object.keys(o).every((k) => new RegExp('^[a-z_]+$').test(k)))
                .readonly()
                .exactOptional(),
            })
            .readonly()
            .openapi({ required: ['data'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)

export const postPaymentRoute = createRoute({
  method: 'post',
  path: '/payment',
  operationId: 'createPayment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              creditCard: z.string().exactOptional(),
              billingAddress: z.string().exactOptional(),
              email: z.string().exactOptional(),
            })
            .refine((o) => !('creditCard' in o) || 'billingAddress' in o)
            .readonly(),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)
