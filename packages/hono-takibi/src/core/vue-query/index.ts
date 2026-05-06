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
    hasInfiniteQueryOptionsHelper: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
