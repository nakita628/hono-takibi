import path from 'node:path'

import { routeCode } from '../../generator/zod-openapi-hono/openapi/routes/index.js'
import { core, makeImports } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export async function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string
    readonly split?: boolean
  },
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' } as const
  const { output, split = false } = routes
  const routesSrc = routeCode(openAPI, readonly)
  const importWriteFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, components)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? ({ ok: true, value: filePath } as const) : result
  }
  if (!split) {
    const result = await importWriteFile(output, routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` } as const
  }
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
  if (blocks.length === 0) {
    const result = await importWriteFile(output, routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` } as const
  }
  const results = await Promise.all([
    ...blocks.map(({ name, block }) =>
      importWriteFile(`${outDir}/${uncapitalize(name)}.ts`, block),
    ),
    core(
      makeBarrel(Object.fromEntries(blocks.map((b) => [b.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])
  const e = results.find((result) => !result.ok)
  if (e) return e
  return {
    ok: true,
    value: `Generated route code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
