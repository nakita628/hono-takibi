import type { OpenAPISpec } from '../types/index.js'
import type { Config } from '../config/index.js'
import { generateZodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/generate-zod-openapi-hono.js'
import { getConfig } from '../config/index.js'
import { formatCode } from '../format/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import fsp from 'node:fs/promises'
import path from 'node:path'

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { Config } config - Config
 * @returns { Promise<boolean | undefined> } True if code is generated, false otherwise
 */
export async function viteMode(config: Config = getConfig()): Promise<boolean | undefined> {
  try {
    if (config.input) {
      const openAPI = (await SwaggerParser.parse(config.input)) as OpenAPISpec
      const hono = generateZodOpenAPIHono(openAPI, config)
      const formattedCode = await formatCode(hono)
      if (config.output) {
        await fsp.mkdir(path.dirname(config.output), { recursive: true })
        await fsp.writeFile(config.output, formattedCode, 'utf-8')
        console.log(`Generated code written to ${config.output}`)
        return true
      }
    }
  } catch (e) {
    console.error('Usage: hono-takibi <input-file> [-o output-file]')
    return false
  }
}
