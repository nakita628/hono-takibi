import { z } from '@hono/zod-openapi'
import { EntitySchema, type Entity } from './entity'
import { AddressSchema, type Address } from './address'
import { UserSchema, type User } from './user'
import { PersonSchema, type Person } from './person'

type CompanyType = Entity & {
  name: string
  headquarters?: Address
  parent?: CompanyType
  subsidiaries?: CompanyType[]
  employees?: User[]
  primaryContact?: Person
}

export const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          headquarters: AddressSchema.exactOptional(),
          parent: CompanySchema.exactOptional(),
          subsidiaries: z.array(CompanySchema).exactOptional(),
          employees: z.array(UserSchema).exactOptional(),
          primaryContact: PersonSchema.exactOptional(),
        })
        .openapi({ required: ['name'] }),
    ),
  )
  .openapi('Company')

export type Company = z.infer<typeof CompanySchema>
