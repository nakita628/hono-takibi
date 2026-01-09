export const WebhookEventExample = {
  value: {
    subscription: { $ref: '#/components/examples/SubscriptionExample/value' },
    event: {
      type: 'order.created',
      payload: { order: { $ref: '#/components/examples/OrderExample/value' } },
    },
  },
}
