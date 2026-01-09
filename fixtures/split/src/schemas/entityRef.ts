import { z } from '@hono/zod-openapi'
import { UserSchema, type User } from './user'
import { CompanySchema, type Company } from './company'
import { OrderSchema, type Order } from './order'
import { ProductSchema, type Product } from './product'
import { PersonSchema, type Person } from './person'

type EntityRefType = User | Company | Order | Product | Person

export const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({ description: 'A union that can point back to everything (more hell)' }),
  )
  .openapi('EntityRef')

export type EntityRef = z.infer<typeof EntityRefSchema>
