export const UserPathItem = {
  get: {
    tags: ['Users'],
    operationId: 'getUserByIdPathItem',
    summary: 'Get user by id (reusable pathItem)',
    parameters: [
      { $ref: '#/components/parameters/UserIdPathParam' },
      { $ref: '#/components/parameters/TraceIdHeaderParam' },
    ],
    responses: {
      '200': { $ref: '#/components/responses/UserResponse' },
      '404': { $ref: '#/components/responses/NotFound' },
      default: { $ref: '#/components/responses/DefaultError' },
    },
  },
  patch: {
    tags: ['Users'],
    operationId: 'updateUserPathItem',
    summary: 'Update user (reusable pathItem)',
    parameters: [
      { $ref: '#/components/parameters/UserIdPathParam' },
      { $ref: '#/components/parameters/TraceIdHeaderParam' },
    ],
    requestBody: { $ref: '#/components/requestBodies/UpdateUserRequest' },
    responses: {
      '200': { $ref: '#/components/responses/UserResponse' },
      '400': { $ref: '#/components/responses/ValidationError' },
      '404': { $ref: '#/components/responses/NotFound' },
      default: { $ref: '#/components/responses/DefaultError' },
    },
  },
  delete: {
    tags: ['Users'],
    operationId: 'deleteUserPathItem',
    summary: 'Delete user (reusable pathItem)',
    parameters: [
      { $ref: '#/components/parameters/UserIdPathParam' },
      { $ref: '#/components/parameters/TraceIdHeaderParam' },
    ],
    responses: {
      '204': { description: 'Deleted' },
      '404': { $ref: '#/components/responses/NotFound' },
      default: { $ref: '#/components/responses/DefaultError' },
    },
  },
}
