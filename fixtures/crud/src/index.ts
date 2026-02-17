import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteTasksTaskIdRouteHandler,
  getRouteHandler,
  getTasksRouteHandler,
  getTasksTaskIdRouteHandler,
  postTasksRouteHandler,
  putTasksTaskIdRouteHandler,
} from './handlers'
import {
  deleteTasksTaskIdRoute,
  getRoute,
  getTasksRoute,
  getTasksTaskIdRoute,
  postTasksRoute,
  putTasksTaskIdRoute,
} from './routes'

const app = new OpenAPIHono().basePath('/api')

export const api = app
  .openapi(getRoute, getRouteHandler)
  .openapi(getTasksRoute, getTasksRouteHandler)
  .openapi(postTasksRoute, postTasksRouteHandler)
  .openapi(getTasksTaskIdRoute, getTasksTaskIdRouteHandler)
  .openapi(putTasksTaskIdRoute, putTasksTaskIdRouteHandler)
  .openapi(deleteTasksTaskIdRoute, deleteTasksTaskIdRouteHandler)

export default app
