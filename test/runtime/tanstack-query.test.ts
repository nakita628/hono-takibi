// Verifies the generated TanStack Query helpers (cases/tanstack-query) against the
// users host app: queryOptions / infiniteQueryOptions / mutationOptions behavior,
// query-key identity (asserted through cache effects), and fetch cancellation.
import { MutationObserver, QueryClient } from '@tanstack/react-query'
import { DetailedError } from 'hono/client'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  getDeleteUsersIdMutationOptions,
  getItemsInfiniteQueryOptions,
  getItemsQueryOptions,
  getPostUsersMutationOptions,
  getSlowQueryOptions,
  getUsersIdQueryOptions,
  getUsersKey,
  getUsersQueryOptions,
} from '../__generated__/tanstack-query/query'
import { abortLog, requestLog } from '../hosts/users-app'

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Number.POSITIVE_INFINITY, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

afterEach(() => {
  requestLog.length = 0
  abortLog.length = 0
})

describe('generated queryOptions', () => {
  it('queryFn resolves with parsed data on 200', async () => {
    const queryClient = makeClient()
    expect(await queryClient.query(getUsersQueryOptions())).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

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

describe('query key behavior (asserted through effects, not shapes)', () => {
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
  })
})

describe('generated infiniteQueryOptions', () => {
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

describe('generated mutationOptions', () => {
  it('mutationFn resolves with the created resource on 201', async () => {
    const opts = getPostUsersMutationOptions()
    const result = await opts.mutationFn?.(
      { json: { name: 'Charlie' } },
      {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
    )
    expect(result).toStrictEqual({ id: '99', name: 'Charlie' })
  })

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

describe('fetch cancellation', () => {
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
