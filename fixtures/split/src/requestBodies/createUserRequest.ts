import { UserFullExample, UserMinimalExample } from '../examples'
import { UserSchema } from '../schemas'

export const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
}
