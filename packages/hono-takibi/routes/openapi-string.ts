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
          schema: z.object({
            max_string: z.string().max(5),
            min_string: z.string().min(5),
            length_string: z.string().length(5),
            email_string: z.email(),
            url_string: z.url(),
            uuid_string: z.uuid(),
            nanoid_string: z.string(),
            cuid_string: z.cuid(),
            ulid_string: z.ulid(),
            regex_string: z.string().regex(/^d+$/),
            includes_string: z.string(),
            startsWith_string: z.string(),
            endsWith_string: z.string(),
            datetime_string: z.iso.datetime(),
            ip_string: z.string(),
            cidr_string: z.string(),
            trim_string: z.string(),
            toLowerCase_string: z.string(),
            toUpperCase_string: z.string(),
            date_string: z.iso.date(),
            time_string: z.string(),
            duration_string: z.string(),
            base64_string: z.string(),
          }),
        },
      },
    },
  },
})
