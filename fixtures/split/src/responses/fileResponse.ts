import { z } from '@hono/zod-openapi'
import { FileExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetUserFromFileLink } from '../links'
import { FileSchema } from '../schemas'

export const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
}
