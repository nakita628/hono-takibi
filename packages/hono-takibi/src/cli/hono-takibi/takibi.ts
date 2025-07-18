import path from 'node:path'
import type { Result } from '../../result/index.js'
import { ok, asyncAndThen } from '../../result/index.js'
import { fmt } from '../../format/index.js'
import { parseOpenAPI } from '../../openapi/parse-openapi.js'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/zod-openapi-hono.js'
import { templateCode } from './template-code.js'
import { mkdir, writeFile } from '../../fsp/index.js'

/**
 * @param { `${string}.yaml` | `${string}.json` | `${string}.tsp` } input - The input OpenAPI file.
 * @param { `${string}.ts` } output - The output TypeScript file.
 * @param { boolean } exportSchema - Whether to export the schema.
 * @param { boolean } exportType - Whether to export the type.
 * @param { boolean } template - Whether to generate a template.
 * @param { boolean } test - Whether to generate test files.
 * @param { string } [basePath] - The base path for the template.
 * @returns { Promise<Result<{ message: string }, string>> }
 * @description Generates TypeScript code from an OpenAPI specification and optionally creates template files.
 */
export async function takibi(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  exportSchema: boolean,
  exportType: boolean,
  template: boolean,
  test: boolean,
  basePath?: string,
): Promise<Result<{ message: string }, string>> {
  return await asyncAndThen(await parseOpenAPI(input), async (openAPI) =>
    asyncAndThen(await fmt(zodOpenAPIHono(openAPI, exportSchema, exportType)), async (code) =>
      asyncAndThen(await mkdir(path.dirname(output)), async () =>
        asyncAndThen(await writeFile(output, code), async () =>
          asyncAndThen(await templateCode(openAPI, output, template, test, basePath), async () =>
            ok({
              message: template
                ? 'Generated code and template files written'
                : `Generated code written to ${output}`,
            }),
          ),
        ),
      ),
    ),
  )
}
