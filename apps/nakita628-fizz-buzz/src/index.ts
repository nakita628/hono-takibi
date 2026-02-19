import { OpenAPIHono } from '@hono/zod-openapi'
import { fizzBuzzHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', fizzBuzzHandler)

export default app
