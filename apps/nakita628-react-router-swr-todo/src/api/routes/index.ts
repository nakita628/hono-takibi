import { createRoute, z } from '@hono/zod-openapi'

export const TodoSchema = z
  .object({
    id: z.uuid(),
    content: z.string().min(0).max(140),
    completed: z.int32().min(0).max(1).openapi({ description: '0 = not completed, 1 = completed' }),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({
    required: ['id', 'content', 'completed', 'createdAt', 'updatedAt'],
    description: 'Todo item',
    example: {
      id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
      content: 'Hono',
      completed: 0,
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
  })
  .openapi('Todo')

export type Todo = z.infer<typeof TodoSchema>

export const NotFoundSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], description: 'Resource not found' })
  .openapi('NotFound')

export type NotFound = z.infer<typeof NotFoundSchema>

export const UnprocessableContentSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], description: 'Unprocessable content (validation error)' })
  .openapi('UnprocessableContent')

export type UnprocessableContent = z.infer<typeof UnprocessableContentSchema>

export const InternalServerErrorSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], description: 'Internal server error' })
  .openapi('InternalServerError')

export type InternalServerError = z.infer<typeof InternalServerErrorSchema>

export const ServiceUnavailableSchema = z
  .object({ message: z.string(), retryAfter: z.string().exactOptional() })
  .openapi({ required: ['message'], description: 'Service unavailable' })
  .openapi('ServiceUnavailable')

export type ServiceUnavailable = z.infer<typeof ServiceUnavailableSchema>

export const CreatedMessageSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], description: 'Successful creation response' })
  .openapi('CreatedMessage')

export type CreatedMessage = z.infer<typeof CreatedMessageSchema>

export const CreateTodoRequestSchema = z
  .object({ content: z.string().min(1).max(140) })
  .openapi({ required: ['content'], description: 'Request body for creating a new todo' })
  .openapi('CreateTodoRequest')

export type CreateTodoRequest = z.infer<typeof CreateTodoRequestSchema>

export const UpdateTodoRequestSchema = z
  .object({
    content: z.string().min(0).max(140).exactOptional(),
    completed: z.int32().min(0).max(1).exactOptional(),
  })
  .openapi({ description: 'Request body for updating an existing todo' })
  .openapi('UpdateTodoRequest')

export type UpdateTodoRequest = z.infer<typeof UpdateTodoRequestSchema>

const PaginationQueryPageParamsSchema = z
  .int32()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: {
      name: 'page',
      in: 'query',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, default: 1 },
      explode: false,
    },
  })

const PaginationQueryRowsParamsSchema = z
  .int32()
  .min(1)
  .max(100)
  .default(10)
  .exactOptional()
  .openapi({
    param: {
      name: 'rows',
      in: 'query',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, maximum: 100, default: 10 },
      explode: false,
    },
  })

export const getTodoRoute = createRoute({
  method: 'get',
  path: '/todo',
  tags: ['Todos'],
  summary: 'Retrieve a list of todos',
  description: 'Retrieve a list of todos with pagination',
  operationId: 'Todos_list',
  request: {
    query: z.object({
      page: PaginationQueryPageParamsSchema,
      rows: PaginationQueryRowsParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.array(TodoSchema) } },
    },
    404: {
      description: 'Resource not found',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Unprocessable content (validation error)',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Internal server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const postTodoRoute = createRoute({
  method: 'post',
  path: '/todo',
  tags: ['Todos'],
  summary: 'Create a new todo',
  description: 'Create a new todo item',
  operationId: 'Todos_create',
  request: {
    body: { content: { 'application/json': { schema: CreateTodoRequestSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'Successful creation response',
      content: { 'application/json': { schema: CreatedMessageSchema } },
    },
    422: {
      description: 'Unprocessable content (validation error)',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Internal server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const getTodoIdRoute = createRoute({
  method: 'get',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Get a single todo',
  description: 'Get a single todo by ID',
  operationId: 'Todos_read',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    404: {
      description: 'Resource not found',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Unprocessable content (validation error)',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Internal server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const putTodoIdRoute = createRoute({
  method: 'put',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Update an existing todo',
  description: 'Update an existing todo',
  operationId: 'Todos_update',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
    body: { content: { 'application/json': { schema: UpdateTodoRequestSchema } }, required: true },
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful. ',
    },
    404: {
      description: 'Resource not found',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Unprocessable content (validation error)',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Internal server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const deleteTodoIdRoute = createRoute({
  method: 'delete',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Delete a todo',
  description: 'Delete a todo',
  operationId: 'Todos_delete',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful. ',
    },
    404: {
      description: 'Resource not found',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Unprocessable content (validation error)',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Internal server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})
