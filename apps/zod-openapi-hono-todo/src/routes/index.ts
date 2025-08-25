import { createRoute, z } from '@hono/zod-openapi'

const CreatedSchema = z
  .object({ message: z.string() })
  .openapi({ example: { status: 201, message: 'Created' } })
  .openapi('Created')

const NotFoundSchema = z.object({ message: z.string() }).openapi('NotFound')

const OKSchema = z
  .object({ message: z.string() })
  .openapi({ example: { status: 200, message: 'OK' } })
  .openapi('OK')

const TodoSchema = z
  .object({
    id: z.uuid(),
    content: z.string().min(1).max(140),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({
    example: {
      id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
      content: 'Hono',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
  })
  .openapi('Todo')

const UnprocessableContentSchema = z.object({ message: z.string() }).openapi('UnprocessableContent')

export const getIndexRoute = createRoute({
  tags: ['Health'],
  method: 'get',
  path: '/',
  operationId: 'Health_list',
  summary: 'Health Check',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: OKSchema } },
    },
  },
})

export const getTodoRoute = createRoute({
  tags: ['Todos'],
  method: 'get',
  path: '/todo',
  operationId: 'Todos_list',
  summary: 'Retrieve a list of posts',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .openapi({ param: { in: 'query', name: 'limit', required: false } })
        .optional(),
      offset: z.coerce
        .number()
        .openapi({ param: { in: 'query', name: 'offset', required: false } })
        .optional(),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.array(TodoSchema) } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    503: { description: 'Service unavailable.' },
  },
})

export const postTodoRoute = createRoute({
  tags: ['Todos'],
  method: 'post',
  path: '/todo',
  operationId: 'Todos_create',
  summary: 'Create a new post',
  request: {
    body: {
      required: true,
      content: {
        'application/json': { schema: z.object({ content: z.string().min(1).max(140) }) },
      },
    },
  },
  responses: {
    201: {
      description: 'The request has succeeded and a new resource has been created as a result.',
      content: { 'application/json': { schema: CreatedSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    503: { description: 'Service unavailable.' },
  },
})

export const getTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'get',
  path: '/todo/{id}',
  operationId: 'Todos_read',
  summary: 'Update an existing post',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    503: { description: 'Service unavailable.' },
  },
})

export const putTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'put',
  path: '/todo/{id}',
  operationId: 'Todos_update',
  summary: 'Delete an existing post identified by its unique ID.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': { schema: z.object({ content: z.string().min(1).max(140) }) },
      },
    },
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful.',
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    503: { description: 'Service unavailable.' },
  },
})

export const deleteTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'delete',
  path: '/todo/{id}',
  operationId: 'Todos_delete',
  summary: 'Post successfully deleted.',
  request: {
    params: z.object({
      id: z.uuid().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful.',
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    503: { description: 'Service unavailable.' },
  },
})
