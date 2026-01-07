/**
 * Core component generation module.
 *
 * Handles generation of OpenAPI components (schemas, parameters, headers, etc.)
 * with support for split mode (one file per component) and single file mode.
 *
 * ```mermaid
 * flowchart TD
 *   A["componentsCore(components, suffix, output, split)"] --> B{"suffix type?"}
 *   B -->|Schema/Header/Parameter| C["Zod code generation"]
 *   B -->|Example/Link/Callback| D["JSON export generation"]
 *   C --> E{"split mode?"}
 *   E -->|Yes| F["Generate individual files + index.ts"]
 *   E -->|No| G["Generate single file"]
 *   D --> H{"split mode?"}
 *   H -->|Yes| I["makeExports()"]
 *   H -->|No| J["makeExportConst()"]
 * ```
 *
 * @module core
 */
import path from 'node:path'
import { headersCode } from '../generator/zod-openapi-hono/openapi/components/headers.js'
import { parametersCode } from '../generator/zod-openapi-hono/openapi/components/parameters.js'
import { requestBodiesCode } from '../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { responsesCode } from '../generator/zod-openapi-hono/openapi/components/responses.js'
import { schemasCode } from '../generator/zod-openapi-hono/openapi/components/schemas.js'
import type { ComponentImports } from '../helper/code.js'
import {
  analyzeCircularSchemas,
  ast,
  core,
  makeBarell,
  makeExportConst,
  makeExports,
  makeImports,
  makeSplitSchemaFile,
} from '../helper/index.js'
import type { Components } from '../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../utils/index.js'

/**
 * Generates OpenAPI component code files.
 *
 * Supports multiple component types and output modes:
 * - **Schema/Header/Parameter/RequestBody/Response**: Generates Zod validation schemas
 * - **Example/Link/Callback/SecurityScheme**: Generates JSON export constants
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["OpenAPI Components"]
 *   end
 *   subgraph Processing
 *     B["componentsCore()"]
 *   end
 *   subgraph Output
 *     C["Single .ts file"]
 *     D["Multiple .ts files + index.ts"]
 *   end
 *   A --> B
 *   B -->|split=false| C
 *   B -->|split=true| D
 * ```
 *
 * @param components - OpenAPI components object
 * @param suffix - Component type suffix (Schema, Parameter, Header, etc.)
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param exportType - Whether to export TypeScript types
 * @param imports - Import configuration for schema references
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate schemas in single file
 * await componentsCore(
 *   { schemas: { User: { type: 'object', ... } } },
 *   'Schema',
 *   'src/schemas.ts',
 *   false,
 *   true
 * )
 *
 * // Generate schemas in split mode
 * await componentsCore(
 *   { schemas: { User: {...}, Post: {...} } },
 *   'Schema',
 *   'src/schemas',
 *   true,
 *   true
 * )
 * // Creates: src/schemas/user.ts, src/schemas/post.ts, src/schemas/index.ts
 * ```
 */
export async function componentsCore(
  components: Components,
  suffix: keyof {
    Schema: 'schemas'
    Parameter: 'parameters'
    SecurityScheme: 'securitySchemes'
    RequestBody: 'requestBodies'
    Response: 'responses'
    Header: 'headers'
    Example: 'examples'
    Link: 'links'
    Callback: 'callbacks'
  },
  output: string | `${string}.ts`,
  split?: boolean,
  exportType?: boolean,
  imports?: ComponentImports,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!components) return { ok: false, error: 'No components found' }

  const componentKeyMap = {
    Schema: 'schemas',
    Parameter: 'parameters',
    SecurityScheme: 'securitySchemes',
    RequestBody: 'requestBodies',
    Response: 'responses',
    Header: 'headers',
    Example: 'examples',
    Link: 'links',
    Callback: 'callbacks',
  } as const satisfies { readonly [K: string]: keyof Components }

  const zodCodeGenerators: {
    readonly [K in keyof typeof componentKeyMap]?: (
      data: Components,
      exportConst: boolean,
      exportType: boolean,
    ) => string
  } = {
    Schema: (data, exportConst, exportType) => schemasCode(data, exportConst, exportType),
    Header: (data, exportConst, exportType) => headersCode(data, exportConst, exportType),
    Parameter: (data, exportConst, exportType) => parametersCode(data, exportConst, exportType),
    RequestBody: (data, exportConst) => requestBodiesCode(data, exportConst),
    Response: (data, exportConst) => responsesCode(data, exportConst),
  }

  const componentKey = componentKeyMap[suffix] ?? 'schemas'
  const generator = zodCodeGenerators[suffix]

  // For Zod schema generation (Schema, Header, Parameter, RequestBody, Response)
  if (suffix in zodCodeGenerators && generator) {
    const prefix = split ? '..' : '.'
    const toFileCode = (code: string, filePath: string) =>
      makeImports(code, filePath, imports, false, prefix)

    // Schema-specific split handling with dependency imports
    if (suffix === 'Schema' && split) {
      const schemas = components.schemas
      if (!schemas) return { ok: false, error: 'No schemas found' }
      const schemaNames = Object.keys(schemas)
      if (schemaNames.length === 0) return { ok: true, value: 'No schemas found' }

      const outDir = String(output).replace(/\.ts$/, '')
      const analysis = analyzeCircularSchemas(schemas, schemaNames)

      const allResults = await Promise.all([
        ...schemaNames.map((schemaName) => {
          const fileCode = makeSplitSchemaFile(
            schemaName,
            schemas[schemaName],
            schemas,
            analysis,
            exportType ?? false,
          )
          const filePath = `${outDir}/${lowerFirst(schemaName)}.ts`
          return core(fileCode, path.dirname(filePath), filePath)
        }),
        core(makeBarell(schemas), path.dirname(`${outDir}/index.ts`), `${outDir}/index.ts`),
      ])

      const firstError = allResults.find((r) => !r.ok)
      if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

      return {
        ok: true,
        value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
      }
    }

    // Schema-specific non-split handling with ast (dependency sorting)
    if (suffix === 'Schema' && !split) {
      const schemas = components.schemas
      if (!schemas) return { ok: false, error: 'No schemas found' }
      const schemaNames = Object.keys(schemas)
      if (schemaNames.length === 0) return { ok: true, value: 'No schemas found' }

      const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
      const schemaDefinitions = generator(components, true, exportType ?? false)
      const sorted = ast(schemaDefinitions)
      const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
      const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
      return { ok: true, value: `Generated schema code written to ${output}` }
    }

    if (split) {
      const outDir = String(output).replace(/\.ts$/, '')
      const data = components[componentKey]
      if (!data || typeof data !== 'object') return { ok: false, error: `No ${componentKey} found` }

      const indexPath = path.join(outDir, 'index.ts')

      const allResults = await Promise.all([
        ...Object.entries(data)
          .filter(([, item]) => item !== undefined)
          .map(([key, item]) => {
            const singleComponent = { [componentKey]: { [key]: item } }
            const code = generator(singleComponent, true, exportType ?? false)
            const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
            return core(toFileCode(code, filePath), path.dirname(filePath), filePath)
          }),
        core(makeBarell(data), outDir, indexPath),
      ])

      const firstError = allResults.find((result) => !result.ok)
      if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

      return {
        ok: true,
        value: `Generated ${componentKey} code written to ${outDir}/*.ts (index.ts included)`,
      }
    }

    const code = generator(components, true, exportType ?? false)
    const coreResult = await core(toFileCode(code, output), path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated ${componentKey} code written to ${output}` }
  }

  // For JSON export (Example, Link, Callback, SecurityScheme, Schema)
  if (split) {
    const exportsResult = await makeExports(components, suffix, output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }
  const code = makeExportConst(components, suffix)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated components code written to ${output}` }
}
