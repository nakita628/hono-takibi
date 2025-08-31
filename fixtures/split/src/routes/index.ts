import { createRoute, z } from '@hono/zod-openapi'

const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

const HonoUnionSchema = z
  .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
  .openapi('HonoUnion')

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
