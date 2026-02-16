import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono().basePath('/api')

export default app
