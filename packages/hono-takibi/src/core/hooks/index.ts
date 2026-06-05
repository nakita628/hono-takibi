import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

const HOOK_CONFIGS = {
  swr: {
    packageName: 'swr',
    frameworkName: 'SWR',
    hookPrefix: 'use',
    queryFn: 'useSWR',
    mutationFn: 'useSWRMutation',
    useQueryOptionsType: 'SWRConfiguration',
    useMutationOptionsType: 'SWRMutationConfiguration',
    isSWR: true,
    immutableQueryFn: 'useSWRImmutable',
    infiniteQueryFn: 'useSWRInfinite',
    useInfiniteQueryOptionsType: 'SWRInfiniteConfiguration',
  },
  'tanstack-query': {
    packageName: '@tanstack/react-query',
    frameworkName: 'TanStack Query',
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
  },
  'preact-query': {
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
  },
  'solid-query': {
    // Solid Query v5: `createQuery` accepts an Accessor (= () => T) for options,
    // matching Svelte v5's thunk pattern. Helpers (queryOptions/etc.) take plain
    // objects but the hook itself wraps them in a thunk.
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
  },
  'vue-query': {
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
  },
  'svelte-query': {
    // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
    // @see https://tanstack.com/query/v5/docs/framework/svelte/reactivity
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
  },
  'angular-query': {
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
  },
} as const

export async function hooks(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  library: keyof typeof HOOK_CONFIGS,
  options?: { readonly split?: boolean; readonly clientName?: string },
) {
  return makeQueryHooks(
    openAPI,
    output,
    importPath,
    HOOK_CONFIGS[library],
    options?.split,
    options?.clientName,
  )
}
