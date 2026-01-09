import { z } from '@hono/zod-openapi'
import { MetaSchema, type Meta } from './meta'

type LinkType = { href: string; rel?: string; meta?: Meta; next?: LinkType }

export const LinkSchema: z.ZodType<LinkType> = z
  .lazy(() =>
    z
      .object({
        href: z.string(),
        rel: z.string().exactOptional(),
        meta: MetaSchema.exactOptional(),
        next: LinkSchema.exactOptional(),
      })
      .openapi({ required: ['href'] }),
  )
  .openapi('Link')

export type Link = z.infer<typeof LinkSchema>
