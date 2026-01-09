import { z } from '@hono/zod-openapi'
import { EntitySchema, type Entity } from './entity'
import { CompanySchema, type Company } from './company'
import { AddressSchema, type Address } from './address'
import { UserPreferencesSchema, type UserPreferences } from './userPreferences'
import { OrderSchema, type Order } from './order'
import { ResourceLinksSchema, type ResourceLinks } from './resourceLinks'

type UserType = Entity & {
  name: string
  email: string
  company?: Company
  manager?: UserType
  reports?: UserType[]
  addresses?: Address[]
  preferences?: UserPreferences
  recentOrders?: Order[]
  links?: ResourceLinks
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
