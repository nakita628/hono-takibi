import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function preactQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  const config = {
    packageName: '@tanstack/preact-query',
    frameworkName: 'Preact Query',
    hookPrefix: 'use',
    queryFn: 'useQuery',
    mutationFn: 'useMutation',
    useQueryOptionsType: 'UseQueryOptions',
    useMutationOptionsType: 'UseMutationOptions',
    hasQueryOptionsHelper: true,
    hasMutationOptionsHelper: true,
    suspenseQueryFn: 'useSuspenseQuery',
    infiniteQueryFn: 'useInfiniteQuery',
    suspenseInfiniteQueryFn: 'useSuspenseInfiniteQuery',
    useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
    useSuspenseInfiniteQueryOptionsType: 'UseSuspenseInfiniteQueryOptions',
    hasInfiniteQueryOptionsHelper: true,
    useSuspenseQueryOptionsType: 'UseSuspenseQueryOptions',
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
