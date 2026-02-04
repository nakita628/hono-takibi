import { z } from '@hono/zod-openapi'
import { CompanySchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { CompanyExample } from '../examples'
import { GetCompanyLink } from '../links'

export const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
}
