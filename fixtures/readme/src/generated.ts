import { createRoute, z } from '@hono/zod-openapi'

const MessagesSchema = z
  .object({
    name: z
      .string({ error: 'Name must be a string' })
      .min(1, { error: 'Name cannot be empty' })
      .max(50, { error: 'Name must be at most 50 characters' }),
  })
  .openapi({ required: ['name'] })
  .openapi('Messages')

const TransformsSchema = z
  .object({
    email: z.string().trim().pipe(z.email()),
    slug: z
      .string()
      .toLowerCase()
      .regex(/^[a-z0-9-]+$/),
    country: z.string().toUpperCase(),
    text: z.string().normalize('NFC'),
  })
  .openapi({ required: ['email', 'slug', 'country', 'text'] })
  .openapi('Transforms')

const CoerceSchema = z
  .object({
    asNumber: z.coerce.number(),
    asInt: z.coerce.number().int().min(0),
    asBool: z.coerce.boolean(),
    asDate: z.coerce.date(),
  })
  .openapi({ required: ['asNumber', 'asInt', 'asBool', 'asDate'] })
  .openapi('Coerce')

const CodecSchema = z
  .object({
    updatedAt: z.codec(z.iso.datetime(), z.date(), {
      decode: (isoString) => new Date(isoString),
      encode: (date) => date.toISOString(),
    }),
  })
  .openapi({ required: ['updatedAt'] })
  .openapi('Codec')

const CustomValidationSchema = z
  .object({
    password: z
      .string()
      .refine((v) => v.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((v) => /[A-Z]/.test(v), { message: 'Password must contain an uppercase letter' }),
    normalizedEmail: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email())
      .superRefine((v, ctx) => {
        if (v.endsWith('@blocked.example')) {
          ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
        }
      }),
  })
  .openapi({ required: ['password', 'normalizedEmail'] })
  .openapi('CustomValidation')

const DefaultsSchema = z
  .object({
    greeting: z.string().prefault('hello'),
    retries: z.int().catch(0),
    config: z.object({ name: z.string().exactOptional() }).readonly(),
  })
  .openapi({ required: ['greeting', 'retries', 'config'] })
  .openapi('Defaults')

const ContentChecksSchema = z
  .object({
    url: z.string().startsWith('https://').endsWith('.com'),
    path: z.string().includes('/api/'),
  })
  .openapi({ required: ['url', 'path'] })
  .openapi('ContentChecks')

const FormatsSchema = z
  .object({
    htmlEmail: z.email({ pattern: z.regexes.html5Email }),
    customEmail: z.email({ pattern: /^.+@example\.com$/ }),
    uuidV7: z.uuid({ version: 'v7' }),
    httpsUrl: z.url({ protocol: /^https$/, normalize: true }),
    preciseDatetime: z.iso.datetime({ precision: 3, offset: true }),
    localDatetime: z.iso.datetime({ local: true }),
    mac: z.mac({ delimiter: ':' }),
    token: z.jwt({ alg: 'HS256' }),
    sha256: z.hash('sha256', { enc: 'hex' }),
  })
  .openapi({
    required: [
      'htmlEmail',
      'customEmail',
      'uuidV7',
      'httpsUrl',
      'preciseDatetime',
      'localDatetime',
      'mac',
      'token',
      'sha256',
    ],
  })
  .openapi('Formats')

const CatSchema = z
  .object({ name: z.string() })
  .brand<'Cat'>()
  .openapi({ required: ['name'] })
  .openapi('Cat')

const NumericSchema = z
  .object({
    age: z.int().min(0, { error: 'age must be >= 0' }).max(120, { error: 'age must be <= 120' }),
    ratio: z.number().gt(0, { error: 'ratio must be > 0' }).lt(1, { error: 'ratio must be < 1' }),
    price: z.number().multipleOf(0.5, { error: 'price must be a multiple of 0.5' }),
    quantity: z.int({
      error: (issue) =>
        issue.input === undefined ? 'quantity is required' : 'quantity must be an integer',
    }),
    exact: z.literal(42, { error: 'exact must be 42' }),
  })
  .openapi({ required: ['age', 'ratio', 'price', 'quantity', 'exact'] })
  .openapi('Numeric')

const ArrayEdgeSchema = z
  .object({
    tags: z
      .array(z.string())
      .min(1, { error: 'tags must have at least 1 item' })
      .max(5, { error: 'tags must have at most 5 items' }),
    unique: z
      .array(z.int())
      .refine((items) => new Set(items).size === items.length, {
        error: 'unique must contain distinct integers',
      }),
    basket: z
      .array(z.object({ tier: z.string() }).openapi({ required: ['tier'] }))
      .refine(
        (arr) => {
          const Schema = z.object({ tier: z.literal('premium') }).openapi({ required: ['tier'] })
          return arr.filter((i) => Schema.safeParse(i).success).length >= 1
        },
        { error: 'basket must contain at least 1 premium' },
      )
      .refine(
        (arr) => {
          const Schema = z.object({ tier: z.literal('premium') }).openapi({ required: ['tier'] })
          return arr.filter((i) => Schema.safeParse(i).success).length <= 3
        },
        { error: 'basket must contain at most 3 premium' },
      ),
  })
  .openapi({ required: ['tags', 'unique', 'basket'] })
  .openapi('ArrayEdge')

const ObjectEdgeSchema = z
  .object({
    profile: z
      .strictObject(
        {
          a: z.string().exactOptional(),
          b: z.string().exactOptional(),
          c: z.string().exactOptional(),
        },
        {
          error: (issue) =>
            issue.code === 'unrecognized_keys' ? 'profile contains an unknown key' : undefined,
        },
      )
      .refine((o) => Object.keys(o).length >= 1, { error: 'profile must have at least 1 property' })
      .refine((o) => Object.keys(o).length <= 3, {
        error: 'profile must have at most 3 properties',
      }),
    namespace: z
      .looseObject({})
      .refine((o) => Object.keys(o).every((k) => new RegExp('^[a-z][a-z0-9_]*$').test(k)), {
        error: 'keys must start lowercase letter + [a-z0-9_]',
      })
      .refine(
        (o) =>
          Object.entries(o).every(
            ([k, v]) => !new RegExp('^x_').test(k) || z.string().safeParse(v).success,
          ),
        { error: 'x_ keys must be strings' },
      ),
    dependent: z
      .object({ cc: z.string().exactOptional(), billing: z.string().exactOptional() })
      .refine((o) => !('cc' in o) || 'billing' in o, { error: 'billing required when cc provided' })
      .refine(
        (o) =>
          !('cc' in o) ||
          z
            .unknown()
            .superRefine((v, ctx) => {
              if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                if (Object.hasOwn(v, 'cc')) {
                  const Schema = z.string().regex(/^[0-9]{16}$/)
                  if (!Schema.safeParse(Reflect.get(v, 'cc')).success)
                    ctx.addIssue({ code: 'custom', message: 'invalid property' })
                }
              }
            })
            .safeParse(o).success,
        { error: 'cc must be 16 digits' },
      ),
  })
  .openapi({ required: ['profile', 'namespace', 'dependent'] })
  .openapi('ObjectEdge')

const CombinatorsSchema = z
  .object({
    merged: (() => {
      const Schema = z
        .object({ name: z.string() })
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
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }
            }
          }
        })
        .pipe(Schema)
    })().openapi({ 'x-allOf-message': 'merged validation failed' }),
    picked: z.union([z.string(), z.int()], { error: 'picked must be string or integer' }),
    exclusive: z.xor([z.string(), z.int()], { error: 'exclusive must match exactly one type' }),
    banned: z.any().refine((v) => v !== 'forbidden', { error: 'banned cannot be "forbidden"' }),
  })
  .openapi({ required: ['merged', 'picked', 'exclusive', 'banned'] })
  .openapi('Combinators')

const EnumsSchema = z
  .object({
    role: z.enum(['admin', 'editor', 'viewer'], { error: 'role must be admin / editor / viewer' }),
    priority: z.union([z.literal(1), z.literal(2), z.literal(3)], {
      error: 'priority must be 1, 2, or 3',
    }),
    accepted: z.literal(true, { error: 'accepted must be true' }),
  })
  .openapi({ required: ['role', 'priority', 'accepted'] })
  .openapi('Enums')

export const postMessagesRoute = createRoute({
  method: 'post',
  path: '/messages',
  operationId: 'postMessages',
  request: {
    body: { content: { 'application/json': { schema: MessagesSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postTransformsRoute = createRoute({
  method: 'post',
  path: '/transforms',
  operationId: 'postTransforms',
  request: {
    body: { content: { 'application/json': { schema: TransformsSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postCoerceRoute = createRoute({
  method: 'post',
  path: '/coerce',
  operationId: 'postCoerce',
  request: { body: { content: { 'application/json': { schema: CoerceSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postCodecRoute = createRoute({
  method: 'post',
  path: '/codec',
  operationId: 'postCodec',
  request: { body: { content: { 'application/json': { schema: CodecSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postCustomValidationRoute = createRoute({
  method: 'post',
  path: '/custom-validation',
  operationId: 'postCustomValidation',
  request: {
    body: { content: { 'application/json': { schema: CustomValidationSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postDefaultsRoute = createRoute({
  method: 'post',
  path: '/defaults',
  operationId: 'postDefaults',
  request: {
    body: { content: { 'application/json': { schema: DefaultsSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postContentChecksRoute = createRoute({
  method: 'post',
  path: '/content-checks',
  operationId: 'postContentChecks',
  request: {
    body: { content: { 'application/json': { schema: ContentChecksSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postFormatsRoute = createRoute({
  method: 'post',
  path: '/formats',
  operationId: 'postFormats',
  request: { body: { content: { 'application/json': { schema: FormatsSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postBrandedRoute = createRoute({
  method: 'post',
  path: '/branded',
  operationId: 'postBranded',
  request: { body: { content: { 'application/json': { schema: CatSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postNumericRoute = createRoute({
  method: 'post',
  path: '/numeric',
  operationId: 'postNumeric',
  request: { body: { content: { 'application/json': { schema: NumericSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postArrayEdgeRoute = createRoute({
  method: 'post',
  path: '/array-edge',
  operationId: 'postArrayEdge',
  request: {
    body: { content: { 'application/json': { schema: ArrayEdgeSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postObjectEdgeRoute = createRoute({
  method: 'post',
  path: '/object-edge',
  operationId: 'postObjectEdge',
  request: {
    body: { content: { 'application/json': { schema: ObjectEdgeSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postCombinatorsRoute = createRoute({
  method: 'post',
  path: '/combinators',
  operationId: 'postCombinators',
  request: {
    body: { content: { 'application/json': { schema: CombinatorsSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postEnumsRoute = createRoute({
  method: 'post',
  path: '/enums',
  operationId: 'postEnums',
  request: { body: { content: { 'application/json': { schema: EnumsSchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})
