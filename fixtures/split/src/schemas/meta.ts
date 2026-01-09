import { z } from '@hono/zod-openapi'
import { TraceContextSchema, type TraceContext } from './traceContext'
import { ResourceLinksSchema, type ResourceLinks } from './resourceLinks'

type MetaType = {
  createdAt: string
  updatedAt?: string
  trace?: TraceContext
  links?: ResourceLinks
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
