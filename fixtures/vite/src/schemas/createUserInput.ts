import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const CreateUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema).optional(),
    isStudent: z.boolean().optional(),
    pronouns: z.string().optional(),
    affiliations: z.array(z.string()).optional(),
  })
  .openapi('CreateUserInput')

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>
