import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

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
              tags: z.array(z.string()).superRefine((items, ctx) => {
                const seen = new Map()
                for (const [i, val] of items.entries()) {
                  const key = JSON.stringify(val)
                  if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                  else seen.set(key, i)
                }
              }),
              ids: z
                .array(z.int())
                .min(1)
                .max(100)
                .superRefine((items, ctx) => {
                  const seen = new Map()
                  for (const [i, val] of items.entries()) {
                    const key = JSON.stringify(val)
                    if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                    else seen.set(key, i)
                  }
                }),
              labels: z
                .array(z.string())
                .length(3)
                .superRefine((items, ctx) => {
                  const seen = new Map()
                  for (const [i, val] of items.entries()) {
                    const key = JSON.stringify(val)
                    if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                    else seen.set(key, i)
                  }
                }),
            })
            .openapi({ required: ['tags', 'ids', 'labels'] }),
        },
      },
    },
  },
})

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
                .refine((val) => Object.keys(val).length >= 1)
                .refine((val) => Object.keys(val).length <= 10),
              config: z
                .object({ name: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length >= 1)
                .exactOptional(),
              limited: z
                .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length <= 5)
                .exactOptional(),
            })
            .openapi({ required: ['metadata'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

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
          schema: z.record(z.string(), z.string()).superRefine((o, ctx) => {
            const regex = new RegExp('^[a-z_]+$')
            for (const k of Object.keys(o)) {
              if (!regex.test(k)) {
                ctx.addIssue({ code: 'custom', path: [k] })
              }
            }
          }),
        },
      },
    },
  },
})

export const putSettingsRoute = createRoute({
  method: 'put',
  path: '/settings',
  operationId: 'updateSettings',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              avatar: z
                .base64()
                .transform((val) =>
                  typeof atob === 'function'
                    ? Uint8Array.from(atob(val), (c) => c.charCodeAt(0))
                    : new Uint8Array(Buffer.from(val, 'base64')),
                ),
            })
            .openapi({ required: ['avatar'] }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

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
              data: z.record(z.string(), z.string()).superRefine((o, ctx) => {
                const regex = new RegExp('^x-')
                const Schema = z.string()
                for (const [k, val] of Object.entries(o)) {
                  if (!regex.test(k)) {
                    continue
                  }
                  const result = Schema.safeParse(val)
                  if (!result.success) {
                    for (const issue of result.error.issues) {
                      ctx.addIssue({ ...issue, path: [k, ...issue.path] })
                    }
                  }
                }
              }),
              headers: z
                .looseObject({})
                .superRefine((o, ctx) => {
                  const regex = new RegExp('^X-Custom-')
                  const Schema = z.string()
                  for (const [k, val] of Object.entries(o)) {
                    if (!regex.test(k)) {
                      continue
                    }
                    const result = Schema.safeParse(val)
                    if (!result.success) {
                      for (const issue of result.error.issues) {
                        ctx.addIssue({ ...issue, path: [k, ...issue.path] })
                      }
                    }
                  }
                })
                .exactOptional(),
              keys: z
                .record(z.string(), z.string())
                .superRefine((o, ctx) => {
                  const regex = new RegExp('^[a-z_]+$')
                  for (const k of Object.keys(o)) {
                    if (!regex.test(k)) {
                      ctx.addIssue({ code: 'custom', path: [k] })
                    }
                  }
                })
                .exactOptional(),
            })
            .openapi({ required: ['data'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

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
            .superRefine((o, ctx) => {
              if (!Object.hasOwn(o, 'creditCard')) {
                return
              }
              if (!Object.hasOwn(o, 'billingAddress')) {
                ctx.addIssue({
                  code: 'custom',
                  message: 'requires "billingAddress" when "creditCard" present',
                  path: ['billingAddress'],
                })
              }
            }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

const getTagsRouteHandler: RouteHandler<typeof getTagsRoute> = async (c) => {
  return c.json(
    {
      tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      ids: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.number.int({ min: 1, max: 1000 }),
      ),
      labels: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
    },
    200,
  )
}

const postTagsRouteHandler: RouteHandler<typeof postTagsRoute> = async (c) => {
  return c.body(null, 201)
}

const getSettingsRouteHandler: RouteHandler<typeof getSettingsRoute> = async (c) => {
  return c.json({}, 200)
}

const putSettingsRouteHandler: RouteHandler<typeof putSettingsRoute> = async (c) => {
  return c.body(null, 200)
}

const postConfigRouteHandler: RouteHandler<typeof postConfigRoute> = async (c) => {
  return c.body(null, 201)
}

const postPaymentRouteHandler: RouteHandler<typeof postPaymentRoute> = async (c) => {
  return c.body(null, 201)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getTagsRoute, getTagsRouteHandler)
  .openapi(postTagsRoute, postTagsRouteHandler)
  .openapi(getSettingsRoute, getSettingsRouteHandler)
  .openapi(putSettingsRoute, putSettingsRouteHandler)
  .openapi(postConfigRoute, postConfigRouteHandler)
  .openapi(postPaymentRoute, postPaymentRouteHandler)

export default app
