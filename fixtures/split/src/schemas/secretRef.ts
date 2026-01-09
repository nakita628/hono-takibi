import { z } from '@hono/zod-openapi'
import { SecretRotationSchema } from './secretRotation'

type SecretRefType = { secretId: string; rotation?: z.infer<typeof SecretRotationSchema> }

export const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({ secretId: z.string(), rotation: SecretRotationSchema.exactOptional() })
      .openapi({ required: ['secretId'] }),
  )
  .openapi('SecretRef')

export type SecretRef = z.infer<typeof SecretRefSchema>
