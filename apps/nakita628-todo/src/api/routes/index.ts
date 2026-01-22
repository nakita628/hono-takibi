import { createRoute, z } from '@hono/zod-openapi'

const OKSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], example: { status: 200, message: 'OK' } })
  .openapi('OK')

const TodoSchema = z
  .object({
    id: z.uuid(),
    content: z.string().min(1).max(140),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({
    required: ['id', 'content', 'createdAt', 'updatedAt'],
    example: {
      id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
      content: 'Hono',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
  })
  .openapi('Todo')

const NotFoundSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('NotFound')

const UnprocessableContentSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('UnprocessableContent')

const InternalServerErrorSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('InternalServerError')

const ServiceUnavailableSchema = z
  .object({ message: z.string(), retryAfter: z.string().exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('ServiceUnavailable')

const CreatedSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], example: { status: 201, message: 'Created' } })
  .openapi('Created')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Health'],
  summary: 'Health Check',
  operationId: 'Health_list',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: OKSchema } },
    },
  },
})

export const getTodoRoute = createRoute({
  method: 'get',
  path: '/todo',
  tags: ['Todos'],
  summary: 'Retrieve a list of posts',
  operationId: 'Todos_list',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'number' },
            explode: false,
          },
        }),
      offset: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'number' },
            explode: false,
          },
        }),
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
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const postTodoRoute = createRoute({
  method: 'post',
  path: '/todo',
  tags: ['Todos'],
  summary: 'Create a new post',
  operationId: 'Todos_create',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ content: z.string().min(1).max(140) })
            .openapi({ required: ['content'] }),
        },
      },
      required: true,
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
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const getTodoIdRoute = createRoute({
  method: 'get',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Update an existing post',
  operationId: 'Todos_update',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
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
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const putTodoIdRoute = createRoute({
  method: 'put',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Delete an existing post identified by its unique ID.',
  operationId: 'Todos_delete',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ content: z.string().min(1).max(140) })
            .openapi({ required: ['content'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful. ',
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})

export const deleteTodoIdRoute = createRoute({
  method: 'delete',
  path: '/todo/{id}',
  tags: ['Todos'],
  summary: 'Post successfully deleted.',
  operationId: 'Todos_post',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
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
      content: { 'application/json': { schema: NotFoundSchema } },
    },
    422: {
      description: 'Client error',
      content: { 'application/json': { schema: UnprocessableContentSchema } },
    },
    500: {
      description: 'Server error',
      content: { 'application/json': { schema: InternalServerErrorSchema } },
    },
    503: {
      description: 'Service unavailable.',
      content: { 'application/json': { schema: ServiceUnavailableSchema } },
    },
  },
})
