import type { OpenAPI } from '../openapi/index.js'
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
export async function vite(
  input: `${string}.yaml` | `${string}.json`,
  output: `${string}.ts`,
  exportType: boolean,
  exportSchema: boolean,
): Promise<boolean | undefined> {
  try {
    const openAPI = (await SwaggerParser.parse(input)) as OpenAPI
    const hono = zodOpenAPIHono(openAPI, exportSchema, exportType)
    const code = await fmt(hono)
    if (!code.ok) {
      console.error(`Error formatting code: ${code.error}`)
      return false
    }
    if (output) {
      await fsp.mkdir(path.dirname(output), { recursive: true })
      await fsp.writeFile(output, code.value, 'utf-8')
      console.log(`Generated code written to ${output}`)
      return true
    }
  } catch (e) {
    console.error('Usage: hono-takibi <input.yaml|.json> -o <output.ts>')
    return false
  }
}
