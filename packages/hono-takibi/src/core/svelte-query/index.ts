import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates Svelte Query hooks from OpenAPI specification.
 *
 * - GET operations generate `createQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `createMutation` hooks
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 */
export async function svelteQuery(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
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
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
