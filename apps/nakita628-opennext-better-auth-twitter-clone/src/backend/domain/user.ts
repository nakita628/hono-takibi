import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db'

type UserRow = InferSelectModel<typeof schema.user>
type UserProfileRow = InferSelectModel<typeof schema.userProfile>

/** A `user` row joined with its optional `userProfile` row. */
export type UserWithProfile = UserRow & { userProfile: UserProfileRow | null }

/**
 * Convert a {@link UserWithProfile} into a public API-safe object.
 *
 * Omits sensitive fields (email, emailVerified) for public display.
 */
export const makeFormatPublicUser = (user: UserWithProfile) => {
  const profile = user.userProfile
  return {
    id: user.id,
    name: user.name,
    username: profile?.username ?? '',
    bio: profile?.bio ?? null,
    image: user.image ?? null,
    coverImage: profile?.coverImage ?? null,
    profileImage: profile?.profileImage ?? null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

/**
 * Convert a {@link UserWithProfile} into a flat API-safe object.
 *
 * Merges profile fields (username, bio, images) into the top-level user shape
 * and serialises `Date` fields to ISO strings. Includes sensitive fields for
 * authenticated user responses (edit, register, current).
 */
export const makeFormatUser = (user: UserWithProfile) => {
  const profile = user.userProfile
  return {
    ...makeFormatPublicUser(user),
    email: user.email,
    emailVerified: user.emailVerified ? user.createdAt.toISOString() : null,
  }
}
