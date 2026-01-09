export const OrderCreatedCallback = {
  '{$request.body#/buyer/company/primaryContact/employer/meta/links/self/href}': {
    post: {
      operationId: 'onOrderCreatedEvent',
      summary: 'Order created callback (path expression is intentionally absurd)',
      requestBody: { $ref: '#/components/requestBodies/WebhookEventRequest' },
      responses: {
        '200': {
          description: 'Ack',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  echo: { $ref: '#/components/schemas/WebhookEvent' },
                },
              },
            },
          },
        },
        default: { $ref: '#/components/responses/DefaultError' },
      },
    },
  },
}
