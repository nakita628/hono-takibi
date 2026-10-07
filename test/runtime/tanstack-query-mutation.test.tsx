// @vitest-environment happy-dom
// The generated TanStack Query mutation hooks (cases/tanstack-query), rendered with
// @testing-library/react against the host in hosts/users-app.ts.
//
// A generated hook always runs the generated `mutationFn`. What a caller passes is layered
// on top: a `mutationKey` of their own replaces the generated one, their callbacks still
// fire, and defaults registered with `setMutationDefaults` under their key still apply.
//
// 生成された TanStack Query のミューテーションフックの検証(cases/tanstack-query)。
// @testing-library/react でレンダリングし、hosts/users-app.ts のホストに対して実行する。
//
// 生成されたフックは、常に生成された `mutationFn` を実行する。呼び出し側が渡した内容は、
// その上に重ねられる。独自の `mutationKey` は生成されたキーを置き換え、コールバックは
// 引き続き呼び出され、そのキーに対して `setMutationDefaults` で登録したデフォルトも
// 適用される。
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  getPostUsersMutationKey,
  getPostUsersMutationOptions,
  usePostUsers,
} from '../__generated__/tanstack-query/query'
import { fetchOf } from '../hosts/fetch'
import { app as host, requestLog } from '../hosts/users-app'

// The generated client reaches the host through this fetch.
// 生成されたクライアントは、この fetch を通してホストに届く。
vi.stubGlobal('fetch', fetchOf(host))

function makeClient() {
  return new QueryClient({ defaultOptions: { mutations: { retry: false } } })
}

function makeWrapper(queryClient: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const generatedKey = getPostUsersMutationKey()

// The host records every request it serves. Each test starts from an empty log.
// ホストは、処理したすべてのリクエストを記録する。各テストは空のログから開始する。
afterEach(() => {
  requestLog.length = 0
})

// use<Name> mutation hooks.
// use<Name> ミューテーションフック。
describe('generated useMutation hooks', () => {
  // The second argument of the hook is a QueryClient. With it, the hook works outside any
  // QueryClientProvider, and the mutation lands in that client's cache.
  // フックの第2引数は QueryClient である。これを渡すと、
  // QueryClientProvider の外でもフックが動作し、
  // ミューテーションはそのクライアントのキャッシュに記録される。
  it('forwards an explicit queryClient, so no provider is needed', async () => {
    const queryClient = makeClient()
    const { result } = renderHook(() => usePostUsers(undefined, queryClient))
    const created = await act(() => result.current.mutateAsync({ json: { name: 'Frank' } }))
    expect(created).toStrictEqual({ id: '99', name: 'Frank' })
    const cached = queryClient.getMutationCache().find({ mutationKey: generatedKey, exact: true })
    expect(cached?.state.data).toStrictEqual({ id: '99', name: 'Frank' })
  })

  // The key getter and the options factory must return the same key, or a caller filtering the
  // cache by the getter would find nothing. The key is [tag, path, method].
  // キーの getter とオプションのファクトリは、同じキーを返さなければならない。そうでなければ、
  // getter のキーでキャッシュを絞り込んでも何も見つからない。
  // キーは [タグ, パス, メソッド] の形である。
  it('the mutation key getter and the options factory agree on the key', () => {
    expect(getPostUsersMutationOptions().mutationKey).toStrictEqual(generatedKey)
    expect(generatedKey).toStrictEqual(['users', '/users', 'POST'])
  })

  // With no options, the hook sends the request once and caches the result under the generated
  // key.
  // オプションなしの場合、フックはリクエストを1回送信し、結果を生成されたキーでキャッシュする。
  it('runs the factory mutationFn under the generated mutationKey by default', async () => {
    const queryClient = makeClient()
    const { result } = renderHook(() => usePostUsers(), { wrapper: makeWrapper(queryClient) })
    const created = await act(() => result.current.mutateAsync({ json: { name: 'Carol' } }))
    expect(created).toStrictEqual({ id: '99', name: 'Carol' })
    await waitFor(() => {
      expect(result.current.data).toStrictEqual({ id: '99', name: 'Carol' })
    })
    expect(requestLog).toStrictEqual(['POST /users'])
    const cached = queryClient.getMutationCache().find({ mutationKey: generatedKey, exact: true })
    expect(cached?.state.data).toStrictEqual({ id: '99', name: 'Carol' })
  })

  // A mutationKey passed by the caller replaces the generated one: the result is cached under
  // the custom key and nothing under the generated key. The request is still the generated one.
  // 呼び出し側が渡した mutationKey は、生成されたキーを置き換える。
  // 結果は独自のキーでキャッシュされ、生成されたキーには何も記録されない。
  // 送信されるリクエストは、生成されたもののままである。
  it("a caller's mutationKey overrides the generated key while the factory mutationFn still runs", async () => {
    const queryClient = makeClient()
    const { result } = renderHook(
      () => usePostUsers({ mutation: { mutationKey: ['custom', 'users'] } }),
      { wrapper: makeWrapper(queryClient) },
    )
    const created = await act(() => result.current.mutateAsync({ json: { name: 'Dave' } }))
    expect(created).toStrictEqual({ id: '99', name: 'Dave' })
    await waitFor(() => {
      expect(result.current.data).toStrictEqual({ id: '99', name: 'Dave' })
    })
    expect(requestLog).toStrictEqual(['POST /users'])
    const cache = queryClient.getMutationCache()
    expect(cache.find({ mutationKey: ['custom', 'users'], exact: true })?.state.data).toStrictEqual(
      { id: '99', name: 'Dave' },
    )
    expect(cache.find({ mutationKey: generatedKey, exact: true })).toBeUndefined()
  })

  // Defaults registered under the custom key apply to the hook, and the callback passed to the
  // hook fires as well, first.
  // 独自のキーに対して登録したデフォルトは、フックに適用される。
  // フックに渡したコールバックも呼び出され、こちらが先に実行される。
  it("a caller's mutationKey reaches setMutationDefaults, and the caller's callbacks still fire", async () => {
    const queryClient = makeClient()
    const seen: string[] = []
    queryClient.setMutationDefaults(['custom', 'users'], {
      onSettled: () => {
        seen.push('default:onSettled')
      },
    })
    const { result } = renderHook(
      () =>
        usePostUsers({
          mutation: {
            mutationKey: ['custom', 'users'],
            onSuccess: (data) => {
              seen.push(`hook:onSuccess:${data.name}`)
            },
          },
        }),
      { wrapper: makeWrapper(queryClient) },
    )
    await act(() => result.current.mutateAsync({ json: { name: 'Erin' } }))
    expect(seen).toStrictEqual(['hook:onSuccess:Erin', 'default:onSettled'])
  })
})
