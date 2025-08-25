type NotFound = Readonly<{ kind: 'NOT_FOUND'; message: string }>
type DBError = Readonly<{ kind: 'DB_ERROR'; message: string }>
type InternalServerError = Readonly<{ kind: 'INTERNAL_SERVER_ERROR'; message: string }>
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
  return { body: { message: 'Internal Server Error' } as const, status: 500 as const }
}
