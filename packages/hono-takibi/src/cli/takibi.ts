import path from 'node:path'
import type { Result } from '../result/types.js'
import { ok, asyncAndThen } from '../result/index.js'
import { fmt } from '../format/index.js'
import { parseOpenAPI } from '../openapi/parse-openapi.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/zod-openapi-hono.js'
import { app } from './app.js'
import { mkdir, writeFile } from '../fsp/index.js'

export async function takibi(
  config: {
    schema: {
      name: 'PascalCase' | 'camelCase'
      export: boolean
    }
    type: {
      name: 'PascalCase' | 'camelCase'
      export: boolean
    }
    input: `${string}.yaml` | `${string}.json`
    output: `${string}.ts`
  },
  template: boolean,
  test: boolean,
  basePath?: string,
): Promise<Result<{ message: string }, string>> {
  return await asyncAndThen(await parseOpenAPI(config.input), async (openAPI) =>
    asyncAndThen(await fmt(zodOpenAPIHono(openAPI, config)), async (code) =>
      asyncAndThen(await mkdir(path.dirname(config.output)), async () =>
        asyncAndThen(await writeFile(config.output, code), async () =>
          asyncAndThen(await app(openAPI, config.output, template, test, basePath), async () =>
            ok({
              message: template
                ? 'Generated code and template files written'
                : `Generated code written to ${config.output}`,
            }),
          ),
        ),
      ),
    ),
  )
}
