import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

app.get('/*', serveStatic({ root: './docs' }))

export default app
