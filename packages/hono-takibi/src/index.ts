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
import { parseOpenAPI } from './openapi/index.js'
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
        asyncAndThen(await writeFile(config.output, code), async () => {
          if (cli.value.template && config.output.includes('/')) {
            return asyncAndThen(
              await fmt(generateApp(openAPI, config, cli.value.basePath)),
              async (appCode) =>
                asyncAndThen(await readdir(path.dirname(config.output)), async (files) => {
                  const tgt = files.includes('index.ts')
                    ? path.join(path.dirname(config.output), 'main.ts')
                    : path.join(path.dirname(config.output), 'index.ts')

                  return asyncAndThen(await writeFile(tgt, appCode), async () => {
                    await zodOpenapiHonoHandler(openAPI, config, cli.value.test)
                    return ok({ message: 'Generated code written template code' })
                  })
                }),
            )
          }
          return ok({ message: `Generated code written to ${config.output}` })
        }),
      ),
    ),
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
