import { createRoute, z } from '@hono/zod-openapi'

const Error = z.object({ message: z.string() })

const Post = z.object({
  id: z.string().uuid(),
  post: z.string().min(1).max(140),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const schemas = {
  Error,
  Post,
}

export const getRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  description: 'Retrieve a simple welcome message from the Hono API.',
  responses: {
    200: {
      description: 'Successful response with a welcome message.',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
  },
})

export const postPostsRoute = createRoute({
  tags: ['Post'],
  method: 'post',
  path: '/posts',
  description: 'Submit a new post with a maximum length of 140 characters.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({ post: z.string().min(1).max(140) }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Post successfully created.',
      content: { 'application/json': { schema: Error } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: Error } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: Error } },
    },
  },
})

export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  description: 'Retrieve a paginated list of posts. Specify the page and number of posts per page.',
  request: {
    query: z.object({ page: z.number().int(), rows: z.number().int() }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: { 'application/json': { schema: z.array(Post) } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: Error } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: Error } },
    },
  },
})

export const putPostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'put',
  path: '/posts/{id}',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({ post: z.string().min(1).max(140) }),
        },
      },
    },
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: 'Post successfully updated.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: Error } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: Error } },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  description: 'Delete an existing post identified by its unique ID.',
  request: { params: z.object({ id: z.string().uuid() }) },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: Error } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: Error } },
    },
  },
})
