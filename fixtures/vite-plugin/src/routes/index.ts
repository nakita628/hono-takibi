import { createRoute, z } from '@hono/zod-openapi'

const TodoSchema = z
  .object({
    id: z.int32(),
    title: z.string().min(1),
    description: z.string().exactOptional(),
    completed: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'title', 'completed', 'createdAt', 'updatedAt'] })
  .openapi('Todo')

const TodoListSchema = z
  .object({ total: z.int32(), items: z.array(TodoSchema) })
  .openapi({ required: ['total', 'items'] })
  .openapi('TodoList')

const ErrorSchema = z
  .object({ message: z.string(), code: z.string().exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('Error')

const CreateTodoInputSchema = z
  .object({ title: z.string().min(1).max(200), description: z.string().exactOptional() })
  .openapi({ required: ['title'] })
  .openapi('CreateTodoInput')

const UpdateTodoInputSchema = z
  .object({
    title: z.string().min(1).max(200).exactOptional(),
    description: z.string().exactOptional(),
    completed: z.boolean().exactOptional(),
  })
  .openapi('UpdateTodoInput')

export const getTodosRoute = createRoute({
  method: 'get',
  path: '/todos',
  tags: ['Todos'],
  operationId: 'Todos_list',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .pipe(z.int32())
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', format: 'int32' },
            explode: false,
          },
        }),
      offset: z.coerce
        .number()
        .pipe(z.int32())
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'integer', format: 'int32' },
            explode: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoListSchema } },
    },
  },
})

export const postTodosRoute = createRoute({
  method: 'post',
  path: '/todos',
  tags: ['Todos'],
  operationId: 'Todos_create',
  request: {
    body: { content: { 'application/json': { schema: CreateTodoInputSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'The request has succeeded and a new resource has been created as a result.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    400: {
      description: 'The server could not understand the request due to invalid syntax.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getTodosIdRoute = createRoute({
  method: 'get',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_get',
  request: {
    params: z.object({
      id: z
        .int32()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const deleteTodosIdRoute = createRoute({
  method: 'delete',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_remove',
  request: {
    params: z.object({
      id: z
        .int32()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful. ',
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const patchTodosIdRoute = createRoute({
  method: 'patch',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_update',
  request: {
    params: z.object({
      id: z
        .int32()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
    body: { content: { 'application/json': { schema: UpdateTodoInputSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    400: {
      description: 'The server could not understand the request due to invalid syntax.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Health'],
  operationId: 'Health_check',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: {
        'application/json': {
          schema: z.object({ status: z.literal('ok') }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})
