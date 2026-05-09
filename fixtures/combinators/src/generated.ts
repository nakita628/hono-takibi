import { createRoute, z } from '@hono/zod-openapi'

const OneOfBodySchema = z
  .object({ value: z.xor([z.string(), z.int()]) })
  .openapi({ required: ['value'] })
  .openapi('OneOfBody')

const AnyOfBodySchema = z
  .object({ value: z.union([z.string(), z.int()]) })
  .openapi({ required: ['value'] })
  .openapi('AnyOfBody')

const AllOfBodySchema = z
  .object({ name: z.string().min(3) })
  .openapi({ required: ['name'] })
  .and(z.object({ age: z.int().min(0) }).openapi({ required: ['age'] }))
  .openapi('AllOfBody')

const NotBodySchema = z
  .object({ forbidden: z.any().refine((v) => typeof v !== 'string') })
  .openapi({ required: ['forbidden'] })
  .openapi('NotBody')

const OneOfWithMessageSchema = z
  .object({
    value: z.xor([z.string(), z.int()], {
      error: 'value must match exactly one of: string | integer',
    }),
  })
  .openapi({ required: ['value'] })
  .openapi('OneOfWithMessage')

const AnyOfWithMessageSchema = z
  .object({ value: z.union([z.string(), z.int()], { error: 'value must be a string or integer' }) })
  .openapi({ required: ['value'] })
  .openapi('AnyOfWithMessage')

const AllOfWithMessageSchema = (() => {
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
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'too_big') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'too_small') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'invalid_format') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'not_multiple_of') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'unrecognized_keys') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'invalid_union') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'invalid_key') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'invalid_element') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'invalid_value') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          } else if (issue.code === 'custom') {
            ctx.issues.push({ ...issue, input: issue.input, message: 'allOf composition failed' })
          }
        }
      }
    })
    .pipe(Schema)
})()
  .openapi({ 'x-allOf-message': 'allOf composition failed' })
  .openapi('AllOfWithMessage')

const NotWithMessageSchema = z
  .object({
    forbidden: z
      .any()
      .refine((v) => typeof v !== 'string', { error: 'forbidden must not be a string' }),
  })
  .openapi({ required: ['forbidden'] })
  .openapi('NotWithMessage')

const OneOfOverlapSchema = z
  .object({
    payload: z
      .discriminatedUnion('kind', [
        z
          .object({ kind: z.literal('dog'), dog: z.string() })
          .openapi({ required: ['kind', 'dog'] }),
        z
          .object({ kind: z.literal('cat'), cat: z.string() })
          .openapi({ required: ['kind', 'cat'] }),
      ])
      .openapi({ discriminator: { propertyName: 'kind' } }),
  })
  .openapi({ required: ['payload'] })
  .openapi('OneOfOverlap')

const AnyOfOverlapSchema = z
  .object({
    payload: z.union([
      z.object({ a: z.int().exactOptional() }),
      z.object({ b: z.int().exactOptional() }),
    ]),
  })
  .openapi({ required: ['payload'] })
  .openapi('AnyOfOverlap')

const AllOfChainSchema = z
  .object({ a: z.string() })
  .openapi({ required: ['a'] })
  .and(z.object({ b: z.int() }).openapi({ required: ['b'] }))
  .and(z.object({ c: z.boolean() }).openapi({ required: ['c'] }))
  .openapi('AllOfChain')

const NotConstSchema = z
  .object({ value: z.any().refine((v) => v !== 'forbidden-value') })
  .openapi({ required: ['value'] })
  .openapi('NotConst')

const AllOfArrowMessageSchema = (() => {
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
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'too_big') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'too_small') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'invalid_format') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'not_multiple_of') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'unrecognized_keys') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'invalid_union') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'invalid_key') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'invalid_element') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'invalid_value') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          } else if (issue.code === 'custom') {
            ctx.issues.push({
              ...issue,
              input: issue.input,
              message: ((issue) => 'allOf failed at /' + issue.path.join('/'))(issue),
            })
          }
        }
      }
    })
    .pipe(Schema)
})()
  .openapi({ 'x-allOf-message': '(issue) => "allOf failed at /" + issue.path.join("/")' })
  .openapi('AllOfArrowMessage')

const OneOfArrowMessageSchema = z
  .object({
    value: z.xor([z.string(), z.int()], {
      error: (iss) => `value type incompatible (got ${typeof iss.input})`,
    }),
  })
  .openapi({ required: ['value'] })
  .openapi('OneOfArrowMessage')

const NotArrowMessageSchema = z
  .object({
    forbidden: z
      .any()
      .refine((v) => typeof v !== 'string', {
        error: (iss) => `forbidden cannot be string, got ${JSON.stringify(iss.input)}`,
      }),
  })
  .openapi({ required: ['forbidden'] })
  .openapi('NotArrowMessage')

export const postOneOfRoute = createRoute({
  method: 'post',
  path: '/one-of',
  operationId: 'postOneOf',
  request: {
    body: { content: { 'application/json': { schema: OneOfBodySchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAnyOfRoute = createRoute({
  method: 'post',
  path: '/any-of',
  operationId: 'postAnyOf',
  request: {
    body: { content: { 'application/json': { schema: AnyOfBodySchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAllOfRoute = createRoute({
  method: 'post',
  path: '/all-of',
  operationId: 'postAllOf',
  request: {
    body: { content: { 'application/json': { schema: AllOfBodySchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postNotRoute = createRoute({
  method: 'post',
  path: '/not',
  operationId: 'postNot',
  request: { body: { content: { 'application/json': { schema: NotBodySchema } }, required: true } },
  responses: { 200: { description: 'OK' } },
})

export const postOneOfMsgRoute = createRoute({
  method: 'post',
  path: '/one-of-msg',
  operationId: 'postOneOfMsg',
  request: {
    body: { content: { 'application/json': { schema: OneOfWithMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAnyOfMsgRoute = createRoute({
  method: 'post',
  path: '/any-of-msg',
  operationId: 'postAnyOfMsg',
  request: {
    body: { content: { 'application/json': { schema: AnyOfWithMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAllOfMsgRoute = createRoute({
  method: 'post',
  path: '/all-of-msg',
  operationId: 'postAllOfMsg',
  request: {
    body: { content: { 'application/json': { schema: AllOfWithMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postNotMsgRoute = createRoute({
  method: 'post',
  path: '/not-msg',
  operationId: 'postNotMsg',
  request: {
    body: { content: { 'application/json': { schema: NotWithMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postOneOfOverlapRoute = createRoute({
  method: 'post',
  path: '/one-of-overlap',
  operationId: 'postOneOfOverlap',
  request: {
    body: { content: { 'application/json': { schema: OneOfOverlapSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAnyOfOverlapRoute = createRoute({
  method: 'post',
  path: '/any-of-overlap',
  operationId: 'postAnyOfOverlap',
  request: {
    body: { content: { 'application/json': { schema: AnyOfOverlapSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAllOfChainRoute = createRoute({
  method: 'post',
  path: '/all-of-chain',
  operationId: 'postAllOfChain',
  request: {
    body: { content: { 'application/json': { schema: AllOfChainSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postNotConstRoute = createRoute({
  method: 'post',
  path: '/not-const',
  operationId: 'postNotConst',
  request: {
    body: { content: { 'application/json': { schema: NotConstSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postAllOfArrowRoute = createRoute({
  method: 'post',
  path: '/all-of-arrow',
  operationId: 'postAllOfArrow',
  request: {
    body: { content: { 'application/json': { schema: AllOfArrowMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postOneOfArrowRoute = createRoute({
  method: 'post',
  path: '/one-of-arrow',
  operationId: 'postOneOfArrow',
  request: {
    body: { content: { 'application/json': { schema: OneOfArrowMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})

export const postNotArrowRoute = createRoute({
  method: 'post',
  path: '/not-arrow',
  operationId: 'postNotArrow',
  request: {
    body: { content: { 'application/json': { schema: NotArrowMessageSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
})
