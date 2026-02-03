import { z } from '@hono/zod-openapi'
import { CursorSchema, IdSchema, SearchFilterSchema, TraceIdSchema } from './schemas'
import {
  OrderFilterExample,
  UserFilterExample,
  UserIdUlidExample,
  UserIdUuidExample,
} from './examples'

import { z } from '@hono/zod-openapi'

export const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional().openapi({
  param: {
    name: 'x-trace-id',
    in: 'header',
    required: false,
    description: 'Correlation id (parameter) - schema refs TraceId',
    schema: { $ref: '#/components/schemas/TraceId' },
    example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
})

export type TraceIdHeaderParamParams = z.infer<typeof TraceIdHeaderParamParamsSchema>

export const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: { uuid: UserIdUuidExample, ulid: UserIdUlidExample },
  },
})

export type UserIdPathParamParams = z.infer<typeof UserIdPathParamParamsSchema>

export const CompanyIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'companyId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type CompanyIdPathParamParams = z.infer<typeof CompanyIdPathParamParamsSchema>

export const OrderIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'orderId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type OrderIdPathParamParams = z.infer<typeof OrderIdPathParamParamsSchema>

export const FileIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'fileId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type FileIdPathParamParams = z.infer<typeof FileIdPathParamParamsSchema>

export const LimitQueryParamParamsSchema = z
  .int()
  .min(1)
  .max(200)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, maximum: 200 },
      example: 50,
    },
  })

export type LimitQueryParamParams = z.infer<typeof LimitQueryParamParamsSchema>

export const CursorQueryParamParamsSchema = CursorSchema.exactOptional().openapi({
  param: {
    name: 'cursor',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Cursor' },
  },
})

export type CursorQueryParamParams = z.infer<typeof CursorQueryParamParamsSchema>

export const BuyerIdQueryParamParamsSchema = IdSchema.exactOptional().openapi({
  param: {
    name: 'buyerId',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type BuyerIdQueryParamParams = z.infer<typeof BuyerIdQueryParamParamsSchema>

export const IncludeQueryParamParamsSchema = z
  .array(
    z
      .enum(['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'])
      .exactOptional()
      .openapi({
        param: {
          name: 'include',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
            },
          },
          style: 'form',
          explode: true,
        },
      }),
  )
  .exactOptional()
  .openapi({
    param: {
      name: 'include',
      in: 'query',
      required: false,
      schema: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
        },
      },
      style: 'form',
      explode: true,
    },
  })

export type IncludeQueryParamParams = z.infer<typeof IncludeQueryParamParamsSchema>

export const SearchFilterQueryParamParamsSchema = SearchFilterSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    required: false,
    description:
      'JSON-encoded filter object in query param (content-based parameter).\n参照地獄: content -> schema -> unions -> full objects -> recursion\n',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SearchFilter' },
        examples: { userFilter: UserFilterExample, orderFilter: OrderFilterExample },
      },
    },
  },
})

export type SearchFilterQueryParamParams = z.infer<typeof SearchFilterQueryParamParamsSchema>
