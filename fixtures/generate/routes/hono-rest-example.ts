import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z
  .object({ message: z.string().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { message: { type: 'string' } }, required: ['message'] })
  .openapi('Error')

const PostSchema = z
  .object({
    id: z
      .uuid()
      .openapi({ type: 'string', format: 'uuid', description: 'Unique identifier of the post' }),
    post: z
      .string()
      .min(1)
      .max(140)
      .openapi({
        type: 'string',
        minLength: 1,
        maxLength: 140,
        description: 'Content of the post',
      }),
    createdAt: z.iso
      .datetime()
      .openapi({
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the post was created',
      }),
    updatedAt: z.iso
      .datetime()
      .openapi({
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the post was last updated',
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', description: 'Unique identifier of the post' },
      post: { type: 'string', minLength: 1, maxLength: 140, description: 'Content of the post' },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the post was created',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the post was last updated',
      },
    },
    required: ['id', 'post', 'createdAt', 'updatedAt'],
  })
  .openapi('Post')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Hono'],
  summary: 'Welcome message',
  description: 'Retrieve a simple welcome message from the Hono API.',
  responses: {
    200: {
      description: 'Successful response with a welcome message.',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ type: 'string', example: 'Hono🔥' }) })
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'Hono🔥' } },
              required: ['message'],
            }),
        },
      },
    },
  },
})

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  tags: ['Post'],
  summary: 'Retrieve a list of posts',
  description:
    'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',
  request: {
    query: z.object({
      page: z.coerce
        .number()
        .openapi({
          param: { name: 'page', in: 'query', required: true, schema: { type: 'number' } },
          type: 'number',
        }),
      rows: z.coerce
        .number()
        .openapi({
          param: { name: 'rows', in: 'query', required: true, schema: { type: 'number' } },
          type: 'number',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: {
        'application/json': {
          schema: z
            .array(PostSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        },
      },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  tags: ['Post'],
  summary: 'Create a new post',
  description: 'Submit a new post with a maximum length of 140 characters.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              post: z
                .string()
                .min(1)
                .max(140)
                .openapi({
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  description: 'Content of the post',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                post: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  description: 'Content of the post',
                },
              },
              required: ['post'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Post successfully created.',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z
                .string()
                .openapi({ type: 'string', example: 'Post created successfully.' }),
            })
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'Post created successfully.' } },
              required: ['message'],
            }),
        },
      },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const putPostsIdRoute = createRoute({
  method: 'put',
  path: '/posts/{id}',
  tags: ['Post'],
  summary: 'Update an existing post',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              post: z
                .string()
                .min(1)
                .max(140)
                .openapi({
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  description: 'Updated content for the post',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                post: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  description: 'Updated content for the post',
                },
              },
              required: ['post'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: { description: 'Post successfully updated.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  method: 'delete',
  path: '/posts/{id}',
  tags: ['Post'],
  summary: 'Delete a post',
  description: 'Delete an existing post identified by its unique ID.',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier of the post.',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
          },
          type: 'string',
          format: 'uuid',
          description: 'Unique identifier of the post.',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
