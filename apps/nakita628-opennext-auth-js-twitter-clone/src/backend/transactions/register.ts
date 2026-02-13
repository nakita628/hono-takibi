import bcrypt from 'bcryptjs'
import { Effect } from 'effect'
import { ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export function create(args: { email: string; name: string; username: string; password: string }) {
  return Effect.gen(function* () {
    const hashedPassword = yield* Effect.tryPromise({
      try: () => bcrypt.hash(args.password, 12),
      catch: () => new ValidationError({ message: 'Failed to hash password' }),
    })

    yield* UserService.exists({ email: args.email })

    const user = yield* UserService.create({ ...args, hashedPassword })

    const data = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
    const valid = UserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
}
