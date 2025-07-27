import fsp from 'node:fs/promises'
import path from 'node:path'
import SwaggerParser from '@apidevtools/swagger-parser'
import { fmt } from '../format/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/index.js'
import type { OpenAPI } from '../openapi/index.js'

/**
 * Generates Hono + zod-openapi bindings from an OpenAPI file.
 *
 * @param input  - Path to the `.yaml` or `.json` spec file.
 * @param output - Destination `.ts` file.
 * @param exportType   - Emit TypeScript types when `true`.
 * @param exportSchema - Emit zod schemas when `true`.
 * @returns `true` on success, `false` on failure, otherwise `undefined`.
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
