import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import zodOpenAPIHono from '../generator/zod-openapi-hono/openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import type { Result } from '../result/index.js'
import { asyncAndThen, ok } from '../result/index.js'
import { templateCode } from './template-code.js'

/**
 * Generates TypeScript code from an OpenAPI spec and optional templates.
 *
 * @param input - Input OpenAPI file (`.yaml`, `.json`, or `.tsp`).
 * @param output - Output `.ts` file path.
 * @param exportSchema - Whether to export schemas.
 * @param exportType - Whether to export types.
 * @param template - Whether to generate templates.
 * @param test - Whether to generate test files.
 * @param basePath - Optional base path for template output.
 * @returns A `Result` containing a success message or an error string.
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
          template && output.includes('/')
            ? asyncAndThen(await templateCode(openAPI, output, test, basePath), async () =>
                ok({
                  message: 'Generated code and template files written',
                }),
              )
            : ok({
                message: `Generated code written to ${output}`,
              }),
        ),
      ),
    ),
  )
}
