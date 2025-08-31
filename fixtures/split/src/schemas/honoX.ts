import { z } from '@hono/zod-openapi'

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

export type HonoX = z.infer<typeof HonoXSchema>
