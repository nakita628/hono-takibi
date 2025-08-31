import { z } from '@hono/zod-openapi'

import type { HonoX } from './honoX'

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

export type HonoX = z.infer<typeof HonoXSchema>
