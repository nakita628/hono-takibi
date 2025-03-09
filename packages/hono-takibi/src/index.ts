#!/usr/bin/env node

import type { OpenAPISpec } from './type'
import type { Config } from './config'
import { generateZodOpenAPIHono } from './generator/zod-openapi-hono/openapi/generate-zod-openapi-hono'
import { generateZodOpenapiHonoHandler } from './generator/zod-openapi-hono/handler/generate-zod-openapi-hono-handler'
import { getConfig } from './config'
import { formatCode } from './format'
import { generateApp } from './generator/zod-openapi-hono/app'
import SwaggerParser from '@apidevtools/swagger-parser'
import fs from 'node:fs'
import path from 'node:path'
import { argv } from 'node:process'

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
  // argv ['**/bin/node', '**/dist/index.js', 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  if (!argv.includes('-o')) {
    console.error('Usage: hono-takibi <input-file> [-o output-file]')
    process.exit(1)
  }
  // slice [ 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  const args = process.argv.slice(2)
  // input = 'example/pet-store.yaml'
  const input = config.input ?? args[0]
  config.input = input
  // output = 'routes/petstore-index.ts'
  const output = config.output ?? args[args.indexOf('-o') + 1]
  config.output = output

  try {
    // parse OpenAPI YAML or JSON
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPISpec
    // generate Hono code
    const hono = generateZodOpenAPIHono(openAPI, config)
    // format code
    const formattedCode = await formatCode(hono)
    // write to file
    if (config.output) {
      // output routes/petstore-index.ts
      const outputDir = path.dirname(output)
      // outputDir routes
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
    }
    // write to file
    fs.writeFileSync(output, formattedCode, { encoding: 'utf-8' })
    // generate template code
    const template = args.includes('-template')
    // check if the output path contains a slash
    const isSlash = output.includes('/')

    if (!isSlash && template === true) {
      console.warn(
        "To use the '-template' option, you must specify a valid directory path. Ensure the directory exists before executing the command.",
      )
      return false
    }

    if (template === true && isSlash) {
      // Test
      const test = args.includes('-test')
      // Environment file path
      const envIndex = args.indexOf('--env')
      const hasEnvEquals = envIndex !== -1 && args[envIndex + 1] === '='
      const env = hasEnvEquals ? args[envIndex + 2] : undefined
      // Base path
      const basePathIndex = args.indexOf('--base-path')
      const hasBasePathEquals = basePathIndex !== -1 && args[basePathIndex + 1] === '='
      const basePath = hasBasePathEquals ? args[basePathIndex + 2] : undefined
      // generate app code
      const appCode = generateApp(openAPI, config, env, basePath)
      // generate handler code
      await generateZodOpenapiHonoHandler(openAPI, config, test)
      // format app code
      const formattedAppCode = await formatCode(appCode)
      
      const outputDir = path.dirname(output)
      // write to file
      const defaultFileName = 'index.ts'
      const alternativeFileName = 'main.ts'
      const outputFile = fs.existsSync(defaultFileName) ? alternativeFileName : defaultFileName
      fs.writeFileSync(path.join(outputDir, outputFile), formattedAppCode, { encoding: 'utf-8' })
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
