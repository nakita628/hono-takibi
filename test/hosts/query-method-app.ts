// Host for cases/query-method: a GET and a QUERY (HTTP safe method with a body) on the same
// path, so the generated client outputs have to tell the two apart by name and by key.
import { Hono } from 'hono'
import { validator } from 'hono/validator'

type User = { id: string; name: string }

const seed: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Carol' },
]

const PAGE_SIZE = 2

export const requestLog: string[] = []

export const app = new Hono()
  .get('/users', (c) => {
    requestLog.push('GET /users')
    return c.json(seed)
  })
  .query(
    '/users',
    validator('json', (value, c): { ids: string[]; page?: number } | Response => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'ids' in value &&
        Array.isArray(value.ids) &&
        value.ids.every((id: unknown) => typeof id === 'string')
      ) {
        const page = 'page' in value && typeof value.page === 'number' ? value.page : undefined
        return page === undefined ? { ids: value.ids } : { ids: value.ids, page }
      }
      return c.json({ error: 'ids is required' }, 400)
    }),
    (c) => {
      const { ids, page } = c.req.valid('json')
      requestLog.push(`QUERY /users ${JSON.stringify({ ids, page })}`)
      const found = seed.filter((u) => ids.includes(u.id))
      const start = (page ?? 0) * PAGE_SIZE
      return c.json(found.slice(start, start + PAGE_SIZE))
    },
  )

export type AppType = typeof app
