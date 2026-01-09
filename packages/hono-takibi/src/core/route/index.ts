/**
 * Route generation module.
 *
 * Generates Hono route definitions from OpenAPI path operations.
 *
 * ```mermaid
 * flowchart TD
 *   A["route(openAPI, routes, components)"] --> B["routeCode(openAPI)"]
 *   B --> C{"split mode?"}
 *   C -->|No| D["Write single file"]
 *   C -->|Yes| E["Extract route blocks"]
 *   E --> F["Write individual files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/route
 */
import path from 'node:path'
import { routeCode } from '../../generator/zod-openapi-hono/openapi/routes/index.js'
import { core, makeBarell, makeImports } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { lowerFirst } from '../../utils/index.js'

/**
 * Generates Hono route files from OpenAPI specification.
 *
 * Creates route definitions with Zod validation based on OpenAPI paths.
 * Supports both single file output and split mode (one file per route).
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["OpenAPI Spec"]
 *   end
 *   subgraph Output
 *     B["routes.ts"]
 *     C["routes/getUsers.ts"]
 *     D["routes/postUsers.ts"]
 *     E["routes/index.ts"]
 *   end
 *   A -->|split=false| B
 *   A -->|split=true| C
 *   A -->|split=true| D
 *   A -->|split=true| E
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param routes - Route output configuration
 * @param components - Component import configuration
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await route(openAPI, { output: 'src/routes.ts' })
 *
 * // Split mode output
 * await route(openAPI, { output: 'src/routes', split: true })
 * // Creates: src/routes/getUsers.ts, src/routes/postUsers.ts, src/routes/index.ts
 * ```
 */
export async function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  components?: {
    readonly [k: string]: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' }

  const { output, split = false } = routes
  const routesSrc = routeCode(openAPI)

  // Write a single route file
  const writeFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, components)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true as const, value: filePath } : result
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(output, routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Split mode: extract route blocks from source
  const outDir = output.replace(/\.ts$/, '')
  const hits = Array.from(
    routesSrc.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g),
  )
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)
  const blocks = hits.map((h, i) => ({
    name: h.name,
    block: routesSrc.slice(h.start, hits[i + 1]?.start ?? routesSrc.length).trim(),
  }))

  // No blocks found: write as single file
  if (blocks.length === 0) {
    const result = await writeFile(String(output), routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Write each route block and barrel file in parallel
  const allResults = await Promise.all([
    ...blocks.map(({ name, block }) => writeFile(`${outDir}/${lowerFirst(name)}.ts`, block)),
    core(
      makeBarell(Object.fromEntries(blocks.map((b) => [b.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
