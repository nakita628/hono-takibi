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
    if (!Object.hasOwn(o, 'token')) {
      return
    }
    if (!Object.hasOwn(o, 'tokenLabel')) {
      ctx.addIssue({
        code: 'custom',
        message: 'tokenLabel is required when token is provided',
        path: ['tokenLabel'],
      })
    }
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
      .refine((val) => typeof val !== 'string', { error: 'notString must not be a string' })
      .exactOptional(),
  })
  .openapi({ required: ['anyValue'] })
  .openapi('Composition')

const DictionarySchema = z
  .record(z.string(), z.string())
  .superRefine((o, ctx) => {
    const regex = new RegExp('^[a-z][a-z0-9_]*$')
    for (const k of Object.keys(o)) {
      if (!regex.test(k)) {
        ctx.addIssue({
          code: 'custom',
          path: [k],
          message: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
        })
      }
    }
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
      const result = Schema.safeParse(ctx.value)
      if (!result.success) {
        for (const issue of result.error.issues) {
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
      const result = Schema.safeParse(ctx.value)
      if (!result.success) {
        for (const issue of result.error.issues) {
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
    if (!Object.hasOwn(o, 'credit_card')) {
      return
    }
    if (!Object.hasOwn(o, 'billing_zip')) {
      ctx.addIssue({
        code: 'custom',
        message: 'billing_zip is required when credit_card is provided',
        path: ['billing_zip'],
      })
    }
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'credit_card')) {
      return
    }
    const Schema = z.unknown().superRefine((val, ctx) => {
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        if (Object.hasOwn(val, 'credit_card')) {
          const Schema = z.string().regex(/^[0-9]{16}$/)
          if (!Schema.safeParse(Reflect.get(val, 'credit_card')).success) {
            ctx.addIssue({ code: 'custom' })
          }
        }
      }
    })
    const result = Schema.safeParse(o)
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          ...issue,
          path: issue.path,
          message: 'credit_card must be 16 digits when provided',
        })
      }
    }
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
      .superRefine((arr, ctx) => {
        const Schema = z.object({ kind: z.literal('premium') }).openapi({ required: ['kind'] })
        const matched = arr.filter((i) => Schema.safeParse(i).success).length
        if (matched < 2) {
          ctx.addIssue({ code: 'custom', message: 'must include at least 2 premium items' })
        }
        if (matched > 5) {
          ctx.addIssue({ code: 'custom', message: 'must include at most 5 premium items' })
        }
      }),
  })
  .openapi({ required: ['items'] })
  .openapi('Basket')

const WriteOnlySchema = z
  .object({ name: z.string(), password: z.string().openapi({ writeOnly: true }) })
  .openapi({ required: ['name', 'password'] })
  .openapi('WriteOnly')

const ContainsDefaultSchema = z
  .object({
    tags: z.array(z.string()).superRefine((arr, ctx) => {
      const Schema = z.literal('special')
      const matched = arr.filter((i) => Schema.safeParse(i).success).length
      if (matched < 1) {
        ctx.addIssue({ code: 'custom' })
      }
    }),
    scores: z.array(z.number()).superRefine((arr, ctx) => {
      const Schema = z.number().min(90)
      const matched = arr.filter((i) => Schema.safeParse(i).success).length
      if (matched < 2) {
        ctx.addIssue({ code: 'custom' })
      }
    }),
    ints: z.array(z.number()).superRefine((arr, ctx) => {
      const Schema = z.int()
      const matched = arr.filter((i) => Schema.safeParse(i).success).length
      if (matched < 2) {
        ctx.addIssue({ code: 'custom' })
      }
      if (matched > 3) {
        ctx.addIssue({ code: 'custom' })
      }
    }),
  })
  .openapi({ required: ['tags', 'scores', 'ints'] })
  .openapi('ContainsDefault')

const MiscSchema = z
  .object({
    color: z.enum(['red', 'green', 'blue'], { error: 'color must be one of red, green, blue' }),
    kind: z.literal('admin', { error: 'kind must be exactly "admin"' }),
    tags: z.array(z.string()).superRefine((items, ctx) => {
      const seen = new Map()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key))
          ctx.addIssue({ code: 'custom', path: [i], message: 'tags must contain unique values' })
        else seen.set(key, i)
      }
    }),
    sized: z.array(z.string()).superRefine((arr, ctx) => {
      const Schema = z.literal('premium')
      const matched = arr.filter((i) => Schema.safeParse(i).success).length
      if (matched < 1) {
        ctx.addIssue({ code: 'custom', message: 'sized must contain at least one premium tag' })
      }
    }),
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
      .refine((val) => Object.keys(val).length >= 1, {
        error: 'namespaced must have at least 1 property',
      })
      .refine((val) => Object.keys(val).length <= 3, {
        error: 'namespaced must have at most 3 properties',
      }),
    prefixed: z.looseObject({}).superRefine((o, ctx) => {
      const regex = new RegExp('^x_')
      const Schema = z.string()
      for (const [k, val] of Object.entries(o)) {
        if (!regex.test(k)) {
          continue
        }
        const result = Schema.safeParse(val)
        if (!result.success) {
          for (const issue of result.error.issues) {
            ctx.addIssue({ ...issue, path: [k, ...issue.path], message: 'x_ keys must be strings' })
          }
        }
      }
    }),
    payload: z.string({
      error: (issue) =>
        issue.input === undefined ? 'payload is required' : 'payload must be a string',
    }),
  })
  .openapi({ required: ['color', 'kind', 'tags', 'sized', 'namespaced', 'prefixed', 'payload'] })
  .openapi('Misc')

const ImplicationSchema = z
  .union(
    [
      z.any().refine(
        (val) =>
          !z
            .unknown()
            .superRefine((val, ctx) => {
              if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                if (!Object.hasOwn(val, 'hasLicense')) {
                  ctx.addIssue({ code: 'custom' })
                }
                if (Object.hasOwn(val, 'hasLicense')) {
                  const Schema = z.literal(true)
                  if (!Schema.safeParse(Reflect.get(val, 'hasLicense')).success) {
                    ctx.addIssue({ code: 'custom' })
                  }
                }
              }
            })
            .openapi({ required: ['hasLicense'] })
            .safeParse(val).success,
      ),
      z
        .unknown()
        .superRefine((val, ctx) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            if (!Object.hasOwn(val, 'licenseNumber')) {
              ctx.addIssue({ code: 'custom' })
            }
          }
        })
        .openapi({ required: ['licenseNumber'] }),
    ],
    { error: 'licenseNumber is required when hasLicense is true' },
  )
  .and(
    z.object({
      hasLicense: z.boolean().exactOptional(),
      licenseNumber: z.string().exactOptional(),
    }),
  )
  .openapi({ 'x-implication-message': 'licenseNumber is required when hasLicense is true' })
  .openapi('Implication')

const StrictAllOfSchema = (() => {
  const Schema = z
    .object({ id: z.string() })
    .openapi({ required: ['id'] })
    .and(z.object({ name: z.string() }).openapi({ required: ['name'] }))
  return z
    .unknown()
    .check((ctx) => {
      const result = Schema.safeParse(ctx.value)
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.issues.push({ ...issue, input: issue.input })
        }
      }
      ;((ctx) => {
        const o = ctx.value
        if (typeof o !== 'object' || o === null || Array.isArray(o)) return
        const e = new Set()
        for (const k of ['id']) {
          e.add(k)
        }
        for (const k of ['name']) {
          e.add(k)
        }
        for (const k of Object.keys(o)) {
          if (!e.has(k)) {
            ctx.issues.push({
              code: 'custom',
              path: [k],
              input: o,
              message: 'Unknown field — only id and name are allowed.',
            })
          }
        }
      })(ctx)
    })
    .pipe(Schema)
})().openapi('StrictAllOf')

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

export const postWriteOnlyRoute = createRoute({
  method: 'post',
  path: '/write-only',
  operationId: 'postWriteOnly',
  request: {
    body: { content: { 'application/json': { schema: WriteOnlySchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postContainsDefaultRoute = createRoute({
  method: 'post',
  path: '/contains-default',
  operationId: 'postContainsDefault',
  request: {
    body: { content: { 'application/json': { schema: ContainsDefaultSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postMiscRoute = createRoute({
  method: 'post',
  path: '/misc',
  operationId: 'postMisc',
  request: { body: { content: { 'application/json': { schema: MiscSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postStrictAllofRoute = createRoute({
  method: 'post',
  path: '/strict-allof',
  operationId: 'postStrictAllOf',
  request: {
    body: { content: { 'application/json': { schema: StrictAllOfSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postImplicationRoute = createRoute({
  method: 'post',
  path: '/implication',
  operationId: 'postImplication',
  request: {
    body: { content: { 'application/json': { schema: ImplicationSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})
