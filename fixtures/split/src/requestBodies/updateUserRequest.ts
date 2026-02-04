import { z } from '@hono/zod-openapi'
import { UserPrefsExample } from '../examples'
import { ProblemDetailsSchema, UserPreferencesSchema, UserSchema } from '../schemas'

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
