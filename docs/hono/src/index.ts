import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

app.get('*', serveStatic({ root: './public' }))

export default app
