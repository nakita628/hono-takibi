import path from 'node:path'

import { fmt } from '../../format/index.js'
import { readFile, writeFile } from '../../fsp/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { makeModuleSpec } from '../../helper/code.js'
import { defineOpenAPIRouteHandler } from '../../helper/handler.js'
import { mergeAppFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function defineTemplate(
  openAPI: OpenAPI,
  output: string,
  componentsOutput: string,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
  readonly?: boolean,
  templateOutput?: string,
) {
  const target = output.endsWith('.ts') ? output : path.join(output, 'index.ts')
  // Single source for the generated route/handler directory; everything else
  // (app import specifier, handler write path, test import) derives from it.
  const baseDir = path.dirname(output)
  const handlerDir = templateOutput ?? (baseDir === '.' ? 'routes' : `${baseDir}/routes`)
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  // The alias maps to the app entry's directory, so resolve the handler dir relative to it
  // (keeps nested dirs like `src/api/controllers` → `@/api/controllers`, not just the basename).
  const handlerImport = aliasPrefix
    ? `${aliasPrefix}/${path.relative(baseDir, handlerDir).replaceAll('\\', '/')}`
    : makeModuleSpec(output, { output: handlerDir })
  const [appFmtResult, handlersResult] = await Promise.all([
    fmt(app(openAPI, output, basePath, pathAlias, routeImport, false, true, handlerImport)),
    defineOpenAPIRouteHandler(
      openAPI,
      output,
      componentsOutput,
      test,
      pathAlias,
      basePath,
      testFramework,
      readonly,
      handlerDir,
    ),
  ])
  if (!appFmtResult.ok) return { ok: false, error: appFmtResult.error } as const
  if (!handlersResult.ok) return { ok: false, error: handlersResult.error } as const
  const existingResult = await readFile(target)
  if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
  const merged =
    existingResult.value !== null
      ? mergeAppFile(existingResult.value, appFmtResult.value)
      : appFmtResult.value
  const finalFmtResult = await fmt(merged)
  const appContent = finalFmtResult.ok ? finalFmtResult.value : merged
  const writeResult = await writeFile(target, appContent)
  if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
  return { ok: true, value: '🔥 Generated code and template files written' } as const
}
