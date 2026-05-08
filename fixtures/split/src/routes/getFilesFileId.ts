import { createRoute, z } from '@hono/zod-openapi'
import { FileIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema } from '../parameters'
import { DefaultErrorResponse, FileResponseResponse, NotFoundResponse } from '../responses'

export const getFilesFileIdRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'Get file metadata',
  operationId: 'getFileById',
  request: {
    params: z.object({ fileId: FileIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
  },
  responses: { 200: FileResponseResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
