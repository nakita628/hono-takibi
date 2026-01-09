import { createRoute } from '@hono/zod-openapi'
import { TokenRequestRequestBody } from '../requestBodies'
import { DefaultErrorResponse, TokenResponse, ValidationErrorResponse } from '../responses'

export const postAuthTokenRoute = createRoute({
  method: 'post',
  path: '/auth/token',
  tags: ['Auth'],
  summary: 'Issue access token',
  operationId: 'issueToken',
  request: { body: TokenRequestRequestBody },
  responses: { 200: TokenResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  security: [],
})
