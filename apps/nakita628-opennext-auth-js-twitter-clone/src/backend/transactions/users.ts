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

    const profile = user.userProfile

    const data = {
      id: user.id,
      name: user.name,
      username: profile?.username ?? '',
      bio: profile?.bio ?? null,
      email: user.email,
      emailVerified: null,
      image: user.image ?? null,
      coverImage: profile?.coverImage ?? null,
      profileImage: profile?.profileImage ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      hasNotification: profile?.hasNotification ?? null,
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

    const data = users.map((u) => {
      const profile = u.userProfile
      return {
        id: u.id,
        name: u.name,
        username: profile?.username ?? '',
        bio: profile?.bio ?? null,
        email: u.email,
        emailVerified: null,
        image: u.image ?? null,
        coverImage: profile?.coverImage ?? null,
        profileImage: profile?.profileImage ?? null,
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString(),
        hasNotification: profile?.hasNotification ?? null,
      }
    })

    const valid = z.array(UserSchema).safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid users data' }))
    }
    return valid.data
  })
}
