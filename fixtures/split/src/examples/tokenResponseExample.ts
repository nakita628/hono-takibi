export const TokenResponseExample = {
  value: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'inferno.read',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
    },
  },
}
