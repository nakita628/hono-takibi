// Verifies the generated Vue Query hooks (cases/vue-query) against the users host app, run
// inside an app context so `useQueryClient` resolves: a `Ref` argument re-keys the query when it
// changes, `useMutation` runs the factory `mutationFn`, and a caller's `mutationKey` wins.
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

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

/** Runs `setup` the way a component would: with the query client injectable and a scope to dispose. */
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

afterEach(() => {
  requestLog.length = 0
})

describe('generated useQuery hooks (vue)', () => {
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

describe('generated useQuery hooks (vue) with an explicit client', () => {
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

describe('generated useMutation hooks (vue)', () => {
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
