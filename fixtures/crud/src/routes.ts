import { createRoute, z } from '@hono/zod-openapi'

const TaskSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1).max(200),
    description: z.string().max(2000).exactOptional(),
    status: z.enum(['pending', 'in_progress', 'done']),
    tags: z.array(z.string()).max(10).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'title', 'status', 'createdAt'] })
  .openapi('Task')

const CreateTaskSchema = z
  .object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).exactOptional(),
    status: z.enum(['pending', 'in_progress', 'done']).default('pending').exactOptional(),
    tags: z.array(z.string()).max(10).exactOptional(),
  })
  .openapi({ required: ['title'] })
  .openapi('CreateTask')

const UpdateTaskSchema = z
  .object({
    title: z.string().min(1).max(200).exactOptional(),
    description: z.string().max(2000).exactOptional(),
    status: z.enum(['pending', 'in_progress', 'done']).exactOptional(),
    tags: z.array(z.string()).max(10).exactOptional(),
  })
  .openapi('UpdateTask')

const ErrorSchema = z
  .object({ message: z.string(), code: z.string().exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('Error')

const TaskIdParamsSchema = z
  .string()
  .openapi({ param: { name: 'taskId', in: 'path', required: true, schema: { type: 'string' } } })

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Health check',
  operationId: 'getIndex',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getTasksRoute = createRoute({
  method: 'get',
  path: '/tasks',
  tags: ['tasks'],
  summary: 'List tasks',
  operationId: 'getTasks',
  request: {
    query: z.object({
      status: z
        .enum(['pending', 'in_progress', 'done'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['pending', 'in_progress', 'done'] },
          },
        }),
      limit: z
        .int()
        .min(1)
        .max(100)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          },
        }),
      offset: z
        .int()
        .min(0)
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 0, default: 0 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Task list',
      content: {
        'application/json': {
          schema: z
            .object({ tasks: z.array(TaskSchema), total: z.int() })
            .openapi({ required: ['tasks', 'total'] }),
        },
      },
    },
  },
})

export const postTasksRoute = createRoute({
  method: 'post',
  path: '/tasks',
  tags: ['tasks'],
  summary: 'Create task',
  operationId: 'postTasks',
  request: {
    body: { content: { 'application/json': { schema: CreateTaskSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: TaskSchema } } },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getTasksTaskIdRoute = createRoute({
  method: 'get',
  path: '/tasks/{taskId}',
  tags: ['tasks'],
  summary: 'Get task by ID',
  operationId: 'getTasksTaskId',
  request: { params: z.object({ taskId: TaskIdParamsSchema }) },
  responses: {
    200: { description: 'Task detail', content: { 'application/json': { schema: TaskSchema } } },
    404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
  },
})

export const putTasksTaskIdRoute = createRoute({
  method: 'put',
  path: '/tasks/{taskId}',
  tags: ['tasks'],
  summary: 'Update task',
  operationId: 'putTasksTaskId',
  request: {
    params: z.object({ taskId: TaskIdParamsSchema }),
    body: { content: { 'application/json': { schema: UpdateTaskSchema } }, required: true },
  },
  responses: {
    200: { description: 'Updated', content: { 'application/json': { schema: TaskSchema } } },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
  },
})

export const deleteTasksTaskIdRoute = createRoute({
  method: 'delete',
  path: '/tasks/{taskId}',
  tags: ['tasks'],
  summary: 'Delete task',
  operationId: 'deleteTasksTaskId',
  request: { params: z.object({ taskId: TaskIdParamsSchema }) },
  responses: {
    204: { description: 'Deleted' },
    404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
