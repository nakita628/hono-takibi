import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z
  .object({
    B: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    A: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { B: { type: 'string', format: 'uri' }, A: { type: 'string' } },
  })
  .openapi('A')

const CSchema = z
  .object({ B: z.url().optional().openapi({ type: 'string', format: 'uri' }), A: ASchema })
  .optional()
  .openapi({
    type: 'object',
    properties: { B: { type: 'string', format: 'uri' }, A: { $ref: '#/components/schemas/A' } },
  })
  .openapi('C')

const BSchema = z
  .object({ B: z.url().optional().openapi({ type: 'string', format: 'uri' }), C: CSchema })
  .optional()
  .openapi({
    type: 'object',
    properties: { B: { type: 'string', format: 'uri' }, C: { $ref: '#/components/schemas/C' } },
  })
  .openapi('B')

const BParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'B', in: 'query', required: false }, type: 'string' })

const CParamsSchema = z
  .string()
  .openapi({ param: { name: 'C', in: 'path', required: true }, type: 'string' })

const AParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'A', in: 'header', required: false }, type: 'string' })

const BSecurityScheme = { type: 'http', scheme: 'bearer' }

const CSecurityScheme = { type: 'http', scheme: 'bearer' }

const ASecurityScheme = { type: 'http', scheme: 'bearer' }

const BRequestBody = {
  required: true,
  content: {
    'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  },
}

const CRequestBody = {
  required: true,
  content: {
    'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  },
}

const ARequestBody = {
  required: true,
  content: {
    'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  },
}

const BResponse = {
  description: 'B',
  headers: z.object({
    B: z.string().optional().openapi({ type: 'string' }),
    C: z.string().optional().openapi({ type: 'string' }),
    A: z.string().optional().openapi({ type: 'string' }),
  }),
  links: { B: { $ref: '#/components/links/B' } },
  content: {
    'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  },
}

const CResponse = {
  description: 'C',
  headers: z.object({
    B: z.string().optional().openapi({ type: 'string' }),
    C: z.string().optional().openapi({ type: 'string' }),
    A: z.string().optional().openapi({ type: 'string' }),
  }),
  links: { C: { $ref: '#/components/links/C' } },
  content: {
    'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  },
}

const AResponse = {
  description: 'A',
  headers: z.object({
    B: z.string().optional().openapi({ type: 'string' }),
    C: z.string().optional().openapi({ type: 'string' }),
    A: z.string().optional().openapi({ type: 'string' }),
  }),
  links: { A: { $ref: '#/components/links/A' } },
  content: {
    'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  },
}

const BHeaderSchema = z.string().optional().openapi({ type: 'string' })

const CHeaderSchema = z.string().optional().openapi({ type: 'string' })

const AHeaderSchema = z.string().optional().openapi({ type: 'string' })

const BExample = {
  value: {
    B: 'https://example.com/B',
    C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  },
}

const CExample = {
  value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
}

const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

const BLink = { operationId: 'B' }

const CLink = { operationId: 'C' }

const ALink = { operationId: 'A' }

const BCallbacks = {
  '{$request.body#/B}': { post: { requestBody: BRequestBody, responses: { '200': BResponse } } },
}

const CCallbacks = {
  '{$request.body#/B}': { post: { requestBody: CRequestBody, responses: { '200': CResponse } } },
}

const ACallbacks = {
  '{$request.body#/B}': { post: { requestBody: ARequestBody, responses: { '200': AResponse } } },
}

export const postACRoute = createRoute({
  method: 'post',
  path: '/A/{C}',
  operationId: 'A',
  request: {
    body: ARequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema }),
    headers: z.object({ A: AParamsSchema }),
  },
  responses: { 200: AResponse },
  callbacks: { A: ACallbacks },
  security: [{ A: [] }],
})

export const postBCRoute = createRoute({
  method: 'post',
  path: '/B/{C}',
  operationId: 'B',
  request: {
    body: BRequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema }),
    headers: z.object({ A: AParamsSchema }),
  },
  responses: { 200: BResponse },
  callbacks: { B: BCallbacks },
  security: [{ B: [] }],
})

export const postCCRoute = createRoute({
  method: 'post',
  path: '/C/{C}',
  operationId: 'C',
  request: {
    body: CRequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema }),
    headers: z.object({ A: AParamsSchema }),
  },
  responses: { 200: CResponse },
  callbacks: { C: CCallbacks },
  security: [{ C: [] }],
})
