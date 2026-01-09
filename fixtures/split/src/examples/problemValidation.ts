export const ProblemValidationExample = {
  value: {
    type: 'https://errors.inferno.example/problem/validation',
    title: 'Validation error',
    status: 400,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
    errors: [
      {
        path: 'email',
        message: 'Invalid email',
        nested: { path: 'email.domain', message: 'Domain is not allowed' },
      },
    ],
  },
}
