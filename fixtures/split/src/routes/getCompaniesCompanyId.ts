import { createRoute, z } from '@hono/zod-openapi'
import {
  CompanyIdPathParamParamsSchema,
  IncludeQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'
import { CompanyResponse, DefaultErrorResponse, NotFoundResponse } from '../responses'

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
  responses: { 200: CompanyResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
