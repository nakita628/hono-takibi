// @vitest-environment happy-dom
// Verifies the generated TanStack Query mutation hooks (cases/tanstack-query) rendered with
// @testing-library/react against the users host app: the factory's mutationFn always runs,
// a caller's mutationKey takes precedence over the generated one, and the caller's callbacks
// and `setMutationDefaults` registered under that key still apply.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import {
  getPostUsersMutationKey,
  getPostUsersMutationOptions,
  usePostUsers,
} from '../__generated__/tanstack-query/query'
import { requestLog } from '../hosts/users-app'

function makeClient() {
  return new QueryClient({ defaultOptions: { mutations: { retry: false } } })
}

function makeWrapper(queryClient: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const generatedKey = getPostUsersMutationKey()

afterEach(() => {
  requestLog.length = 0
})

describe('generated useMutation hooks', () => {
  it('forwards an explicit queryClient, so no provider is needed', async () => {
    const queryClient = makeClient()
    const { result } = renderHook(() => usePostUsers(undefined, queryClient))
    const created = await act(() => result.current.mutateAsync({ json: { name: 'Frank' } }))
    expect(created).toStrictEqual({ id: '99', name: 'Frank' })
    const cached = queryClient.getMutationCache().find({ mutationKey: generatedKey, exact: true })
    expect(cached?.state.data).toStrictEqual({ id: '99', name: 'Frank' })
  })

  it('the mutation key getter and the options factory agree on the key', () => {
    expect(getPostUsersMutationOptions().mutationKey).toStrictEqual(generatedKey)
    expect(generatedKey).toStrictEqual(['users', '/users', 'POST'])
  })

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
