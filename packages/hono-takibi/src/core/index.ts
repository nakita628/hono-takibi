import path from 'node:path'
import { headersCode } from '../generator/zod-openapi-hono/openapi/components/headers.js'
import { parametersCode } from '../generator/zod-openapi-hono/openapi/components/parameters.js'
import { requestBodiesCode } from '../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { responsesCode } from '../generator/zod-openapi-hono/openapi/components/responses.js'
import { makeBarell } from '../helper/barell.js'
import type { ComponentImports } from '../helper/code.js'
import { makeFileCodeWithImports } from '../helper/code.js'
import { core, makeExportConst, makeExports } from '../helper/index.js'
import type { Components } from '../openapi/index.js'
import { lowerFirst } from '../utils/index.js'

const zodCodeGenerators: Readonly<
  Record<string, (data: Components, exportConst: boolean, exportType: boolean) => string>
> = {
  Header: (data, exportConst, exportType) => headersCode(data, exportConst, exportType),
  Parameter: (data, exportConst, exportType) => parametersCode(data, exportConst, exportType),
  RequestBody: (data, exportConst) => requestBodiesCode(data, exportConst),
  Response: (data, exportConst) => responsesCode(data, exportConst),
}

const componentKeyMap: Readonly<Record<string, keyof Components>> = {
  Schema: 'schemas',
  Parameter: 'parameters',
  SecurityScheme: 'securitySchemes',
  RequestBody: 'requestBodies',
  Response: 'responses',
  Header: 'headers',
  Example: 'examples',
  Link: 'links',
  Callback: 'callbacks',
}

export async function componentsCore(
  components: Components,
  suffix:
    | 'Schema'
    | 'Parameter'
    | 'SecurityScheme'
    | 'RequestBody'
    | 'Response'
    | 'Header'
    | 'Example'
    | 'Link'
    | 'Callback',
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

  // For Zod schema generation (Header, Parameter, RequestBody, Response)
  if (suffix in zodCodeGenerators && generator) {
    const prefix = split ? '..' : '.'
    const toFileCode = (code: string, filePath: string) =>
      makeFileCodeWithImports(code, filePath, imports, prefix)

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
