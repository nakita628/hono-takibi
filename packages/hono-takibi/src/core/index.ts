// import path from 'node:path'
// import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
// import { makeContent } from '../helper/components.js'
// import { core } from '../helper/core.js'
// import { exports } from '../helper/exports.js'
// import type { Components, Header, Reference } from '../openapi/index.js'
// import {
//   ensureSuffix,
//   exportConst,
//   lowerFirst,
//   toIdentifierPascalCase,
//   zodToOpenAPISchema,
// } from '../utils/index.js'

// const isReference = (v: unknown): v is Reference =>
//   typeof v === 'object' && v !== null && '$ref' in v

// const isHeader = (v: unknown): v is Header => typeof v === 'object' && v !== null && !('$ref' in v)

// /**
//  * Builds a header schema definition (Zod schema).
//  */
// function buildHeaderSchema(
//   key: string,
//   header: Header | Reference,
//   exportHeader: boolean,
//   exportType: boolean,
// ): string {
//   const schemaName = toIdentifierPascalCase(ensureSuffix(key, 'Header'))

//   if (isReference(header) && header.$ref) {
//     const refName = header.$ref.split('/').pop() ?? key
//     const refSchema = toIdentifierPascalCase(ensureSuffix(refName, 'Header'))
//     return zodToOpenAPISchema(schemaName, refSchema, exportHeader, exportType, true)
//   }

//   if (isHeader(header)) {
//     if (header.schema) {
//       const schema = zodToOpenAPI(header.schema, { headers: header })
//       return zodToOpenAPISchema(schemaName, schema, exportHeader, exportType, true)
//     }
//     if (header.content) {
//       const content = makeContent(header.content)
//       return zodToOpenAPISchema(
//         schemaName,
//         `{${content.join(',')}}`,
//         exportHeader,
//         exportType,
//         true,
//       )
//     }
//   }

//   return zodToOpenAPISchema(schemaName, 'z.any()', exportHeader, exportType, true)
// }

// /**
//  * Generates headers as Zod schemas (split mode).
//  */
// async function exportsZodHeaders(
//   headers: { readonly [k: string]: Header | Reference | undefined },
//   output: string,
//   exportType: boolean,
// ): Promise<
//   { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
// > {
//   const keys = Object.keys(headers)
//   const outDir = output.replace(/\.ts$/, '')
//   const importZ = `import { z } from '@hono/zod-openapi'`

//   for (const key of keys) {
//     const header = headers[key]
//     if (!header) continue

//     const code = buildHeaderSchema(key, header, true, exportType)
//     const fileName = lowerFirst(toIdentifierPascalCase(ensureSuffix(key, 'Header')))
//     const filePath = path.join(outDir, `${fileName}.ts`)
//     const fileCode = [importZ, '\n', code, ''].filter(Boolean).join('\n')

//     const coreResult = await core(fileCode, path.dirname(filePath), filePath)
//     if (!coreResult.ok) return { ok: false, error: coreResult.error }
//   }

//   const indexBody = `${keys
//     .sort()
//     .map(
//       (n) => `export * from './${lowerFirst(toIdentifierPascalCase(ensureSuffix(n, 'Header')))}'`,
//     )
//     .join('\n')}\n`

//   const coreResult = await core(
//     indexBody,
//     path.dirname(path.join(outDir, 'index.ts')),
//     path.join(outDir, 'index.ts'),
//   )
//   if (!coreResult.ok) return { ok: false, error: coreResult.error }

//   return {
//     ok: true,
//     value: `Generated Header code written to ${outDir}/*.ts (index.ts included)`,
//   }
// }

// /**
//  * Generates headers as Zod schemas (single file mode).
//  */
// function generateHeadersCode(
//   headers: { readonly [k: string]: Header | Reference | undefined },
//   exportType: boolean,
// ): string {
//   const importZ = `import { z } from '@hono/zod-openapi'`
//   const defs = Object.keys(headers)
//     .map((key) => {
//       const header = headers[key]
//       if (!header) return ''
//       return buildHeaderSchema(key, header, true, exportType)
//     })
//     .filter(Boolean)
//     .join('\n\n')

//   return [importZ, '\n', defs, ''].filter(Boolean).join('\n')
// }

// export async function componentsCore(
//   components: Components,
//   suffix:
//     | 'Schema'
//     | 'Parameter'
//     | 'SecurityScheme'
//     | 'RequestBody'
//     | 'Response'
//     | 'Header'
//     | 'Example'
//     | 'Link'
//     | 'Callback',
//   output: string | `${string}.ts`,
//   split?: boolean,
//   exportType?: boolean,
// ): Promise<
//   { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
// > {
//   if (!components) return { ok: false, error: 'No components found' }

//   // Header: generate Zod schemas
//   if (suffix === 'Header') {
//     const headers = components as { readonly [k: string]: Header | Reference | undefined }
//     if (split) {
//       return exportsZodHeaders(headers, output, exportType ?? false)
//     }
//     const code = generateHeadersCode(headers, exportType ?? false)
//     const coreResult = await core(code, path.dirname(output), output)
//     if (!coreResult.ok) return { ok: false, error: coreResult.error }
//     return { ok: true, value: `Generated Header code written to ${output}` }
//   }

//   // Other components: use exports/exportConst
//   if (split) {
//     const exportsResult = await exports(components, suffix, output)
//     if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
//     return { ok: true, value: exportsResult.value }
//   }
//   const code = exportConst(components, suffix)
//   const coreResult = await core(code, path.dirname(output), output)
//   if (!coreResult.ok) return { ok: false, error: coreResult.error }
//   return { ok: true, value: `Generated components code written to ${output}` }
// }

import path from 'node:path'
import { core } from '../helper/core.js'
import { exports } from '../helper/exports.js'
import type { Components } from '../openapi/index.js'
import { exportConst } from '../utils/index.js'

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
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!components) return { ok: false, error: 'No components found' }
  if (split) {
    const exportsResult = await exports(components, suffix, output)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }
  const code = exportConst(components, suffix)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated components code written to ${output}` }
}
