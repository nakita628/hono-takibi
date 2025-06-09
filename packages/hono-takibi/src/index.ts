#!/usr/bin/env node

import type { OpenAPISpec } from './types/index.js'
import { generateZodOpenAPIHono } from './generator/zod-openapi-hono/openapi/generate-zod-openapi-hono.js'
import { generateZodOpenapiHonoHandler } from './generator/zod-openapi-hono/handler/generate-zod-openapi-hono-handler.js'
import { getConfig, type Config } from './config/index.js'
import { formatCode } from './format/index.js'
import { generateApp } from './generator/zod-openapi-hono/app/index.js'
import { parseCliArgs } from './cli/validator/index.js'
import { mergeConfigHelper } from './cli/helper/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'node:path'
import fsp from 'node:fs/promises'

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
  const cli = parseCliArgs(process.argv, getConfig())
  if (!cli.ok) {
    console.error(cli.error)
    process.exit(1)
  }

  const config = mergeConfigHelper(getConfig(), cli.value)

  try {
    const { input, output } = config
    // parse OpenAPI YAML or JSON
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPISpec
    // generate Hono code
    const hono = generateZodOpenAPIHono(openAPI, config)
    // format code
    const formattedCode = await formatCode(hono)

    await fsp.mkdir(path.dirname(output), { recursive: true })
    await fsp.writeFile(output, formattedCode, 'utf-8')

    // generate template code
    if (cli.value.template && config.output.includes('/')) {
      const appCode = await formatCode(generateApp(openAPI, config, cli.value.basePath))

      const dir = path.dirname(config.output)
      const files = await fsp.readdir(dir)
      const tgt = files.includes('index.ts')
        ? path.join(dir, 'main.ts')
        : path.join(dir, 'index.ts')

      await fsp.writeFile(tgt, appCode, 'utf-8')
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
