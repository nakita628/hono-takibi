import type { RouteHandler } from '@hono/zod-openapi'
import { makeErr } from '@/domain/errorDomain.ts'
import { makePrismaTodoRepo } from '@/repository/prisma/todoRepository.ts'
import {
  deleteTodoIdTransaction,
  getTodoIdTransaction,
  getTodoTransaction,
  postTodoTransaction,
  putTodoIdTransaction,
} from '@/transactions/todoTransaction.ts'
import type {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '../routes.ts'

export const getTodoRouteHandler: RouteHandler<typeof getTodoRoute> = async (c) => {
  const { limit, offset } = c.req.valid('query')
  const res = await getTodoTransaction(makePrismaTodoRepo(), limit, offset)
  return res.match(
    (todos) => c.json(todos),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const postTodoRouteHandler: RouteHandler<typeof postTodoRoute> = async (c) => {
  const { content } = c.req.valid('json')
  const res = await postTodoTransaction(makePrismaTodoRepo(), content)
  return res.match(
    () => c.json({ message: 'Todo created' }),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const getTodoIdRouteHandler: RouteHandler<typeof getTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const res = await getTodoIdTransaction(makePrismaTodoRepo(), id)
  return res.match(
    (todo) => c.json(todo),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const putTodoIdRouteHandler: RouteHandler<typeof putTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { content } = c.req.valid('json')
  const res = await putTodoIdTransaction(makePrismaTodoRepo(), id, content)
  return res.match(
    () => c.json({ message: 'Todo updated' }),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}

export const deleteTodoIdRouteHandler: RouteHandler<typeof deleteTodoIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const res = await deleteTodoIdTransaction(makePrismaTodoRepo(), id)
  return res.match(
    () => c.json({ message: 'Todo deleted' }),
    (e) => {
      const { body, status } = makeErr(e)
      return c.json(body, status)
    },
  )
}
