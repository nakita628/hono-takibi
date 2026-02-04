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
    parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
    responses: { 200: UserResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
  },
  delete: {
    tags: ['Users'],
    summary: 'Delete user (reusable pathItem)',
    operationId: 'deleteUserPathItem',
    parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
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
    parameters: [UserIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
    requestBody: UpdateUserRequestRequestBody,
    responses: {
      200: UserResponse,
      400: ValidationErrorResponse,
      404: NotFoundResponse,
      default: DefaultErrorResponse,
    },
  },
}
