import { z } from '@hono/zod-openapi'

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>
