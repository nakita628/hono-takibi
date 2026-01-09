import { TokenRequestSchema } from '../schemas'
import { TokenRequestClientCredentialsExample, TokenRequestRefreshExample } from '../examples'

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
