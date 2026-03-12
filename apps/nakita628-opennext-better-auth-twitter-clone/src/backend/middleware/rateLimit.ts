import type { Context } from 'hono'
import { rateLimiter } from 'hono-rate-limiter'

const keyGenerator = (c: Context) =>
  c.req.header('cf-connecting-ip') ??
  c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ??
  'unknown'

export function rateLimit(opts: { windowMs: number; max: number }) {
  return rateLimiter({
    windowMs: opts.windowMs,
    limit: opts.max,
    keyGenerator,
  })
}
