export const ProblemGenericExample = {
  value: {
    type: 'https://errors.inferno.example/problem/generic',
    title: 'Something went wrong',
    status: 500,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    causes: [
      { type: 'https://errors.inferno.example/problem/inner', title: 'Inner failure', status: 500 },
    ],
  },
}
