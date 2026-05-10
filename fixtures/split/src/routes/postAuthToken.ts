import { createRoute } from '@hono/zod-openapi'
import { DefaultErrorResponse, TokenResponseResponse, ValidationErrorResponse } from '../responses'
import { TokenRequestRequestBody } from '../requestBodies'

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
