import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { CompanySchema } from './company'
import { AddressSchema } from './address'

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
