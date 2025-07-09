import { createRoute, z } from '@hono/zod-openapi'

export const postIsoDatetime = createRoute({
  method: 'post',
  path: '/iso-datetime',
  summary: 'Post ISO DateTime',
  description: 'Accepts an ISO DateTime string and returns it.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            iso_datetime: z.iso.datetime(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z.object({
            datetime: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: { 'application/json': { schema: z.object({ error: z.string() }).partial() } },
    },
  },
})
