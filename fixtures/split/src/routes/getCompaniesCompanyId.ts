import { createRoute, z } from '@hono/zod-openapi'
import { CompanyResponseResponse, DefaultErrorResponse, NotFoundResponse } from '../responses'
import {
  CompanyIdPathParamParamsSchema,
  IncludeQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'

export const getCompaniesCompanyIdRoute = createRoute({
  method: 'get',
  path: '/companies/{companyId}',
  tags: ['Companies'],
  summary: 'Get company by id',
  operationId: 'getCompanyById',
  request: {
    params: z.object({ companyId: CompanyIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: CompanyResponseResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
