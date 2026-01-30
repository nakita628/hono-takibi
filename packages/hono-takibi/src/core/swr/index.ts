/**
 * SWR hook generation module.
 *
 * Generates type-safe SWR hooks from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * - GET operations generate `useSWR` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useSWRMutation` hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["swr(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/swr
 * @link https://swr.vercel.app/
 * @link https://hono.dev/docs/guides/rpc
 */

import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates SWR hooks from OpenAPI specification.
 *
 * Creates type-safe SWR hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate `useSWR` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useSWRMutation` hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function useGetUsers(...) { return useSWR(...) }"]
 *   end
 *   subgraph "Usage"
 *     B["const { data, error } = useGetUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await swr(openAPI, 'src/hooks.ts', './client')
 * // Generates: src/hooks.ts with all SWR hooks
 *
 * // Split mode output
 * await swr(openAPI, 'src/hooks', './client', true)
 * // Generates: src/hooks/useGetUsers.ts, src/hooks/usePostUsers.ts, src/hooks/index.ts
 * ```
 */
export async function swr(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const config = {
    packageName: 'swr',
    frameworkName: 'SWR',
    hookPrefix: 'use',
    queryFn: 'useSWR',
    mutationFn: 'useSWRMutation',
    useQueryOptionsType: 'SWRConfiguration',
    useMutationOptionsType: 'SWRMutationConfiguration',
    isSWR: true,
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
