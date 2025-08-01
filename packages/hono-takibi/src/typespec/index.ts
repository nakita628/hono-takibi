import path from 'node:path'
import { compile, logDiagnostics, NodeHost } from '@typespec/compiler'
import type { SupportedOpenAPIDocuments } from '@typespec/openapi3'
import { getOpenAPI3 } from '@typespec/openapi3'

/**
 * Compiles a TypeSpec file and returns the generated OpenAPI documents.
 *
 * @param input - Path to the `.tsp` file.
 * @returns The resulting OpenAPI documents.
 */
export async function typeSpecToOpenAPI(input: string): Promise<
  | {
      ok: true
      value: SupportedOpenAPIDocuments
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    const program = await compile(NodeHost, path.resolve(input), {
      noEmit: true,
    })
    if (program.diagnostics.length) {
      logDiagnostics(program.diagnostics, program.host.logSink)
      return {
        ok: false,
        error: 'TypeSpec compile failed',
      }
    }
    const [record] = await getOpenAPI3(program)
    const spec = 'document' in record ? record.document : record.versions[0].document
    return { ok: true, value: spec }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? String(e.message) : String(e),
    }
  }
}
