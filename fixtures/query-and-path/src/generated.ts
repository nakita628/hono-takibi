import { createRoute, z } from '@hono/zod-openapi'

const IdEchoSchema = z
  .object({ id: z.int(), type: z.string() })
  .openapi({ required: ['id', 'type'] })
  .openapi('IdEcho')

const BigIntEchoSchema = z
  .object({ id: z.string(), type: z.string() })
  .openapi({ required: ['id', 'type'] })
  .openapi('BigIntEcho')

const NumberEchoSchema = z
  .object({ value: z.number(), type: z.string() })
  .openapi({ required: ['value', 'type'] })
  .openapi('NumberEcho')

const BooleanEchoSchema = z
  .object({ flag: z.boolean(), type: z.string() })
  .openapi({ required: ['flag', 'type'] })
  .openapi('BooleanEcho')

const MixedEchoSchema = z
  .object({ id: z.int(), idType: z.string(), flag: z.boolean(), flagType: z.string() })
  .openapi({ required: ['id', 'idType', 'flag', 'flagType'] })
  .openapi('MixedEcho')

const SearchEchoSchema = z
  .object({
    q: z.string(),
    qType: z.string(),
    limit: z.int(),
    limitType: z.string(),
    price: z.number(),
    priceType: z.string(),
    active: z.boolean(),
    activeType: z.string(),
  })
  .openapi({
    required: ['q', 'qType', 'limit', 'limitType', 'price', 'priceType', 'active', 'activeType'],
  })
  .openapi('SearchEcho')

const OptionalEchoSchema = z
  .object({ limit: z.int(), limitType: z.string(), active: z.boolean(), activeType: z.string() })
  .openapi({ required: ['limit', 'limitType', 'active', 'activeType'] })
  .openapi('OptionalEcho')

const ArrayEchoSchema = z
  .object({
    ids: z.array(z.int()),
    idsTypes: z.array(z.string()),
    flags: z.array(z.boolean()),
    flagsTypes: z.array(z.string()),
  })
  .openapi({ required: ['ids', 'idsTypes', 'flags', 'flagsTypes'] })
  .openapi('ArrayEcho')

export const getItemsIntegerIdRoute = createRoute({
  method: 'get',
  path: '/items/integer/{id}',
  operationId: 'getItemByIntegerId',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: IdEchoSchema } } },
  },
})

export const getItemsInt32IdRoute = createRoute({
  method: 'get',
  path: '/items/int32/{id}',
  operationId: 'getItemByInt32Id',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .pipe(z.int32())
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: IdEchoSchema } } },
  },
})

export const getItemsInt64IdRoute = createRoute({
  method: 'get',
  path: '/items/int64/{id}',
  operationId: 'getItemByInt64Id',
  request: {
    params: z.object({
      id: z.coerce
        .bigint()
        .pipe(z.int64())
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BigIntEchoSchema } } },
  },
})

export const getItemsNumberValueRoute = createRoute({
  method: 'get',
  path: '/items/number/{value}',
  operationId: 'getItemByNumber',
  request: {
    params: z.object({
      value: z.coerce
        .number()
        .openapi({
          param: { name: 'value', in: 'path', required: true, schema: { type: 'number' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NumberEchoSchema } } },
  },
})

export const getItemsBooleanFlagRoute = createRoute({
  method: 'get',
  path: '/items/boolean/{flag}',
  operationId: 'getItemByBoolean',
  request: {
    params: z.object({
      flag: z
        .stringbool()
        .openapi({
          param: { name: 'flag', in: 'path', required: true, schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BooleanEchoSchema } } },
  },
})

export const getItemsMixedIdSubFlagRoute = createRoute({
  method: 'get',
  path: '/items/mixed/{id}/sub/{flag}',
  operationId: 'getMixedPath',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
      flag: z
        .stringbool()
        .openapi({
          param: { name: 'flag', in: 'path', required: true, schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: MixedEchoSchema } } },
  },
})

export const getQIntegerRoute = createRoute({
  method: 'get',
  path: '/q/integer',
  operationId: 'qInteger',
  request: {
    query: z.object({
      v: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'v', in: 'query', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: IdEchoSchema } } },
  },
})

export const getQInt32Route = createRoute({
  method: 'get',
  path: '/q/int32',
  operationId: 'qInt32',
  request: {
    query: z.object({
      v: z.coerce
        .number()
        .pipe(z.int32())
        .openapi({
          param: {
            name: 'v',
            in: 'query',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: IdEchoSchema } } },
  },
})

export const getQInt64Route = createRoute({
  method: 'get',
  path: '/q/int64',
  operationId: 'qInt64',
  request: {
    query: z.object({
      v: z.coerce
        .bigint()
        .pipe(z.int64())
        .openapi({
          param: {
            name: 'v',
            in: 'query',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BigIntEchoSchema } } },
  },
})

export const getQNumberRoute = createRoute({
  method: 'get',
  path: '/q/number',
  operationId: 'qNumber',
  request: {
    query: z.object({
      v: z.coerce
        .number()
        .openapi({ param: { name: 'v', in: 'query', required: true, schema: { type: 'number' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NumberEchoSchema } } },
  },
})

export const getQBooleanRoute = createRoute({
  method: 'get',
  path: '/q/boolean',
  operationId: 'qBoolean',
  request: {
    query: z.object({
      v: z
        .stringbool()
        .openapi({
          param: { name: 'v', in: 'query', required: true, schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BooleanEchoSchema } } },
  },
})

export const getQMixedRoute = createRoute({
  method: 'get',
  path: '/q/mixed',
  operationId: 'qMixed',
  request: {
    query: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'query', required: true, schema: { type: 'integer' } },
        }),
      flag: z
        .stringbool()
        .openapi({
          param: { name: 'flag', in: 'query', required: true, schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: MixedEchoSchema } } },
  },
})

export const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  operationId: 'search',
  request: {
    query: z.object({
      q: z
        .string()
        .openapi({ param: { name: 'q', in: 'query', required: true, schema: { type: 'string' } } }),
      limit: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'limit', in: 'query', required: true, schema: { type: 'integer' } },
        }),
      price: z.coerce
        .number()
        .openapi({
          param: { name: 'price', in: 'query', required: true, schema: { type: 'number' } },
        }),
      active: z
        .stringbool()
        .openapi({
          param: { name: 'active', in: 'query', required: true, schema: { type: 'boolean' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SearchEchoSchema } } },
  },
})

export const getSearchOptionalRoute = createRoute({
  method: 'get',
  path: '/search/optional',
  operationId: 'searchOptional',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', default: 10 },
          },
        }),
      active: z
        .stringbool()
        .default(true)
        .exactOptional()
        .openapi({
          param: {
            name: 'active',
            in: 'query',
            required: false,
            schema: { type: 'boolean', default: true },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: OptionalEchoSchema } } },
  },
})

export const getSearchArrayRoute = createRoute({
  method: 'get',
  path: '/search/array',
  operationId: 'searchArray',
  request: {
    query: z.object({
      ids: z
        .array(
          z.coerce
            .number()
            .int()
            .openapi({
              param: {
                name: 'ids',
                in: 'query',
                required: true,
                explode: true,
                schema: { type: 'array', items: { type: 'integer' } },
              },
            }),
        )
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            required: true,
            explode: true,
            schema: { type: 'array', items: { type: 'integer' } },
          },
        }),
      flags: z
        .array(
          z
            .stringbool()
            .openapi({
              param: {
                name: 'flags',
                in: 'query',
                required: true,
                explode: true,
                schema: { type: 'array', items: { type: 'boolean' } },
              },
            }),
        )
        .openapi({
          param: {
            name: 'flags',
            in: 'query',
            required: true,
            explode: true,
            schema: { type: 'array', items: { type: 'boolean' } },
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ArrayEchoSchema } } },
  },
})
