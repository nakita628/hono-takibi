export function dbError(e: unknown) {
  if (e instanceof Error) {
    return { kind: 'DatabaseError', message: e.message, cause: e.cause } as const
  }
  return { kind: 'DatabaseError', message: 'Unknown database error', cause: undefined } as const
}
