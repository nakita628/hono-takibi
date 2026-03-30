import { Effect } from 'effect'

import { ContractViolationError, UnauthorizedError } from '@/errors'
import { CurrentUserSchema } from '@/server/routes'
import * as UserService from '@/server/services/user'

export function get(userId: string) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByIdWithFollows(userId)
    if (user == null) {
      return yield* new UnauthorizedError({ message: 'Unauthorized' })
    }

    const profile = user.userProfile

    const valid = CurrentUserSchema.safeParse({
      id: user.id,
      name: user.name,
      username: profile?.username ?? '',
      bio: profile?.bio ?? null,
      email: user.email,
      image: user.image,
      coverImage: profile?.coverImage ?? null,
      profileImage: profile?.profileImage ?? null,
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
      hasNotification: profile?.hasNotification ?? null,
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid current user data' })
    }
    return valid.data
  })
}
