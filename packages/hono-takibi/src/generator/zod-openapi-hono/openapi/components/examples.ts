import { makeConst, sortExamplesByDependency } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI example components.
 *
 * Handles both inline examples and $ref references to other examples.
 * When an example references another example via $ref, it generates
 * a variable reference instead of duplicating the value.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B{Has examples?}
 *   B -->|No| C["Return ''"]
 *   B -->|Yes| D["Sort by dependency"]
 *   D --> E["For each example"]
 *   E --> F{Has $ref?}
 *   F -->|Yes| G["Generate: const X = RefName"]
 *   F -->|No| H["Generate: const X = JSON"]
 *   G --> I["Join with newlines"]
 *   H --> I
 *   I --> J(["Return code"])
 * ```
 *
 * @param components - OpenAPI components object
 * @param exportExamples - Whether to export the example constants
 * @returns Generated TypeScript code string
 */
export function examplesCode(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  // Type guard for $ref property (OpenAPI spec allows references in examples)
  const hasRef = (v: unknown): v is { readonly $ref: string } =>
    typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string'

  // Sort examples to ensure referenced examples are defined first
  const exampleNames = Object.keys(examples)
  const sortedNames = sortExamplesByDependency(examples, exampleNames)

  return sortedNames
    .map((k) => {
      const example = examples[k]
      // Handle $ref to another example
      if (hasRef(example)) {
        return `${makeConst(exportExamples, k, 'Example')}${makeRef(example.$ref)}`
      }
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(example)}`
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/examples.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('examplesCode', () => {
    it('should return empty string when no examples', () => {
      const components: Components = {}
      expect(examplesCode(components, true)).toBe('')
    })

    it('should generate example with export', () => {
      const components: Components = {
        examples: {
          UserExample: {
            summary: 'Example user',
            dataValue: { id: 1, name: 'John' },
            serializedValue: '{"id":1,"name":"John"}',
            value: { id: 1, name: 'John' },
          },
        },
      }
      const result = examplesCode(components, true)
      expect(result).toBe(
        `export const UserExample={"summary":"Example user","dataValue":{"id":1,"name":"John"},"serializedValue":"{\\"id\\":1,\\"name\\":\\"John\\"}","value":{"id":1,"name":"John"}}`,
      )
    })

    it('should generate example without export', () => {
      const components: Components = {
        examples: {
          SimpleExample: {
            dataValue: 'test',
            serializedValue: '"test"',
            value: 'test',
          },
        },
      }
      const result = examplesCode(components, false)
      expect(result).toBe(
        `const SimpleExample={"dataValue":"test","serializedValue":"\\"test\\"","value":"test"}`,
      )
    })

    it('should generate example with $ref to another example', () => {
      // hasRef type guard handles $ref at runtime
      const components: Components = {
        examples: {
          BaseExample: {
            dataValue: { id: 1, name: 'Base' },
            serializedValue: '{"id":1,"name":"Base"}',
            value: { id: 1, name: 'Base' },
          },
          AliasExample: {
            $ref: '#/components/examples/BaseExample',
          },
        },
      }
      const result = examplesCode(components, true)
      // BaseExample should come first (dependency order)
      expect(result).toContain('export const BaseExample=')
      expect(result).toContain('export const AliasExample=BaseExample')
      expect(result.indexOf('BaseExample=')).toBeLessThan(result.indexOf('AliasExample='))
    })

    it('should handle multiple $ref examples with correct dependency order', () => {
      // hasRef type guard handles $ref at runtime
      const components: Components = {
        examples: {
          // Defined in reverse order to test sorting
          ThirdExample: {
            $ref: '#/components/examples/SecondExample',
          },
          SecondExample: {
            $ref: '#/components/examples/FirstExample',
          },
          FirstExample: {
            dataValue: { data: 'first' },
            serializedValue: '{"data":"first"}',
            value: { data: 'first' },
          },
        },
      }
      const result = examplesCode(components, true)
      const lines = result.split('\n\n')
      // First → Second → Third order
      expect(lines[0]).toContain('FirstExample')
      expect(lines[1]).toContain('SecondExample')
      expect(lines[2]).toContain('ThirdExample')
    })

    it('should handle mixed inline and $ref examples', () => {
      // hasRef type guard handles $ref at runtime
      const components: Components = {
        examples: {
          RefExample: {
            $ref: '#/components/examples/InlineExample',
          },
          InlineExample: {
            dataValue: 'inline',
            serializedValue: '"inline"',
            value: 'inline',
          },
          AnotherInline: {
            dataValue: 'another',
            serializedValue: '"another"',
            value: 'another',
          },
        },
      }
      const result = examplesCode(components, true)
      // InlineExample should come before RefExample
      expect(result).toContain('export const InlineExample=')
      expect(result).toContain('export const RefExample=InlineExample')
      expect(result.indexOf('InlineExample=')).toBeLessThan(result.indexOf('RefExample='))
    })
  })
}
