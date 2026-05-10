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
    // Vue Query's `infiniteQueryOptions()` types `initialPageParam` as `MaybeRefDeep<TPageParam>`
    // which TS cannot narrow from a generic `TPageParam` parameter — generation fails to typecheck.
    // Falling back to a plain `{queryKey, queryFn}` factory: users supply pagination via
    // `options.query.initialPageParam` / `getNextPageParam` at the hook site instead.
    // hasInfiniteQueryOptionsHelper omitted (defaults false).
    //
    // Vue Query (5.100.x) also does not export `useSuspenseQuery` / `useSuspenseInfiniteQuery` —
    // suspense in Vue is handled at the component level via <Suspense>, not separate hooks.
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
