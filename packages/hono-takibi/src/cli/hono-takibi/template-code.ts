import path from 'node:path'
import type { OpenAPI } from '../../openapi/index.js'
import type { Result } from '../../result/index.js'
import { ok, asyncAndThen } from '../../result/index.js'
import { readdir, writeFile } from '../../fsp/index.js'
import { fmt } from '../../format/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { zodOpenapiHonoHandler } from '../../generator/zod-openapi-hono/handler/zod-openapi-hono-handler.js'

/**
 * @param { OpenAPI } openAPI - OpenAPI specification
 * @param { `${string}.ts` } output - Output file path
 * @param { boolean } template - Whether to generate a template
 * @param { boolean } test - Whether to generate test files
 * @param { string } basePath - Optional base path for the application
 * @returns { Promise<Result<void, string>> }
 * @description Generates a Hono Takibi application template code based on the OpenAPI specification.
 */
export async function templateCode(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  template: boolean,
  test: boolean,
  basePath?: string,
): Promise<Result<void, string>> {
  if (!(template && output.includes('/'))) return ok(undefined)
  const dir = path.dirname(output)
  return await asyncAndThen(await fmt(app(openAPI, output, basePath)), async (appCode) =>
    asyncAndThen(await readdir(dir), async (files) => {
      const target = path.join(dir, files.includes('index.ts') ? 'main.ts' : 'index.ts')
      return await asyncAndThen(await writeFile(target, appCode), async () =>
        asyncAndThen(await zodOpenapiHonoHandler(openAPI, output, test), async () => ok(undefined)),
      )
    }),
  )
}
