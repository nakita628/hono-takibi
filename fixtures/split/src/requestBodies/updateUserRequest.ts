import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema, UserPreferencesSchema, UserSchema } from '../schemas'
import { UserPrefsExample } from '../examples'

export const UpdateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: z.union([
        UserSchema,
        UserPreferencesSchema,
        z.object({ patch: ProblemDetailsSchema.exactOptional() }),
      ]),
      examples: { prefs: UserPrefsExample },
    },
  },
  required: true,
}
