import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db'

type UserRow = InferSelectModel<typeof schema.user>
type UserProfileRow = InferSelectModel<typeof schema.userProfile>

export type UserWithProfile = UserRow & { userProfile: UserProfileRow | null }

export function makeFormatUser(user: UserWithProfile) {
  const profile = user.userProfile
  return {
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
  }
}
