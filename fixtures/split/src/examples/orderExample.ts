export const OrderExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    buyer: { $ref: '#/components/examples/UserMinimal/value' },
    status: 'paid',
    items: [
      {
        product: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Flame Keyboard',
          price: { currency: 'JPY', amount: 19999 },
        },
        quantity: 1,
      },
    ],
    auditTrail: [
      {
        entity: { $ref: '#/components/examples/UserMinimal/value' },
        event: {
          type: 'order.created',
          payload: { order: { $ref: '#/components/examples/OrderExample/value' } },
        },
        meta: { createdAt: '2026-01-04T00:00:00Z' },
      },
    ],
  },
}
