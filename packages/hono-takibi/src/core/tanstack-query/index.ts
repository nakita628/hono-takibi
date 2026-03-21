import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates TanStack Query hooks from OpenAPI specification.
 *
 * - GET operations generate `useQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useMutation` hooks
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @param infinite - Whether to generate infinite query hooks (default: true)
 * @returns Promise resolving to success message or error
 */
export async function tanstackQuery(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
  infinite = true,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const config = {
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
    ...(infinite
      ? {
          infiniteQueryFn: 'useInfiniteQuery',
          suspenseInfiniteQueryFn: 'useSuspenseInfiniteQuery',
          useInfiniteQueryOptionsType: 'UseInfiniteQueryOptions',
          useSuspenseInfiniteQueryOptionsType: 'UseSuspenseInfiniteQueryOptions',
        }
      : {}),
    useSuspenseQueryOptionsType: 'UseSuspenseQueryOptions',
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
