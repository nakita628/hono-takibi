// The generated TanStack Query helpers (cases/tanstack-query, generated from
// specs/users.yaml), run against the host in hosts/users-app.ts with a real `QueryClient`.
//
// Three families of helpers are generated per operation: `get<Name>QueryOptions`,
// `get<Name>InfiniteQueryOptions` and `get<Name>MutationOptions`, each with a key getter.
// Query keys are asserted through what they do to the cache (what gets invalidated, what
// shares an entry) rather than through their shape alone, because the effect is what a
// caller depends on.
//
// 生成された TanStack Query ヘルパーの検証(cases/tanstack-query。specs/users.yaml から生成)。
// hosts/users-app.ts のホストに対し、実際の `QueryClient` を使って実行する。
//
// オペレーションごとに3系統のヘルパーが生成される。`get<Name>QueryOptions`・
// `get<Name>InfiniteQueryOptions`・`get<Name>MutationOptions` であり、それぞれにキーの
// getter が付く。クエリキーは、形だけでなくキャッシュへの作用(何が無効化されるか、何が
// エントリを共有するか)を通して検証する。呼び出し側が依存するのは、その作用だからである。
import { MutationObserver, QueryClient } from '@tanstack/react-query'
import { DetailedError } from 'hono/client'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  getDeleteUsersIdMutationOptions,
  getItemsInfiniteQueryKey,
  getItemsInfiniteQueryOptions,
  getItemsQueryOptions,
  getPostUsersMutationOptions,
  getSlowQueryOptions,
  getUsersIdQueryOptions,
  getUsersKey,
  getUsersQueryOptions,
} from '../__generated__/tanstack-query/query'
import { abortLog, requestLog } from '../hosts/users-app'

// No retry, so a failure is reported at once; no garbage collection, so the cache can be
// inspected after the query settles.
// リトライを無効にして、失敗が即座に報告されるようにする。また、クエリ完了後にキャッシュを
// 調べられるよう、ガベージコレクションも無効にする。
function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Number.POSITIVE_INFINITY, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

// The host records every request it serves, and whether each slow request was aborted.
// ホストは、処理したすべてのリクエストと、低速リクエストが中断されたかどうかを記録する。
afterEach(() => {
  requestLog.length = 0
  abortLog.length = 0
})

// get<Name>QueryOptions
describe('generated queryOptions', () => {
  // The generated queryFn calls the client and parses the response: the query resolves with the
  // JSON body.
  // 生成された queryFn はクライアントを呼び出し、レスポンスをパースする。
  // クエリは JSON ボディで resolve する。
  it('queryFn resolves with parsed data on 200', async () => {
    const queryClient = makeClient()
    expect(await queryClient.query(getUsersQueryOptions())).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

  // A non-2xx response rejects with DetailedError, and the query cache records the same error:
  // a component reading the query state sees it.
  // 2xx 以外のレスポンスは DetailedError で reject し、
  // クエリキャッシュにも同じエラーが記録される。クエリの状態を読むコンポーネントからも、
  // このエラーが見える。
  it('queryFn rejects with DetailedError on 404 and the error reaches the cache', async () => {
    const queryClient = makeClient()
    const opts = getUsersIdQueryOptions({ param: { id: '999' }, header: {} })
    const captured = await queryClient.query(opts).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(404)
    const state = queryClient.getQueryState(opts.queryKey)
    expect(state?.status).toBe('error')
    expect(state?.error).toBeInstanceOf(DetailedError)
  })
})

// Query keys, asserted through their effect on the cache.
// クエリキー。キャッシュへの作用を通して検証する。
describe('query key behavior (asserted through effects, not shapes)', () => {
  // getUsersKey() is the prefix of every key under /users. Invalidating it marks the list and
  // the single user, and leaves /items alone.
  // getUsersKey() は /users 配下のすべてのキーのプレフィックスである。これを無効化すると、
  // 一覧と単一ユーザーの両方が無効化され、/items は影響を受けない。
  it('invalidating the resource prefix key invalidates every query under it, and nothing else', async () => {
    const queryClient = makeClient()
    const listOpts = getUsersQueryOptions()
    const singleOpts = getUsersIdQueryOptions({ param: { id: '1' }, header: {} })
    const itemsOpts = getItemsQueryOptions({ query: { page: '0' } })
    await queryClient.query(listOpts)
    await queryClient.query(singleOpts)
    await queryClient.query(itemsOpts)

    await queryClient.invalidateQueries({ queryKey: getUsersKey(), refetchType: 'none' })

    expect(queryClient.getQueryState(listOpts.queryKey)?.isInvalidated).toBe(true)
    expect(queryClient.getQueryState(singleOpts.queryKey)?.isInvalidated).toBe(true)
    expect(queryClient.getQueryState(itemsOpts.queryKey)?.isInvalidated).toBe(false)
  })

  // A header is not part of the query key: two requests for the same user that differ only in
  // x-trace share one cache entry.
  // ヘッダーはクエリキーに含まれない。x-trace だけが異なる同一ユーザーへの2つのリクエストは、
  // 1つのキャッシュエントリを共有する。
  it('a header-only difference hits the same cache entry', async () => {
    const queryClient = makeClient()
    await queryClient.query(
      getUsersIdQueryOptions({ param: { id: '1' }, header: { 'x-trace': 'a' } }),
    )
    await queryClient.query(
      getUsersIdQueryOptions({ param: { id: '1' }, header: { 'x-trace': 'b' } }),
    )
    expect(queryClient.getQueryCache().getAll()).toHaveLength(1)
  })

  // A path parameter is part of the key: two users are two entries, each holding its own data.
  // パスパラメータはキーに含まれる。2人のユーザーは2つのエントリになり、
  // それぞれが自身のデータを保持する。
  it('a path-param difference creates distinct cache entries with their own data', async () => {
    const queryClient = makeClient()
    const first = getUsersIdQueryOptions({ param: { id: '1' }, header: {} })
    const second = getUsersIdQueryOptions({ param: { id: '2' }, header: {} })
    await queryClient.query(first)
    await queryClient.query(second)
    expect(queryClient.getQueryCache().getAll()).toHaveLength(2)
    expect(queryClient.getQueryData(first.queryKey)).toStrictEqual({ id: '1', name: 'Alice' })
    expect(queryClient.getQueryData(second.queryKey)).toStrictEqual({ id: '2', name: 'Bob' })
  })

  // The infinite key carries "infinite" before the arguments, so an infinite query and a plain
  // query for the same endpoint never collide, and the infinite prefix matches infinite queries
  // only.
  // 無限クエリのキーは、引数の前に "infinite" を持つ。そのため、
  // 同じエンドポイントに対する無限クエリと通常クエリが衝突することはなく、
  // 無限クエリのプレフィックスは無限クエリにのみ一致する。
  it('infinite and non-infinite queries for the same endpoint are cached independently', async () => {
    const queryClient = makeClient()
    await queryClient.query(getItemsQueryOptions({ query: { page: '0' } }))
    await queryClient.infiniteQuery(
      getItemsInfiniteQueryOptions(
        { query: { page: '0' } },
        {
          initialPageParam: 0,
          getNextPageParam: (lastPage) => lastPage.nextPage,
          getRequestArgs: (_args, pageParam) => ({ query: { page: String(pageParam) } }),
        },
      ),
    )
    expect(queryClient.getQueryCache().getAll()).toHaveLength(2)
    // 'infinite' sits before the args, so ['items', '/items', 'infinite'] prefix-matches every
    // infinite list for the endpoint, while the plain query key no longer matches infinite ones.
    // 'infinite' は引数の前に置かれる。そのため ['items', '/items', 'infinite'] は、この
    // エンドポイントのすべての無限クエリにプレフィックス一致し、通常のクエリキーは無限クエリに
    // 一致しなくなる。
    expect(getItemsInfiniteQueryKey({ query: { page: '0' } })).toStrictEqual([
      'items',
      '/items',
      'infinite',
      { query: { page: '0' } },
    ])
    const cache = queryClient.getQueryCache()
    expect(cache.findAll({ queryKey: ['items', '/items', 'infinite'] })).toHaveLength(1)
    expect(
      cache.findAll({ queryKey: getItemsQueryOptions({ query: { page: '0' } }).queryKey }),
    ).toHaveLength(1)
  })
})

// get<Name>InfiniteQueryOptions
describe('generated infiniteQueryOptions', () => {
  // getRequestArgs turns the page parameter into the request arguments, and getNextPageParam
  // reads the next page from the response. Three pages are fetched; the last has no nextPage,
  // which ends the paging.
  // getRequestArgs はページパラメータをリクエスト引数に変換し、
  // getNextPageParam はレスポンスから次のページを読み取る。3ページが取得され、
  // 最後のページには nextPage がないため、ページングが終了する。
  it('pages accumulate through getNextPageParam and getRequestArgs', async () => {
    const queryClient = makeClient()
    const data = await queryClient.infiniteQuery({
      ...getItemsInfiniteQueryOptions(
        { query: { page: '0' } },
        {
          initialPageParam: 0,
          getNextPageParam: (lastPage) => lastPage.nextPage,
          getRequestArgs: (_args, pageParam) => ({ query: { page: String(pageParam) } }),
        },
      ),
      pages: 3,
    })
    expect(data.pages).toStrictEqual([
      { items: ['a', 'b'], nextPage: 1 },
      { items: ['c', 'd'], nextPage: 2 },
      { items: ['e'] },
    ])
    expect(data.pageParams).toStrictEqual([0, 1, 2])
  })

  // allPageParams is typed as number[], the type of initialPageParam, not as unknown[]: the
  // assignment to number[] compiles only if the generic reaches the callback.
  // allPageParams は unknown[] ではなく、
  // initialPageParam の型である number[] として型付けされる。number[] への代入は、
  // ジェネリクスがコールバックまで届いている場合にのみコンパイルできる。
  it('getNextPageParam receives allPageParams typed as TPageParam[]', async () => {
    const queryClient = makeClient()
    const seen: number[][] = []
    await queryClient.infiniteQuery({
      ...getItemsInfiniteQueryOptions(
        { query: { page: '0' } },
        {
          initialPageParam: 0,
          getNextPageParam: (lastPage, _allPages, _lastPageParam, allPageParams) => {
            const params: number[] = [...allPageParams]
            seen.push(params)
            return lastPage.nextPage
          },
          getRequestArgs: (_args, pageParam) => ({ query: { page: String(pageParam) } }),
        },
      ),
      pages: 3,
    })
    expect(seen).toStrictEqual([[0], [0, 1]])
  })
})

// get<Name>MutationOptions
describe('generated mutationOptions', () => {
  // The generated mutationFn, called directly: 201 resolves with the created resource.
  // 生成された mutationFn を直接呼び出す。201 の場合、作成されたリソースで resolve する。
  it('mutationFn resolves with the created resource on 201', async () => {
    const opts = getPostUsersMutationOptions()
    const result = await opts.mutationFn?.(
      { json: { name: 'Charlie' } },
      {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
    )
    expect(result).toStrictEqual({ id: '99', name: 'Charlie' })
  })

  // A 400 from the host rejects the mutation with DetailedError.
  // ホストからの 400 は、DetailedError でミューテーションを reject する。
  it('mutationFn rejects with DetailedError on 400', async () => {
    const opts = getPostUsersMutationOptions()
    const captured = await opts
      .mutationFn?.(
        { json: { name: '' } },
        {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
      )
      .then(
        () => null,
        (e: unknown) => e,
      )
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(400)
  })

  // The second type argument, TOnMutateResult, types what onMutate returns and what onError and
  // onSettled receive: previous is read with no cast. This is what an optimistic update relies
  // on to roll back.
  // 第2型引数の TOnMutateResult は、onMutate の戻り値と、
  // onError・onSettled が受け取る値の型を決める。previous はキャストなしで読み取れる。
  // 楽観的更新のロールバックは、この仕組みに依存している。
  it("onMutate's return value reaches onError/onSettled typed as TOnMutateResult", async () => {
    const queryClient = makeClient()
    const rolledBack: (readonly string[])[] = []
    const settled: (readonly string[])[] = []
    const observer = new MutationObserver(queryClient, {
      ...getPostUsersMutationOptions<DetailedError, { readonly previous: readonly string[] }>(),
      onMutate() {
        return { previous: ['Alice'] as readonly string[] }
      },
      onError(_error, _variables, onMutateResult) {
        const previous: readonly string[] | undefined = onMutateResult?.previous
        if (previous !== undefined) rolledBack.push(previous)
      },
      onSettled(_data, _error, _variables, onMutateResult) {
        const previous: readonly string[] | undefined = onMutateResult?.previous
        if (previous !== undefined) settled.push(previous)
      },
    })
    await observer.mutate({ json: { name: '' } }).then(
      () => null,
      () => null,
    )
    expect(rolledBack).toStrictEqual([['Alice']])
    expect(settled).toStrictEqual([['Alice']])
  })

  // 204 has no body to parse, so the mutation resolves with undefined.
  // 204 にはパースするボディがないため、ミューテーションは undefined で resolve する。
  it('mutationFn resolves with undefined on 204 No Content', async () => {
    const opts = getDeleteUsersIdMutationOptions()
    // oxlint-disable-next-line typescript/no-confusing-void-expression -- asserts the generated client resolves to undefined on 204
    const result = await opts.mutationFn?.(
      { param: { id: '1' } },
      {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
    )
    expect(result).toBeUndefined()
  })
})

// Cancellation.
// キャンセル。
describe('fetch cancellation', () => {
  // The generated queryFn passes the AbortSignal of TanStack Query to the request. Cancelling
  // the query aborts the request: the host, which records whether its request was aborted, sees
  // true.
  // 生成された queryFn は、TanStack Query の AbortSignal をリクエストに渡す。
  // クエリをキャンセルするとリクエストも中断される。
  // リクエストが中断されたかどうかを記録しているホスト側で、true が観測される。
  it('queryFn forwards the abort signal to the underlying request', async () => {
    const queryClient = makeClient()
    const opts = getSlowQueryOptions()
    const pending = queryClient.query(opts).then(
      () => null,
      (e: unknown) => e,
    )
    await new Promise((resolve) => setTimeout(resolve, 10))
    await queryClient.cancelQueries({ queryKey: opts.queryKey })
    expect(await pending).toBeInstanceOf(Error)
    await vi.waitFor(() => {
      expect(abortLog).toStrictEqual([true])
    })
  })
})
