// vue-query: the hook's generics must reach the caller, not degrade to `any` or the library default.
import { useInfiniteItems, usePostUsers, useUsers } from '../__generated__/vue-query/hooks'
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
