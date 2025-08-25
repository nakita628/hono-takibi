import type { RouteHandler } from '@hono/zod-openapi'
import type {
  getTodoRoute,
  postTodoRoute,
  getTodoIdRoute,
  putTodoIdRoute,
  deleteTodoIdRoute,
} from '../routes.ts'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = async (c) => {}

export const postTodoRouteHandler: RouteHandler<typeof postTodoRoute> = async (c) => {}

export const getTodoIdRouteHandler: RouteHandler<typeof getTodoIdRoute> = async (c) => {}

export const putTodoIdRouteHandler: RouteHandler<typeof putTodoIdRoute> = async (c) => {}

export const deleteTodoIdRouteHandler: RouteHandler<typeof deleteTodoIdRoute> = async (c) => {}
