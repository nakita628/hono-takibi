import { createRoute, z } from '@hono/zod-openapi'

export const getStringRoute = createRoute({
  method: 'get',
  path: '/string',
  summary: 'zod string',
  description: 'zod string',
  responses: {
    200: {
      description: 'zod string',
      content: {
        'application/json': {
          schema: z
            .object({
              max_string: z.string().max(5).optional().openapi({ type: 'string', maxLength: 5 }),
              min_string: z.string().min(5).optional().openapi({ type: 'string', minLength: 5 }),
              length_string: z
                .string()
                .length(5)
                .optional()
                .openapi({ type: 'string', minLength: 5, maxLength: 5 }),
              email_string: z.email().optional().openapi({ type: 'string', format: 'email' }),
              url_string: z.url().optional().openapi({ type: 'string', format: 'uri' }),
              uuid_string: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
              nanoid_string: z.string().optional().openapi({ type: 'string' }),
              cuid_string: z.cuid().optional().openapi({ type: 'string', format: 'cuid' }),
              ulid_string: z.ulid().optional().openapi({ type: 'string', format: 'ulid' }),
              regex_string: z
                .string()
                .regex(/^d+$/)
                .optional()
                .openapi({ type: 'string', pattern: '^d+$' }),
              includes_string: z.string().optional().openapi({ type: 'string' }),
              startsWith_string: z.string().optional().openapi({ type: 'string' }),
              endsWith_string: z.string().optional().openapi({ type: 'string' }),
              datetime_string: z.iso
                .datetime()
                .optional()
                .openapi({ type: 'string', format: 'date-time' }),
              ip_string: z.string().optional().openapi({ type: 'string', format: 'ip' }),
              cidr_string: z.string().optional().openapi({ type: 'string' }),
              trim_string: z.string().optional().openapi({ type: 'string' }),
              toLowerCase_string: z.string().optional().openapi({ type: 'string' }),
              toUpperCase_string: z.string().optional().openapi({ type: 'string' }),
              date_string: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
              time_string: z.string().optional().openapi({ type: 'string' }),
              duration_string: z.string().optional().openapi({ type: 'string' }),
              base64_string: z.string().optional().openapi({ type: 'string' }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: {
                max_string: { type: 'string', maxLength: 5 },
                min_string: { type: 'string', minLength: 5 },
                length_string: { type: 'string', minLength: 5, maxLength: 5 },
                email_string: { type: 'string', format: 'email' },
                url_string: { type: 'string', format: 'uri' },
                uuid_string: { type: 'string', format: 'uuid' },
                nanoid_string: { type: 'string' },
                cuid_string: { type: 'string', format: 'cuid' },
                ulid_string: { type: 'string', format: 'ulid' },
                regex_string: { type: 'string', pattern: '^d+$' },
                includes_string: { type: 'string' },
                startsWith_string: { type: 'string' },
                endsWith_string: { type: 'string' },
                datetime_string: { type: 'string', format: 'date-time' },
                ip_string: { type: 'string', format: 'ip' },
                cidr_string: { type: 'string' },
                trim_string: { type: 'string' },
                toLowerCase_string: { type: 'string' },
                toUpperCase_string: { type: 'string' },
                date_string: { type: 'string', format: 'date' },
                time_string: { type: 'string' },
                duration_string: { type: 'string' },
                base64_string: { type: 'string' },
              },
            }),
        },
      },
    },
  },
})
