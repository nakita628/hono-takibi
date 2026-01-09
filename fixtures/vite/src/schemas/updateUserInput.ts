import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const UpdateUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1).exactOptional(),
    email: z.email().exactOptional(),
    roles: z.array(RoleSchema).exactOptional(),
    isStudent: z.boolean().exactOptional(),
    pronouns: z.string().exactOptional(),
    affiliations: z.array(z.string()).exactOptional(),
  })
  .openapi({ description: 'Partial update (PATCH). All properties are optional.' })
  .openapi('UpdateUserInput')

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>
