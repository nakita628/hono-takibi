import type { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'

export const FileIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'fileId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type FileIdPathParamParams = z.infer<typeof FileIdPathParamParamsSchema>
