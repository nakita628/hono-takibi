import path from 'node:path'

import { Effect } from 'effect'

import { fmt } from '../../format/index.js'
import { readFile, writeFile } from '../../file/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { resolveInlineHandlerFileNames, zodOpenAPIHonoHandler } from '../../helper/handler.js'
import { mergeAppFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function template(
  openAPI: OpenAPI,
  output: string,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
  routeHandler: boolean,
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
) {
  return Effect.gen(function* () {
    const isIndexFile = output.endsWith('/index.ts')
    const dir = isIndexFile ? path.dirname(path.dirname(output)) : path.dirname(output)
    const target = path.join(dir, 'index.ts')
    yield* zodOpenAPIHonoHandler(
      openAPI,
      output,
      test,
      pathAlias,
      routeImport,
      routeHandler,
      basePath,
      testFramework,
    )
    // Inline sub-routers are mounted by file name, so the app entry must follow the files the
    // handlers actually landed in (hand-written splits included), read back after writing.
    const inlineFiles = routeHandler
      ? undefined
      : yield* resolveInlineHandlerFileNames(openAPI, output, pathAlias, routeImport)
    const appCode = yield* fmt(
      app(
        openAPI,
        output,
        basePath,
        pathAlias,
        routeImport,
        routeHandler,
        false,
        undefined,
        inlineFiles,
      ),
    )
    const existing = yield* readFile(target)
    const merged = existing !== null ? mergeAppFile(existing, appCode) : appCode
    // A merge can produce source oxfmt rejects; the unformatted merge is still the
    // right file to write.
    const appContent = yield* fmt(merged).pipe(Effect.orElseSucceed(() => merged))
    yield* writeFile(target, appContent)
    return '🔥 Generated code and template files written'
  })
}
