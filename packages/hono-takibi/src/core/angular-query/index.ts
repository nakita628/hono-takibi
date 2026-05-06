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
    // 2026-05-06: Disabled — `infiniteQueryOptions(...)` attaches a DataTag
    // marker to queryKey but defaults TQueryKey to `readonly unknown[]` (TS
    // cannot infer through the nested options shape). When the factory result
    // is spread into `useInfiniteQuery({...factory, ...userOpts})`, the widened
    // DataTag-typed key collides with the precise tuple inferred at the hook
    // call site → TS2769 / TS2379. Plain object factory preserves the precise
    // tuple type through the spread.
    hasInfiniteQueryOptionsHelper: false,
    // Angular replaces suspense with Signal-based reactivity, no suspense hooks.
    infiniteQueryFn: 'injectInfiniteQuery',
    useInfiniteQueryOptionsType: 'CreateInfiniteQueryOptions',
    useThunk: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
