import type { MiddlewareHandler } from 'hono'

type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }
}

export function rateLimit(opts: { windowMs: number; max: number }): MiddlewareHandler {
  return async (c, next) => {
    cleanup()

    const ip =
      c.req.header('cf-connecting-ip') ??
      c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ??
      'unknown'
    const path = c.req.path
    const key = `${ip}:${path}`
    const now = Date.now()

    const entry = store.get(key)

    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + opts.windowMs })
      return next()
    }

    if (entry.count < opts.max) {
      entry.count++
      return next()
    }

    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return c.json({ message: 'Too many requests, please try again later' }, 429, {
      'Retry-After': String(retryAfter),
    })
  }
}
