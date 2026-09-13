// vue-query: the hook's generics must reach the caller, not degrade to `any` or the library default.
import type { InfiniteData, QueryClient } from '@tanstack/vue-query'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { InferRequestType, parseResponse } from 'hono/client'
import { ref } from 'vue'

import {
  getItemsInfiniteQueryOptions,
  getItemsQueryKey,
  useInfiniteItems,
  usePostUsers,
  useUsers,
} from '../__generated__/vue-query/hooks'
import type { client } from '../hosts/users-client'
import { type Equal, type HasKey, type IsAssignable, type NotAny, assertType } from './assert'

/** The options slot of the plain query hook, as the caller sees it. */
type QuerySlot = NonNullable<NonNullable<Parameters<typeof useUsers>[0]>['query']>
/** The options slot of the infinite hook, as the caller sees it. */
type InfiniteSlot = Parameters<typeof useInfiniteItems>[2]['query']

type ApiError = { readonly code: number }
type Rollback = { readonly prev: readonly string[] }

export function assertions() {
  const query = useUsers<{ id: string; name: string }[], ApiError>()
  assertType<NotAny<typeof query.data>>(true)
  assertType<NotAny<typeof query.error>>(true)

  const mutation = usePostUsers<ApiError, Rollback>({
    mutation: {
      onMutate: () => ({ prev: [] as readonly string[] }),
      // TOnMutateResult must survive to onError, otherwise `result` is `unknown`.
      onError: (_error, _variables, result) => result?.prev,
    },
  })
  assertType<NotAny<typeof mutation.error>>(true)
  // TError must be the caller's type, not the library default (`Error`).
  const mutationError: ApiError | null = mutation.error.value
  const rows: { id: string; name: string }[] | undefined = query.data.value
  return { query, mutation, mutationError, rows }
}

// The hook supplies `queryKey` / `queryFn`, so `options.query` must not demand them: the library
// types `queryKey` as required, which forced callers to pass a key the hook then overwrote.
export function queryOptionsAssertions() {
  const disabled = useUsers({ query: { enabled: false } })

  // `select` binds TData through the slot — the usage documented in helper/query.ts.
  const names = useUsers<string[]>({ query: { select: (data) => data.map((u) => u.name) } })
  const selected = useUsers({ query: { select: (users) => users.length } })
  assertType<Equal<(typeof selected.data)['value'], number | undefined>>(true)

  // The options stay typed: a right-typed value is accepted, a wrong-typed one is not.
  assertType<IsAssignable<{ staleTime: 1_000 }, QuerySlot>>(true)
  assertType<Equal<IsAssignable<{ staleTime: 'soon' }, QuerySlot>, false>>(true)
  // The key is the hook's own — a caller's would be silently overwritten — so the slot has none.
  assertType<Equal<HasKey<QuerySlot, 'queryKey'>, false>>(true)
  assertType<Equal<HasKey<QuerySlot, 'queryFn'>, false>>(true)

  // Vue has no infiniteQueryOptions helper, so the page-param functions travel in
  // `options.query` and stay required there; only the key and query function are the hook's.
  const infinite = useInfiniteItems(
    { query: { page: '0' } },
    {
      getRequestArgs: (args, pageParam) => ({
        ...args,
        query: { ...args.query, page: String(pageParam) },
      }),
    },
    { query: { initialPageParam: 0, getNextPageParam: (lastPage) => lastPage.nextPage } },
  )
  // The page-param functions have no other way in, so getNextPageParam stays required.
  assertType<Equal<IsAssignable<{ initialPageParam: 0 }, InfiniteSlot>, false>>(true)
  return { disabled, names, selected, infinite }
}

/** The options slot of the mutation hook, as the caller sees it. */
type MutationSlot = NonNullable<NonNullable<Parameters<typeof usePostUsers>[0]>['mutation']>

// The hook supplies `mutationFn` — the contract that types `data` — so the slot leaves it out: a
// caller's would type-check and then be silently overwritten by the factory spread. `mutationKey`
// stays, and the hook honours it: mutations are not cached, so the key only filters and registers.
// Vue's `UseMutationOptions` is a `MaybeRefDeep | getter` union; the slot is its plain-object
// member (the only one the hook can spread), whose members may still be `Ref`s.
export function mutationOptionsAssertions() {
  assertType<Equal<HasKey<MutationSlot, 'mutationFn'>, false>>(true)
  assertType<Equal<HasKey<MutationSlot, 'mutationKey'>, true>>(true)
  // The options stay typed: a right-typed value is accepted, a wrong-typed one is not.
  assertType<IsAssignable<{ retry: 2 }, MutationSlot>>(true)
  assertType<Equal<IsAssignable<{ retry: 'never' }, MutationSlot>, false>>(true)

  const keyed = usePostUsers({ mutation: { mutationKey: ['custom', 'users'] } })
  const refKeyed = usePostUsers({ mutation: { mutationKey: ref(['custom', 'users']) } })
  return { keyed, refKeyed }
}

type ItemsPage = Awaited<
  ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
>

// Vue has no `infiniteQueryOptions` helper, so the hook and factory are typed by hand; pin the
// parts Vue Query would otherwise get wrong or reject.
export function infiniteAssertions() {
  // `data` is the pages container, not a single page, helper or not.
  const infinite = useInfiniteItems(
    { query: { page: '0' } },
    { getRequestArgs: (args, page) => ({ query: { ...args.query, page: String(page) } }) },
    { query: { initialPageParam: 0, getNextPageParam: (last: ItemsPage) => last.nextPage } },
  )
  assertType<Equal<typeof infinite.data.value, InfiniteData<ItemsPage> | undefined>>(true)

  // Key getters unwrap a Ref/getter argument once, so the key is a plain tuple for cache access.
  const key = getItemsQueryKey(() => ({ query: { page: '0' } }))
  assertType<Equal<(typeof key)[2], InferRequestType<typeof client.items.$get>>>(true)

  // The factory's key is a ComputedRef, which Vue Query cannot infer TQueryKey through; the
  // factory must still spread into `useInfiniteQuery`, so its queryFn context stays wide.
  const composed = useInfiniteQuery({
    ...getItemsInfiniteQueryOptions(ref({ query: { page: '0' } }), {
      getRequestArgs: (args, page) => ({ query: { ...args.query, page: String(page) } }),
    }),
    initialPageParam: 0,
    getNextPageParam: (last: ItemsPage) => last.nextPage,
  })
  return { infinite, key, composed }
}

// The hooks default TError to the library's `DefaultError` (an `Error`, and whatever a global
// `Register` augmentation says), so `error` is usable without a type argument; and they forward
// the framework's trailing argument, so a caller can target another client / injection context.
export function tailAssertions() {
  const query = useUsers()
  assertType<Equal<typeof query.error.value, Error | null>>(true)
  assertType<Equal<Parameters<typeof useUsers>[1], QueryClient | undefined>>(true)
  return { query }
}
