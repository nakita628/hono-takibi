import { createRoute, z } from '@hono/zod-openapi'

export const postIsoDateRoute = createRoute({
  method: 'post',
  path: '/date/iso-date',
  summary: 'Post ISO Date',
  description: 'Accepts an ISO Date string and returns it.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            iso_date: z.iso.date(),
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
            date: z.string(),
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

export const postIsoDatetimeRoute = createRoute({
  method: 'post',
  path: '/date/iso-datetime',
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
