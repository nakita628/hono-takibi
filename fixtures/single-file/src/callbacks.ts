export const SubscriptionLifecycleCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'onSubscriptionEvent',
      summary: 'Subscription lifecycle callback',
      parameters: [{ $ref: '#/components/parameters/TraceIdHeaderParam' }],
      requestBody: { $ref: '#/components/requestBodies/WebhookEventRequest' },
      responses: {
        '200': {
          description: 'Ack',
          headers: { 'x-trace-id': { $ref: '#/components/headers/TraceIdHeader' } },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  next: { $ref: '#/components/schemas/Link' },
                },
              },
              examples: { ack: { value: { ok: true, next: { href: '/subscriptions' } } } },
            },
          },
        },
        default: { $ref: '#/components/responses/DefaultError' },
      },
    },
  },
}

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
