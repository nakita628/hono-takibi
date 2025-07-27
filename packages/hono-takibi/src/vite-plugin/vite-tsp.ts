import fsp from 'node:fs/promises'
import path from 'node:path'
import SwaggerParser from '@apidevtools/swagger-parser'
import { fmt } from '../format/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { typeSpecToOpenAPI } from '../typespec/index.js'

/**
 * Compiles a TypeSpec file and generates Hono + zod-openapi bindings.
 *
 * @param input  - Path to the `.tsp` file.
 * @param output - Destination `.ts` file.
 * @param exportType   - Emit TypeScript types when `true`.
 * @param exportSchema - Emit zod schemas when `true`.
 * @returns `true` on success, `false` on failure, otherwise `undefined`.
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
