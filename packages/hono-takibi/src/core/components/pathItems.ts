import path from 'node:path'

import { pathItemsCode } from '../../generator/zod-openapi-hono/openapi/components/pathItems.js'
import { core, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

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
    readonly output: string
    readonly split?: boolean
  },
  componentsConfig?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!pathItemsConfig?.output) return { ok: false, error: 'pathItems.output is required' } as const
  if (!components.pathItems) return { ok: false, error: 'No pathItems found' } as const
  const keys = Object.keys(components.pathItems)
  if (keys.length === 0) return { ok: true, value: 'No pathItems found' } as const
  const { output, split = false } = pathItemsConfig
  const pathItemsSrc = pathItemsCode(components, true, readonly)
  if (!pathItemsSrc) return { ok: true, value: 'No pathItems found' } as const
  const writeFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, componentsConfig)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true as const, value: filePath } : result
  }
  if (!split) {
    const result = await writeFile(output, pathItemsSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated pathItems code written to ${output}` } as const
  }
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
  if (blocks.length === 0) {
    const result = await writeFile(String(output), pathItemsSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated pathItems code written to ${output}` } as const
  }
  const results = await Promise.all([
    ...blocks.map(({ name, block }) =>
      writeFile(`${outDir}/${uncapitalize(name)}PathItem.ts`, block),
    ),
    core(
      makeBarrel(Object.fromEntries(blocks.map((b) => [`${b.name}PathItem`, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])
  const firstError = results.find((result) => !result.ok)
  if (firstError) return firstError
  return {
    ok: true,
    value: `Generated PathItem code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
