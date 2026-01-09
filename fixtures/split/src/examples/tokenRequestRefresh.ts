export const TokenRequestRefreshExample = {
  value: {
    grantType: 'refresh_token',
    refreshToken: 'refresh_xxx',
    trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
  },
}
