import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates Vue Query hooks from OpenAPI specification.
 *
 * - GET operations generate `useQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useMutation` hooks
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 */
export async function vueQuery(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const config = {
    packageName: '@tanstack/vue-query',
    frameworkName: 'Vue Query',
    hookPrefix: 'use',
    queryFn: 'useQuery',
    mutationFn: 'useMutation',
    useQueryOptionsType: 'UseQueryOptions',
    useMutationOptionsType: 'UseMutationOptions',
    // Vue Query needs Partial<Omit<...>> due to QueryKey type conflicts with MaybeRefOrGetter
    usePartialOmit: true,
    // queryOptions() helper for type branding - fixes exactOptionalPropertyTypes type errors
    hasQueryOptionsHelper: true,
    // Vue Query uses different queryKey pattern (no leading slash, separate path params)
    isVueQuery: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
