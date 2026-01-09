import { z } from '@hono/zod-openapi'
import { GeoPointSchema, type GeoPoint } from './geoPoint'
import { UserSchema, type User } from './user'
import { PersonSchema, type Person } from './person'

type AddressType = {
  line1: string
  line2?: string
  city: string
  country?: string
  geo?: GeoPoint
  resident?: User | Person
}

export const AddressSchema: z.ZodType<AddressType> = z
  .lazy(() =>
    z
      .object({
        line1: z.string(),
        line2: z.string().exactOptional(),
        city: z.string(),
        country: z.string().exactOptional(),
        geo: GeoPointSchema.exactOptional(),
        resident: z.xor([UserSchema, PersonSchema]).exactOptional(),
      })
      .openapi({ required: ['line1', 'city'] }),
  )
  .openapi('Address')

export type Address = z.infer<typeof AddressSchema>
