import { z } from '@hono/zod-openapi'
import { HonoSchema } from './hono'
import { HonoXSchema } from './honoX'
import { ZodOpenAPIHonoSchema } from './zodOpenAPIHono'

export const HonoUnionSchema = z
  .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
  .openapi('HonoUnion')

export type HonoUnion = z.infer<typeof HonoUnionSchema>
