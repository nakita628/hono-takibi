import { OpenAPIHono } from '@hono/zod-openapi'
import {
  getHealthRoute,
  getTodosIdRoute,
  getTodosRoute,
  patchTodosIdRoute,
  postTodosRoute,
} from './routes'
import {
  getHealthRouteHandler,
  getTodosIdRouteHandler,
  getTodosRouteHandler,
  patchTodosIdRouteHandler,
  postTodosRouteHandler,
} from './handlers'

const app = new OpenAPIHono()

export const api = app
  .openapi(getTodosRoute, getTodosRouteHandler)
  .openapi(postTodosRoute, postTodosRouteHandler)
  .openapi(getTodosIdRoute, getTodosIdRouteHandler)
  .openapi(patchTodosIdRoute, patchTodosIdRouteHandler)
  .openapi(getHealthRoute, getHealthRouteHandler)

export default app
