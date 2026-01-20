import { createRoute, z } from '@hono/zod-openapi'

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: { 200: { description: 'OK' } },
} as const)
