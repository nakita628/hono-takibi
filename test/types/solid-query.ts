// solid-query: the hook's generics must reach the caller, not degrade to `any` or the library default.
import type { QueryClient } from '@tanstack/solid-query'

import {
  createInfiniteItems,
  createPostUsers,
  createUsers,
} from '../__generated__/solid-query/hooks'
import { type Equal, type HasKey, type IsAssignable, type NotAny, assertType } from './assert'

/** The options slot of the plain query hook, as the caller sees it. */
type QuerySlot = NonNullable<ReturnType<NonNullable<Parameters<typeof createUsers>[0]>>['query']>

type ApiError = { readonly code: number }
type Rollback = { readonly prev: readonly string[] }

export function assertions() {
  const query = createUsers<{ id: string; name: string }[], ApiError>()
  assertType<NotAny<typeof query.data>>(true)
  assertType<NotAny<typeof query.error>>(true)

  const mutation = createPostUsers<ApiError, Rollback>(() => ({
    mutation: {
      onMutate: () => ({ prev: [] as readonly string[] }),
      // TOnMutateResult must survive to onError, otherwise `result` is `unknown`.
      onError: (_error, _variables, result) => result?.prev,
    },
  }))
  assertType<NotAny<typeof mutation.error>>(true)
  // TError must be the caller's type, not the library default (`Error`).
  const mutationError: ApiError | null = mutation.error
  const rows: { id: string; name: string }[] | undefined = query.data
  return { query, mutation, mutationError, rows }
}

// The hook supplies `queryKey` / `queryFn`, so `options.query` must not demand them: the library
// types `queryKey` as required, which forced callers to pass a key the hook then overwrote.
export function queryOptionsAssertions() {
  const disabled = createUsers(() => ({ query: { enabled: false } }))

  // `select` binds TData through the slot — the usage documented in helper/query.ts.
  const names = createUsers<string[]>(() => ({
    query: { select: (data) => data.map((u) => u.name) },
  }))
  const selected = createUsers(() => ({ query: { select: (users) => users.length } }))
  assertType<Equal<typeof selected.data, number | undefined>>(true)

  // The options stay typed: a right-typed value is accepted, a wrong-typed one is not.
  assertType<IsAssignable<{ staleTime: 1_000 }, QuerySlot>>(true)
  assertType<Equal<IsAssignable<{ staleTime: 'soon' }, QuerySlot>, false>>(true)
  // The key is the hook's own — a caller's would be silently overwritten — so the slot has none.
  assertType<Equal<HasKey<QuerySlot, 'queryKey'>, false>>(true)
  assertType<Equal<HasKey<QuerySlot, 'queryFn'>, false>>(true)

  // The infinite hook also supplies both page-param functions, from `pagination`.
  const infinite = createInfiniteItems(
    () => ({ query: { page: '0' } }),
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      getRequestArgs: (args, pageParam) => ({
        ...args,
        query: { ...args.query, page: String(pageParam) },
      }),
    },
    () => ({ query: { staleTime: 1_000 } }),
  )
  return { disabled, names, selected, infinite }
}

/** The options slot of the mutation hook, as the caller sees it. */
type MutationSlot = NonNullable<
  ReturnType<NonNullable<Parameters<typeof createPostUsers>[0]>>['mutation']
>

// The hook supplies `mutationFn` — the contract that types `data` — so the slot leaves it out: a
// caller's would type-check and then be silently overwritten by the factory spread. `mutationKey`
// stays, and the hook honours it: mutations are not cached, so the key only filters and registers.
export function mutationOptionsAssertions() {
  assertType<Equal<HasKey<MutationSlot, 'mutationFn'>, false>>(true)
  assertType<Equal<HasKey<MutationSlot, 'mutationKey'>, true>>(true)
  // The options stay typed: a right-typed value is accepted, a wrong-typed one is not.
  assertType<IsAssignable<{ retry: 2 }, MutationSlot>>(true)
  assertType<Equal<IsAssignable<{ retry: 'never' }, MutationSlot>, false>>(true)

  const keyed = createPostUsers(() => ({ mutation: { mutationKey: ['custom', 'users'] } }))
  return { keyed }
}

// The hooks default TError to the library's `DefaultError` (an `Error`, and whatever a global
// `Register` augmentation says), so `error` is usable without a type argument; and they forward
// the framework's trailing argument, so a caller can target another client / injection context.
export function tailAssertions() {
  const query = createUsers()
  assertType<Equal<typeof query.error, Error | null>>(true)
  assertType<Equal<Parameters<typeof createUsers>[1], (() => QueryClient) | undefined>>(true)
  return { query }
}
