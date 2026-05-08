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
    isVueQuery: true,
    infiniteQueryFn: 'useInfiniteQuery',
    useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
    // Vue Query's `infiniteQueryOptions()` has only 2 overloads (Defined/Undefined initialData),
    // neither is a thunk — safe to combine with MaybeRefOrGetter<args> factories.
    hasInfiniteQueryOptionsHelper: true,
    // Vue Query (5.100.x) does not export `useSuspenseQuery` / `useSuspenseInfiniteQuery` —
    // suspense in Vue is handled at the component level via <Suspense>, not separate hooks.
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
