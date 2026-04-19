import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function svelteQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  // @see https://tanstack.com/query/v5/docs/framework/svelte/reactivity
  const config = {
    packageName: '@tanstack/svelte-query',
    frameworkName: 'Svelte Query',
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
