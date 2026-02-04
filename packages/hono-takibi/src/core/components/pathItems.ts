/**
 * PathItems component generation module.
 *
 * Handles generation of pathItem exports from OpenAPI pathItems components
 * with support for split mode.
 *
 * @module core/components/pathItems
 */
import path from 'node:path'
import { pathItemsCode } from '../../generator/zod-openapi-hono/openapi/components/pathItems.js'
import { core, makeBarrel, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { lowerFirst } from '../../utils/index.js'

/**
 * Generates pathItems component files.
 *
 * @param components - OpenAPI components object containing pathItems
 * @param pathItemsConfig - PathItems output configuration
 * @param componentsConfig - Component import configuration
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate pathItems in single file
 * await pathItems(
 *   components,
 *   { output: 'src/pathItems.ts' },
 *   undefined,
 *   false
 * )
 *
 * // Generate pathItems in split mode
 * await pathItems(
 *   components,
 *   { output: 'src/pathItems', split: true },
 *   undefined,
 *   false
 * )
 * // Creates: src/pathItems/UserOperations.ts, src/pathItems/index.ts
 * ```
 */
export async function pathItems(
  components: Components,
  pathItemsConfig?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  componentsConfig?: {
    readonly [k: string]: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!pathItemsConfig?.output) return { ok: false, error: 'pathItems.output is required' }
  if (!components.pathItems) return { ok: false, error: 'No pathItems found' }

  const keys = Object.keys(components.pathItems)
  if (keys.length === 0) return { ok: true, value: 'No pathItems found' }

  const { output, split = false } = pathItemsConfig
  const pathItemsSrc = pathItemsCode(components, true, readonly)

  if (!pathItemsSrc) return { ok: true, value: 'No pathItems found' }

  // Write a single pathItem file
  const writeFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, componentsConfig)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true as const, value: filePath } : result
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(output, pathItemsSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated pathItems code written to ${output}` }
  }

  // Split mode: extract pathItem blocks from source
  const outDir = output.replace(/\.ts$/, '')
  const hits = Array.from(
    pathItemsSrc.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)PathItem\s*=/g),
  )
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)
  const blocks = hits.map((h, i) => ({
    name: h.name,
    block: pathItemsSrc.slice(h.start, hits[i + 1]?.start ?? pathItemsSrc.length).trim(),
  }))

  // No blocks found: write as single file
  if (blocks.length === 0) {
    const result = await writeFile(String(output), pathItemsSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated pathItems code written to ${output}` }
  }

  // Write each pathItem block and barrel file in parallel
  const allResults = await Promise.all([
    ...blocks.map(({ name, block }) =>
      writeFile(`${outDir}/${lowerFirst(name)}PathItem.ts`, block),
    ),
    core(
      makeBarrel(Object.fromEntries(blocks.map((b) => [`${b.name}PathItem`, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError

  return {
    ok: true,
    value: `Generated PathItem code written to ${outDir}/*.ts (index.ts included)`,
  }
}
