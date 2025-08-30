import { createRoute, z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

export type Hono = z.infer<typeof HonoSchema>

export const HonoXSchema = z.object({ honox: z.literal('HonoX') }).openapi('HonoX')

export type HonoX = z.infer<typeof HonoXSchema>

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_read',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  tags: ['HonoX'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_read',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['ZodOpenAPIHono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'ZodOpenAPIHonoService_read',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
