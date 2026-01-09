export const TokenRequestClientCredentialsExample = {
  value: {
    grantType: 'client_credentials',
    clientId: 'client_123',
    clientSecret: 'secret_abc',
    trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
  },
}
