import { createRoute, z } from '@hono/zod-openapi'
import { RoleSchema, UserSchema } from '../schemas'

export const getUsersRoute = createRoute({
  tags: ['Users'],
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  summary: 'List users',
  description: 'List users with pagination and optional role filter.',
  request: {
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(200)
        .default(20)
        .openapi({ param: { in: 'query', name: 'limit', required: false } })
        .optional(),
      offset: z
        .int()
        .min(0)
        .default(0)
        .openapi({ param: { in: 'query', name: 'offset', required: false } })
        .optional(),
      role: z
        .array(RoleSchema)
        .openapi({ param: { in: 'query', name: 'role', required: false } })
        .optional(),
      q: z
        .string()
        .min(1)
        .openapi({ param: { in: 'query', name: 'q', required: false } })
        .optional(),
    }),
  },
  responses: {
    200: {
      description: 'List retrieved.',
      content: {
        'application/json': {
          schema: z.strictObject({ total: z.int().min(0), items: z.array(UserSchema) }),
          examples: {
            ok: {
              value: {
                total: 2,
                items: [
                  {
                    id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
                    displayName: 'Alice',
                    email: 'alice@example.com',
                    roles: ['speaker', 'attendee'],
                    createdAt: '2025-08-01T12:34:56Z',
                    updatedAt: '2025-08-01T12:34:56Z',
                  },
                  {
                    id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f568',
                    displayName: 'Bob',
                    email: 'bob@example.com',
                    roles: ['staff'],
                    createdAt: '2025-08-01T12:34:56Z',
                    updatedAt: '2025-08-01T12:34:56Z',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
})
