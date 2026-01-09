import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const UserSchema = z
  .strictObject({
    id: z.uuid().openapi({ description: 'User ID' }),
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema).exactOptional(),
    isStudent: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether the user is a student' }),
    pronouns: z
      .string()
      .exactOptional()
      .openapi({ description: 'e.g., he/him, she/her, they/them' }),
    affiliations: z.array(z.string()).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({
    required: ['id', 'displayName', 'email', 'createdAt', 'updatedAt'],
    example: {
      id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
      displayName: 'Alice',
      email: 'alice@example.com',
      roles: ['speaker', 'attendee'],
      createdAt: '2025-08-01T12:34:56Z',
      updatedAt: '2025-08-01T12:34:56Z',
    },
  })
  .openapi('User')

export type User = z.infer<typeof UserSchema>
