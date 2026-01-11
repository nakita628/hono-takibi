import type { Components, Content, Schema } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Extracts schema from parameter content (for parameters using content instead of schema)
 */
const getSchemaFromContent = (content: Content | undefined): Schema | undefined => {
  if (!content) return undefined
  const firstKey = Object.keys(content)[0]
  if (!firstKey) return undefined
  return content[firstKey]?.schema
}

/**
 * Generates TypeScript code for OpenAPI component parameters.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with parameter definitions.
 */
export function parametersCode(
  components: Components,
  exportParameters: boolean,
  exportParametersTypes: boolean,
): string {
  const { parameters } = components
  if (!parameters) return ''

  return Object.keys(parameters)
    .map((k) => {
      const parameter = parameters[k]
      const meta = {
        parameters: {
          ...parameter,
        },
      }
      // Handle parameters with content instead of schema (OpenAPI 3.x)
      const schema = parameter.schema ?? getSchemaFromContent(parameter.content)
      const z = schema ? zodToOpenAPI(schema, meta) : 'z.any()'
      return zodToOpenAPISchema(
        toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema')),
        z,
        exportParameters,
        exportParametersTypes,
        true,
      )
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/parameters.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('parametersCode', () => {
    it('should return empty string when no parameters', () => {
      const components: Components = {}
      expect(parametersCode(components, true, false)).toBe('')
    })

    it('should generate path parameter with export', () => {
      const components: Components = {
        parameters: {
          userId: {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        },
      }
      const result = parametersCode(components, true, false)
      expect(result).toBe(
        `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})`,
      )
    })

    it('should generate parameter without export', () => {
      const components: Components = {
        parameters: {
          page: {
            name: 'page',
            in: 'query',
            schema: { type: 'integer' },
          },
        },
      }
      const result = parametersCode(components, false, false)
      expect(result).toBe(
        `const PageParamsSchema=z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})`,
      )
    })

    it('should generate parameter with export and type', () => {
      const components: Components = {
        parameters: {
          limit: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer' },
          },
        },
      }
      const result = parametersCode(components, true, true)
      expect(result).toBe(
        `export const LimitParamsSchema=z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})

export type LimitParams=z.infer<typeof LimitParamsSchema>`,
      )
    })
  })
}
