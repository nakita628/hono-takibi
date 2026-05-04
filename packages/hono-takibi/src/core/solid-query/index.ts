import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function solidQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  // Solid Query v5: `createQuery` accepts an Accessor (= () => T) for options,
  // matching Svelte v5's thunk pattern. Helpers (queryOptions/etc.) take plain
  // objects but the hook itself wraps them in a thunk.
  const config = {
    packageName: '@tanstack/solid-query',
    frameworkName: 'Solid Query',
    hookPrefix: 'create',
    queryFn: 'createQuery',
    mutationFn: 'createMutation',
    useThunk: true,
    useQueryOptionsType: 'CreateQueryOptions',
    useMutationOptionsType: 'CreateMutationOptions',
    hasQueryOptionsHelper: true,
    infiniteQueryFn: 'createInfiniteQuery',
    useInfiniteQueryOptionsType: 'CreateInfiniteQueryOptions',
    hasInfiniteQueryOptionsHelper: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
