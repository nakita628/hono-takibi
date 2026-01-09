import { z } from '@hono/zod-openapi'
import { LocaleSchema, type Locale } from './locale'
import { UserSchema, type User } from './user'

type UserPreferencesType = {
  locale?: Locale
  marketingOptIn?: boolean
  theme?: 'light' | 'dark' | 'system'
  shadowProfile?: User
}

export const UserPreferencesSchema: z.ZodType<UserPreferencesType> = z
  .lazy(() =>
    z.object({
      locale: LocaleSchema.exactOptional(),
      marketingOptIn: z.boolean().exactOptional(),
      theme: z.enum(['light', 'dark', 'system']).exactOptional(),
      shadowProfile: UserSchema.exactOptional(),
    }),
  )
  .openapi('UserPreferences')

export type UserPreferences = z.infer<typeof UserPreferencesSchema>
