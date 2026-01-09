import { z } from '@hono/zod-openapi'
import { AddressSchema } from './address'
import { CompanySchema } from './company'
import { EntitySchema } from './entity'

type PersonType = z.infer<typeof EntitySchema> & {
  displayName: string
  employer?: z.infer<typeof CompanySchema>
  homeAddress?: z.infer<typeof AddressSchema>
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
