import { eq } from 'drizzle-orm'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'
import { ConflictError, DatabaseError, NotFoundError } from '@/backend/domain'
import { db, schema } from '@/db'

export function exists(args: { email: string }) {
  return ResultAsync.fromPromise(
    db.select().from(schema.users).where(eq(schema.users.email, args.email)).get(),
    () => new DatabaseError('Database error'),
  ).andThen((user) => {
    if (!user) {
      return okAsync(null)
    }
    return errAsync(new ConflictError('Email already exists'))
  })
}

export function create(args: {
  email: string
  name: string
  username: string
  hashedPassword: string
}) {
  return ResultAsync.fromPromise(
    db.insert(schema.users).values(args).returning().get(),
    () => new DatabaseError('Database error'),
  )
}
