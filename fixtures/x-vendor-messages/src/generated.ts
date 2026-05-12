import { createRoute, z } from '@hono/zod-openapi'

const FormSchema = z
  .object({
    username: z
      .string({ error: 'username must be a string' })
      .min(3, { error: 'username must be at least 3 characters' })
      .max(16, { error: 'username must be at most 16 characters' }),
    code: z.string().length(6, { error: 'code must be exactly 6 characters' }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, { error: 'slug must be lowercase alphanumeric with hyphens' }),
    age: z
      .int({ error: 'age must be an integer' })
      .min(0, { error: 'age must be >= 0' })
      .max(120, { error: 'age must be <= 120' }),
    score: z
      .number({ error: 'score must be a number' })
      .multipleOf(0.5, { error: 'score must be a multiple of 0.5' }),
    count: z.int().multipleOf(5, { error: 'count must be a multiple of 5' }),
    active: z.boolean({ error: 'active must be a boolean' }),
    tags: z
      .array(z.string(), { error: 'tags must be an array' })
      .min(1, { error: 'tags must contain at least 1 item' })
      .max(5, { error: 'tags must contain at most 5 items' }),
    pin: z.array(z.int()).length(4, { error: 'pin must contain exactly 4 digits' }),
    role: z.enum(['admin', 'editor', 'viewer'], {
      error: 'role must be one of admin, editor, viewer',
    }),
    priority: z.union([z.literal(1), z.literal(2), z.literal(3)], {
      error: 'priority must be 1, 2, or 3',
    }),
    token: z.string().exactOptional(),
    tokenLabel: z.string().exactOptional(),
    nickname: z.string({ error: () => 'nickname is invalid' }).exactOptional(),
    quota: z
      .int({
        error: (iss) =>
          iss.input === undefined ? 'quota is required' : 'quota must be an integer',
      })
      .min(0, { error: (iss) => `quota must be >= 0 (received: ${iss.input})` }),
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'token')) return
    if (!Object.hasOwn(o, 'tokenLabel'))
      ctx.addIssue({
        code: 'custom',
        message: 'tokenLabel is required when token is provided',
        path: ['tokenLabel'],
      })
  })
  .openapi({
    required: [
      'username',
      'code',
      'slug',
      'age',
      'score',
      'count',
      'active',
      'tags',
      'pin',
      'role',
      'priority',
      'quota',
    ],
  })
  .openapi('Form')

const CompositionSchema = z
  .object({
    anyValue: z.union([z.string(), z.int()], { error: 'anyValue must be a string or integer' }),
    oneValue: z
      .xor([z.string(), z.int()], { error: 'oneValue must match exactly one type' })
      .exactOptional(),
    notString: z
      .any()
      .refine((v) => typeof v !== 'string', { error: 'notString must not be a string' })
      .exactOptional(),
  })
  .openapi({ required: ['anyValue'] })
  .openapi('Composition')

const DictionarySchema = z
  .record(z.string(), z.string())
  .refine((o) => Object.keys(o).every((k) => new RegExp('^[a-z][a-z0-9_]*$').test(k)), {
    error: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
  })
  .openapi('Dictionary')

const MergedSchema = (() => {
  const Schema = z
    .object({ name: z.string().min(3, { error: 'name must be at least 3 chars' }) })
    .openapi({ required: ['name'] })
    .and(
      z
        .object({ age: z.int().min(0, { error: 'age must be >= 0' }) })
        .openapi({ required: ['age'] }),
    )
  return z
    .unknown()
    .check((ctx) => {
      const valid = Schema.safeParse(ctx.value)
      if (!valid.success) {
        for (const issue of valid.error.issues) {
          if (issue.code === 'invalid_type') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'too_big') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'too_small') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'invalid_format') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'not_multiple_of') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'unrecognized_keys') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'invalid_union') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'invalid_key') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'invalid_element') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'invalid_value') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          } else if (issue.code === 'custom') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'merged validation failed' })
          }
        }
      }
    })
    .pipe(Schema)
})().openapi('Merged')

const MergedArrowSchema = (() => {
  const Schema = z
    .object({ name: z.string().min(3) })
    .openapi({ required: ['name'] })
    .and(z.object({ age: z.int().min(0) }).openapi({ required: ['age'] }))
  return z
    .unknown()
    .check((ctx) => {
      const valid = Schema.safeParse(ctx.value)
      if (!valid.success) {
        for (const issue of valid.error.issues) {
          if (issue.code === 'invalid_type') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'too_big') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'too_small') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'invalid_format') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'not_multiple_of') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'unrecognized_keys') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'invalid_union') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'invalid_key') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'invalid_element') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'invalid_value') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          } else if (issue.code === 'custom') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
            })
          }
        }
      }
    })
    .pipe(Schema)
})().openapi('MergedArrow')

const PaymentSchema = z
  .object({
    method: z.string(),
    credit_card: z.string().exactOptional(),
    billing_zip: z.string().exactOptional(),
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'credit_card')) return
    if (!Object.hasOwn(o, 'billing_zip'))
      ctx.addIssue({
        code: 'custom',
        message: 'billing_zip is required when credit_card is provided',
        path: ['billing_zip'],
      })
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'credit_card')) return
    const Schema = z.unknown().superRefine((v, ctx) => {
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        if (Object.hasOwn(v, 'credit_card')) {
          const Schema = z.string().regex(/^[0-9]{16}$/)
          if (!Schema.safeParse(Reflect.get(v, 'credit_card')).success)
            ctx.addIssue({ code: 'custom', message: 'invalid property' })
        }
      }
    })
    const valid = Schema.safeParse(o)
    if (!valid.success)
      valid.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: issue.path }))
  })
  .openapi({ required: ['method'] })
  .openapi('Payment')

const BoundsSchema = z
  .object({
    score: z
      .number()
      .min(0, { error: 'score must be >= 0' })
      .lt(100, { error: 'score must be < 100' }),
    ratio: z.number().gt(0, { error: 'ratio must be > 0' }).max(1, { error: 'ratio must be <= 1' }),
  })
  .openapi({ required: ['score', 'ratio'] })
  .openapi('Bounds')

const BasketSchema = z
  .object({
    items: z
      .array(z.object({ kind: z.string() }).openapi({ required: ['kind'] }))
      .refine(
        (arr) => {
          const Schema = z.object({ kind: z.literal('premium') }).openapi({ required: ['kind'] })
          return arr.filter((i) => Schema.safeParse(i).success).length >= 2
        },
        { error: 'must include at least 2 premium items' },
      )
      .refine(
        (arr) => {
          const Schema = z.object({ kind: z.literal('premium') }).openapi({ required: ['kind'] })
          return arr.filter((i) => Schema.safeParse(i).success).length <= 5
        },
        { error: 'must include at most 5 premium items' },
      ),
  })
  .openapi({ required: ['items'] })
  .openapi('Basket')

const MiscSchema = z
  .object({
    color: z.enum(['red', 'green', 'blue'], { error: 'color must be one of red, green, blue' }),
    kind: z.literal('admin', { error: 'kind must be exactly "admin"' }),
    tags: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        error: 'tags must contain unique values',
      }),
    sized: z.array(z.string()).refine(
      (arr) => {
        const Schema = z.literal('premium')
        return arr.some((i) => Schema.safeParse(i).success)
      },
      { error: 'sized must contain at least one premium tag' },
    ),
    namespaced: z
      .strictObject(
        {
          a: z.string().exactOptional(),
          b: z.string().exactOptional(),
          c: z.string().exactOptional(),
        },
        {
          error: (issue) =>
            issue.code === 'unrecognized_keys'
              ? 'namespaced contains an unrecognized key'
              : undefined,
        },
      )
      .refine((o) => Object.keys(o).length >= 1, {
        error: 'namespaced must have at least 1 property',
      })
      .refine((o) => Object.keys(o).length <= 3, {
        error: 'namespaced must have at most 3 properties',
      }),
    prefixed: z.looseObject({}).superRefine((o, ctx) => {
      const Re = new RegExp('^x_')
      const Schema = z.string()
      Object.entries(o).forEach(([k, v]) => {
        if (!Re.test(k)) return
        const valid = Schema.safeParse(v)
        if (!valid.success)
          valid.error.issues.forEach((issue) =>
            ctx.addIssue({
              ...issue,
              path: [k, ...issue.path],
              message: 'x_ keys must be strings',
            }),
          )
      })
    }),
    payload: z.string({
      error: (issue) =>
        issue.input === undefined ? 'payload is required' : 'payload must be a string',
    }),
  })
  .openapi({ required: ['color', 'kind', 'tags', 'sized', 'namespaced', 'prefixed', 'payload'] })
  .openapi('Misc')

export const postFormRoute = createRoute({
  method: 'post',
  path: '/form',
  operationId: 'postForm',
  request: { body: { content: { 'application/json': { schema: FormSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postCompositionRoute = createRoute({
  method: 'post',
  path: '/composition',
  operationId: 'postComposition',
  request: {
    body: { content: { 'application/json': { schema: CompositionSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postDictionaryRoute = createRoute({
  method: 'post',
  path: '/dictionary',
  operationId: 'postDictionary',
  request: {
    body: { content: { 'application/json': { schema: DictionarySchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postMergedRoute = createRoute({
  method: 'post',
  path: '/merged',
  operationId: 'postMerged',
  request: { body: { content: { 'application/json': { schema: MergedSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postMergedArrowRoute = createRoute({
  method: 'post',
  path: '/merged-arrow',
  operationId: 'postMergedArrow',
  request: {
    body: { content: { 'application/json': { schema: MergedArrowSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postPaymentRoute = createRoute({
  method: 'post',
  path: '/payment',
  operationId: 'postPayment',
  request: { body: { content: { 'application/json': { schema: PaymentSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postBoundsRoute = createRoute({
  method: 'post',
  path: '/bounds',
  operationId: 'postBounds',
  request: { body: { content: { 'application/json': { schema: BoundsSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postBasketRoute = createRoute({
  method: 'post',
  path: '/basket',
  operationId: 'postBasket',
  request: { body: { content: { 'application/json': { schema: BasketSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postMiscRoute = createRoute({
  method: 'post',
  path: '/misc',
  operationId: 'postMisc',
  request: { body: { content: { 'application/json': { schema: MiscSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})
