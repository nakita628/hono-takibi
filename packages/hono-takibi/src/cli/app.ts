import path from 'node:path'
import type { OpenAPISpec } from '../openapi/index.js'
import type { Result } from '../result/index.js'
import { ok, err, asyncAndThen } from '../result/index.js'
import { readdir, writeFile } from '../fsp/index.js'
import { fmt } from '../format/index.js'
import { generateApp } from '../generator/zod-openapi-hono/app/index.js'
import { zodOpenapiHonoHandler } from '../generator/zod-openapi-hono/handler/zod-openapi-hono-handler.js'

export async function app(
  openAPI: OpenAPISpec,
  output: `${string}.ts`,
  template: boolean,
  test: boolean,
  basePath?: string,
): Promise<Result<void, string>> {
  if (!(template || !output.includes('/'))) return ok(undefined)
  const dir = path.dirname(output)
  return await asyncAndThen(await fmt(generateApp(openAPI, output, basePath)), async (appCode) =>
    asyncAndThen(await readdir(dir), async (files) => {
      const target = path.join(dir, files.includes('index.ts') ? 'main.ts' : 'index.ts')
      return await asyncAndThen(await writeFile(target, appCode), async () =>
        asyncAndThen(await zodOpenapiHonoHandler(openAPI, output, test), async () => ok(undefined)),
      )
    }),
  )
}