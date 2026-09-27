// The generated Vue Query hooks (cases/vue-query, generated from specs/users.yaml), run
// against the host in hosts/users-app.ts inside a Vue app context, so that
// `useQueryClient` resolves the way it does in a component.
//
// What is specific to Vue: an argument may be a `Ref`, and the query re-keys itself when
// the ref changes.
//
// 生成された Vue Query フックの検証(cases/vue-query。specs/users.yaml から生成)。
// hosts/users-app.ts のホストに対し、Vue アプリのコンテキスト内で実行する。これにより、
// `useQueryClient` がコンポーネント内と同じように解決される。
//
// Vue に固有の点として、引数に `Ref` を渡すことができ、ref が変化するとクエリのキーも
// 自動的に切り替わる。
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { afterEach, describe, expect, it } from 'vite-plus/test'
import { createApp, effectScope, nextTick, ref } from 'vue'

import {
  getPostUsersMutationKey,
  getUsersIdQueryKey,
  usePostUsers,
  useUsersId,
} from '../__generated__/vue-query/hooks'
import { requestLog } from '../hosts/users-app'

// Long enough for a request to the in-process host to settle.
// プロセス内のホストへのリクエストが完了するのに十分な待ち時間。
const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

/**
 * Runs `setup` the way a component would: with the query client injectable and a scope to
 * dispose.
 *
 * `setup` をコンポーネントと同じ条件で実行する。クエリクライアントを注入可能にし、破棄用の
 * スコープを用意する。
 */
function withApp<T>(setup: () => T) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const app = createApp({})
  app.use(VueQueryPlugin, { queryClient })
  const scope = effectScope()
  const result = app.runWithContext(() => scope.run(setup))
  if (result === undefined) {
    throw new Error('setup returned nothing')
  }
  return {
    queryClient,
    result,
    dispose: () => {
      scope.stop()
    },
  }
}

// The host records every request it serves. Each test starts from an empty log.
// ホストは、処理したすべてのリクエストを記録する。各テストは空のログから開始する。
afterEach(() => {
  requestLog.length = 0
})

// useQuery hooks.
// useQuery フック。
describe('generated useQuery hooks (vue)', () => {
  // The arguments are a Ref. Changing the ref changes the key, which fetches the other user;
  // both results stay in the cache under their own keys. The key getter accepts the Ref as well
  // as a plain object.
  // 引数は Ref である。ref を変更するとキーが変わり、別のユーザーがフェッチされる。
  // 両方の結果は、それぞれのキーでキャッシュに残る。キーの getter は、
  // 通常のオブジェクトだけでなく Ref も受け取れる。
  it('re-keys and refetches when a Ref argument changes', async () => {
    const args = ref({ param: { id: '1' }, header: {} })
    const { queryClient, result: query, dispose } = withApp(() => useUsersId(args))
    await settle()
    expect(query.data.value).toStrictEqual({ id: '1', name: 'Alice' })

    args.value = { param: { id: '2' }, header: {} }
    await nextTick()
    await settle()
    expect(query.data.value).toStrictEqual({ id: '2', name: 'Bob' })
    expect(requestLog).toStrictEqual(['GET /users/1', 'GET /users/2'])
    // Both keys are cached side by side; the key getter itself stays a plain array.
    // 両方のキーが並んでキャッシュされる。キーの getter 自体は、通常の配列を返す。
    expect(
      queryClient.getQueryData(getUsersIdQueryKey({ param: { id: '1' }, header: {} })),
    ).toStrictEqual({
      id: '1',
      name: 'Alice',
    })
    expect(queryClient.getQueryData(getUsersIdQueryKey(args))).toStrictEqual({
      id: '2',
      name: 'Bob',
    })
    dispose()
  })
})

// useQuery hooks with a QueryClient passed in.
// QueryClient を直接渡した場合の useQuery フック。
describe('generated useQuery hooks (vue) with an explicit client', () => {
  // The third argument of the hook is a QueryClient. With it, the hook works with no
  // VueQueryPlugin installed, and the query lands in that client's cache.
  // フックの第3引数は QueryClient である。これを渡すと、
  // VueQueryPlugin をインストールしていなくてもフックが動作し、
  // クエリはそのクライアントのキャッシュに記録される。
  it('forwards the queryClient argument, so no app-level provider is needed', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const scope = effectScope()
    const query = scope.run(() =>
      useUsersId({ param: { id: '1' }, header: {} }, undefined, queryClient),
    )
    await settle()
    expect(query?.data.value).toStrictEqual({ id: '1', name: 'Alice' })
    expect(queryClient.getQueryCache().getAll()).toHaveLength(1)
    scope.stop()
  })
})

// useMutation hooks.
// useMutation フック。
describe('generated useMutation hooks (vue)', () => {
  // With no options, the hook sends the request once and caches the result under the generated
  // key.
  // オプションなしの場合、フックはリクエストを1回送信し、結果を生成されたキーでキャッシュする。
  it('runs the factory mutationFn under the generated mutationKey by default', async () => {
    const { queryClient, result: mutation, dispose } = withApp(() => usePostUsers())
    const created = await mutation.mutateAsync({ json: { name: 'Carol' } })
    expect(created).toStrictEqual({ id: '99', name: 'Carol' })
    expect(requestLog).toStrictEqual(['POST /users'])
    const cached = queryClient
      .getMutationCache()
      .find({ mutationKey: getPostUsersMutationKey(), exact: true })
    expect(cached?.state.data).toStrictEqual({ id: '99', name: 'Carol' })
    dispose()
  })

  // A mutationKey passed by the caller replaces the generated one: the result is cached under
  // the custom key and nothing under the generated key. The request is still the generated one.
  // 呼び出し側が渡した mutationKey は、生成されたキーを置き換える。
  // 結果は独自のキーでキャッシュされ、生成されたキーには何も記録されない。
  // 送信されるリクエストは、生成されたもののままである。
  it("a caller's mutationKey overrides the generated key while the factory mutationFn still runs", async () => {
    const {
      queryClient,
      result: mutation,
      dispose,
    } = withApp(() => usePostUsers({ mutation: { mutationKey: ['custom', 'users'] } }))
    const created = await mutation.mutateAsync({ json: { name: 'Dave' } })
    expect(created).toStrictEqual({ id: '99', name: 'Dave' })
    expect(requestLog).toStrictEqual(['POST /users'])
    const cache = queryClient.getMutationCache()
    expect(cache.find({ mutationKey: ['custom', 'users'], exact: true })?.state.data).toStrictEqual(
      { id: '99', name: 'Dave' },
    )
    expect(cache.find({ mutationKey: getPostUsersMutationKey(), exact: true })).toBeUndefined()
    dispose()
  })
})
