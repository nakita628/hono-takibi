#!/usr/bin/env node

import SwaggerParser from '@apidevtools/swagger-parser'
import fs from 'node:fs'
import path from 'node:path'
import { generateZodOpenAPIHono } from './generators/hono/generate-zod-openapi-hono'
import { generateZodOpenapiHonoHandler } from './generators/hono/handler/generate-zod-openapi-hono-handler'
import type { OpenAPISpec } from './types'
import type { Config } from './config'
import { getConfig } from './config'
import { formatCode } from './format'
import { generateApp } from './generators/hono/app'

/**
 * CLI entry point for hono-takibi
 *
 * Usage:
 * ```
 * hono-takibi <input-file> [-o output-file]
 * ```
 *
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
export async function main(dev = false, config: Config = getConfig()) {
  // 1. argv ['**/bin/node', '**/dist/index.js', 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  // 2. slice [ 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts' ]
  const args = process.argv.slice(2)
  // 3. input = 'example/pet-store.yaml'
  const input = config.input ?? args[0]
  config.input = input
  // 4. output = 'routes/petstore-index.ts'
  const output = config.output ?? args[args.indexOf('-o') + 1]
  config.output = output

  try {
    // 5. parse OpenAPI YAML or JSON
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPISpec
    // 6. generate Hono code
    const hono = generateZodOpenAPIHono(openAPI, config)
    // 7. format code
    const formattedCode = await formatCode(hono)
    // 8. write to file
    if (config.output) {
      // 8.1 output routes/petstore-index.ts
      const outputDir = path.dirname(output)
      // 8.2 outputDir routes
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
    }
    // 9. write to file
    fs.writeFileSync(output, formattedCode, { encoding: 'utf-8' })

    // 10. generate handler code
    if (config.handler) {
      await generateZodOpenapiHonoHandler(openAPI, config)
    }

    // 11. generate app code
    const appCode = generateApp(openAPI, config)
    if (config.app?.output) {
      const formattedAppCode = await formatCode(appCode)
      if (config.app.output === true) {
        const defaultFileName = 'index.ts'
        const alternativeFileName = 'main.ts'
        const outputFile = fs.existsSync(defaultFileName) ? alternativeFileName : defaultFileName

        fs.writeFileSync(outputFile, formattedAppCode, { encoding: 'utf-8' })
      }
      // fs.writeFileSync(config.app.output, formattedAppCode, { encoding: 'utf-8' })
    }

    console.log(`Generated code written to ${output}`)
    return true
  } catch (e) {
    console.error('Usage: hono-takibi <input-file> [-o output-file]')
    if (e instanceof Error) {
      console.error('Error processing OpenAPI document:', e.message)
      if (dev) {
        throw e
      }
    }
    if (dev) {
      throw new Error('Unknown error occurred')
    }
    return false
  }
}

if (require.main === module) {
  main().then((success) => {
    if (!success) {
      process.exit(1)
    }
  })
}
