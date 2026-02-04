import { TraceIdHeaderParamParamsSchema, UserIdPathParamParamsSchema } from '../parameters'
import { UpdateUserRequestRequestBody } from '../requestBodies'
import {
  DefaultErrorResponse,
  NotFoundResponse,
  UserResponse,
  ValidationErrorResponse,
} from '../responses'

export const UserPathItem = {
  get: {
    tags: ['Users'],
    summary: 'Get user by id (reusable pathItem)',
    operationId: 'getUserByIdPathItem',
    request: { parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema] },
    responses: { 200: UserResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
  },
  delete: {
    tags: ['Users'],
    summary: 'Delete user (reusable pathItem)',
    operationId: 'deleteUserPathItem',
    request: { parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema] },
    responses: {
      204: { description: 'Deleted' },
      404: NotFoundResponse,
      default: DefaultErrorResponse,
    },
  },
  patch: {
    tags: ['Users'],
    summary: 'Update user (reusable pathItem)',
    operationId: 'updateUserPathItem',
    request: {
      parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
      body: UpdateUserRequestRequestBody,
    },
    responses: {
      200: UserResponse,
      400: ValidationErrorResponse,
      404: NotFoundResponse,
      default: DefaultErrorResponse,
    },
  },
}
