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
                .superRefine((items, ctx) => {
                  const seen = new Map()
                  for (const [i, val] of items.entries()) {
                    const key = JSON.stringify(val)
                    if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                    else seen.set(key, i)
                  }
                })
                .readonly(),
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
                })
                .readonly(),
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
                })
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
                .refine((val) => Object.keys(val).length >= 1)
                .refine((val) => Object.keys(val).length <= 10)
                .readonly(),
              config: z
                .object({ name: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length >= 1)
                .readonly()
                .exactOptional(),
              limited: z
                .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length <= 5)
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
            .superRefine((o, ctx) => {
              const regex = new RegExp('^[a-z_]+$')
              for (const k of Object.keys(o)) {
                if (!regex.test(k)) {
                  ctx.addIssue({ code: 'custom', path: [k] })
                }
              }
            })
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
            .object({
              avatar: z
                .base64()
                .transform((val) =>
                  typeof atob === 'function'
                    ? Uint8Array.from(atob(val), (c) => c.charCodeAt(0))
                    : new Uint8Array(Buffer.from(val, 'base64')),
                ),
            })
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
                .superRefine((o, ctx) => {
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
                })
                .readonly(),
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
                .readonly()
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
            })
            .readonly(),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)
