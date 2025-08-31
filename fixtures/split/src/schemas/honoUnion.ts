import { z } from '@hono/zod-openapi'

import type { HonoUnion } from './honoUnion'

export const HonoUnionSchema = z
  .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
  .openapi('HonoUnion')

export type HonoUnion = z.infer<typeof HonoUnionSchema>
