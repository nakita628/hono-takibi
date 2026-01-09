import { z } from '@hono/zod-openapi'
import { AddressSchema } from './address'
import { CompanySchema } from './company'
import { EntitySchema } from './entity'
import { OrderSchema } from './order'
import { ResourceLinksSchema } from './resourceLinks'
import { UserPreferencesSchema } from './userPreferences'

type UserType = z.infer<typeof EntitySchema> & {
  name: string
  email: string
  company?: z.infer<typeof CompanySchema>
  manager?: UserType
  reports?: UserType[]
  addresses?: z.infer<typeof AddressSchema>[]
  preferences?: z.infer<typeof UserPreferencesSchema>
  recentOrders?: z.infer<typeof OrderSchema>[]
  links?: z.infer<typeof ResourceLinksSchema>
}

export const UserSchema: z.ZodType<UserType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          email: z.email(),
          company: CompanySchema.exactOptional(),
          manager: UserSchema.exactOptional(),
          reports: z.array(UserSchema).exactOptional(),
          addresses: z.array(AddressSchema).exactOptional(),
          preferences: UserPreferencesSchema.exactOptional(),
          recentOrders: z.array(OrderSchema).exactOptional(),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({ required: ['name', 'email'] }),
    ),
  )
  .openapi('User')

export type User = z.infer<typeof UserSchema>
