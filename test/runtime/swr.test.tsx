// @vitest-environment happy-dom
// The generated SWR hooks (cases/swr, generated from specs/users.yaml), rendered with
// @testing-library/react against the host in hosts/users-app.ts.
//
// Three kinds of hooks are generated: `useSWR` hooks for GET operations, `useSWRMutation`
// hooks for the others, and `useSWRInfinite` hooks for paginated ones. Each test renders a
// hook inside its own `SWRConfig` with its own cache, so nothing is shared between tests
// unless a test shares it on purpose.
//
// 生成された SWR フックの検証(cases/swr。specs/users.yaml から生成)。
// @testing-library/react でレンダリングし、hosts/users-app.ts のホストに対して実行する。
//
// 生成されるフックは3種類ある。GET オペレーション用の `useSWR` フック、それ以外の
// オペレーション用の `useSWRMutation` フック、ページネーション用の `useSWRInfinite` フック
// である。各テストは、専用のキャッシュを持つ `SWRConfig` の中でフックをレンダリングする。
// テストが意図的に共有しない限り、テスト間で共有されるものはない。
import { renderHook, waitFor } from '@testing-library/react'
import { DetailedError } from 'hono/client'
import type { ReactNode } from 'react'
import { SWRConfig, unstable_serialize } from 'swr'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import {
  getGetItemsInfiniteKey,
  getGetUsersIdKey,
  useDeleteUsersId,
  useGetUsers,
  useGetUsersId,
  useInfiniteGetItems,
  usePostUsers,
} from '../__generated__/swr/hooks'
import { requestLog } from '../hosts/users-app'

// A cache of its own for every render, and no deduplication, so that every mount fetches.
// レンダリングごとに専用のキャッシュを用意し、重複排除も無効にする。マウントのたびに
// フェッチが行われるようにするためである。
function makeWrapper(cache = new Map()) {
  return ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => cache, dedupingInterval: 0 }}>{children}</SWRConfig>
  )
}

// The host records every request it serves. Each test starts from an empty log.
// ホストは、処理したすべてのリクエストを記録する。各テストは空のログから開始する。
afterEach(() => {
  requestLog.length = 0
})

// useSWR hooks.
// useSWR フック。
describe('generated useSWR hooks', () => {
  // The hook fetches on mount and exposes the parsed body as data, with no error.
  // フックはマウント時にフェッチを行い、パース済みのボディを data として公開する。
  // error は設定されない。
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

  // The swr option is typed by the response of the operation: fallbackData must have the shape
  // of the response, and onSuccess receives it typed. fallbackData is shown first, then
  // replaced by the fetched data.
  // swr オプションは、オペレーションのレスポンスによって型付けされる。
  // fallbackData はレスポンスと同じ形でなければならず、onSuccess は型付きのデータを受け取る。
  // 最初に fallbackData が表示され、その後フェッチしたデータに置き換わる。
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

  // The type argument TError types the error the hook returns: statusCode is read with no cast.
  // 型引数 TError は、フックが返す error の型を決める。statusCode はキャストなしで読み取れる。
  it('TError reaches the returned error, not just the config callbacks', async () => {
    const { result } = renderHook(
      () => useGetUsersId<DetailedError>({ param: { id: '999' }, header: {} }),
      { wrapper: makeWrapper() },
    )
    await waitFor(() => {
      expect(result.current.error).toBeDefined()
    })
    // `error` is typed by TError: reading a DetailedError field needs no cast.
    // `error` は TError で型付けされる。DetailedError のフィールドは、キャストなしで読める。
    const statusCode: number | undefined = result.current.error?.statusCode
    expect(statusCode).toBe(404)
  })

  // A 404 becomes the error of the hook, a DetailedError carrying the status, and data stays
  // undefined.
  // 404 はフックの error になる。ステータスを持つ DetailedError であり、
  // data は undefined のままである。
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

// Keys.
// キー。
describe('SWR key behavior', () => {
  // enabled: false turns the key into null, which is how SWR is told not to fetch. No request
  // reaches the host.
  // enabled: false を指定すると、キーが null になる。
  // これは SWR にフェッチしないよう伝える方法である。ホストにリクエストは届かない。
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

  // A swrKey passed by the caller replaces the generated key. The fetch still happens.
  // 呼び出し側が渡した swrKey は、生成されたキーを置き換える。フェッチは引き続き行われる。
  it('a custom swrKey overrides the generated key', async () => {
    const { result } = renderHook(() => useGetUsers({ swr: { swrKey: ['custom', 'users'] } }), {
      wrapper: makeWrapper(),
    })
    expect(result.current.swrKey).toStrictEqual(['custom', 'users'])
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
  })

  // A header is not part of the key: two argument sets that differ only in x-trace serialise to
  // the same key, and a different id to a different one.
  // ヘッダーはキーに含まれない。x-trace だけが異なる2つの引数は同じキーにシリアライズされ、
  // id が異なれば別のキーになる。
  it('a header-only difference serializes to the same cache key', () => {
    const a = getGetUsersIdKey({ param: { id: '1' }, header: { 'x-trace': 'a' } })
    const b = getGetUsersIdKey({ param: { id: '1' }, header: { 'x-trace': 'b' } })
    const other = getGetUsersIdKey({ param: { id: '2' }, header: { 'x-trace': 'a' } })
    expect(unstable_serialize(a)).toBe(unstable_serialize(b))
    expect(unstable_serialize(a)).not.toBe(unstable_serialize(other))
  })

  // The same through the cache: a second hook that differs only in its header has the data at
  // once, without fetching, while a hook for another id starts empty.
  // 同じことをキャッシュ経由で検証する。ヘッダーだけが異なる2つ目のフックは、
  // フェッチせずに即座にデータを持つ。一方、別の id に対するフックは空の状態から始まる。
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

// useSWRMutation hooks.
// useSWRMutation フック。
describe('generated useSWRMutation hooks', () => {
  // trigger sends the request and resolves with the parsed body, which also becomes the data of
  // the hook.
  // trigger はリクエストを送信し、パース済みのボディで resolve する。このボディは、
  // フックの data にもなる。
  it('trigger resolves with the created resource on 201', async () => {
    const { result } = renderHook(() => usePostUsers(), { wrapper: makeWrapper() })
    const created = await result.current.trigger({ json: { name: 'Charlie' } })
    expect(created).toStrictEqual({ id: '99', name: 'Charlie' })
    await waitFor(() => {
      expect(result.current.data).toStrictEqual({ id: '99', name: 'Charlie' })
    })
  })

  // A 400 rejects trigger with DetailedError, and the same error becomes the error of the hook.
  // 400 の場合、trigger は DetailedError で reject し、同じエラーがフックの error にもなる。
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

  // 204 has no body to parse, so trigger resolves with undefined.
  // 204 にはパースするボディがないため、trigger は undefined で resolve する。
  it('trigger resolves with undefined on 204 No Content', async () => {
    const { result } = renderHook(() => useDeleteUsersId(), { wrapper: makeWrapper() })
    // oxlint-disable-next-line typescript/no-confusing-void-expression -- asserts the generated client resolves to undefined on 204
    expect(await result.current.trigger({ param: { id: '1' } })).toBeUndefined()
  })
})

// useSWRInfinite hooks.
// useSWRInfinite フック。
describe('generated useSWRInfinite hooks', () => {
  // The generated key loader adds the page index to the key, and getRequestArgs turns the index
  // into the arguments of the request. Growing the size to 2 fetches the second page.
  // 生成されたキーローダーは、キーにページのインデックスを追加する。getRequestArgs は、
  // そのインデックスをリクエストの引数に変換する。size を 2 に増やすと、
  // 2ページ目がフェッチされる。
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

// useSWRMutation hooks: options of the hook.
// useSWRMutation フック: フックのオプション。
describe('generated useSWRMutation hooks (hook-level options)', () => {
  // With throwOnError: false the rejection is swallowed: trigger resolves with undefined, and
  // the error is only on the hook.
  // throwOnError: false を指定すると、reject は握りつぶされる。
  // trigger は undefined で resolve し、エラーはフック上にのみ現れる。
  it('throwOnError: false makes trigger resolve undefined and surface the error on the hook', async () => {
    const { result } = renderHook(
      () => usePostUsers<DetailedError>({ mutation: { throwOnError: false } }),
      {
        wrapper: makeWrapper(),
      },
    )
    // oxlint-disable-next-line typescript/no-confusing-void-expression -- asserts trigger swallows the rejection
    expect(await result.current.trigger({ json: { name: '' } })).toBeUndefined()
    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(DetailedError)
    })
  })
})

// useSWRInfinite hooks: a key loader of the caller.
// useSWRInfinite フック: 呼び出し側のキーローダー。
describe('generated useSWRInfinite hooks (custom key loader)', () => {
  // A key loader passed by the caller may return null for a page, which stops the paging there:
  // the size grows to 2, and no request is made for the second page.
  // 呼び出し側が渡したキーローダーは、あるページに対して null を返すことができ、
  // そこでページングが止まる。size は 2 に増えるが、2ページ目へのリクエストは行われない。
  it('a custom swrKey loader may return null to stop paging', async () => {
    const { result } = renderHook(
      () =>
        useInfiniteGetItems(
          { query: { page: '0' } },
          {
            swr: {
              swrKey: (index) =>
                index === 0
                  ? ([...getGetItemsInfiniteKey({ query: { page: '0' } }), index] as const)
                  : null,
            },
            pagination: {
              getRequestArgs: (_args, index) => ({ query: { page: String(index) } }),
            },
          },
        ),
      { wrapper: makeWrapper() },
    )
    await waitFor(() => {
      expect(result.current.data).toStrictEqual([{ items: ['a', 'b'], nextPage: 1 }])
    })
    void result.current.setSize(2)
    await waitFor(() => {
      expect(result.current.size).toBe(2)
    })
    // The second page's key is null, so nothing is fetched for it.
    // 2ページ目のキーは null なので、そのページのフェッチは行われない。
    expect(result.current.data).toStrictEqual([{ items: ['a', 'b'], nextPage: 1 }])
    expect(requestLog.filter((entry) => entry.includes('page=1'))).toHaveLength(0)
  })
})
