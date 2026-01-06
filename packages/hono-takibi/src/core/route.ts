import path from 'node:path'
import { routeCode } from '../generator/zod-openapi-hono/openapi/routes/index.js'
import type { ComponentImports } from '../helper/index.js'
import { core, makeBarell, makeImports } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { lowerFirst } from '../utils/index.js'

// Extract route blocks from source code
const extractRouteBlocks = (
  src: string,
): readonly { readonly name: string; readonly block: string }[] => {
  const re = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g
  const hits = Array.from(src.matchAll(re))
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)

  return hits.map((h, i) => ({
    name: h.name,
    block: src.slice(h.start, hits[i + 1]?.start ?? src.length).trim(),
  }))
}

export async function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  components?: ComponentImports,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' }

  const { output, split = false } = routes
  const routesSrc = routeCode(openAPI)

  // Write a single route file
  const writeFile = async (
    filePath: string,
    src: string,
  ): Promise<
    { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
  > => {
    const code = makeImports(src, filePath, components, true)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true, value: filePath } : { ok: false, error: result.error }
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(String(output), routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Split mode
  const outDir = output.replace(/\.ts$/, '')
  const blocks = extractRouteBlocks(routesSrc)

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
