import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

const BSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

const CSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

const ASchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

const BSecurityScheme = { type: 'http', scheme: 'bearer' }

const CSecurityScheme = { type: 'http', scheme: 'bearer' }

const ASecurityScheme = { type: 'http', scheme: 'bearer' }

const ARequestBody = {
  required: true,
  content: { 'application/json': { schema: ASchema, examples: { A: AExample } } },
}

const BRequestBody = {
  required: true,
  content: { 'application/json': { schema: BSchema, examples: { B: BExample } } },
}

const CRequestBody = {
  required: true,
  content: { 'application/json': { schema: CSchema, examples: { C: CExample } } },
}

const BResponse = {
  description: 'B',
  headers: z.object({
    B: BHeaderSchema.optional(),
    C: CHeaderSchema.optional(),
    A: AHeaderSchema.optional(),
  }),
  links: { B: BLink },
  content: { 'application/json': { schema: BSchema, examples: { B: BExample } } },
}

const CResponse = {
  description: 'C',
  headers: z.object({
    B: BHeaderSchema.optional(),
    C: CHeaderSchema.optional(),
    A: AHeaderSchema.optional(),
  }),
  links: { C: CLink },
  content: { 'application/json': { schema: CSchema, examples: { C: CExample } } },
}

const AResponse = {
  description: 'A',
  headers: z.object({
    B: BHeaderSchema.optional(),
    C: CHeaderSchema.optional(),
    A: AHeaderSchema.optional(),
  }),
  links: { A: ALink },
  content: { 'application/json': { schema: ASchema, examples: { A: AExample } } },
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
    params: z.object({ C: CSchema }),
    query: z.object({ B: BSchema.optional() }),
    headers: z.object({ A: ASchema.optional() }),
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
    params: z.object({ C: CSchema }),
    query: z.object({ B: BSchema.optional() }),
    headers: z.object({ A: ASchema.optional() }),
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
    params: z.object({ C: CSchema }),
    query: z.object({ B: BSchema.optional() }),
    headers: z.object({ A: ASchema.optional() }),
  },
  responses: { 200: CResponse },
})
