import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const ReplaceUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema).optional(),
    isStudent: z.boolean().optional(),
    pronouns: z.string().optional(),
    affiliations: z.array(z.string()).optional(),
  })
  .openapi({
    description: 'Full resource replacement (PUT). Required core fields must be present.',
  })
  .openapi('ReplaceUserInput')

export type ReplaceUserInput = z.infer<typeof ReplaceUserInputSchema>
