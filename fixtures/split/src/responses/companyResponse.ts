import { z } from '@hono/zod-openapi'
import { CompanySchema } from '../schemas'
import { CompanyExampleExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetCompanyLinkLink } from '../links'

export const CompanyResponseResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: CompanySchema, examples: { company: CompanyExampleExample } },
  },
  links: { self: GetCompanyLinkLink },
}
