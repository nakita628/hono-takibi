import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function angularQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  const config = {
    packageName: '@tanstack/angular-query-experimental',
    frameworkName: 'Angular Query',
    hookPrefix: 'inject',
    queryFn: 'injectQuery',
    mutationFn: 'injectMutation',
    useQueryOptionsType: 'CreateQueryOptions',
    useMutationOptionsType: 'CreateMutationOptions',
    hasQueryOptionsHelper: true,
    hasMutationOptionsHelper: false,
    hasInfiniteQueryOptionsHelper: true,
    // Angular replaces suspense with Signal-based reactivity, no suspense hooks.
    infiniteQueryFn: 'injectInfiniteQuery',
    useInfiniteQueryOptionsType: 'CreateInfiniteQueryOptions',
    useThunk: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
