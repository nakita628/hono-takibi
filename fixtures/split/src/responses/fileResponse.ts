import { z } from '@hono/zod-openapi'
import { FileSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { FileExampleExample } from '../examples'
import { GetUserFromFileLinkLink } from '../links'

export const FileResponseResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExampleExample } } },
  links: { owner: GetUserFromFileLinkLink },
}
