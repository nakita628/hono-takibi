import { z } from '@hono/zod-openapi'
import { LinkSchema } from './link'

type ResourceLinksType = { [key: string]: z.infer<typeof LinkSchema> }

export const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() => z.record(z.string(), LinkSchema))
  .openapi('ResourceLinks')

export type ResourceLinks = z.infer<typeof ResourceLinksSchema>
