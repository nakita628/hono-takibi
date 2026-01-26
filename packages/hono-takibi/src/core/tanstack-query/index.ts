/**
 * TanStack Query hook generation module.
 *
 * Generates type-safe TanStack Query hooks from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * - GET operations generate `useQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useMutation` hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["tanstackQuery(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/tanstack-query
 * @link https://tanstack.com/query/latest
 * @link https://hono.dev/docs/guides/rpc
 */

import { makeQueryHooks } from '../../helper/query.js'
import type { QueryFrameworkConfig } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates TanStack Query hooks from OpenAPI specification.
 *
 * Creates type-safe TanStack Query hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate `useQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useMutation` hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function useGetUsers(...) { return useQuery(...) }"]
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
 * await tanstackQuery(openAPI, 'src/hooks.ts', './client')
 * // Generates: src/hooks.ts with all TanStack Query hooks
 *
 * // Split mode output
 * await tanstackQuery(openAPI, 'src/hooks', './client', true)
 * // Generates: src/hooks/useGetUsers.ts, src/hooks/usePostUsers.ts, src/hooks/index.ts
 * ```
 */
export async function tanstackQuery(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const config: QueryFrameworkConfig = {
    packageName: '@tanstack/react-query',
    frameworkName: 'TanStack Query',
    hookPrefix: 'use',
    queryFn: 'useQuery',
    mutationFn: 'useMutation',
    queryOptionsType: 'UseQueryOptions',
    mutationOptionsType: 'UseMutationOptions',
    queryOptionsHelper: 'queryOptions',
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
