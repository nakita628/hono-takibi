import { Hono } from 'hono'
import { validator } from 'hono/validator'

type User = { id: string; name: string }

const seed: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

const itemPages: readonly (readonly string[])[] = [['a', 'b'], ['c', 'd'], ['e']]

export const requestLog: string[] = []

export const abortLog: boolean[] = []

export const app = new Hono()
  .get('/users', (c) => {
    requestLog.push('GET /users')
    return c.json(seed)
  })
  .post(
    '/users',
    validator('json', (value, c) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        typeof value.name === 'string' &&
        value.name.length > 0
      ) {
        return { name: value.name }
      }
      return c.json({ error: 'name is required' }, 400)
    }),
    (c) => {
      requestLog.push('POST /users')
      const { name } = c.req.valid('json')
      return c.json({ id: '99', name }, 201)
    },
  )
  .get(
    '/users/:id',
    validator('header', (value): { 'x-trace'?: string } => {
      const trace = value['x-trace']
      return typeof trace === 'string' ? { 'x-trace': trace } : {}
    }),
    (c) => {
      const id = c.req.param('id')
      requestLog.push(`GET /users/${id}`)
      const user = seed.find((u) => u.id === id)
      return user ? c.json(user) : c.json({ error: 'Not Found' }, 404)
    },
  )
  .delete('/users/:id', (c) => {
    requestLog.push(`DELETE /users/${c.req.param('id')}`)
    return c.body(null, 204)
  })
  .get(
    '/items',
    validator('query', (value, c) => {
      const page = value.page
      if (typeof page !== 'string' || !/^\d+$/.test(page)) {
        return c.json({ error: 'page must be a non-negative integer' }, 400)
      }
      return { page }
    }),
    (c) => {
      const page = Number(c.req.valid('query').page)
      requestLog.push(`GET /items?page=${page}`)
      const items = itemPages[page] ?? []
      const nextPage = page + 1 < itemPages.length ? page + 1 : undefined
      return c.json({ items, nextPage })
    },
  )
  .get('/slow', async (c) => {
    requestLog.push('GET /slow')
    await new Promise((resolve) => setTimeout(resolve, 50))
    abortLog.push(c.req.raw.signal.aborted)
    return c.json({ ok: true })
  })

export type AppType = typeof app
