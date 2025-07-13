import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPI } from './index.js'
import type { Result } from '../result/index.js'
import { ok, err } from '../result/index.js'
import { typeSpecToOpenAPI } from '../typespec/index.js'

/**
 * @param { string } input - The OpenAPI specification in YAML or JSON format, or a TypeSpec file.
 * @returns { Promise<Result<OpenAPI, string>> } - A promise that resolves to the OpenAPI specification or an error message.
 * @description Parses the OpenAPI specification from a YAML, JSON, or TypeSpec file.
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
