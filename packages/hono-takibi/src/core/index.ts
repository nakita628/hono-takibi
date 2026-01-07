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
} as const satisfies Readonly<Record<string, keyof Components>>

const zodCodeGenerators: Readonly<
  Partial<
    Record<
      keyof typeof componentKeyMap,
      (data: Components, exportConst: boolean, exportType: boolean) => string
    >
  >
> = {
  Schema: (data, exportConst, exportType) => schemasCode(data, exportConst, exportType),
  Header: (data, exportConst, exportType) => headersCode(data, exportConst, exportType),
  Parameter: (data, exportConst, exportType) => parametersCode(data, exportConst, exportType),
  RequestBody: (data, exportConst) => requestBodiesCode(data, exportConst),
  Response: (data, exportConst) => responsesCode(data, exportConst),
}

export async function componentsCore(
  components: Components,
  suffix: keyof typeof componentKeyMap,
  output: string | `${string}.ts`,
  split?: boolean,
  exportType?: boolean,
  imports?: ComponentImports,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!components) return { ok: false, error: 'No components found' }

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

    // Schema-specific non-split handling with sortByDependencies
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
