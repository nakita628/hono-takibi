import bcrypt from 'bcryptjs'
import { err, ok } from 'neverthrow'
import { ConflictError, ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export async function create(args: {
  email: string
  name: string
  username: string
  password: string
}) {
  const hashedPassword = await bcrypt.hash(args.password, 12)

  return UserService.get(args).andThen((user) => {
    if (user) {
      return err(new ConflictError('User already exists'))
    }
    return UserService.create({ ...args, hashedPassword }).andThen((user) => {
      const data = {
        id: user.id,
        name: user.name,
        username: user.username,
        ...(user.bio != null ? { bio: user.bio } : {}),
        email: user.email,
        emailVerified: user.emailVerified?.toISOString() ?? null,
        image: user.image,
        coverImage: user.coverImage,
        profileImage: user.profileImage,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        ...(user.hasNotification != null ? { hasNotification: user.hasNotification } : {}),
      }
      const valid = UserSchema.safeParse(data)

      if (!valid.success) {
        return err(new ValidationError('Invalid user data'))
      }
      return ok(valid.data)
    })
  })
}
