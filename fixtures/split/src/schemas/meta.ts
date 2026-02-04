import { z } from '@hono/zod-openapi'
import { TraceContextSchema } from './traceContext'
import { ResourceLinksSchema } from './resourceLinks'

type MetaType = {
  createdAt: string
  updatedAt?: string
  trace?: z.infer<typeof TraceContextSchema>
  links?: z.infer<typeof ResourceLinksSchema>
}

export const MetaSchema: z.ZodType<MetaType> = z
  .lazy(() =>
    z
      .object({
        createdAt: z.iso.datetime(),
        updatedAt: z.iso.datetime().exactOptional(),
        trace: TraceContextSchema.exactOptional(),
        links: ResourceLinksSchema.exactOptional(),
      })
      .openapi({ required: ['createdAt'] }),
  )
  .openapi('Meta')

export type Meta = z.infer<typeof MetaSchema>
