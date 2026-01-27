/**
 * Svelte Query hook generation module.
 *
 * Generates type-safe Svelte Query hooks from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * - GET operations generate `createQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `createMutation` hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["svelteQuery(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/svelte-query
 * @link https://tanstack.com/query/latest/docs/framework/svelte/overview
 * @link https://hono.dev/docs/guides/rpc
 */

import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

/**
 * Generates Svelte Query hooks from OpenAPI specification.
 *
 * Creates type-safe Svelte Query hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate `createQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `createMutation` hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function createGetUsers(...) { return createQuery(...) }"]
 *   end
 *   subgraph "Usage"
 *     B["const { data, error } = createGetUsers({ query: { limit: 10 } })"]
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
 * await svelteQuery(openAPI, 'src/hooks.ts', './client')
 * // Generates: src/hooks.ts with all Svelte Query hooks
 *
 * // Split mode output
 * await svelteQuery(openAPI, 'src/hooks', './client', true)
 * // Generates: src/hooks/createGetUsers.ts, src/hooks/createPostUsers.ts, src/hooks/index.ts
 * ```
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
    queryOptionsHelper: 'queryOptions',
    useThunk: true,
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
