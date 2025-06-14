#!/usr/bin/env node

import path from 'node:path'
import type { Result } from './result/types.js'
import { zodOpenAPIHono } from './generator/zod-openapi-hono/openapi/zod-openapi-hono.js'
import { generateApp } from './generator/zod-openapi-hono/app/index.js'
import { zodOpenapiHonoHandler } from './generator/zod-openapi-hono/handler/zod-openapi-hono-handler.js'
import { getConfig } from './config/index.js'
import { fmt } from './format/index.js'
import { parseCliArgs, parseHelp } from './cli/validator/index.js'
import { setConfig, sliceArgs } from './cli/helper/index.js'
import { parseOpenAPI, type OpenAPISpec } from './openapi/index.js'
import { mkdir, writeFile, readdir } from './fsp/index.js'
import { ok, err, andThen, asyncAndThen } from './result/index.js'

const HELP_TEXT = `
Usage:
  hono-takibi <input.yaml|json> -o <routes.ts> [options]

Options:
  --export-type               Export generated type aliases

  --export-schema             Export generated schema objects

  --naming-case-type <PascalCase|camelCase>
                              Casing for generated *type aliases*
                              (default: PascalCase)

  --naming-case-schema <PascalCase|camelCase>
                              Casing for generated *schema objects*
                              (default: PascalCase)

  --template                  Generate an app file and handler stubs

  --test                      Generate empty *.test.ts files for handlers

  --base-path <path>          API prefix (e.g. /api)
  
  --help                      Show this help and exit
`.trimStart()

/**
 * CLI entry point for hono-takibi
 * Usage:
 * ```
 * hono-takibi <input-file> [-o output-file]
 * ```
 * @example
 * ```bash
 * # Global install
 * npm install -g hono-takibi
 * hono-takibi openapi.yaml -o routes.ts
 *
 * # NPX usage
 * npx hono-takibi openapi.yaml -o routes.ts
 * ```
 */
export async function main(): Promise<Result<{ message: string }, string>> {
  const args = sliceArgs(process.argv)

  if (parseHelp(args)) return ok({ message: HELP_TEXT })

  const setting = andThen(getConfig(), (config) =>
    andThen(parseCliArgs(args, config), (cli) => ok({ config, cli })),
  )
  if (!setting.ok) return err(setting.error)

  const cli = parseCliArgs(args, setting.value.config)
  if (!cli.ok) return err(cli.error)

  const setConfigResult = setConfig(setting.value.config, cli.value)
  if (!setConfigResult.ok) return err(setConfigResult.error)

  const config = setConfigResult.value

  return await asyncAndThen(await parseOpenAPI(config.input), async (openAPI) =>
    asyncAndThen(await fmt(zodOpenAPIHono(openAPI, config)), async (code) =>
      asyncAndThen(await mkdir(path.dirname(config.output)), async () =>
        asyncAndThen(await writeFile(config.output, code), async () =>
          asyncAndThen(
            await templateCode(
              openAPI,
              config.output,
              cli.value.template,
              cli.value.test,
              cli.value.basePath,
            ),
            async () =>
              ok({
                message: cli.value.template
                  ? 'Generated code written template code'
                  : `Generated code written to ${config.output}`,
              }),
          ),
        ),
      ),
    ),
  )
}

export async function templateCode(
  openAPI: OpenAPISpec,
  output: `${string}.ts`,
  test: boolean,
  template: boolean,
  basePath?: string,
): Promise<Result<void, string>> {
  if (!template || !output.includes('/')) return ok(undefined)
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

main().then((result) => {
  if (result.ok) {
    console.log(result.value.message)
    process.exit(0)
  } else {
    console.error(result.error)
    process.exit(1)
  }
})
