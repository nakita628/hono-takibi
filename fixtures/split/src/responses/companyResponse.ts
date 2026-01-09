import { z } from '@hono/zod-openapi'
import { CompanyExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetCompanyLink } from '../links'
import { CompanySchema } from '../schemas'

export const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
}
