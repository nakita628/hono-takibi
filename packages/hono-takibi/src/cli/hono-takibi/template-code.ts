import path from 'node:path'
import { fmt } from '../../format/index.js'
import { readdir, writeFile } from '../../fsp/index.js'
import { app } from '../../generator/zod-openapi-hono/app/index.js'
import { zodOpenapiHonoHandler } from '../../generator/zod-openapi-hono/handler/zod-openapi-hono-handler.js'
import type { OpenAPI } from '../../openapi/index.js'
import type { Result } from '../../result/index.js'
import { asyncAndThen, ok } from '../../result/index.js'

/**
 * Generates Hono Takibi application and handler templates.
 *
 * @param openAPI - The OpenAPI document to generate from.
 * @param output - Path to the main `.ts` output file.
 * @param test - Whether to include test code.
 * @param basePath - Optional base path for the generated app.
 * @returns A `Result` indicating success or an error message.
 */
export async function templateCode(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  test: boolean,
  basePath?: string,
): Promise<Result<void, string>> {
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
