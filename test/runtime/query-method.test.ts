// The outputs generated from an OpenAPI 3.2 `query` operation (cases/query-method,
// generated from specs/query-method.yaml), run against the host in
// hosts/query-method-app.ts.
//
// QUERY is the HTTP method that is safe like GET and carries a body like POST. The spec
// declares a GET and a QUERY on the same path, `/users`, so the generated outputs have to
// tell the two apart: by name (`getUsers` / `queryUsers`), by the client method they call
// (`$get` / `$query`), and by cache key.
//
// OpenAPI 3.2 の `query` オペレーションから生成された出力の検証(cases/query-method。
// specs/query-method.yaml から生成)。hosts/query-method-app.ts のホストに対して実行する。
//
// QUERY は、GET のように安全で、POST のようにボディを持つ HTTP メソッドである。仕様では
// 同じパス `/users` に GET と QUERY の両方を宣言しているため、生成される出力はこの2つを
// 区別できなければならない。区別は、名前(`getUsers` / `queryUsers`)、呼び出すクライアント
// メソッド(`$get` / `$query`)、およびキャッシュキーによって行われる。
import { QueryClient } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { getUsers, queryUsers } from '../__generated__/query-method/rpc'
import { getQueryUsersInfiniteKey, getQueryUsersKey } from '../__generated__/query-method/swr'
import {
  getQueryUsersInfiniteQueryKey,
  getQueryUsersInfiniteQueryOptions,
  getQueryUsersQueryKey,
  getQueryUsersQueryOptions,
  getUsersKey,
  getUsersQueryKey,
} from '../__generated__/query-method/tanstack-query'
import { fetchOf } from '../hosts/fetch'
import { app as host, requestLog } from '../hosts/query-method-app'

// The generated client reaches the host through this fetch.
// 生成されたクライアントは、この fetch を通してホストに届く。
vi.stubGlobal('fetch', fetchOf(host))

function makeClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } })
}

// The host records every request it serves. Each test starts from an empty log.
// ホストは、処理したすべてのリクエストを記録する。各テストは空のログから開始する。
afterEach(() => {
  requestLog.length = 0
})

// rpc, keys and TanStack Query factories.
// rpc・キー・TanStack Query のファクトリ。
describe('generated outputs for an OpenAPI 3.2 query operation', () => {
  // queryUsers sends its JSON body with the QUERY method, and getUsers sends a GET to the same
  // path. The request log of the host shows both, each with its own method.
  // queryUsers は JSON ボディを QUERY メソッドで送信し、getUsers は同じパスに GET を送信する。
  // ホストのリクエストログには、それぞれのメソッドで両方が記録される。
  it('rpc: queryUsers sends the body with QUERY and parses the response', async () => {
    expect(await queryUsers({ json: { ids: ['2', '3'] } })).toStrictEqual([
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Carol' },
    ])
    expect(await getUsers()).toHaveLength(3)
    expect(requestLog).toStrictEqual(['QUERY /users {"ids":["2","3"]}', 'GET /users'])
  })

  // The key of a QUERY operation holds "QUERY" after the path, so it never collides with the
  // key of the GET on the same path, while both still start with the resource prefix ["users"]
  // and are invalidated together. The TanStack Query and SWR keys have the same layout.
  // QUERY オペレーションのキーは、パスの後ろに "QUERY" を持つ。
  // そのため同じパスの GET のキーと衝突することはなく、
  // 一方でどちらもリソースのプレフィックス ["users"] で始まるため、まとめて無効化できる。
  // TanStack Query と SWR のキーは、同じ構成である。
  it('keys: QUERY carries the method after the path, under the same resource prefix as GET', () => {
    const args = { json: { ids: ['1'] } }
    expect(getUsersKey()).toStrictEqual(['users'])
    expect(getUsersQueryKey()).toStrictEqual(['users', '/users'])
    expect(getQueryUsersQueryKey(args)).toStrictEqual(['users', '/users', 'QUERY', args])
    expect(getQueryUsersInfiniteQueryKey(args)).toStrictEqual([
      'users',
      '/users',
      'QUERY',
      'infinite',
      args,
    ])
    expect(getQueryUsersKey(args)).toStrictEqual(['users', '/users', 'QUERY', args])
    expect(getQueryUsersInfiniteKey(args)).toStrictEqual([
      'users',
      '/users',
      'QUERY',
      'infinite',
      args,
    ])
  })

  // Both the query factory and the infinite query factory send QUERY requests. In the infinite
  // one, getRequestArgs merges the page into the JSON body. The host serves two users per
  // page, so the first page of three users holds two; one page is fetched here.
  // クエリのファクトリと無限クエリのファクトリは、どちらも QUERY リクエストを送信する。
  // 無限クエリでは、getRequestArgs がページ番号を JSON ボディに統合する。ホストは1ページに
  // 2ユーザーを返すため、3ユーザーのうち最初のページには2人が含まれる。ここで取得するのは
  // 1ページだけである。
  it('tanstack: the query and infinite factories fetch through $query', async () => {
    const queryClient = makeClient()
    expect(
      await queryClient.query(getQueryUsersQueryOptions({ json: { ids: ['1'] } })),
    ).toStrictEqual([{ id: '1', name: 'Alice' }])

    const pages = await queryClient.infiniteQuery(
      getQueryUsersInfiniteQueryOptions(
        { json: { ids: ['1', '2', '3'] } },
        {
          initialPageParam: 0,
          getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage.length === 2 ? lastPageParam + 1 : undefined,
          getRequestArgs: (args, pageParam) => ({
            json: { ...args.json, page: Number(pageParam) },
          }),
        },
      ),
    )
    expect(pages.pages).toStrictEqual([
      [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ],
    ])
    expect(pages.pageParams).toStrictEqual([0])
    expect(requestLog).toStrictEqual([
      'QUERY /users {"ids":["1"]}',
      'QUERY /users {"ids":["1","2","3"],"page":0}',
    ])
  })
})
