export const OrderPathItem = {
  get: {
    tags: ['Orders'],
    operationId: 'getOrderByIdPathItem',
    summary: 'Get order by id (reusable pathItem)',
    parameters: [
      { $ref: '#/components/parameters/OrderIdPathParam' },
      { $ref: '#/components/parameters/TraceIdHeaderParam' },
    ],
    responses: {
      '200': { $ref: '#/components/responses/OrderResponse' },
      '404': { $ref: '#/components/responses/NotFound' },
      default: { $ref: '#/components/responses/DefaultError' },
    },
  },
  patch: {
    tags: ['Orders'],
    operationId: 'updateOrderPathItem',
    summary: 'Update order status (reusable pathItem)',
    parameters: [
      { $ref: '#/components/parameters/OrderIdPathParam' },
      { $ref: '#/components/parameters/TraceIdHeaderParam' },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: { status: { $ref: '#/components/schemas/OrderStatus' } },
          },
        },
      },
    },
    responses: {
      '200': { $ref: '#/components/responses/OrderResponse' },
      '400': { $ref: '#/components/responses/ValidationError' },
      '404': { $ref: '#/components/responses/NotFound' },
      default: { $ref: '#/components/responses/DefaultError' },
    },
  },
}
