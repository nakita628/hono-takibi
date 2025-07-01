import type { OpenAPI } from '../openapi/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/zod-openapi-hono.js'
import { fmt } from '../format/index.js'
import SwaggerParser from '@apidevtools/swagger-parser'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { typeSpecToOpenAPI } from '../typespec/index.js'

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { `${string}.tsp` } input - Path to the OpenAPI specification file
 * @param { `${string}.ts` } output - Path to the output TypeScript file
 * @param { boolean } exportType - Whether to export types
 * @param { boolean } exportSchema - Whether to export schemas
 * @returns { Promise<boolean | undefined> } True if code is generated, false otherwise
 */
export async function viteTsp(
  input: `${string}.tsp`,
  output: `${string}.ts`,
  exportType: boolean,
  exportSchema: boolean,
): Promise<boolean | undefined> {
  try {
    const tsp = await typeSpecToOpenAPI(input)
    const openAPI = (await SwaggerParser.parse(tsp as unknown as string)) as OpenAPI
    const hono = zodOpenAPIHono(openAPI, exportSchema, exportType)
    const code = await fmt(hono)
    if (!code.ok) {
      console.error(`${code.error}`)
      return false
    }
    await fsp.mkdir(path.dirname(output), { recursive: true })
    await fsp.writeFile(output, code.value, 'utf-8')
    return true
  } catch (e) {
    return false
  }
}
