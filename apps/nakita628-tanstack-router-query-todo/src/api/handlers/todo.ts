import type { RouteHandler } from '@hono/zod-openapi'
import { DatabaseError, DataNotFoundError } from '@/api/domain'
import {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'
import * as TodoService from '@/api/services/todo'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = async (c) => {
  const { limit, offset } = c.req.valid('query')
  return TodoService.readAll(limit, offset).match(
    (todos) => c.json(todos, 200),
    (e) => c.json({ message: e.message }, e instanceof DatabaseError ? 503 : 500),
  )
}

export const postTodoRouteHandler: RouteHandler<typeof postTodoRoute> = async (c) => {
  const { content } = c.req.valid('json')
  return TodoService.create(content).match(
    () => c.json({ message: 'Created' }, 201),
    (e) => c.json({ message: e.message }, e instanceof DatabaseError ? 503 : 500),
  )
}

export const getTodoIdRouteHandler: RouteHandler<typeof getTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  return TodoService.readById(id).match(
    (todo) => c.json(todo, 200),
    (e) => {
      if (e instanceof DataNotFoundError) return c.json({ message: e.message }, 404)
      if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const putTodoIdRouteHandler: RouteHandler<typeof putTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const body = c.req.valid('json')
  return TodoService.update(id, body).match(
    () => c.body(null, 204),
    (e) => c.json({ message: e.message }, e instanceof DatabaseError ? 503 : 500),
  )
}

export const deleteTodoIdRouteHandler: RouteHandler<typeof deleteTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  return TodoService.remove(id).match(
    () => c.body(null, 204),
    (e) => c.json({ message: e.message }, e instanceof DatabaseError ? 503 : 500),
  )
}
