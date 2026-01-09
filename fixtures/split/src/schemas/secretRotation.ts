import { z } from '@hono/zod-openapi'
import { SecretRefSchema, type SecretRef } from './secretRef'
import { MetaSchema, type Meta } from './meta'

type SecretRotationType = { next?: SecretRef; previous?: SecretRef; meta?: Meta }

export const SecretRotationSchema: z.ZodType<SecretRotationType> = z
  .lazy(() =>
    z.object({
      next: SecretRefSchema.exactOptional(),
      previous: SecretRefSchema.exactOptional(),
      meta: MetaSchema.exactOptional(),
    }),
  )
  .openapi('SecretRotation')

export type SecretRotation = z.infer<typeof SecretRotationSchema>
