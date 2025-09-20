import type { RouteHandler } from '@hono/zod-openapi'
import { makeErr } from '@/domain/errorDomain.ts'
import type {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/routes.ts'
import { todoService } from '@/services/todoService'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = (c) => {
  const { limit, offset } = c.req.valid('query')
  const res = todoService.getTodo(limit, offset)
  return res.match(
    (todos) => c.json(todos),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const postTodoRouteHandler: RouteHandler<typeof postTodoRoute> = (c) => {
  const { content } = c.req.valid('json')
  const res = todoService.postTodo(content)
  return res.match(
    () => c.json({ message: 'Todo created' }),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const getTodoIdRouteHandler: RouteHandler<typeof getTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const res = todoService.getTodoId(id)
  return res.match(
    (todo) => c.json(todo),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const putTodoIdRouteHandler: RouteHandler<typeof putTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const { content } = c.req.valid('json')
  const res = todoService.putTodoId(id, content)
  return res.match(
    () => c.json({ message: 'Todo updated' }),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const deleteTodoIdRouteHandler: RouteHandler<typeof deleteTodoIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const res = todoService.deleteTodoId(id)
  return res.match(
    () => c.json({ message: 'Todo deleted' }),
    (e) => {
      const { body, status } = makeErr(e)
      console.log(body, status)
      return c.json(body, status)
    },
  )
}
