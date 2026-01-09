import { createRoute, z } from '@hono/zod-openapi'
import { TraceIdHeaderParamParamsSchema } from '../parameters'
import { CreateUserRequestRequestBody } from '../requestBodies'
import {
  ConflictResponse,
  DefaultErrorResponse,
  UserResponse,
  ValidationErrorResponse,
} from '../responses'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create user',
  operationId: 'createUser',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateUserRequestRequestBody,
  },
  responses: {
    201: UserResponse,
    400: ValidationErrorResponse,
    409: ConflictResponse,
    default: DefaultErrorResponse,
  },
})
