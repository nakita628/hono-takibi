import { Hono } from 'hono'

type User = { id: string; name: string }

const seed: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

export const app = new Hono()
  .get('/users', (c) => c.json(seed satisfies User[]))
  .get('/users/:id', (c) => {
    const id = c.req.param('id')
    const user = seed.find((u) => u.id === id)
    if (!user) return c.json({ error: 'Not Found' }, 404)
    return c.json(user)
  })
  .get('/error-text', (c) => {
    c.header('Content-Type', 'text/plain')
    return c.body('plain text 500', 500)
  })
  .post('/users', async (c) => {
    const body = await c.req.json<{ name?: unknown }>()
    if (typeof body.name !== 'string' || body.name.length === 0) {
      return c.json({ error: 'name is required' }, 400)
    }
    const created: User = { id: '99', name: body.name }
    return c.json(created, 201)
  })

export type AppType = typeof app
