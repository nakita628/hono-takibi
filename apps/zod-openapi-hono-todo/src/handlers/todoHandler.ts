import type { RouteHandler } from '@hono/zod-openapi'
import { makeErr } from '@/domain/errorDomain.ts'
// import { makePrismaTodoRepo } from '@/repository/prisma/todoRepository.ts'
import { makeDrizzleTodoRepo } from '@/repository/drizzle/todoRepository'
import type {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/routes.ts'
import {
  deleteTodoIdTransaction,
  getTodoIdTransaction,
  getTodoTransaction,
  postTodoTransaction,
  putTodoIdTransaction,
} from '@/transactions/todoTransaction.ts'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = (c) => {
  const { limit, offset } = c.req.valid('query')
  const res = getTodoTransaction(makeDrizzleTodoRepo(), limit, offset)
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
  const res = postTodoTransaction(makeDrizzleTodoRepo(), content)
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
  const res = getTodoIdTransaction(makeDrizzleTodoRepo(), id)
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
  const res = putTodoIdTransaction(makeDrizzleTodoRepo(), id, content)
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
  const res = deleteTodoIdTransaction(makeDrizzleTodoRepo(), id)
  return res.match(
    () => c.json({ message: 'Todo deleted' }),
    (e) => {
      const { body, status } = makeErr(e)
      console.log(body, status)
      return c.json(body, status)
    },
  )
}
