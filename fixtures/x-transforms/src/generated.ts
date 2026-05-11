import { createRoute, z } from '@hono/zod-openapi'

const StringFormSchema = z
  .object({
    trimmed: z.string().trim(),
    lowered: z.string().toLowerCase(),
    uppered: z.string().toUpperCase(),
    normalized: z.string().normalize('NFC'),
    emailNormalized: z.string().trim().toLowerCase().pipe(z.email()),
    allChained: z.string().trim().toLowerCase().normalize('NFC'),
  })
  .openapi({
    required: ['trimmed', 'lowered', 'uppered', 'normalized', 'emailNormalized', 'allChained'],
  })
  .openapi('StringForm')

const CoerceFormSchema = z
  .object({
    asString: z.coerce.string(),
    asDate: z.coerce.date(),
    asNumber: z.coerce.number(),
    asInt: z.coerce.number().int().min(0),
    asBool: z.coerce.boolean(),
  })
  .openapi({ required: ['asString', 'asDate', 'asNumber', 'asInt', 'asBool'] })
  .openapi('CoerceForm')

const FormatOptionsSchema = z
  .object({
    emailHtml5: z.email({ pattern: z.regexes.html5Email }),
    uuidV8: z.uuid({ version: 'v8' }),
    httpsUrl: z.url({ protocol: /^https$/, normalize: true }),
    preciseDatetime: z.iso.datetime({ precision: 3, offset: true }),
    localDatetime: z.iso.datetime({ local: true }),
    colonMac: z.mac({ delimiter: ':' }),
    hs256Jwt: z.jwt({ alg: 'HS256' }),
    sha256Hash: z.hash('sha256', { enc: 'hex' }),
    phone: z.e164(),
    customEmail: z.email({ pattern: /^.+@example\.com$/ }),
    guidLike: z.guid(),
    httpOnlyUrl: z.httpUrl(),
    host: z.hostname(),
    dotMac: z.mac({ delimiter: '.' }),
  })
  .openapi({
    required: [
      'emailHtml5',
      'uuidV8',
      'httpsUrl',
      'preciseDatetime',
      'localDatetime',
      'colonMac',
      'hs256Jwt',
      'sha256Hash',
      'phone',
      'customEmail',
      'guidLike',
      'httpOnlyUrl',
      'host',
      'dotMac',
    ],
  })
  .openapi('FormatOptions')

const P2FormSchema = z
  .object({
    includesSlug: z.string().includes('/api/'),
    startsWithHttps: z.string().startsWith('https://'),
    endsWithTest: z.string().endsWith('.test'),
    withCatch: z.int().catch(0),
    withPrefault: z.string().prefault('default-value'),
  })
  .openapi({
    required: ['includesSlug', 'startsWithHttps', 'endsWithTest', 'withCatch', 'withPrefault'],
  })
  .openapi('P2Form')

const CustomFormSchema = z
  .object({
    password: z
      .string()
      .refine((v) => v.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((v) => /[A-Z]/.test(v), { message: 'Password must contain an uppercase letter' }),
    confirmPassword: z.string(),
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
    updatedAt: z.codec(z.iso.datetime(), z.date(), {
      decode: (isoString) => new Date(isoString),
      encode: (date) => date.toISOString(),
    }),
  })
  .openapi({ required: ['password', 'confirmPassword', 'normalizedEmail', 'updatedAt'] })
  .openapi('CustomForm')

const V25FormSchema = z
  .strictObject(
    {
      name: z.string({
        error: (issue) =>
          issue.input === undefined ? '名前は必須です' : '名前は文字列である必要があります',
      }),
      tags: z.array(z.string()).refine((arr) => {
        const Schema = z.literal('important')
        const matches = arr.filter((i) => Schema.safeParse(i).success).length
        return matches >= 1 && matches <= 3
      }),
      status: z.literal('active', { error: 'ステータスは active のみ' }),
    },
    {
      error: (issue) =>
        issue.code === 'unrecognized_keys' ? '未知のフィールドは許可されません' : undefined,
    },
  )
  .openapi({ required: ['name', 'tags', 'status'] })
  .openapi('V25Form')

const V26FormSchema = z
  .object({
    kind: z.enum(['premium', 'basic']),
    feature: z.string().exactOptional(),
    settings: z
      .base64()
      .transform((b64) =>
        JSON.parse(
          typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf8'),
        ),
      )
      .pipe(z.object({ theme: z.enum(['light', 'dark']) }).openapi({ required: ['theme'] })),
  })
  .refine((o) =>
    z
      .object({ kind: z.literal('premium') })
      .openapi({ required: ['kind'] })
      .safeParse(o).success
      ? z
          .object({ feature: z.string() })
          .openapi({ required: ['feature'] })
          .safeParse(o).success
      : z.object({}).openapi({ required: [] }).safeParse(o).success,
  )
  .openapi({ required: ['kind', 'settings'] })
  .openapi('V26Form')

export const postStringsRoute = createRoute({
  method: 'post',
  path: '/strings',
  operationId: 'postStrings',
  request: {
    body: { content: { 'application/json': { schema: StringFormSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: StringFormSchema } } },
  },
})

export const postCoerceRoute = createRoute({
  method: 'post',
  path: '/coerce',
  operationId: 'postCoerce',
  request: {
    body: { content: { 'application/json': { schema: CoerceFormSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CoerceFormSchema } } },
  },
})

export const postFormatsRoute = createRoute({
  method: 'post',
  path: '/formats',
  operationId: 'postFormats',
  request: {
    body: { content: { 'application/json': { schema: FormatOptionsSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: FormatOptionsSchema } } },
  },
})

export const postP2Route = createRoute({
  method: 'post',
  path: '/p2',
  operationId: 'postP2',
  request: { body: { content: { 'application/json': { schema: P2FormSchema } }, required: true } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: P2FormSchema } } },
  },
})

export const postCustomRoute = createRoute({
  method: 'post',
  path: '/custom',
  operationId: 'postCustom',
  request: {
    body: { content: { 'application/json': { schema: CustomFormSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CustomFormSchema } } },
  },
})

export const postV25Route = createRoute({
  method: 'post',
  path: '/v25',
  operationId: 'postV25',
  request: { body: { content: { 'application/json': { schema: V25FormSchema } }, required: true } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: V25FormSchema } } },
  },
})

export const postV26Route = createRoute({
  method: 'post',
  path: '/v26',
  operationId: 'postV26',
  request: { body: { content: { 'application/json': { schema: V26FormSchema } }, required: true } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: V26FormSchema } } },
  },
})
