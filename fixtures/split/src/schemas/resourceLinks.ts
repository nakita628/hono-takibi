import { z } from '@hono/zod-openapi'
import { LinkSchema, type Link } from './link'

type ResourceLinksType = { [key: string]: Link }

export const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() => z.record(z.string(), LinkSchema))
  .openapi('ResourceLinks')

export type ResourceLinks = z.infer<typeof ResourceLinksSchema>
