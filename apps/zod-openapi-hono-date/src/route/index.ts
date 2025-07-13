import { createRoute, z } from '@hono/zod-openapi'

export const DateSchema = z.object({
  date: z.date(),
})

export const IsoDateSchema = z.object({
  iso_date: z.iso.date(),
})

export const IsoDatetimeSchema = z.object({
  iso_datetime: z.iso.datetime(),
})

export const dateRoute = createRoute({
  method: 'post',
  path: '/date',
  summary: 'Post Date',
  description: 'Accepts a date string and returns it.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            date: z.coerce.date(),
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
          schema: DateSchema,
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: { 'application/json': { schema: z.object({ error: z.string() }).partial() } },
    },
  },
})

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
          schema: IsoDateSchema,
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
          schema: IsoDatetimeSchema,
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: { 'application/json': { schema: z.object({ error: z.string() }).partial() } },
    },
  },
})
