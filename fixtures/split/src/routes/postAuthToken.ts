import { createRoute } from '@hono/zod-openapi'
import { TokenRequestRequestBody } from '../requestBodies'
import { DefaultErrorResponse, TokenResponseResponse, ValidationErrorResponse } from '../responses'

export const postAuthTokenRoute = createRoute({
  method: 'post',
  path: '/auth/token',
  tags: ['Auth'],
  summary: 'Issue access token',
  operationId: 'issueToken',
  request: { body: TokenRequestRequestBody },
  responses: {
    200: TokenResponseResponse,
    400: ValidationErrorResponse,
    default: DefaultErrorResponse,
  },
  security: [],
})
