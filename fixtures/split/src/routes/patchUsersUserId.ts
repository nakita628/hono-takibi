import { createRoute, z } from '@hono/zod-openapi'
import { TraceIdHeaderParamParamsSchema, UserIdPathParamParamsSchema } from '../parameters'
import { UpdateUserRequestRequestBody } from '../requestBodies'
import {
  DefaultErrorResponse,
  NotFoundResponse,
  UserResponse,
  ValidationErrorResponse,
} from '../responses'

export const patchUsersUserIdRoute = createRoute({
  method: 'patch',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Update user (partial)',
  operationId: 'updateUser',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: UpdateUserRequestRequestBody,
  },
  responses: {
    200: UserResponse,
    400: ValidationErrorResponse,
    404: NotFoundResponse,
    default: DefaultErrorResponse,
  },
})
