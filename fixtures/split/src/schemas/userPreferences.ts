import { z } from '@hono/zod-openapi'
import { LocaleSchema } from './locale'
import { UserSchema } from './user'

type UserPreferencesType = {
  locale?: z.infer<typeof LocaleSchema>
  marketingOptIn?: boolean
  theme?: 'light' | 'dark' | 'system'
  shadowProfile?: z.infer<typeof UserSchema>
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
