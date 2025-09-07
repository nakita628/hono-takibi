import { z } from '@hono/zod-openapi'

export const RoleSchema = z
  .enum(['attendee', 'speaker', 'lt-speaker', 'staff', 'sponsor', 'mc', 'ghost-wifi-fixer'])
  .openapi({
    description:
      "Event role. In code this corresponds to: roles?: ('attendee' | 'speaker' | 'lt-speaker' | 'staff' | 'sponsor' | 'mc' | 'ghost-wifi-fixer')[]",
  })
  .openapi('Role')

export type Role = z.infer<typeof RoleSchema>
