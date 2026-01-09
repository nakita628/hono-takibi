import { z } from '@hono/zod-openapi'
import { SecretRotationSchema, type SecretRotation } from './secretRotation'

type SecretRefType = { secretId: string; rotation?: SecretRotation }

export const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({ secretId: z.string(), rotation: SecretRotationSchema.exactOptional() })
      .openapi({ required: ['secretId'] }),
  )
  .openapi('SecretRef')

export type SecretRef = z.infer<typeof SecretRefSchema>
