import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const UpdateUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema),
    isStudent: z.boolean(),
    pronouns: z.string(),
    affiliations: z.array(z.string()),
  })
  .partial()
  .openapi({ description: 'Partial update (PATCH). All properties are optional.' })
  .openapi('UpdateUserInput')

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>
