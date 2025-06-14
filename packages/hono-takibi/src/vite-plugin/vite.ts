import type { OpenAPISpec } from '../openapi/index.js'
import type { Config } from '../config/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/zod-openapi-hono.js'
import { fmt } from '../format/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import fsp from 'node:fs/promises'
import path from 'node:path'

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { Config } config - Config
 * @returns { Promise<boolean | undefined> } True if code is generated, false otherwise
 */
export async function vite(config: Config): Promise<boolean | undefined> {
  try {
    if (config.input) {
      const openAPI = (await SwaggerParser.parse(config.input)) as OpenAPISpec
      const hono = zodOpenAPIHono(openAPI, config)
      const code = await fmt(hono)
      if (!code.ok) {
        console.error(`Error formatting code: ${code.error}`)
        return false
      }
      if (config.output) {
        await fsp.mkdir(path.dirname(config.output), { recursive: true })
        await fsp.writeFile(config.output, code.value, 'utf-8')
        console.log(`Generated code written to ${config.output}`)
        return true
      }
    }
  } catch (e) {
    console.error('Usage: hono-takibi <input.yaml|.json> -o <output.ts>')
    return false
  }
}
