export const OrderFilterExample = {
  value: {
    kind: 'order',
    status: 'paid',
    buyer: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    minTotal: { currency: 'JPY', amount: 1000 },
  },
}
