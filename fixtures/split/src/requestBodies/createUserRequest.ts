import { UserSchema } from '../schemas'
import { UserFullExample, UserMinimalExample } from '../examples'

export const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
}
