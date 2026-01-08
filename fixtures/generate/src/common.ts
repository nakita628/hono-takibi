import { readdir } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import SwaggerParser from '@apidevtools/swagger-parser'
import { compile, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'
import type { type as generateType } from 'hono-takibi/type'

export type OpenAPI = Parameters<typeof generateType>[0]

export const __dirname = dirname(fileURLToPath(import.meta.url))
export const WORKERS = availableParallelism()

export type Result =
  | { file: string; success: true }
  | { file: string; success: false; stderr?: string; error?: string }

export async function parseOpenAPI(
  input: string,
): Promise<
  { readonly ok: true; readonly value: OpenAPI } | { readonly ok: false; readonly error: string }
> {
  try {
    if (input.endsWith('.tsp')) {
      const program = await compile(NodeHost, path.resolve(input), {
        noEmit: true,
      })
      if (program.diagnostics.length) {
        return {
          ok: false,
          error: 'TypeSpec compile failed',
        }
      }
      const [record] = await getOpenAPI3(program)
      const tsp = 'document' in record ? record.document : record.versions[0].document
      const bundled = await SwaggerParser.bundle(JSON.parse(JSON.stringify(tsp)))
      return { ok: true, value: bundled as unknown as OpenAPI }
    }
    const bundled = await SwaggerParser.bundle(input)
    return { ok: true, value: bundled as unknown as OpenAPI }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function getOpenAPIFiles(): Promise<string[]> {
  return (await readdir(join(__dirname, '../openapi'))).filter((f) => /\.(yaml|json|tsp)$/i.test(f))
}

export function printFailures(failures: Result[], total: number, label: string): void {
  if (failures.length > 0) {
    console.error(`\n${failures.length}/${total} ${label} failed:\n`)
    for (const f of failures) {
      console.error(`--- ${f.file} ---`)
      if (!f.success) {
        console.error(f.stderr || f.error || '(no output)')
      }
    }
  }
}
