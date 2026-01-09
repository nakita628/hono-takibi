import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { LinkSchema } from './link'
import { UserSchema } from './user'

export const FileSchema = EntitySchema.and(
  z
    .object({
      name: z.string(),
      size: z.int().min(0),
      contentType: z.string().exactOptional(),
      download: LinkSchema.exactOptional(),
      owner: UserSchema.exactOptional(),
    })
    .openapi({ required: ['name', 'size'] }),
).openapi('File')

export type File = z.infer<typeof FileSchema>
