import { z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

export type Hono = z.infer<typeof HonoSchema>
