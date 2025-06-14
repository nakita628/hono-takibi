import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPISpec } from './index.js'
import type { Result } from '../result/index.js'
import { ok, err } from '../result/index.js'

/**
 * Parses an OpenAPI specification from a string input.
 * @param {string} input - The OpenAPI specification in YAML or JSON format.
 * @returns { Promise<Result<OpenAPISpec, string>> } - A promise that resolves to a Result containing the parsed OpenAPI spec or an error message.
 */
export async function parseOpenAPI(input: string): Promise<Result<OpenAPISpec, string>> {
  try {
    const spec = (await SwaggerParser.parse(input)) as OpenAPISpec
    return ok(spec)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}
