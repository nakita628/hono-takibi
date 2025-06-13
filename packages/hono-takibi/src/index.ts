#!/usr/bin/env node

import type { OpenAPISpec } from './types/index.js'
import { generateZodOpenAPIHono } from './generator/zod-openapi-hono/openapi/generate-zod-openapi-hono.js'
import { generateZodOpenapiHonoHandler } from './generator/zod-openapi-hono/handler/generate-zod-openapi-hono-handler.js'
import { getConfig, type Config } from './config/index.js'
import { fmt } from './format/index.js'
import { generateApp } from './generator/zod-openapi-hono/app/index.js'
import { parseCliArgs } from './cli/validator/index.js'
import { mergeConfig } from './cli/helper/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'node:path'
import fsp from 'node:fs/promises'
import { mkdir, writeFile, readdir } from './fsp/index.js'

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
export async function main(): Promise<boolean> {
  // argv ['**/bin/node', '**/dist/index.js', 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  const setting = getConfig()
  const cli = parseCliArgs(process.argv, setting)
  if (!cli.ok) {
    if (cli.error === 'help') {
      console.log(HELP_TEXT)
      process.exit(0)
    }
    console.error(cli.error)
    process.exit(1)
  }

  const config = mergeConfig(setting, cli.value)

  try {
    const { input, output } = config
    // parse OpenAPI YAML or JSON
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPISpec
    // generate Hono code
    const hono = generateZodOpenAPIHono(openAPI, config)
    // format code
    const formattedCode = await fmt(hono)
    if (!formattedCode.ok) {
      console.error(formattedCode.error)
      process.exit(1)
    }

    const mkdirResult = await mkdir(path.dirname(output))
    if (!mkdirResult.ok) {
      console.log(mkdirResult.error)
      process.exit(1)
    }

    // await fsp.mkdir(path.dirname(output), { recursive: true })

    const writeResult = await writeFile(output, formattedCode.value)
    if (!writeResult.ok) {
      console.error(writeResult.error)
      process.exit(1)
    }

    // await fsp.writeFile(output, formattedCode.value, 'utf-8')

    // generate template code
    if (cli.value.template && config.output.includes('/')) {
      const appCode = await fmt(generateApp(openAPI, config, cli.value.basePath))
      if (!appCode.ok) {
        console.error(appCode.error)
        process.exit(1)
      }

      const dir = path.dirname(config.output)
      const readdirResult = await readdir(dir)
      if (!readdirResult.ok) {
        console.error(readdirResult.error)
        process.exit(1)
      }
      // const files = await fsp.readdir(dir)
      const tgt = readdirResult.value.includes('index.ts')
        ? path.join(dir, 'main.ts')
        : path.join(dir, 'index.ts')

      await fsp.writeFile(tgt, appCode.value, 'utf-8')
      await generateZodOpenapiHonoHandler(openAPI, config, cli.value.test)
    }

    console.log(`Generated code written to ${output}`)
    return true
  } catch (e) {
    console.error('Usage: hono-takibi <input-file> [-o output-file]')
    if (e instanceof Error) {
      console.error('Error processing OpenAPI document:', e.message)
    }
    return false
  }
}

main().then((success) => {
  if (!success) {
    process.exit(1)
  }
})
