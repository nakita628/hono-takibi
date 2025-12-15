import type { RouteHandler } from '@hono/zod-openapi'
import { DatabaseError, NotFoundError } from '@/domain'
import type {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/routes.ts'
import * as TodoService from '@/services'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = (c) => {
  const { limit, offset } = c.req.valid('query')
  const res = TodoService.getTodo(limit, offset)
  return res.match(
    (todos) => c.json(todos, 200),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const postTodoRouteHandler: RouteHandler<typeof postTodoRoute> = (c) => {
  const { content } = c.req.valid('json')
  const res = TodoService.postTodo(content)
  return res.match(
    () => c.json({ message: 'Todo created' }, 201),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const getTodoIdRouteHandler: RouteHandler<typeof getTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const res = TodoService.getTodoId(id)
  return res.match(
    (todo) => c.json(todo, 200),
    (e) => {
      if (e instanceof NotFoundError) {
        return c.json({ message: e.message }, 404)
      }
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const putTodoIdRouteHandler: RouteHandler<typeof putTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const { content } = c.req.valid('json')
  const res = TodoService.putTodoId(id, content)
  return res.match(
    () => c.json({ message: 'Todo updated' }),
    (e) => {
      if (e instanceof NotFoundError) {
        return c.json({ message: e.message }, 404)
      }
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}

export const deleteTodoIdRouteHandler: RouteHandler<typeof deleteTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const res = TodoService.deleteTodoId(id)
  return res.match(
    () => c.json({ message: 'Todo deleted' }),
    (e) => {
      if (e instanceof NotFoundError) {
        return c.json({ message: e.message }, 404)
      }
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}
