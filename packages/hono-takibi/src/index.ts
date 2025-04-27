#!/usr/bin/env node

import type { OpenAPISpec } from './types/index.js'
import type { Config } from './config/index.js'
import { generateZodOpenAPIHono } from './generator/zod-openapi-hono/openapi/generate-zod-openapi-hono.js'
import { generateZodOpenapiHonoHandler } from './generator/zod-openapi-hono/handler/generate-zod-openapi-hono-handler.js'
import { getConfig } from './config/index.js'
import { formatCode } from './format/index.js'
import { generateApp } from './generator/zod-openapi-hono/app/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import fs from 'node:fs'
import path from 'node:path'
import { argv } from 'node:process'

/**
 * CLI entry point for hono-takibi
 * @param { boolean } dev - Development mode
 * @param { Config } config - Config
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
export async function main(dev = false, config: Config = getConfig()) {
  // argv ['**/bin/node', '**/dist/index.js', 'example/pet-store.yaml', '-o', 'routes/petstore-index.ts']
  // set output
  const { args, input, output } = setOutput(argv, config)
  // export type
  if (args.includes('--export-type')) {
    config.type.export = true
  }
  // export schema
  if (args.includes('--export-schema')) {
    config.schema.export = true
  }
  // naming case type
  if (args.includes('--naming-case-type')) {
    setNamingCaseType(args, '--naming-case-type', config)
  }
  // naming case schema
  if (args.includes('--naming-case-schema')) {
    setNamingCaseSchema(args, '--naming-case-schema', config)
  }

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
      // Base path
      const basePathIndex = args.indexOf('--base-path')
      const hasBasePathEquals = basePathIndex !== -1 && args[basePathIndex + 1] === '='
      const basePath = hasBasePathEquals ? args[basePathIndex + 2] : undefined
      // generate app code
      const appCode = generateApp(openAPI, config, basePath)
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

main().then((success) => {
  if (!success) {
    process.exit(1)
  }
})

/**
 * Set the output of the config
 * @param { string[] } argv - The CLI arguments
 * @param { Config } config - The config
 * @returns { { args: string[]; input: string; output: string } } The CLI arguments, input, and output
 */
function setOutput(
  argv: string[],
  config: Config,
): { args: string[]; input: string; output: string } {
  if (config.output === undefined && !argv.includes('-o')) {
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
  return {
    args,
    input,
    output,
  }
}

/**
 * Set the naming case of the type
 * @param { string[] } args - The CLI arguments
 * @param { string } namingCase - The naming case
 * @param { Config } config - The config
 */
function setNamingCaseType(args: string[], namingCase: string, config: Config) {
  const VALID_NAMING_CASES = ['PascalCase', 'camelCase']
  const name = args[args.indexOf(namingCase) + 1]
  if (!(name && VALID_NAMING_CASES.includes(name))) {
    console.error(
      `Invalid value for --naming-case-type: "${name}". Valid options are: ${VALID_NAMING_CASES.join(', ')}`,
    )
    process.exit(1)
  }

  if (name === 'camelCase') {
    config.type.name = 'camelCase'
  } else {
    config.type.name = 'PascalCase'
  }
}

/**
 * Set the naming case of the schema
 * @param { string[] } args - The CLI arguments
 * @param { string } namingCase - The naming case
 * @param { Config } config - The config
 */
function setNamingCaseSchema(args: string[], namingCase: string, config: Config) {
  const VALID_NAMING_CASES = ['PascalCase', 'camelCase']
  const name = args[args.indexOf(namingCase) + 1]
  if (!(name && VALID_NAMING_CASES.includes(name))) {
    console.error(
      `Invalid value for --naming-case-type: "${name}". Valid options are: ${VALID_NAMING_CASES.join(', ')}`,
    )
    process.exit(1)
  }

  if (name === 'camelCase') {
    config.schema.name = 'camelCase'
  } else {
    config.schema.name = 'PascalCase'
  }
}
