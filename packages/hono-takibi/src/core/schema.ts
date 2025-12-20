import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core } from '../helper/core.js'
import { resolveSchemasDependencies } from '../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import { parseOpenAPI } from '../openapi/index.js'
import { lowerFirst } from '../utils/index.js'

const findSchemaRefs = (code: string, selfName: string): string[] => {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const out = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base !== selfName && base) out.add(base)
  }
  return Array.from(out)
}

/**
 * Generate Zod schemas from an OpenAPI/TypeSpec source.
 *
 * @remarks
 * - When `split=true`, writes one file per schema (and an `index.ts`).
 * - Otherwise, emits a single `.ts` file.
 *
 * ```mermaid
 * flowchart TD
 *   A["schema()"] --> B["parseOpenAPI"]
 *   B --> C{"ok?"}
 *   C -- Yes --> D["collect components.schemas"]
 *   C -- No  --> E["return error"]
 *   D --> F{"split mode?"}
 *   F -- Yes --> G["emit per-file + index"]
 *   F -- No  --> H["emit single file"]
 *   G --> I["return success message"]
 *   H --> I
 * ```
 */
export async function schema(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<
  | {
      readonly ok: true
      readonly value: string
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const { schemas } = openAPI.components ? openAPI.components : {}
  if (!schemas) return { ok: false, error: 'No schemas found' }

  // split
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    for (const schemaName of Object.keys(schemas)) {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      const selfToken = `${schemaName}Schema`
      const zExpr = z.includes(selfToken) ? `z.lazy(() => ${z})` : z
      // export schema must be true
      const zs = zodToOpenAPISchema(schemaName, zExpr, true, exportType)

      const importZ = `import { z } from '@hono/zod-openapi'`
      const deps = findSchemaRefs(zs, schemaName).filter((d) => d in schemas)
      const depImports =
        deps.length > 0
          ? deps.map((d) => `import { ${d}Schema } from './${lowerFirst(d)}'`).join('\n')
          : ''
      const fileCode = [importZ, depImports, '\n', zs].filter(Boolean).join('\n')
      const filePath = `${outDir}/${lowerFirst(schemaName)}.ts`
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    // index.ts
    const index = `${Object.keys(schemas)
      .map((n) => `export * from './${lowerFirst(n)}'`)
      .join('\n')}\n`
    const coreResult = await core(index, path.dirname(`${outDir}/index.ts`), `${outDir}/index.ts`)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const orderedSchemas = resolveSchemasDependencies(schemas)
  if (orderedSchemas.length === 0) {
    return { ok: true, value: 'No schemas found' }
  }

  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      const selfToken = `${schemaName}Schema`
      const zExpr = z.includes(selfToken) ? `z.lazy(() => ${z})` : z
      return zodToOpenAPISchema(schemaName, zExpr, true, exportType)
    })
    .join('\n\n')
  const importCode = `import { z } from '@hono/zod-openapi'`
  const schemaDefinitionsCode = `${importCode}\n\n${schemaDefinitions}`
  const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
