import bcrypt from 'bcryptjs'
import { err, ok } from 'neverthrow'
import { ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export async function create(args: {
  email: string
  name: string
  username: string
  password: string
}) {
  const hashedPassword = await bcrypt.hash(args.password, 12)

  return UserService.exists({ email: args.email }).andThen(() => {
    return UserService.create({ ...args, hashedPassword }).andThen((user) => {
      const data = {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }
      const valid = UserSchema.safeParse(data)

      if (!valid.success) {
        return err(new ValidationError('Invalid user data'))
      }
      return ok(valid.data)
    })
  })
}
