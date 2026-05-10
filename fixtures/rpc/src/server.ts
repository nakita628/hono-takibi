import { Hono } from 'hono'

/**
 * Test server for parseResponse behavior verification.
 *
 * @remarks
 * This server provides various endpoints to test different response scenarios:
 * - JSON responses (200, 201, etc.)
 * - Text responses
 * - Empty responses (204 No Content)
 * - Error responses (400, 404, 500)
 * - Redirect responses
 */
export const app = new Hono()
  .get('/json', (c) => {
    return c.json({ message: 'Hello, World!', timestamp: Date.now() })
  })
  .get('/json-array', (c) => {
    return c.json([{ id: 1 }, { id: 2 }, { id: 3 }])
  })
  .get('/text', (c) => {
    return c.text('Plain text response')
  })
  .get('/empty', (c) => {
    return c.body(null, 204)
  })
  .get('/error-400', (c) => {
    return c.json({ error: 'Bad Request', code: 'INVALID_INPUT' }, 400)
  })
  .get('/error-404', (c) => {
    return c.json({ error: 'Not Found', code: 'RESOURCE_NOT_FOUND' }, 404)
  })
  .get('/error-500', (c) => {
    return c.json({ error: 'Internal Server Error', code: 'SERVER_ERROR' }, 500)
  })
  .get('/error-401', (c) => {
    return c.json({ error: 'Unauthorized' }, 401)
  })
  .get('/error-403', (c) => {
    return c.json({ error: 'Forbidden' }, 403)
  })
  .get('/error-422', (c) => {
    return c.json({ error: 'Unprocessable Entity', fields: ['name'] }, 422)
  })
  .get('/error-text', (c) => {
    c.header('Content-Type', 'text/plain')
    return c.body('plain error body', 500)
  })
  .get('/error-empty', (c) => {
    return c.body(null, 500)
  })
  .get('/error-no-content-type', () => {
    return new Response('no content-type', { status: 500 })
  })
  .get('/error-vendor-json', (c) => {
    c.header('Content-Type', 'application/vnd.api+json')
    return c.body(JSON.stringify({ error: 'vendor json error' }), 400)
  })
  .post('/create', async (c) => {
    const body = await c.req.json<{ name: string }>()
    return c.json({ id: 1, name: body.name, created: true }, 201)
  })
  .put('/update/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json<{ name: string }>()
    return c.json({ id: Number(id), name: body.name, updated: true })
  })
  .delete('/delete/:id', (c) => {
    return c.body(null, 204)
  })
  .get('/headers', (c) => {
    c.header('X-Custom-Header', 'custom-value')
    c.header('X-Request-Id', 'req-123')
    return c.json({ hasHeaders: true })
  })
  .get('/nested', (c) => {
    return c.json({
      user: {
        id: 1,
        name: 'John',
        profile: {
          email: 'john@example.com',
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
      },
    })
  })

export type AppType = typeof app
