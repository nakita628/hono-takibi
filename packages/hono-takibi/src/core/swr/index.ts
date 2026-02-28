import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates SWR hooks from OpenAPI specification.
 *
 * - GET operations generate `useSWR` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useSWRMutation` hooks
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 */
export async function swr(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
  immutable?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const config = {
    packageName: 'swr',
    frameworkName: 'SWR',
    hookPrefix: 'use',
    queryFn: immutable ? 'useSWRImmutable' : 'useSWR',
    mutationFn: 'useSWRMutation',
    useQueryOptionsType: 'SWRConfiguration',
    useMutationOptionsType: 'SWRMutationConfiguration',
    isSWR: true,
    ...(immutable ? { immutable: true } : {}),
  }
  const result = await makeQueryHooks(openAPI, output, importPath, config, split, clientName)

  // Adjust success message to match expected format
  if (result.ok) {
    if (split) {
      const outDir = output.endsWith('.ts') ? output.slice(0, -'/index.ts'.length) : output
      return {
        ok: true,
        value: `Generated swr hooks written to ${outDir}/*.ts (index.ts included)`,
      }
    }
    return {
      ok: true,
      value: `Generated swr hooks written to ${output}`,
    }
  }
  return result
}
