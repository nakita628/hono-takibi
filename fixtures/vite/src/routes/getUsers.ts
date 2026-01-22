import { createRoute, z } from '@hono/zod-openapi'
import { RoleSchema, UserSchema } from '../schemas'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List users',
  description: 'List users with pagination and optional role filter.',
  operationId: 'listUsers',
  request: {
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(200)
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', required: false, description: 'Items per page.' },
        }),
      offset: z
        .int()
        .min(0)
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            required: false,
            description: 'Number of items to skip.',
          },
        }),
      role: z
        .array(RoleSchema)
        .exactOptional()
        .openapi({
          param: {
            name: 'role',
            in: 'query',
            required: false,
            description: 'Filter by role (repeatable).',
            style: 'form',
            explode: true,
          },
        }),
      q: z
        .string()
        .min(1)
        .exactOptional()
        .openapi({
          param: {
            name: 'q',
            in: 'query',
            required: false,
            description: 'Search term for displayName or affiliations.',
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List retrieved.',
      content: {
        'application/json': {
          schema: z
            .strictObject({ total: z.int().min(0), items: z.array(UserSchema) })
            .openapi({ required: ['total', 'items'] }),
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
