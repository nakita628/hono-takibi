import { z } from '@hono/zod-openapi'

import type { ZodOpenAPIHono } from './zodOpenAPIHono'

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>
