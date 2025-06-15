import { createRoute, z } from '@hono/zod-openapi'

export const postAuthLoginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  summary: 'User Login to Retrieve JWT',
  description:
    'Authenticate the user by providing a username and password. On success, a JWT is returned.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            username: z.string().openapi({ example: 'user@example.com' }),
            password: z.string().openapi({ example: 'password123' }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful login, JWT token issued',
      content: {
        'application/json': {
          schema: z
            .object({
              token: z.string().openapi({
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                description: 'JWT token',
              }),
            })
            .partial(),
        },
      },
    },
    401: { description: 'Login failed (invalid credentials)' },
  },
})

export const getProtectedRoute = createRoute({
  method: 'get',
  path: '/protected',
  summary: 'Protected Endpoint',
  description: 'Access a resource that requires a valid JWT.',
  security: [{ jwt: [] }],
  responses: {
    200: {
      description: 'Access granted to the protected resource',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string().openapi({ example: 'Access to protected data granted.' }),
            })
            .partial(),
        },
      },
    },
    401: { description: 'Access denied (invalid or missing JWT)' },
  },
})
