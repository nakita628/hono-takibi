/**
 * TypeScript type generation module.
 *
 * Generates TypeScript type declarations from OpenAPI specifications
 * using the TypeScript compiler API for type inference.
 *
 * ```mermaid
 * flowchart TD
 *   A["type(openAPI, output)"] --> B["Generate Hono routes code"]
 *   B --> C["Create virtual TypeScript file"]
 *   C --> D["Use TS compiler to infer types"]
 *   D --> E["Extract api type"]
 *   E --> F["Write type declaration file"]
 * ```
 *
 * @module core/type
 */
import path from 'node:path'
import ts from 'typescript'
import { zodOpenAPIHono } from '../../generator/zod-openapi-hono/openapi/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { isHttpMethod, methodPath } from '../../utils/index.js'

/**
 * Generates TypeScript type declarations from OpenAPI specification.
 *
 * Uses the TypeScript compiler API to infer the complete type
 * of a Hono OpenAPI application, then outputs a declaration file.
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Type Inference"
 *     A["OpenAPI Spec"] --> B["Generate routes"]
 *     B --> C["TS Compiler"]
 *     C --> D["Infer AddType"]
 *   end
 *   subgraph "Output"
 *     E["declare const routes: {...}"]
 *   end
 *   D --> E
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path for type declarations
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * await type(openAPI, 'src/api.d.ts')
 * // Generates: src/api.d.ts
 * // declare const routes: OpenAPIHono<...>
 * // export default routes
 * ```
 */
export async function type(
  openAPI: OpenAPI,
  output: `${string}.ts`,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  try {
    const hono = zodOpenAPIHono(openAPI, {
      exportSchemasTypes: false,
      exportSchemas: false,
      exportParametersTypes: false,
      exportParameters: false,
      exportSecuritySchemes: false,
      exportRequestBodies: false,
      exportResponses: false,
      exportHeadersTypes: false,
      exportHeaders: false,
      exportExamples: false,
      exportLinks: false,
      exportCallbacks: false,
    })

    const paths = openAPI.paths
    const routes = Object.entries(paths).flatMap(([p, pathItem]) =>
      Object.entries(pathItem)
        .filter(([m]) => isHttpMethod(m))
        .map(([method]) => {
          const routeId = methodPath(method, p)
          return `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`
        }),
    )

    const getRouteMaps = (
      openapi: OpenAPI,
    ): { routeName: string; handlerName: string; path: string }[] => {
      const openapiPaths = openapi.paths
      const routeMappings = Object.entries(openapiPaths).flatMap(([path, pathItem]) => {
        return Object.entries(pathItem).flatMap(([method]) => {
          if (!isHttpMethod(method)) {
            return []
          }
          const base = methodPath(method, path)
          return {
            routeName: `${base}Route`,
            handlerName: `${base}RouteHandler`,
            path,
          }
        })
      })
      return routeMappings
    }

    const routeMappings = getRouteMaps(openAPI)

    const appInit =
      'export const api=app' +
      routeMappings
        .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
        .join('')

    const code = `import{OpenAPIHono,type RouteHandler}from'@hono/zod-openapi'\n${hono}\nconst app=new OpenAPIHono()\n${routes.join('\n')}\n${appInit}\nexport type AddType=typeof api`

    const honoType = apiType(code)

    if (honoType === undefined) return { ok: false, error: 'not generated type' }

    const typeCode = `declare const routes:\n${honoType}\nexport default routes`

    const coreResult = await core(typeCode, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return {
      ok: true,
      value: `Generated type code written to ${output}`,
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

function apiType(code: string): string | undefined {
  const VIRTUAL_FILE_NAME = 'virtual.ts'
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    strict: true,
  }

  const sourceFile = ts.createSourceFile(
    VIRTUAL_FILE_NAME,
    code,
    compilerOptions.target ?? ts.ScriptTarget.ESNext,
  )

  const host = ts.createCompilerHost(compilerOptions)
  const originalGetSourceFile = host.getSourceFile.bind(host)

  host.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
    if (fileName === VIRTUAL_FILE_NAME) return sourceFile
    return originalGetSourceFile(
      fileName,
      languageVersionOrOptions,
      onError,
      shouldCreateNewSourceFile,
    )
  }

  const program = ts.createProgram([VIRTUAL_FILE_NAME], compilerOptions, host)
  const checker = program.getTypeChecker()

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile)
  if (!moduleSymbol) return undefined

  const apiSymbol = checker.getExportsOfModule(moduleSymbol).find((s) => s.getName() === 'api')

  if (!apiSymbol) return undefined

  const type = checker.getTypeOfSymbolAtLocation(apiSymbol, sourceFile)

  return checker.typeToString(
    type,
    undefined,
    ts.TypeFormatFlags.NoTruncation |
      ts.TypeFormatFlags.UseFullyQualifiedType |
      ts.TypeFormatFlags.WriteTypeArgumentsOfSignature,
  )
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/core/type/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  const fs = await import('node:fs')
  const os = await import('node:os')
  const nodePath = await import('node:path')

  const openapi = {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Test: {
          type: 'object',
          required: ['test'],
          properties: {
            test: {
              type: 'string',
            },
          },
        },
      },
    },
    paths: {
      '/test': {
        post: {
          summary: 'Test endpoint',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Test',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful test',
            },
          },
        },
      },
    },
  } as OpenAPI

  describe('type', () => {
    it('should return ok and generate declaration file', { timeout: 10000 }, async () => {
      const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
      try {
        const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
        const result = await type(openapi, out)
        expect(result.ok).toBe(true)
        expect(fs.existsSync(out)).toBe(true)
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toContain('declare const routes:')
        expect(code).toContain('export default routes')
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
}
