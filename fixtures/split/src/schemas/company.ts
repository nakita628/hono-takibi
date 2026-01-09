import { z } from '@hono/zod-openapi'
import { AddressSchema } from './address'
import { EntitySchema } from './entity'
import { PersonSchema } from './person'
import { UserSchema } from './user'

type CompanyType = z.infer<typeof EntitySchema> & {
  name: string
  headquarters?: z.infer<typeof AddressSchema>
  parent?: CompanyType
  subsidiaries?: CompanyType[]
  employees?: z.infer<typeof UserSchema>[]
  primaryContact?: z.infer<typeof PersonSchema>
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
