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
    hasQueryOptionsHelper: true,
    isVueQuery: true,
    infiniteQueryFn: 'useInfiniteQuery',
    useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
    hasInfiniteQueryOptionsHelper: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
