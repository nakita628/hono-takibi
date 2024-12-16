import { createRoute, z } from '@hono/zod-openapi'

export const getRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'Hono🔥',
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
  description: 'create a new post',
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
      description: 'Created',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
  },
})

export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  description: 'get PostList posts with optional pagination',
  request: { query: z.object({ page: z.string(), rows: z.string() }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string().uuid(),
              post: z.string().min(1).max(140),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          ),
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
  },
})

export const putPostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'put',
  path: '/posts/{id}',
  description: 'update Post',
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
    204: { description: 'No Content' },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  description: 'delete post',
  request: { params: z.object({ id: z.string().uuid() }) },
  responses: {
    204: { description: 'No Content' },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': { schema: z.object({ message: z.string() }) },
      },
    },
  },
})
