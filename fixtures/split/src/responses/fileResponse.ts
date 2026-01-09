import { z } from '@hono/zod-openapi'
import { FileSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { FileExample } from '../examples'
import { GetUserFromFileLink } from '../links'

export const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
}
