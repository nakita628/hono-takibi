import type { RouteHandler } from '@hono/zod-openapi'
import { createDb } from '@/api/db'
import { DatabaseError, DataNotFoundError } from '@/api/domain/error'
import {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'
import * as TodoService from '@/api/services/todo'

export const getTodoRouteHandler: RouteHandler<
  typeof getTodoRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { limit, offset } = c.req.valid('query')
  const db = createDb(c.env.DB)
  return TodoService.readAll(db, limit, offset).match(
    (value) => c.json(value, 200),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const postTodoRouteHandler: RouteHandler<
  typeof postTodoRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { content } = c.req.valid('json')
  const db = createDb(c.env.DB)
  return TodoService.create(db, content).match(
    () => c.json({ message: 'Created' }, 201),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const getTodoIdRouteHandler: RouteHandler<
  typeof getTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const db = createDb(c.env.DB)
  return TodoService.readById(db, id).match(
    (value) => c.json(value, 200),
    (e) => {
      if (e instanceof DataNotFoundError) {
        return c.json({ message: e.message }, 404)
      }
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const putTodoIdRouteHandler: RouteHandler<
  typeof putTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const body = c.req.valid('json')
  const db = createDb(c.env.DB)
  return TodoService.update(db, id, body).match(
    () => c.body(null, 204),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const deleteTodoIdRouteHandler: RouteHandler<
  typeof deleteTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const db = createDb(c.env.DB)
  return TodoService.remove(db, id).match(
    () => c.body(null, 204),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}
