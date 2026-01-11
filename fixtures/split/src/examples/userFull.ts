export const UserFullExample = {
  value: {
    id: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
    },
    name: 'Inferno Taro',
    email: 'taro@inferno.example',
    company: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Inferno Inc.',
    },
    manager: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    addresses: [
      {
        line1: '1-2-3 Hell St',
        city: 'Tokyo',
        country: 'JP',
        geo: {
          lat: 35.6895,
          lng: 139.6917,
          graph: {
            nodes: [
              {
                id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
                edges: [{ to: { id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }, weight: 0.666 }],
              },
            ],
          },
        },
      },
    ],
  },
}
