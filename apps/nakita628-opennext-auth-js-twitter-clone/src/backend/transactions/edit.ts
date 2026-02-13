import { Effect } from 'effect'
import { UnauthorizedError, ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export function update(
  email: string,
  args: {
    name?: string
    username?: string
    bio?: string
    coverImage?: string | null
    profileImage?: string | null
  },
) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const updated = yield* UserService.update(user.id, {
      name: args.name ?? user.name,
      username: args.username ?? user.username,
      bio: args.bio ?? user.bio,
      coverImage: args.coverImage !== undefined ? args.coverImage : user.coverImage,
      profileImage: args.profileImage !== undefined ? args.profileImage : user.profileImage,
    })

    const data = {
      id: updated.id,
      name: updated.name,
      username: updated.username,
      bio: updated.bio,
      email: updated.email,
      emailVerified: updated.emailVerified?.toISOString() ?? null,
      image: updated.image,
      coverImage: updated.coverImage,
      profileImage: updated.profileImage,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      hasNotification: updated.hasNotification,
    }

    const valid = UserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
}
