import { z } from '@hono/zod-openapi'
import { EntitySchema, type Entity } from './entity'
import { CompanySchema, type Company } from './company'
import { AddressSchema, type Address } from './address'

type PersonType = Entity & {
  displayName: string
  employer?: Company
  homeAddress?: Address
  friends?: PersonType[]
}

export const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          displayName: z.string(),
          employer: CompanySchema.exactOptional(),
          homeAddress: AddressSchema.exactOptional(),
          friends: z.array(PersonSchema).exactOptional(),
        })
        .openapi({ required: ['displayName'] }),
    ),
  )
  .openapi('Person')

export type Person = z.infer<typeof PersonSchema>
