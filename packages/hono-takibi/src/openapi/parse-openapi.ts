import SwaggerParser from '@apidevtools/swagger-parser'
import type { Result } from '../result/index.js'
import { err, ok } from '../result/index.js'
import { typeSpecToOpenAPI } from '../typespec/index.js'
import type { OpenAPI } from './index.js'

/**
 * Parses an OpenAPI document from a file path (YAML, JSON, or TypeSpec).
 *
 * @param input - File path to the OpenAPI or TypeSpec document
 * @returns A promise resolving to a Result with the parsed OpenAPI or error string
 */
export async function parseOpenAPI(input: string): Promise<Result<OpenAPI, string>> {
  try {
    if (typeof input === 'string' && input.endsWith('.tsp')) {
      const tsp = await typeSpecToOpenAPI(input)
      const spec = (await SwaggerParser.parse(tsp as unknown as string)) as OpenAPI
      return ok(spec)
    }
    const spec = (await SwaggerParser.parse(input)) as OpenAPI
    return ok(spec)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}
