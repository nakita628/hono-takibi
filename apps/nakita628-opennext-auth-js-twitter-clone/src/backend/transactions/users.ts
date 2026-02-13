import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { NotFoundError, ValidationError } from '@/backend/domain'
import { UserSchema, UserWithFollowCountSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export function getById(userId: string) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByIdWithFollowCount(userId)
    if (!user) {
      return yield* Effect.fail(new NotFoundError({ message: 'User not found' }))
    }

    const data = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      email: user.email,
      emailVerified: user.emailVerified?.toISOString() ?? null,
      image: user.image,
      coverImage: user.coverImage,
      profileImage: user.profileImage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      hasNotification: user.hasNotification,
      _count: {
        followers: user.followers.length,
        following: user.following.length,
      },
    }

    const valid = UserWithFollowCountSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
}

export function getAll() {
  return Effect.gen(function* () {
    const users = yield* UserService.findAll()

    const data = users.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      bio: u.bio,
      email: u.email,
      emailVerified: u.emailVerified?.toISOString() ?? null,
      image: u.image,
      coverImage: u.coverImage,
      profileImage: u.profileImage,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
      hasNotification: u.hasNotification,
    }))

    const valid = z.array(UserSchema).safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid users data' }))
    }
    return valid.data
  })
}
