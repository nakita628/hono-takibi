import { z } from '@hono/zod-openapi'
import { RoleSchema } from './role'

export const ReplaceUserInputSchema = z
  .strictObject({
    displayName: z.string().min(1),
    email: z.email(),
    roles: z.array(RoleSchema).exactOptional(),
    isStudent: z.boolean().exactOptional(),
    pronouns: z.string().exactOptional(),
    affiliations: z.array(z.string()).exactOptional(),
  })
  .openapi({
    description: 'Full resource replacement (PUT). Required core fields must be present.',
    required: ['displayName', 'email'],
  })
  .openapi('ReplaceUserInput')

export type ReplaceUserInput = z.infer<typeof ReplaceUserInputSchema>
