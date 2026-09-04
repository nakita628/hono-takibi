import path from 'node:path'

import { Effect } from 'effect'

import { readFile, writeFile } from '../../file/index.js'
import { fmt } from '../../format/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { makeModuleSpec } from '../../helper/code.js'
import { defineOpenAPIRouteHandler } from '../../helper/handler.js'
import { mergeAppFile } from '../../merge/index.js'
import type { OpenAPI } from '../../openapi/index.js'

export function defineTemplate(
  openAPI: OpenAPI,
  output: string,
  componentsOutput: string,
  test: boolean,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined,
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
  readonly?: boolean,
) {
  const target = output.endsWith('.ts') ? output : path.join(output, 'index.ts')
  // The generated route/handler directory always sits next to the app entry
  // (`dirname(target)/routes`). Everything else (app import specifier, handler
  // write path, test import) derives from it.
  const baseDir = path.dirname(target)
  const handlerDir = baseDir === '.' ? 'routes' : `${baseDir}/routes`
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const handlerImport = aliasPrefix
    ? `${aliasPrefix}/routes`
    : makeModuleSpec(target, { output: handlerDir })
  return Effect.gen(function* () {
    const [appCode] = yield* Effect.all(
      [
        fmt(app(openAPI, output, basePath, pathAlias, routeImport, false, true, handlerImport)),
        defineOpenAPIRouteHandler(
          openAPI,
          target,
          componentsOutput,
          test,
          pathAlias,
          basePath,
          testFramework,
          readonly,
        ),
      ],
      { concurrency: 'unbounded' },
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
