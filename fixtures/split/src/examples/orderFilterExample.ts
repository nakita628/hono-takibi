export const OrderFilterExample = {
  value: {
    kind: 'order',
    status: 'paid',
    buyer: { $ref: '#/components/examples/UserMinimal/value' },
    minTotal: { currency: 'JPY', amount: 1000 },
  },
}
