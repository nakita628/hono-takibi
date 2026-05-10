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
