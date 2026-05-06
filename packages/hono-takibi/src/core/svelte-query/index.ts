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
    // 2026-05-06: Disabled — `infiniteQueryOptions(...)` attaches a DataTag
    // marker to queryKey but defaults TQueryKey to `readonly unknown[]` (TS
    // cannot infer through the nested options shape). When the factory result
    // is spread into `useInfiniteQuery({...factory, ...userOpts})`, the widened
    // DataTag-typed key collides with the precise tuple inferred at the hook
    // call site → TS2769 / TS2379. Plain object factory preserves the precise
    // tuple type through the spread.
    hasInfiniteQueryOptionsHelper: false,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
