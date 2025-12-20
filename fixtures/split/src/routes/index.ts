import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

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
    B: z.string().optional(),
    C: z.string().optional(),
    A: z.string().optional(),
  }),
  links: { B: { $ref: '#/components/links/B' } },
  content: {
    'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  },
}

const CResponse = {
  description: 'C',
  headers: z.object({
    B: z.string().optional(),
    C: z.string().optional(),
    A: z.string().optional(),
  }),
  links: { C: { $ref: '#/components/links/C' } },
  content: {
    'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  },
}

const AResponse = {
  description: 'A',
  headers: z.object({
    B: z.string().optional(),
    C: z.string().optional(),
    A: z.string().optional(),
  }),
  links: { A: { $ref: '#/components/links/A' } },
  content: {
    'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  },
}

const BHeaderSchema = z.string()

const CHeaderSchema = z.string()

const AHeaderSchema = z.string()

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

const BCallback = {
  '{$request.body#/B}': {
    post: {
      requestBody: { $ref: '#/components/requestBodies/B' },
      responses: { '200': { $ref: '#/components/responses/B' } },
    },
  },
}

const CCallback = {
  '{$request.body#/B}': {
    post: {
      requestBody: { $ref: '#/components/requestBodies/C' },
      responses: { '200': { $ref: '#/components/responses/C' } },
    },
  },
}

const ACallback = {
  '{$request.body#/B}': {
    post: {
      requestBody: { $ref: '#/components/requestBodies/A' },
      responses: { '200': { $ref: '#/components/responses/A' } },
    },
  },
}

export const postACRoute = createRoute({
  method: 'post',
  path: '/A/{C}',
  operationId: 'A',
  security: [{ A: [] }],
  callbacks: { A: ACallback },
  request: {
    body: ARequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema.optional() }),
    headers: z.object({ A: AParamsSchema.optional() }),
  },
  responses: { 200: AResponse },
})

export const postBCRoute = createRoute({
  method: 'post',
  path: '/B/{C}',
  operationId: 'B',
  security: [{ B: [] }],
  callbacks: { B: BCallback },
  request: {
    body: BRequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema.optional() }),
    headers: z.object({ A: AParamsSchema.optional() }),
  },
  responses: { 200: BResponse },
})

export const postCCRoute = createRoute({
  method: 'post',
  path: '/C/{C}',
  operationId: 'C',
  security: [{ C: [] }],
  callbacks: { C: CCallback },
  request: {
    body: CRequestBody,
    params: z.object({ C: CParamsSchema }),
    query: z.object({ B: BParamsSchema.optional() }),
    headers: z.object({ A: AParamsSchema.optional() }),
  },
  responses: { 200: CResponse },
})
