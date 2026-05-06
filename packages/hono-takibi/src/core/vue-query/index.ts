import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function vueQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  const config = {
    packageName: '@tanstack/vue-query',
    frameworkName: 'Vue Query',
    hookPrefix: 'use',
    queryFn: 'useQuery',
    mutationFn: 'useMutation',
    useQueryOptionsType: 'UseQueryOptions',
    useMutationOptionsType: 'UseMutationOptions',
    // Vue Query's queryOptions() includes a thunk overload `() => UseQueryOptions`,
    // which hijacks overload resolution when the factory takes MaybeRefOrGetter args
    // (TQueryKey defaults to readonly unknown[], inference fails, last overload error).
    // Plain object factory bypasses the helper and lets useQuery infer types directly.
    hasQueryOptionsHelper: false,
    isVueQuery: true,
    // Vue Query (5.100.9) intentionally does NOT export `useSuspenseQuery` /
    // `useSuspenseInfiniteQuery` — Vue handles Suspense via the built-in
    // `<Suspense>` component composed with the regular `useQuery`, so a separate
    // suspense API is unnecessary. Omitting these config fields skips both the
    // hook generation and the import emission for vue-query output.
    infiniteQueryFn: 'useInfiniteQuery',
    useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
    // 2026-05-06: Originally `hasInfiniteQueryOptionsHelper: true` to wrap the
    // factory in `infiniteQueryOptions({...})`. The helper attaches a `DataTag`
    // marker to the returned `queryKey`, but at the same time TypeScript fails
    // to infer the function's `TQueryKey` from the inner `queryKey` field
    // (Vue Query's `UseInfiniteQueryOptions` is `MaybeRef<{ MaybeRefDeep<...> }>`,
    // and `MaybeRefDeep` cannot be inverted to extract a literal tuple
    // generic) — so TQueryKey defaults to `readonly unknown[]` and the
    // factory return spreads with `queryKey: readonly unknown[] & DataTag<...>`.
    // `useInfiniteQuery({...factory, ...userOpts})` then can't reconcile that
    // widened key with the precise tuple it infers from its own argument →
    // TS2769. Disabling the helper makes the factory return a plain object,
    // which preserves the precise tuple type through the spread.
    hasInfiniteQueryOptionsHelper: false,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
