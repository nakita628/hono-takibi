import { createRoute, z } from '@hono/zod-openapi'

export const ErrorSchema = z.object({ message: z.string() }).openapi('Error')

export type Error = z.infer<typeof ErrorSchema>

export const PostSchema = z
  .object({
    id: z.uuid().openapi({ description: 'Unique identifier of the post' }),
    post: z.string().min(1).max(140).openapi({ description: 'Content of the post' }),
    createdAt: z.iso.datetime().openapi({ description: 'Timestamp when the post was created' }),
    updatedAt: z.iso
      .datetime()
      .openapi({ description: 'Timestamp when the post was last updated' }),
  })
  .openapi('Post')

export type Post = z.infer<typeof PostSchema>

export const getIndexRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  summary: 'Welcome message',
  description: 'Retrieve a simple welcome message from the Hono API.',
  responses: {
    200: {
      description: 'Successful response with a welcome message.',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const postPostsRoute = createRoute({
  tags: ['Post'],
  method: 'post',
  path: '/posts',
  summary: 'Create a new post',
  description: 'Submit a new post with a maximum length of 140 characters.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            post: z.string().min(1).max(140).openapi({ description: 'Content of the post' }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Post successfully created.',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Post created successfully.' }),
          }),
        },
      },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
  },
})

export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  summary: 'Retrieve a list of posts',
  description:
    'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',
  request: {
    query: z.object({
      page: z.coerce.number().openapi({ param: { in: 'query', name: 'page', required: false } }),
      rows: z.coerce.number().openapi({ param: { in: 'query', name: 'rows', required: false } }),
    }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.uuid().openapi({ description: 'Unique identifier of the post' }),
              post: z.string().min(1).max(140).openapi({ description: 'Content of the post' }),
              createdAt: z.iso
                .datetime()
                .openapi({ description: 'Timestamp when the post was created' }),
              updatedAt: z.iso
                .datetime()
                .openapi({ description: 'Timestamp when the post was last updated' }),
            }),
          ),
        },
      },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
  },
})

export const putPostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'put',
  path: '/posts/{id}',
  summary: 'Update an existing post',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            post: z
              .string()
              .min(1)
              .max(140)
              .openapi({ description: 'Updated content for the post' }),
          }),
        },
      },
    },
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: { in: 'path', name: 'id', required: true },
          description: 'Unique identifier of the post.',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully updated.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  summary: 'Delete a post',
  description: 'Delete an existing post identified by its unique ID.',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: { in: 'path', name: 'id', required: true },
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Unique identifier of the post.',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
  },
})
