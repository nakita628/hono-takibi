import { z } from '@hono/zod-openapi'
import { SecretRefSchema } from './secretRef'
import { MetaSchema } from './meta'

type SecretRotationType = {
  next?: z.infer<typeof SecretRefSchema>
  previous?: z.infer<typeof SecretRefSchema>
  meta?: z.infer<typeof MetaSchema>
}

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
