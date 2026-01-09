import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const CreateUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema).exactOptional(),
    isStudent: z.boolean().exactOptional(),
    pronouns: z.string().exactOptional(),
    affiliations: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['displayName', 'email'] })
  .openapi('CreateUserInput')

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>
