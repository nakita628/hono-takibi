import path from 'node:path'

import { fmt } from '../../format/index.js'
import { readFile, writeFile } from '../../fsp/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { resolveInlineHandlerFileNames, zodOpenAPIHonoHandler } from '../../helper/handler.js'
import { mergeAppFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function template(
  openAPI: OpenAPI,
  output: string,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
  routeHandler: boolean,
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
) {
  const isIndexFile = output.endsWith('/index.ts')
  const dir = isIndexFile ? path.dirname(path.dirname(output)) : path.dirname(output)
  const target = path.join(dir, 'index.ts')
  const stubHandlersResult = await zodOpenAPIHonoHandler(
    openAPI,
    output,
    test,
    pathAlias,
    routeImport,
    routeHandler,
    basePath,
    testFramework,
  )
  if (!stubHandlersResult.ok) return { ok: false, error: stubHandlersResult.error } as const
  // Inline sub-routers are mounted by file name, so the app entry must follow the files the
  // handlers actually landed in (hand-written splits included), read back after writing.
  const inlineFilesResult = routeHandler
    ? undefined
    : await resolveInlineHandlerFileNames(openAPI, output, pathAlias, routeImport)
  if (inlineFilesResult && !inlineFilesResult.ok) {
    return { ok: false, error: inlineFilesResult.error } as const
  }
  const appFmtResult = await fmt(
    app(
      openAPI,
      output,
      basePath,
      pathAlias,
      routeImport,
      routeHandler,
      false,
      undefined,
      inlineFilesResult?.ok ? inlineFilesResult.value : undefined,
    ),
  )
  if (!appFmtResult.ok) return { ok: false, error: appFmtResult.error } as const
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
