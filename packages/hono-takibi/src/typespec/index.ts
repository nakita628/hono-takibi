import path from 'node:path'
import { compile, NodeHost } from '@typespec/compiler'
import type { SupportedOpenAPIDocuments } from '@typespec/openapi3'
import { getOpenAPI3 } from '@typespec/openapi3'

/**
 * Compiles a TypeSpec (`.tsp`) file and returns the generated OpenAPI document.
 *
 * - Runs the TypeSpec compiler with `noEmit`.
 * - If there are diagnostics, logs them and returns `{ ok:false }`.
 * - Uses `getOpenAPI3(program)` and extracts the first document (single or versioned).
 *
 * ```mermaid
 * flowchart TD
 *   A["typeSpecToOpenAPI(input)"] --> B["compile(NodeHost, resolve(input), { noEmit:true })"]
 *   B --> C{"program.diagnostics.length > 0?"}
 *   C -->|Yes| D["logDiagnostics(...)"]
 *   D --> E["return { ok:false, error:'TypeSpec compile failed' }"]
 *   C -->|No| F["getOpenAPI3(program)"]
 *   F --> G{"record has 'document'?"}
 *   G -->|Yes| H["spec = record.document"]
 *   G -->|No| I["spec = record.versions[0].document"]
 *   H --> J["return { ok:true, value: spec }"]
 *   I --> J
 *   A -.->|catch| K["return { ok:false, error }"]
 * ```
 *
 * @param input - Absolute or relative path to a `.tsp` file.
 * @returns `{ ok:true, value }` with an OpenAPI document, or `{ ok:false, error }` on failure.
 */
export async function typeSpecToOpenAPI(input: string): Promise<
  | {
      readonly ok: true
      readonly value: SupportedOpenAPIDocuments
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  try {
    const program = await compile(NodeHost, path.resolve(input), {
      noEmit: true,
    })
    if (program.diagnostics.length) {
      // logDiagnostics(program.diagnostics, program.host.logSink)
      console.log(JSON.stringify(program.diagnostics, null, 2))
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
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
