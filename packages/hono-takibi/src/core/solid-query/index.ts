import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function solidQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  const config = {
    packageName: '@tanstack/solid-query',
    frameworkName: 'Solid Query',
    hookPrefix: 'create',
    queryFn: 'createQuery',
    mutationFn: 'createMutation',
    useQueryOptionsType: 'CreateQueryOptions',
    useMutationOptionsType: 'CreateMutationOptions',
    // v4 has no queryOptions/mutationOptions/infiniteQueryOptions helpers (added in v5)
    hasQueryOptionsHelper: false,
    hasMutationOptionsHelper: false,
    hasInfiniteQueryOptionsHelper: false,
    // v4 has no suspense hooks (added in v5 for other frameworks)
    infiniteQueryFn: 'createInfiniteQuery',
    useInfiniteQueryOptionsType: 'CreateInfiniteQueryOptions',
    useThunk: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
