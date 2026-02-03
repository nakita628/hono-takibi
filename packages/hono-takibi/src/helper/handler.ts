/**
 * Route handler generation module.
 *
 * Generates skeleton handler files for Hono routes based on OpenAPI operations.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodOpenAPIHonoHandler(openapi, output, mock, test)"] --> B["Extract paths and methods"]
 *   B --> C["Group by first path segment"]
 *   C --> D["Create handlers directory"]
 *   D --> E["For each handler file"]
 *   E --> F["Generate RouteHandler type imports"]
 *   F --> G{"mock enabled?"}
 *   G -->|Yes| H["Generate handlers with faker.js mock responses"]
 *   G -->|No| I["Generate empty handler functions"]
 *   H --> J["Write handler file"]
 *   I --> J
 *   J --> K{"Generate test file?"}
 *   K -->|Yes| L["Generate test with faker.js mocks"]
 *   K -->|No| M["Continue"]
 *   L --> M
 *   M --> N["Write index.ts barrel"]
 *   N --> O["Return result"]
 * ```
 *
 * @module helper/handler
 */
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { schemaToFaker } from '../generator/test/faker-mapping.js'
import { generateHandlerTestCode } from '../generator/test/index.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import { isHttpMethod, methodPath } from '../utils/index.js'

/**
 * Collect all $ref names used in a schema (recursively)
 */
function collectRefs(schema: Schema, refs: Set<string> = new Set()): Set<string> {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    if (refName) refs.add(refName)
  }
  if (schema.items) {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      collectRefs(item, refs)
    }
  }
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectRefs(prop, refs)
    }
  }
  if (schema.allOf) {
    for (const s of schema.allOf) collectRefs(s, refs)
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) collectRefs(s, refs)
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) collectRefs(s, refs)
  }
  return refs
}

/**
 * Generate mock function for a schema
 */
function generateMockFunction(
  name: string,
  schema: Schema,
  schemas: Record<string, Schema>,
): string {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  return `function mock${name}() {\n  return ${mockBody}\n}`
}

/**
 * Generates route handler files for a Hono app using Zod and OpenAPI.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param mock - Whether to generate handlers with faker.js mock responses.
 * @param test - Whether to generate corresponding test files with faker.js mocks.
 * @returns A `Result` indicating success or error with message.
 */
export async function zodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  mock: boolean,
  test: boolean,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const paths: OpenAPI['paths'] = openapi.paths

  // Collect schemas for $ref resolution
  const schemas = openapi.components?.schemas ?? {}

  const handlers: readonly {
    readonly fileName: `${string}.ts`
    readonly testFileName: `${string}.ts`
    readonly routeHandlerContents: string[]
    readonly routeNames: string[]
    readonly needsFaker: boolean
    readonly usedRefs: Set<string>
  }[] = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem)
      .filter(([m]) => isHttpMethod(m))
      .map(([method, operation]) => {
        const routeId = methodPath(method, p)

        let routeHandlerContent: string
        let needsFaker = false
        const usedRefs = new Set<string>()

        if (mock) {
          // Generate handler with faker mock response
          const op = operation as {
            responses?: Record<string, { content?: Record<string, { schema?: Schema }> }>
          }
          const successResponse =
            op.responses?.['200'] ?? op.responses?.['201'] ?? op.responses?.['204']
          const responseSchema = successResponse?.content?.['application/json']?.schema

          if (responseSchema) {
            needsFaker = true
            collectRefs(responseSchema, usedRefs)
            const mockData = schemaToFaker(responseSchema, undefined, { schemas })
            const statusCode = op.responses?.['200'] ? 200 : op.responses?.['201'] ? 201 : 204
            routeHandlerContent = `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{
  return c.json(${mockData}, ${statusCode})
}`
          } else {
            // No response body (e.g., 204 No Content)
            const statusCode = op.responses?.['204'] ? 204 : 200
            routeHandlerContent = `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{
  return c.body(null, ${statusCode})
}`
          }
        } else {
          routeHandlerContent = `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`
        }

        const rawSegment = p.replace(/^\/+/, '').split('/')[0] ?? ''
        const sanitized = rawSegment
          .replace(/\{([^}]+)\}/g, '$1')
          .replace(/[^0-9A-Za-z._-]/g, '_')
          .replace(/^[._-]+|[._-]+$/g, '')
          .replace(/__+/g, '_')
          .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())

        const pathName = sanitized === '' ? '__root' : sanitized
        const fileName: `${string}.ts` = `${pathName}.ts`
        const testFileName: `${string}.ts` = `${pathName}.test.ts`

        return {
          fileName,
          testFileName,
          routeHandlerContents: [routeHandlerContent],
          routeNames: [`${routeId}Route`],
          needsFaker,
          usedRefs,
        } satisfies {
          readonly fileName: `${string}.ts`
          readonly testFileName: `${string}.ts`
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
          readonly needsFaker: boolean
          readonly usedRefs: Set<string>
        }
      }),
  )

  const mergedHandlers: readonly {
    readonly fileName: `${string}.ts`
    readonly testFileName: `${string}.ts`
    readonly routeHandlerContents: string[]
    readonly routeNames: string[]
    readonly needsFaker: boolean
    readonly usedRefs: Set<string>
  }[] = Array.from(
    handlers
      .reduce<
        Map<
          string,
          {
            readonly fileName: `${string}.ts`
            readonly testFileName: `${string}.ts`
            readonly routeHandlerContents: string[]
            readonly routeNames: string[]
            readonly needsFaker: boolean
            readonly usedRefs: Set<string>
          }
        >
      >((map, h) => {
        const prev = map.get(h.fileName)
        const next: {
          readonly fileName: `${string}.ts`
          readonly testFileName: `${string}.ts`
          readonly routeHandlerContents: string[]
          readonly routeNames: string[]
          readonly needsFaker: boolean
          readonly usedRefs: Set<string>
        } = prev
          ? {
              fileName: h.fileName,
              testFileName: h.testFileName,
              routeHandlerContents: [...prev.routeHandlerContents, ...h.routeHandlerContents],
              routeNames: Array.from(new Set([...prev.routeNames, ...h.routeNames])),
              needsFaker: prev.needsFaker || h.needsFaker,
              usedRefs: new Set([...prev.usedRefs, ...h.usedRefs]),
            }
          : {
              fileName: h.fileName,
              testFileName: h.testFileName,
              routeHandlerContents: [...h.routeHandlerContents],
              routeNames: [...h.routeNames],
              needsFaker: h.needsFaker,
              usedRefs: new Set(h.usedRefs),
            }
        map.set(h.fileName, next)
        return map
      }, new Map())
      .values(),
  )

  const isDot = output === '.' || output === './'
  const baseDir = isDot ? '.' : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeEntryBasename = output.match(/[^/]+\.ts$/)?.[0] ?? 'index.ts'
  const importFrom = `../${routeEntryBasename.replace(/\.ts$/, '')}`

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const handlerFiles = mergedHandlers.map((h) => h.fileName)
  const exports = handlerFiles.map((h) => `export * from './${h.replace(/\.ts$/, '')}'`).join('\n')

  const handlerResults = await Promise.all([
    ...mergedHandlers.map(async (handler) => {
      const routeTypes = Array.from(new Set(handler.routeNames)).join(', ')
      const importRouteTypes = routeTypes
        ? `import type { ${routeTypes} } from '${importFrom}';`
        : ''
      const fakerImport = handler.needsFaker ? "import { faker } from '@faker-js/faker'\n" : ''
      const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${fakerImport}${importRouteTypes}`

      // Generate mock functions for used refs
      const mockFunctions = Array.from(handler.usedRefs)
        .filter((refName) => schemas[refName])
        .map((refName) => generateMockFunction(refName, schemas[refName], schemas))
        .join('\n\n')

      const fileContent = mockFunctions
        ? `${importStatements}\n\n${mockFunctions}\n\n${handler.routeHandlerContents.join('\n\n')}`
        : `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

      const fmtResult = await fmt(fileContent)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        // Generate test file with faker.js mocks for this specific handler
        // app is exported from index.ts, not routes.ts
        const appImportPath = '..'
        const testContent = generateHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          handler.routeNames,
          appImportPath,
        )
        // Skip writing if no relevant test cases were found
        if (testContent) {
          const testFmtResult = await fmt(testContent)
          const testCode = testFmtResult.ok ? testFmtResult.value : testContent
          const testWriteResult = await writeFile(
            `${handlerPath}/${handler.testFileName}`,
            testCode,
          )
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(exports)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/index.ts`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = handlerResults.find((r) => !r.ok)
  if (firstError) return firstError

  return { ok: true, value: undefined }
}
