import { Effect } from 'effect'
import { UnauthorizedError, ValidationError } from '@/backend/domain'
import { CurrentUserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

export const get = (email: string) =>
  Effect.gen(function* () {
    const user = yield* UserService.findByEmailWithFollows(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const data = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      email: user.email,
      image: user.image,
      coverImage: user.coverImage,
      profileImage: user.profileImage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      followers: user.followers.map((f) => ({
        followerId: f.followerId,
        followingId: f.followingId,
        createdAt: f.createdAt.toISOString(),
      })),
      following: user.following.map((f) => ({
        followerId: f.followerId,
        followingId: f.followingId,
        createdAt: f.createdAt.toISOString(),
      })),
      hasNotification: user.hasNotification,
    }

    const valid = CurrentUserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid current user data' }))
    }
    return valid.data
  })
