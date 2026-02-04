import { TokenRequestClientCredentialsExample, TokenRequestRefreshExample } from '../examples'
import { TokenRequestSchema } from '../schemas'

export const TokenRequestRequestBody = {
  content: {
    'application/json': {
      schema: TokenRequestSchema,
      examples: {
        clientCredentials: TokenRequestClientCredentialsExample,
        refreshToken: TokenRequestRefreshExample,
      },
    },
  },
  required: true,
}
