import { z } from '@hono/zod-openapi'

export const CreateUserBodyRequestBody = {
  description: 'Payload for creating a user',
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email(), role: z.enum(['admin', 'member']) })
        .openapi({ required: ['name', 'email', 'role'] }),
    },
  },
  required: true,
}
