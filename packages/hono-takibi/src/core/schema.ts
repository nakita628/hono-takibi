
import path from 'node:path'
import { mkdir, writeFile } from '../fsp/index.js'
import { componentsCode } from '../generator/zod-openapi-hono/openapi/components/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { resolveSchemasDependencies } from '../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import { type Components, type OpenAPI, parseOpenAPI } from '../openapi/index.js'
import { fmt } from '../format/index.js'

export async function schema(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string,
  exportType: boolean,
  importPath: string,
  split: boolean,
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
  if (!schemas) {
    return { ok: false, error: 'No schemas found' }
  }
  const orderedSchemas = resolveSchemasDependencies(schemas)
  if (orderedSchemas.length === 0) {
    return { ok: true, value: 'No schemas found' }
  }

  // split 
  if (split) {
    for (const schemaName of orderedSchemas) {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      const zs = zodToOpenAPISchema(schemaName, z, true, exportType)
      const importCode = `import { z } from '@hono/zod-openapi'`
      
      const fmtCode = await fmt(`${importCode}\n\n${zs}`)
      if (!fmtCode.ok) {
        return { ok: false, error: fmtCode.error }
      }
      const mkdirResult = await mkdir(path.dirname(`${output.replace(/\.ts$/, '')}/${schemaName.charAt(0).toLowerCase()}${schemaName.slice(1)}.ts`))
      if (!mkdirResult.ok) {
        return { ok: false, error: mkdirResult.error }
      }
      const writeResult = await writeFile(`${output.replace(/\.ts$/, '')}/${schemaName.charAt(0).toLowerCase()}${schemaName.slice(1)}.ts`, fmtCode.value)
      if (!writeResult.ok) {
        return { ok: false, error: writeResult.error }
      }
      // return { ok: true, value: `Generated schema code written to ${output.replace(/\.ts$/, '')}/${schemaName}.ts` }
    }
    return { ok: true, value: `Generated schema code written to ${output.replace(/\.ts$/, '')}/*.ts` }
  }



  const schemaDefinitions = orderedSchemas
    .map(async (schemaName) => {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      return zodToOpenAPISchema(schemaName, z, true, exportType)
    })
    .join('\n\n')
  const importCode = `import { z } from '@hono/zod-openapi'`
  const schemaDefinitionsCode = `${importCode}\n\n${schemaDefinitions}`
  const fmtCode = await fmt(schemaDefinitionsCode)
  if (!fmtCode.ok) {
    return { ok: false, error: fmtCode.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, schemaDefinitionsCode)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
