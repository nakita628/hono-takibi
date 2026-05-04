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
    suspenseQueryFn: 'useSuspenseQuery',
    useSuspenseQueryOptionsType: 'UseSuspenseQueryOptions',
    infiniteQueryFn: 'useInfiniteQuery',
    useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
    // PoC verified (2026-05-04): Vue Query's `infiniteQueryOptions()` has only
    // 2 overloads (Defined/Undefined initialData), neither is a thunk — so it
    // does NOT collide with `MaybeRefOrGetter<args>` factory args (unlike `queryOptions()`).
    hasInfiniteQueryOptionsHelper: true,
    suspenseInfiniteQueryFn: 'useSuspenseInfiniteQuery',
    useSuspenseInfiniteQueryOptionsType: 'UseSuspenseInfiniteQueryOptions',
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
