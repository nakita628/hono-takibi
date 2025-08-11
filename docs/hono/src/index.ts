import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

app.get('/*', serveStatic({ root: './public' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  port: 3000,
  fetch: app.fetch,
})

export default app
