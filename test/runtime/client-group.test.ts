// A split application with a group named client (cases/client-group, generated from
// specs/client-group.yaml with `template.split`, `client` and `tanstack-query`).
//
// The document has the shape of a studio API: every route is tagged after its first
// segment, `schema`, `db` and `client`, under the base path `/api`. `client` is a group
// like the others. What this file checks is that the name takes nothing from it: the entry
// exports the group as `client`, the file of clients types `clientClient` by it, and the
// hooks and rpc functions of its routes call `clientClient`. The client of the routes that
// belong to no group, which would be `client`, is not written: there is no such route.
//
// client という名前のグループを持つ、分割されたアプリケーション(cases/client-group。
// specs/client-group.yaml から `template.split`・`client`・`tanstack-query` を指定して生成)。
//
// ドキュメントはスタジオ API の形をしている。すべてのルートが先頭セグメントと同名のタグ
// `schema`・`db`・`client` を持ち、ベースパスは `/api` である。`client` は他と同じグループ
// である。このファイルが確認するのは、その名前が何も奪われないことである。エントリはこの
// グループを `client` として export し、クライアントのファイルはそれで `clientClient` を
// 型付けし、そのルートのフックと rpc 関数は `clientClient` を呼び出す。どのグループにも
// 属さないルート用のクライアント `client` は書かれない。そのようなルートはないからである。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vite-plus/test'

import * as clients from '../__generated__/client-group/src/client'
import { clientClient, dbClient, schemaClient } from '../__generated__/client-group/src/client'
import app, { client, db, schema } from '../__generated__/client-group/src/index'
import { getClient, getDbCounts, postClientRun } from '../__generated__/client-group/src/rpc'

// The generated clients are created with the base URL "/", so a call is a request for a
// path, which the app answers without a server.
// 生成されたクライアントはベース URL "/" で作られるため、呼び出しはパスへのリクエストになる。
// アプリは、サーバーなしでこれに応答する。
const options = {
  fetch: (input: string | URL | Request, init?: RequestInit) => app.request(input, init),
}

// The generated files, read as they were written.
// 生成されたファイルを、書き出されたままの形で読む。
const generated = fileURLToPath(new URL('../__generated__/client-group/src', import.meta.url))
const source = (file: string) => fs.readFileSync(path.join(generated, file), 'utf8')

describe('entry: client is a group like the others', () => {
  // A group is what registering its routes on the app returns, which is the app.
  // グループは、アプリにルートを登録した結果として返される値であり、それはアプリ自身である。
  it('schema, db and client are the app', () => {
    expect(schema).toBe(app)
    expect(db).toBe(app)
    expect(client).toBe(app)
  })

  // The routes of client are registered under the base path like those of any group.
  // client のルートは、他のグループと同じくベースパスの下に登録されている。
  it('GET /api/client reaches the client group', async () => {
    const res = await app.request('/api/client')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ models: ['User', 'Post'] })
  })

  it('POST /api/client/run reaches the client group', async () => {
    const res = await app.request('/api/client/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'user.findMany()' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ result: 'ran user.findMany()' })
  })
})

describe('clients: the client of the group client is clientClient', () => {
  // One client per group, and none for the routes of no group: there is no such route, so
  // nothing is exported as client.
  // グループごとに1つのクライアントがあり、どのグループにも属さないルート用のものはない。
  // そのようなルートはないので、client として export されるものはない。
  it('exports schemaClient, dbClient and clientClient, and no client', () => {
    expect(Object.keys(clients).sort()).toStrictEqual(['clientClient', 'dbClient', 'schemaClient'])
  })

  // The entry exports the group as client, and the file of clients is typed by it.
  // エントリはこのグループを client として export し、クライアントのファイルはそれで型付けされる。
  it('the entry and the file of clients are written as follows', () => {
    expect(source('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getClientRoute, getDbCountsRoute, getSchemaRoute, postClientRunRoute } from './routes'
import {
  getClientRouteHandler,
  getDbCountsRouteHandler,
  getSchemaRouteHandler,
  postClientRunRouteHandler,
} from './handlers'

const app = new OpenAPIHono().basePath('/api')

export const schema = app.openapi(getSchemaRoute, getSchemaRouteHandler)

export const db = app.openapi(getDbCountsRoute, getDbCountsRouteHandler)

export const client = app
  .openapi(getClientRoute, getClientRouteHandler)
  .openapi(postClientRunRoute, postClientRunRouteHandler)

export default app
`)
    expect(source('client.ts')).toBe(`import { hc } from 'hono/client'
import type { schema, db, client } from './index'

type SchemaClient = ReturnType<typeof hc<typeof schema>>

const hcSchemaWithType = (...args: Parameters<typeof hc>): SchemaClient =>
  hc<typeof schema>(...args)

export const schemaClient = hcSchemaWithType('/').api

type DbClient = ReturnType<typeof hc<typeof db>>

const hcDbWithType = (...args: Parameters<typeof hc>): DbClient => hc<typeof db>(...args)

export const dbClient = hcDbWithType('/').api

type ClientClient = ReturnType<typeof hc<typeof client>>

const hcClientWithType = (...args: Parameters<typeof hc>): ClientClient =>
  hc<typeof client>(...args)

export const clientClient = hcClientWithType('/').api
`)
  })

  // clientClient is typed by the routes of client, base path included.
  // clientClient は、ベースパスを含む client のルートで型付けされている。
  it('clientClient requests /api/client', async () => {
    const requested: string[] = []
    const res = await clientClient.client.$get(undefined, {
      fetch: (input: string | URL | Request, init?: RequestInit) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return app.request(input, init)
      },
    })
    expect(requested).toStrictEqual(['/api/client'])
    expect(await res.json()).toStrictEqual({ models: ['User', 'Post'] })
  })

  // A request body travels through clientClient.
  // リクエストボディは、clientClient を通して送られる。
  it('clientClient posts /api/client/run', async () => {
    const res = await clientClient.client.run.$post({ json: { code: 'x' } }, options)
    expect(await res.json()).toStrictEqual({ result: 'ran x' })
  })

  // The other groups are untouched by the name.
  // 他のグループは、この名前の影響を受けない。
  it('schemaClient and dbClient request their routes', async () => {
    const schemaRes = await schemaClient.schema.$get(undefined, options)
    expect(await schemaRes.json()).toStrictEqual({ models: 3 })
    const dbRes = await dbClient.db.counts.$get(undefined, options)
    expect(await dbRes.json()).toStrictEqual({ rows: 42 })
  })
})

describe('rpc and hooks: the routes of client go through clientClient', () => {
  // The rpc functions of client resolve through clientClient.
  // client の rpc 関数は、clientClient を通して解決する。
  it('getClient and postClientRun resolve with their bodies', async () => {
    expect(await getClient(options)).toStrictEqual({ models: ['User', 'Post'] })
    expect(await postClientRun({ json: { code: 'y' } }, options)).toStrictEqual({ result: 'ran y' })
    expect(await getDbCounts(options)).toStrictEqual({ rows: 42 })
  })

  // The hooks import clientClient and call it for the routes of client. Were the group
  // folded into the routes of no group, they would import client and call client.client.
  // フックは clientClient を import し、client のルートに対してそれを呼び出す。もしこの
  // グループがどのグループにも属さないルートに吸われていれば、client を import して
  // client.client を呼び出していたはずである。
  it('the hooks call clientClient, not client', () => {
    expect(source('hooks/query.ts')).toBe(`import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { schemaClient, dbClient, clientClient } from '../client'

export function getClientKey() {
  return ['client'] as const
}

export function getDbKey() {
  return ['db'] as const
}

export function getSchemaKey() {
  return ['schema'] as const
}

export function getSchemaQueryKey() {
  return ['schema', '/schema'] as const
}

export function getSchemaQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getSchemaQueryKey>
  >({
    queryKey: getSchemaQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        schemaClient.schema.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useSchema<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getSchemaQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getSchemaQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseSchema<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof schemaClient.schema.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getSchemaQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getSchemaQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getDbCountsQueryKey() {
  return ['db', '/db/counts'] as const
}

export function getDbCountsQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getDbCountsQueryKey>
  >({
    queryKey: getDbCountsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        dbClient.db.counts.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useDbCounts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getDbCountsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getDbCountsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseDbCounts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof dbClient.db.counts.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getDbCountsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getDbCountsQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getClientQueryKey() {
  return ['client', '/client'] as const
}

export function getClientQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getClientQueryKey>
  >({
    queryKey: getClientQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        clientClient.client.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useClient<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getClientQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getClientQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseClient<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getClientQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getClientQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPostClientRunMutationKey() {
  return ['client', '/client/run', 'POST'] as const
}

export function getPostClientRunMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.run.$post>>>>
    >,
    TError,
    InferRequestType<typeof clientClient.client.run.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostClientRunMutationKey(),
    async mutationFn(args: InferRequestType<typeof clientClient.client.run.$post>) {
      return parseResponse(clientClient.client.run.$post(args, options))
    },
  })
}

export function usePostClientRun<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof clientClient.client.run.$post>>>
          >
        >,
        TError,
        InferRequestType<typeof clientClient.client.run.$post>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostClientRunMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
`)
  })
})
