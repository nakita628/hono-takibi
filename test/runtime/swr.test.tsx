// @vitest-environment happy-dom
// Verifies the generated SWR hooks (cases/swr) rendered with @testing-library/react
// against the users host app: useSWR / useSWRMutation / useSWRInfinite resolution,
// error surfacing as DetailedError, and SWR cache-key identity.
import { renderHook, waitFor } from '@testing-library/react'
import { DetailedError } from 'hono/client'
import type { ReactNode } from 'react'
import { SWRConfig, unstable_serialize } from 'swr'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import {
  getGetUsersIdKey,
  useDeleteUsersId,
  useGetUsers,
  useGetUsersId,
  useInfiniteGetItems,
  usePostUsers,
} from '../__generated__/swr/hooks'
import { requestLog } from '../hosts/users-app'

function makeWrapper(cache = new Map()) {
  return ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => cache, dedupingInterval: 0 }}>{children}</SWRConfig>
  )
}

afterEach(() => {
  requestLog.length = 0
})

describe('generated useSWR hooks', () => {
  it('resolves with parsed data on 200', async () => {
    const { result } = renderHook(() => useGetUsers(), { wrapper: makeWrapper() })
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
    expect(result.current.data).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
    expect(result.current.error).toBeUndefined()
  })

  it('SWRConfiguration is typed by the response, so fallbackData and onSuccess are not any', async () => {
    const seen: { readonly id: string; readonly name: string }[][] = []
    const { result } = renderHook(
      () =>
        useGetUsers({
          swr: {
            fallbackData: [{ id: '0', name: 'Fallback' }],
            onSuccess(data) {
              seen.push([...data])
            },
          },
        }),
      { wrapper: makeWrapper() },
    )
    expect(result.current.data).toStrictEqual([{ id: '0', name: 'Fallback' }])
    await waitFor(() => {
      expect(seen.length).toBe(1)
    })
    expect(seen).toStrictEqual([
      [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ],
    ])
  })

  it('surfaces a 404 as DetailedError in the error state', async () => {
    const { result } = renderHook(() => useGetUsersId({ param: { id: '999' }, header: {} }), {
      wrapper: makeWrapper(),
    })
    await waitFor(() => {
      expect(result.current.error).toBeDefined()
    })
    expect(result.current.error).toBeInstanceOf(DetailedError)
    expect((result.current.error as DetailedError).statusCode).toBe(404)
    expect(result.current.data).toBeUndefined()
  })
})

describe('SWR key behavior', () => {
  it('enabled:false yields a null key and never fetches', async () => {
    const before = requestLog.length
    const { result } = renderHook(() => useGetUsers({ swr: { enabled: false } }), {
      wrapper: makeWrapper(),
    })
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(result.current.swrKey).toBeNull()
    expect(result.current.data).toBeUndefined()
    expect(requestLog.length).toBe(before)
  })

  it('a custom swrKey overrides the generated key', async () => {
    const { result } = renderHook(() => useGetUsers({ swr: { swrKey: ['custom', 'users'] } }), {
      wrapper: makeWrapper(),
    })
    expect(result.current.swrKey).toStrictEqual(['custom', 'users'])
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
  })

  it('a header-only difference serializes to the same cache key', () => {
    const a = getGetUsersIdKey({ param: { id: '1' }, header: { 'x-trace': 'a' } })
    const b = getGetUsersIdKey({ param: { id: '1' }, header: { 'x-trace': 'b' } })
    const other = getGetUsersIdKey({ param: { id: '2' }, header: { 'x-trace': 'a' } })
    expect(unstable_serialize(a)).toBe(unstable_serialize(b))
    expect(unstable_serialize(a)).not.toBe(unstable_serialize(other))
  })

  it('a header-only difference shares the cache entry across hook mounts', async () => {
    const cache = new Map()
    const first = renderHook(
      () => useGetUsersId({ param: { id: '1' }, header: { 'x-trace': 'a' } }),
      { wrapper: makeWrapper(cache) },
    )
    await waitFor(() => {
      expect(first.result.current.data).toBeDefined()
    })

    const second = renderHook(
      () => useGetUsersId({ param: { id: '1' }, header: { 'x-trace': 'b' } }),
      { wrapper: makeWrapper(cache) },
    )
    expect(second.result.current.data).toStrictEqual({ id: '1', name: 'Alice' })

    const distinct = renderHook(
      () => useGetUsersId({ param: { id: '2' }, header: { 'x-trace': 'a' } }),
      { wrapper: makeWrapper(cache) },
    )
    expect(distinct.result.current.data).toBeUndefined()
    await waitFor(() => {
      expect(distinct.result.current.data).toBeDefined()
    })
  })
})

describe('generated useSWRMutation hooks', () => {
  it('trigger resolves with the created resource on 201', async () => {
    const { result } = renderHook(() => usePostUsers(), { wrapper: makeWrapper() })
    const created = await result.current.trigger({ json: { name: 'Charlie' } })
    expect(created).toStrictEqual({ id: '99', name: 'Charlie' })
    await waitFor(() => {
      expect(result.current.data).toStrictEqual({ id: '99', name: 'Charlie' })
    })
  })

  it('trigger rejects with DetailedError on 400', async () => {
    const { result } = renderHook(() => usePostUsers<DetailedError>(), {
      wrapper: makeWrapper(),
    })
    const captured = await result.current.trigger({ json: { name: '' } }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(400)
    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(DetailedError)
    })
  })

  it('trigger resolves with undefined on 204 No Content', async () => {
    const { result } = renderHook(() => useDeleteUsersId(), { wrapper: makeWrapper() })
    // oxlint-disable-next-line typescript/no-confusing-void-expression -- asserts the generated client resolves to undefined on 204
    expect(await result.current.trigger({ param: { id: '1' } })).toBeUndefined()
  })
})

describe('generated useSWRInfinite hooks', () => {
  it('the key loader appends the page index and getRequestArgs receives it', async () => {
    const { result } = renderHook(
      () =>
        useInfiniteGetItems(
          { query: { page: '0' } },
          {
            pagination: {
              getRequestArgs: (_args, index) => ({ query: { page: String(index) } }),
            },
          },
        ),
      { wrapper: makeWrapper() },
    )
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
    expect(result.current.data).toStrictEqual([{ items: ['a', 'b'], nextPage: 1 }])

    void result.current.setSize(2)
    await waitFor(() => {
      expect(result.current.data).toHaveLength(2)
    })
    expect(result.current.data).toStrictEqual([
      { items: ['a', 'b'], nextPage: 1 },
      { items: ['c', 'd'], nextPage: 2 },
    ])
  })
})
