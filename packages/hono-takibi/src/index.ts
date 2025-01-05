#!/usr/bin/env node

import SwaggerParser from '@apidevtools/swagger-parser'
import fs from 'node:fs'
import path from 'node:path'
import { format } from 'prettier'
import { generateZodOpenAPIHono } from './generators/hono/generate-zod-openapi-hono'
import type { OpenAPISpec } from './types'
import { getConfig } from './config'

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
export async function main(dev = false) {
  const config = getConfig()
  console.log('config', config)

  // 1. argv ['**/bin/node', '**/dist/index.js', 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  // 2. slice [ 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts' ]
  const args = process.argv.slice(2)
  // 3. input = 'example/pet-store.yaml'
  const input = args[0]
  // 4. output = 'routes/petstore-index.ts'
  const output = args[args.indexOf('-o') + 1]
  try {
    // 5. parse OpenAPI YAML or JSON
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPISpec
    // 6. generate Hono code
    const hono = generateZodOpenAPIHono(openAPI, config.schemaOptions.namingCase)
    // 7. format code
    const formattedCode = await format(hono, {
      parser: 'typescript',
      printWidth: 100,
      singleQuote: true,
      semi: false,
    })
    // 8. write to file
    if (output) {
      // 8.1 output routes/petstore-index.ts
      const outputDir = path.dirname(output)
      // 8.2 outputDir routes
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
    }
    // 9. write to file
    fs.writeFileSync(output, formattedCode, { encoding: 'utf-8' })
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
