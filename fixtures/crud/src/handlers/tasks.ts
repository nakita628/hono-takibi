import type { RouteHandler } from '@hono/zod-openapi'
import type {
  deleteTasksTaskIdRoute,
  getTasksRoute,
  getTasksTaskIdRoute,
  postTasksRoute,
  putTasksTaskIdRoute,
} from '../routes'
import * as store from '../store'

export const getTasksRouteHandler: RouteHandler<typeof getTasksRoute> = async (c) => {
  const { status, limit, offset } = c.req.valid('query')
  const result = store.listTasks(status, limit, offset)
  return c.json(result, 200)
}

export const postTasksRouteHandler: RouteHandler<typeof postTasksRoute> = async (c) => {
  const body = c.req.valid('json')
  const task = store.createTask(body)
  return c.json(task, 201)
}

export const getTasksTaskIdRouteHandler: RouteHandler<typeof getTasksTaskIdRoute> = async (c) => {
  const { taskId } = c.req.valid('param')
  const task = store.getTask(taskId)
  if (!task) {
    return c.json({ message: 'Task not found' }, 404)
  }
  return c.json(task, 200)
}

export const putTasksTaskIdRouteHandler: RouteHandler<typeof putTasksTaskIdRoute> = async (c) => {
  const { taskId } = c.req.valid('param')
  const body = c.req.valid('json')
  const task = store.updateTask(taskId, body)
  if (!task) {
    return c.json({ message: 'Task not found' }, 404)
  }
  return c.json(task, 200)
}

export const deleteTasksTaskIdRouteHandler: RouteHandler<typeof deleteTasksTaskIdRoute> = async (
  c,
) => {
  const { taskId } = c.req.valid('param')
  const deleted = store.deleteTask(taskId)
  if (!deleted) {
    return c.json({ message: 'Task not found' }, 404)
  }
  return c.body(null, 204)
}
