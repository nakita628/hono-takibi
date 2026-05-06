import { OpenAPIHono } from '@hono/zod-openapi'
import { healthHandler, usersHandler } from '@/handlers'

const app = new OpenAPIHono().basePath('/api')

export default app
