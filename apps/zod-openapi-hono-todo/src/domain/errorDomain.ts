type NotFound = { readonly kind: 'NOT_FOUND'; readonly message: string }
type DBError = { readonly kind: 'DB_ERROR'; readonly message: string }
type InternalServerError = { readonly kind: 'INTERNAL_SERVER_ERROR'; readonly message: string }
export type AppError = DBError | NotFound | InternalServerError

export function dbErr(e: unknown): AppError {
  if (e instanceof Error) {
    return { kind: 'DB_ERROR', message: 'DB Connection Error' } as const
  }
  return { kind: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' } as const
}

export function makeErr(e: AppError) {
  if (e.kind === 'NOT_FOUND') {
    return { body: { message: e.message } as const, status: 404 as const }
  }
  if (e.kind === 'DB_ERROR') {
    return { body: { message: e.message } as const, status: 503 as const }
  }
  if (e.kind === 'INTERNAL_SERVER_ERROR') {
    return { body: { message: e.message } as const, status: 500 as const }
  }
  return { body: { message: 'Internal Server Error' } as const, status: 500 as const }
}
