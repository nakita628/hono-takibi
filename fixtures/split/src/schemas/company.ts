import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { AddressSchema } from './address'
import { UserSchema } from './user'
import { PersonSchema } from './person'

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
