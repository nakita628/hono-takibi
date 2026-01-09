import { z } from '@hono/zod-openapi'
import { CompanySchema } from './company'
import { OrderSchema } from './order'
import { PersonSchema } from './person'
import { ProductSchema } from './product'
import { UserSchema } from './user'

type EntityRefType =
  | z.infer<typeof UserSchema>
  | z.infer<typeof CompanySchema>
  | z.infer<typeof OrderSchema>
  | z.infer<typeof ProductSchema>
  | z.infer<typeof PersonSchema>

export const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({ description: 'A union that can point back to everything (more hell)' }),
  )
  .openapi('EntityRef')

export type EntityRef = z.infer<typeof EntityRefSchema>
